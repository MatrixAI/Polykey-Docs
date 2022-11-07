# Session Management

### Starting a Session
When a client is initialized, it creates a `Session` object. This handles the reading and writing of the current session token from the disk (it does not store a copy of the token internally).

The Session must be provided with a `sessionTokenPath` during creation, and can optionally also be provided with a filesystem, logger, session token, and the option to overwrite old data if it exists. The `sessionTokenPath` is the location of the session file on disk, which stores the shared session token for all authenticated gRPC calls. When the Session is started (during creation) if a session token is provided it will be written to the session file, overwriting any existing data. This means that, when the session is started, the session file can be in any one of three possible states:

1. Empty (no token)
2. Contains a valid token
3. Contains an invalid token

A gRPC call can be attempted in all three cases, however, only a valid token can be used to authorize the call.

### Session Interception
The session interceptor is the middleware for authenticating gRPC calls. It ensures that the session token is read from the session file at the beginning of every call and encoded into authorization metadata. This metadata can be overridden by an additional metadata object generated using the root password, which can be supplied in the form of a path to the password file or as an environment variable.

When the call is made to the agent, the service handler checks the authorization metadata and, once authenticated, generates a new token that is encoded into a new authorization metadata object. The session interceptor listens for this, decoding the received metadata back into a session token and writing it to the session file. This allows future calls to be authenticated using this token, preventing the need for a new token to be generated on every call or for the password to be supplied on every call.

![session interception diagram](http://www.plantuml.com/plantuml/png/3SSn5i9020N0g-W1ilHsbXOU8gveC8JbmUV5t5wdcxDOrtfoXPuMmFD25FFUteAb7fKSVHZOqFhOQ9TLw3uZv7kzqISd7tgiVD1Bb9EICsNO90QEpev_cjUcFm00)

#### Session Management
Since the session token needs to be both read from and written to the session file during authenticated calls, we need to ensure that the token remains safe. To achieve this, we use a read-write lock in order to prevent multiple commands from attempting to write to the session file at the same time. Since multiple reads can occur concurrently safely, the lock favours writes in order to prevent subsequent reads from sharing the lock and increasing wait times for writes. We also drop writes if a write lock is already acquired by another process since we know that the session token will be refreshed by the other process.

![session management diagram](http://www.plantuml.com/plantuml/png/5Sqzje90343X_gtYkG18RuMbXOk8GuH89ZCdFmVPlLBTwfvlya2BhF9tOIsICwN9_nhH_GfWk8yBnvhFTBBID4XZBAt2pXl30yFuSxl3suVUvDZeW1SBEJYvSzEXek92zRpwYKoaywzV)

### Retrying a CLI Call
When a user executes a CLI command without having been authenticated previously the command sent to the agent will be rejected as "unauthorised". Instead of throwing an exception here, we can prompt the user for the root password in order to authenticate the client. Provided we know that the user is not a machine (which would classify as unattended usage), we can continue to prompt the user for the root password until the correct password is supplied and they can be authenticated. We will refer to this loop as the CLI Authentication Retry Loop (CARL).

Before we can activate the CARL and begin to prompt the user for the password, we need to ensure that the command is not unattended (since we need to account for both machine and human usage). We can do this by checking if either of the two environment variables PK_PASSWORD (for the root password) or PK_TOKEN (for the session token) are set (since the purpose of setting these is for unattended usage). If either of these are set, the caught authentication error will be thrown and we will not attempt to retry the call, as the CARL requires user input which cannot be received on an unattended call.

Before we activate the CARL we also need to check that the first exception we receive back from the agent is either ErrorClientAuthMissing (thrown when the call has no authorization metadata), or ErrorClientAuthDenied (thrown when the authorization metadata is provided but invalid), since we only want to retry the call if the client cannot be authenticated (and not on generic errors). Once we are inside the loop we only want to restart it if the error we receive back from the agent is ErrorClientAuthDenied (thrown when the authorization metadata is invalid), since this means that the password supplied by the user was incorrect and we want to prompt them to try again. At this point it is not possible for the authorization metadata to be missing, so we do not check for this error. The user can always manually exit the loop from the terminal if they have forgotten their password or otherwise wish to cancel the call.

![CARL](http://www.plantuml.com/plantuml/png/5Smx3i8m303GdLF00OXtfbPCIB1mWv0QQkewaJygkJqmlUqDvbazLjuTI0h7XA6ydzsRdG0qR-b5FiSZ3BLKSHHFfQwmqK9mowxq6I_mjcEht1Viy2H6W_DulwRsRmUKwUSN)

Since we want this loop to be as automated as possible, prompting the user to enter their password should be our last option. As such, the `retryAuthentication` function used to activate the CARL must be supplied with an initial metadata object that is constructed during the parsing of command line options for each call. This metadata is encoded using the first set value from the following in order:

1. Password File (optional for every CLI call)
1. PK_PASSWORD environment variable
1. PK_TOKEN environment variable

In this way, if the password is already supplied it will be made use of. If none of these options are provided, an empty metadata object is used. This is the only situation in which `ErrorClientAuthMissing` can be thrown by a call. `ErrorClientAuthDenied` instead indicates that the session token stored by a previous call has since expired, requiring re-authentication in order to continue to communicate with the server. Once we enter the CARL we know that all of these other options have been exhausted and we have to prompt the user for the password.

### Exceptions
There are three exceptions that can occur during service authentication:

The first is when a gRPC call is made with no authorization metadata. This can occur when there is no existing session token stored on disk and no password is provided in the call options or in environment variables. In this case the call is unauthenticated and thus cannot be authorized to continue.
```ts
class ErrorClientAuthMissing extends ErrorClient {
  description = 'Authorisation metadata is required but missing';
  exitCode = 77;
}
```

The second is when the authorization metadata is present but invalid. If the authentication type is a session token this means that the token has either expired naturally or has been invalidated through a refresh of the session key (invalidating all active tokens at once). If the authentication type is a password it means that the password is incorrect. In this case the call cannot be authorized to continue due to failed authentication.
```ts
class ErrorClientAuthDenied extends ErrorClient {
  description = 'Authorisation metadata is incorrect or expired';
  exitCode = 77;
}
```

The third and final exception that can occur is when the authorization metadata is incorrectly formatted. This exception should only occur due to a programming error.
```ts
class ErrorClientAuthFormat extends ErrorClient {
  description = 'Authorisation metadata has invalid format';
  exitCode = 64;
}
```
