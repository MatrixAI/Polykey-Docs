# Sessions

### Usage
Here is an outline of how sessions is used.
 
When a client is started, it starts the `Session` object. this handles the current session token. It does three things, holds the current token, reads the token for the current session from the disk if it exists and writes a new tokens to the disk. it also provides a method to generate call credentials. 

These credentials are necessary when making a GRPC call. it can be used in two ways. the `Session` object can be provided when starting a `GRPCClientClient`. the client uses the `Session.sessionMetadataGenerator` for the `CallCredentials` when starting a client connection. this automatically provides the required metadata when making each call. The other method is using the providing the `CallCredentials` with each GRPC call by using `GRPCClient.someRandomCall(message, await session.createCallCredentials())`

The `CallCredentials` provided by the Session ensures that `Authorization: 'Bearer: {token}'` is provided in the `Metadata` of the GRPC call. This metadata is used by the agent to verify that the call was made by an authorised session.

If the token is missing or expired, then the agent will respond with an error. An `ErrorClientJWTTokenNotProvided` if the token is missing from the metadata. Or an `ErrorSessionTokenInvalid` error if the token has expired or been invalidated by an `agent lockall` command.

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