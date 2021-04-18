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

---
The proposed communication architecture of all the PK projects are:

1. PK CLI grpc-js <=> PK Agent grpc-js
2. PK GUI (Electron) IPC <=> Node grpc-js <=> PK Agent grpc-js
3. PK Mobile (NativeScript) integrated PK as a library, no IPC
4. PK Browser Extension grpc-web <=> Proxy grpc-web <=> PK Agent grpc-js

Currently we have only implemented 1. and 2. This is the easiest because they
are both using Node.js. And in the case of Electron, there's the Node.js 
process is acting as a proxy between the browser and the agent.

Now let's see what it means to involve grpc-web...

grpc-js is TypeScript implementaion of gRPC for Node.js

There are 2 live concurrent projects called grpc-web. This provides the ability
for browsers to also use gRPC. This is because browsers do not provide raw 
socket access. Therefore grpc-web is about proxying grpc requests and responses
over existing HTTP APIs like HTTP1.1 or HTTP2.

To use grpc-web, we need a proxy to convert grpc-web requests into native grpc 
requests, and also convert native grpc responses to grpc-web responses. I'm not
sure if grpc-web allows the browser to act as a srever.

The grpc-web implemented by google is suggesting to use envoy as a proxy. This
is separate process that is written in golang. My understanding is this was 
intended for SaaS like applications.

The grpc community has expressed a need to eventually have in-process proxies,
for example, imagine that grpc-js could run a grpc-web proxy, and thus it can
do this conversion work all in 1 process, instead of needing another process.

In addition to this, I have noticed that our PK GUI (Electron) is already 
performing a proxy functionality by converting electron IPC communication to
grpc communication to the PK agent.

Integrating one of the grpc-web will allow us to potentially:

1. Enable direct gRPC communication between the PK Browser Extension and the PK Agent
2. Remove the intermediate proxy in PK GUI (Electron), and directly communicate between the renderer process and the PK agent process over gRPC

There is an extra maintenance cost here. It means we need to run a grpc-web 
proxy. Currently there is no in-process proxy build for Nodejs. Ideally, this 
would be integrated into grpc-js, so we could use 1 single library to all of 
this. But both projects of grpc-web currently require an extra process to do the
proxy work.

What are the alternatives? An alternative is to not use grpc-web, but use ad-hoc
proxies to convert to grpc-js. Currently PK GUI (Electron) does this by the 
intermediate node process which converts electron IPC to gRPC. For the planned 
browser extension, there is the existing browser APIs (fetch/XHR), and also an 
extension specific native messaging which relies on STDIN and STDOUT streams.

None of this is easy. We know the ideal would be to use grpc-js that had 
in-process grpc-web integration, but this doesn't exist.

This would be ideal:

1. PK CLI grpc-js <=> PK Agent grpc-js
2. PK GUI (Electron) grpc-web <=> PK Agent grpc-js
3. PK Mobile (NativeScript) integrated PK as a library, no IPC
4. PK Browser Extension grpc-web <=> PK Agent grpc-js

How much effort would it be to bring grpc-web proxy functionality into NodeJS?

It would mean taking this https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy and reimplementing it for NodeJS.

One way to quickly test this out, is to use grpc-web and find out which proxy is the easiest to run. If we were to distribute this, we would need to compile this for the relevant architectures within Electron, but that itself may be complex.

One possible solution is to keep using our own adhoc proxies, and wait until there's a proper in-process grpc-web proxy for NodeJS and migrate to that when it is ready.

Resources:

* https://grpc.io/blog/state-of-grpc-web/
* https://github.com/grpc/grpc-web/blob/master/doc/in-process-proxy.md
