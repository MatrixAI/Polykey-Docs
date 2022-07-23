This entry refers to the errors that Polykey may encounter, whether they be internal or external.

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

Reporting an Agent Error to the client is for notification purposes, akin to when you visit a website and it gives you a `502` error, informing you that something has happened internally in the server.

The errors currently can be serialised as JSON but can also be encoded into protobuf so it can be returned on a gRPC response.

---
## Security concerns

For Client to Agent communication, both Client Errors and Agent Errors are communicated.

For Agent to Agent communication, because it can be untrusted, only a limited set of errors are communicated. Primarily client errors.

You don't want to leak information.

---

## Encoding into Protobuf

In `protobuf`, there exists the `oneof` operator. This allows for message definitions such as:
```proto
message SuccessMessage {
  string rsp = 1;
}

message ErrorMessage {
  string name = 1;
  string message = 2;
  string data = 3;
  string stack = 4;
}

message ResponseMessage {
  oneof response {
    SuccessMessage message = 1;
    ErrorMessage error = 2;
  }
}
```

This can be used as such:

```ts
mygrpcmethod: handleUnaryCall<RequestMessage, ResponseMessage> = (
  call: grpc.ServerUnaryCall<RequestMessage, ResponseMessage>,
  callback: grpc.sendUnaryData<ResponseMessage>
) => {
  console.log(call.request);
  try {
    const response = new ResponseMessage();
    const success = new SuccessMessage();
    success.setRsp("Response!!!!!!");
    response.setMessage(success);
    callback(null, response);
  } catch (error) {
    if (error instanceof MyError) {
        const errorMsg = new ErrorMessage();
        response.setError(errorMsg);
        callback(null, errorMsg);
    } else {
      callback(error, null)
    }
  }
}
```