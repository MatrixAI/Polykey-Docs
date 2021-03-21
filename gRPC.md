It is possible to have 1 server listening on one socket that dispatches to multiple services.

We have 2 main services:

* Agent to Agent - `Agent.proto` - this is peer to peer (and involves communication between untrusted agents)
* Agent to Client - `Client.proto` - PK GUI, PK CLI, PK Browser Extension

Why should there be multiple services?

Currently we have `Agent.proto` and `Node.proto`, this needs to be changed:

A better name might be:

`Agent.proto` and `Client.proto`.

The main difference is that `Client.proto` must be authenticated in some way. Only trusted clients are allowed to connect to the agent.

The client has privileged access to secure resources.

Other agents do not have privileged access to secure resources. Untrusted agents can communicate to each other.

One of the major things that agents do, even when completely untrusted is synchronising the DHT.