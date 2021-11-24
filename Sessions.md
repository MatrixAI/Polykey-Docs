
### Usage
Here is an outline of how sessions is used.
 
#### Starting a session
When a client is started, it starts the `Session` object. this handles the current session token. It does three things, holds the current token, reads the token for the current session from the disk if it exists and writes a new tokens to the disk. it also provides a method to generate call credentials. 

The Session is instantiated with `new Session({clientPath, logger, fs});`. The `clientPath` is used to find the Session file. There are two ways of starting the session. With `session.start({});` or `session.start({ token });` If a token is not provided it will attempt to read a token from the `clientPath` directory. 

At this stage the Session can be started with 3 possible states.
1. Session started with no token.
2. Session started with a valid token.
3. Session started with an invalid token.


States 1. and 3. will cause an exception when attempting to make a GRPC call. State 1. will cause an `ErrorClientJWTTokenNotProvided`. see [Exceptions](#Exceptions) for more details. State 3. will cause the agent to reply with an `ErrorSessionTokenInvalid` exception through the GRPC.


#### CallCredentials

These credentials are necessary when making a GRPC call. it can be used in two ways. the `Session` object can be provided when starting a `GRPCClientClient`. the client uses the `Session.sessionMetadataGenerator` for the `CallCredentials` when starting a client connection. this automatically provides the required metadata when making each call. The other method is using the providing the `CallCredentials` with each GRPC call by using `GRPCClient.someRandomCall(message, await session.createCallCredentials())`

The `CallCredentials` provided by the Session ensures that `Authorization: 'Bearer: {token}'` is provided in the `Metadata` of the GRPC call. This metadata is used by the agent to verify that the call was made by an authorised session.

If the token is missing or expired, then the agent will respond with an error. An `ErrorClientJWTTokenNotProvided` if the token is missing from the metadata. Or an `ErrorSessionTokenInvalid` error if the token has expired or been invalidated by an `agent lockall` command.

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