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

For agent to agent communication:

1. You find the Agent IP & Port in the DHT, looking up the NodeId.
2. Attempt to establish MTLS connection to the NodeId via Agent IP & Port
3. During MTLS establishment, you check if the NodeCertificate is matching the public key/NodeId (the NodeId is public key fingerprint) - this means you must hijack certificate verification chain - check that the fingerprint matches, check that the certificate was indeed signed by the public key relating to the fingerprint
4. After establishing connection, you fetch the certificate, and you update the gestalt graph

Now if it is not a direct connection. The Node Table operating as the DHT isn't giving you the actual raw IP address and Port of the node. Instead it would be asking you to connect via a Relay.