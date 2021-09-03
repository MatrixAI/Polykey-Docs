# Sessions

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
        │ `Session.start({ token });`           │
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

TODO: finish this, add diagrams.


### Exceptions
There are two exceptions that can occur with sessions.

The first is where you atempt a GRPC call without providing the token, either via a `CallCredential` when making the call or a `ClientCredential` when starting the `GRPCClientClient` by pasing a `Session` to it. Doing so will result in an `ErrorClientJWTTokenNotProvided` error.
```ts
class ErrorClientJWTTokenNotProvided extends ErrorClient {
  description: string = 'JWT Token not provided in metadata';
  exitCode: number = 77;
}
```

The second is when a session token expires or is invalid. So when a call is made with an invalid or expired token this results in an `ErrorSessionTokenInvalid` error. There are two ways this can happen currently. The session token expires after a time or all sessions are invalidated with a  `sessions.
```ts
class ErrorSessionTokenInvalid extends ErrorSession {
  description: string = 'Invalid JWT Token, please reauthenticate.';
  exitCode: number = 65;
}
```