There are 2 kinds of errors:

* Client Errors "caller errors" "400 errors" - errors that originate from the client
* Agent Errors "500 errors" - errors that originate from within the agent

It's important to understand that other Agents talking to your Agent, can still create a Client Error.

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

---

For Client to Agent communication, both Client Errors and Agent Errors are communicated.

For Agent to Agent communication, because it can be untrusted, only a limited set of errors are communicated. Primarily client errors.

You don't want to leak information.