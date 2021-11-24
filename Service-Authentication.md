### Starting a Session
When a client is started, it starts the `Session` object. This handles the reading and writing of the current session token from the disk (it does not store a copy of the token internally).

The Session must be provided with a `sessionTokenPath` during creation, and can optionally also be provided with a filesystem, logger, session token, and the option to overwrite old data if it exists. The `sessionTokenPath` is the location of the session file on disk, which stores the shared session token for all authenticated gRPC calls. When the Session is started (during creation) if a session token is provided it will be written to the session file, overwriting any existing data. This means that, when the session is started, the session file can be in any one of three possible states:

1. Empty (no token)
2. Contains a valid token
3. Contains an invalid token

A gRPC call can be attempted in all three cases, however, only a valid token can be used to authorize the call.

### Session Interception
The session interceptor is the middleware for authenticating gRPC calls. It ensures that the session token is read from the session file at the beginning of every call and encoded into authorization metadata. This metadata can be overridden by an additional metadata object generated using the root password, which can be supplied in the form of a path to the password file or as an environment variable.

When the call is made to the agent, the service handler checks the authorization metadata and, once authenticated, generates a new token that is encoded into a new authorization metadata object. The session interceptor listens for this, decoding the received metadata back into a session token and writing it to the session file. This allows future calls to be authenticated using this token, preventing the need for a new token to be generated on every call or for the password to be supplied on every call.

#### Session Management
Since the session token needs to be both read from and written to the session file during authenticated calls, we need to ensure that the token remains safe. To achieve this, we use a read-write lock in order to prevent multiple commands from attempting to write to the session file at the same time. Since multiple reads can occur concurrently safely, the lock favours writes in order to prevent subsequent reads from sharing the lock and increasing wait times for writes. We also drop writes if a write lock is already acquired by another process since we know that the session token will be refreshed by the other process.

