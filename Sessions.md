# Sessions

### Usage
Here is an outline of how sessions is used.
 TODO: finish this.


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