# Privilege Model

Agent to Client communication is privileged. It is assumed that the client is trusted.

The way the client is trusted is because:

- The client is expected to run on the same computer as where the agent is running.
- The client is expected to be run by the user who "owns" the agent's resources

The client finds the agent's port and address by the node path.

You specify the node path when running the client (either PK GUI or PK CLI).

The node path will contain the root certificate plus the agent communication details in some plaintext files/config.

And the client will read these when given the node path, and attempt connection while establishing a TLS connection with the grpc server.

This means the service provided to the clients is more powerful than the service provided to other agents.

Therefore:

```
src/proto/schemas/Agent.proto - proto describing the service provided to other agents
src/proto/schemas/Client.proto - proto describing the service provided to clients (should be bigger than the Agent.proto)
src/client - service of Client.proto
src/agent - service of Agent.proto
```