#### Making GRPC calls.
As mentioned in the [Starting a session](#Starting-a-session) section there are 3 states that the `Session` can be in. For reference here they are.
1. no token.
2. valid token.
3. invalid token.

With state 1. 
```

   ┌────────────┐                         ┌────────────┐
   │            │                         │            │
   │   Client   │                         │   Agent    │
   │            │                         │            │
   └─────┬──────┘                         └──────┬─────┘
         │            Call is made               │
         │           with no token               │
         ├──────────────────────────────────────►│
         │                                       │
         │    ErrorClientJWTTokenNotProvided     │
         │◄──────────────────────────────────────┤
         │                                       │
         │`sessionUnlock(sessionPasswordMessage)`│
         ├──────────────────────────────────────►│
         │                                       │
         │         SessionTokenMessage           │
         │◄──────────────────────────────────────┤
         │                                       │
         │ `Session.start({ token });`           │
         ├────────────────────────┐              │
         │Session token is updated│              │
         │Token written to disk   │              │
         │◄───────────────────────┘              │
         │                                       │

```

With the state 2. valid token, GRPC calls should complete normally. 
```

  ┌────────────┐                         ┌────────────┐
  │            │                         │            │
  │   Client   │                         │   Agent    │
  │            │                         │            │
  └─────┬──────┘                         └──────┬─────┘
        │            Call is made               │
        │           with valid token            │
        ├──────────────────────────────────────►│
        │                                       │
        │           Response with new           │
        │            token metadata             │
        │◄──────────────────────────────────────┤
        │                                       │
        ├────────────────────────┐              │
        │Session token is updated│              │
        │Token written to disk   │              │
        │◄───────────────────────┘              │
        │                                       │

```

state 3.
```

   ┌────────────┐                         ┌────────────┐
   │            │                         │            │
   │   Client   │                         │   Agent    │
   │            │                         │            │
   └─────┬──────┘                         └──────┬─────┘
         │            Call is made               │
         │           with invalid token          │
         ├──────────────────────────────────────►│
         │                                       │
         │       ErrorSessionTokenInvalid        │
         │◄──────────────────────────────────────┤
         │                                       │
         │`sessionUnlock(sessionPasswordMessage)`│
         ├──────────────────────────────────────►│
         │                                       │
         │         SessionTokenMessage           │
         │◄──────────────────────────────────────┤
         │                                       │
         │ `Session.start({ token });`           │
         ├────────────────────────┐              │
         │Session token is updated│              │
         │Token written to disk   │              │
         │◄───────────────────────┘              │
         │                                       │

```

States 1 and 3 both follow the same series of steps in order to resolve the problem, and the relationships between the objects that perform these steps can be visualized as follows:
```
┌──────────────────┐
│  SessionManager  │
└──────▲───┬───────┘
       │   │
       │  3│
       │   │
┌──────┴───┴───────┐
│   PolykeyAgent   │
└──┬───┬───┬───────┘
   │   │   │
  1│   │   │
   │   │   │
┌──┴───┴───┴───────┐
│  PolykeyClient   │
└──┬───┬───┬───┬───┘
   │   │   │   │
   │  2│   │  4│
   │   │   │   │
┌──┴───┴───┴───┴───┐
│     Session      │
└──┬───────┬───┬───┘
   │       │   │
   │       │   │
   │       │   │
┌──▼───────▼───▼───┐
│   sessionFile    │
└──────────────────┘
```

1. The Agent starts up a new Client and Session in response to a CLI call. The Session checks the session file (located at `~/.polykey/client/token`) for a valid token. At this stage, either the session file is empty or the stored token is invalid.
2. The Session requests a new, valid token from the Session Manager.
3. The Session Manager returns a new token and the Session writes this to the session file and locks it.
4. When the Client finishes its command, its Session unlocks the session file and refreshes the token.

The refreshing of the token is important, as this resets the amount of time until it becomes invalid and allows subsequent CLI calls to use the token, rather than needing to wait for the Session Manager to generate a new one every time. We lock the session file during process execution in order to prevent other processes from refreshing the session token during this time. This is because the token is already guaranteed to be refreshed upon the completion of our own command. Two concurrent processes, along with the stages of locking and unlocking the session file, can be visualized as follows:
```
┌──────────────────────────────────────────┐
│               PolykeyAgent               │
└────┬────────────────────────┬────────────┘
     │                        │
    1│                       3│
     │                        │
┌────┴────────────┐      ┌────┴────────────┐
│  PolykeyClient  │      │  PolykeyClient  │
└────┬───▲───┬────┘      └────┬───▲───┬────┘
     │   │   │                │   │   │
     │   │  6│                │   │  5│
     │   │   │                │   │   │
┌────┴───┴───┴────┐      ┌────┴───┴───┴────┐
│     Session     │      │     Session     │
└────┬───┬───┬────┘      └────┬───┬───┬────┘
     │   │   │                │   │   │
     │  2│   │                │  4│   ▼
     │   │   │                │   │(locked)
┌────▼───┴───▼────────────────▼───┴────────┐
│               sessionFile                │
└──────────────────────────────────────────┘
```

1. The Agent starts up a new Client and Session in response to a CLI call. The Session checks the session file (located at `~/.polykey/client/token`) for a valid token, which is found, and locks the file.
2. The valid token from the session file is returned to the Client.
3. The Agent starts up a second Client and associated Session in response to a second, concurrent CLI call. This Session also checks the session file for a valid token (which is found) and attempts to lock the session file, however this request fails because the file is already locked. This behavior is expected and does not throw an exception.
4. The valid token from the session file is returned to the second Client.
5. When the second Client finishes its process, its Session attempts to unlock the session file, however this fails because it does not possess the lock. The session refresh attempt is dropped and the process exits cleanly.
6. When the first Client finishes its process, its Session unlocks the session file and refreshes the token.

TODO: finish this, add diagrams.


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