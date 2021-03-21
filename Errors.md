There are 2 kinds of errors:

* Client Errors
* Agent Errors

```
Client -> Request -> Agent
       <- Response <- 
       <- Exception <- 
```

If it is Client Error, the client is the one that must deal with it.

This could like input validation error.

If it is an Agent Error, then the agent is the one that must deal with it.

Report an Agent Error to the client is for notification purposes.

The errors currently can be serialised as JSON.

But it should also be encoded into protobuf so it can be returned on a gRPC response.