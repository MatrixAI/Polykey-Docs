Instead we can name them:


ProxyForward - this is an HTTP CONNECT tunnel that forwards packets from grpc client to the proxy reverse

ProxyReverse - this is a transparent reverse proxy that proxies packets to the grpc server

The purpose of these 2 parts is to do a custom protocol encapsulation like using utp-native to be able to do hole punching and also relaying.
Here's what the architecture will look like for agent to agent communication:
┌─────────────┐  ┌───────────────┐    ┌───────────────┐  ┌─────────────┐
│ GRPC CLIENT ├──► PROXY FORWARD ├────► PROXY REVERSE ├──► GRPC SERVER │
└─────▲───────┘  └───────────────┘    └───────────────┘  └──────┬──────┘
      │                                                         │
   ┌──┴───┐                                                 ┌───▼──┐
   │      │                                                 │      │
   │ KN A │                                                 │ KN B │
   │      │                                                 │      │
   └──▲───┘                                                 └───┬──┘
      │                                                         │
┌─────┴───────┐  ┌───────────────┐    ┌───────────────┐  ┌──────▼──────┐
│ GRPC SERVER ◄──┤ PROXY REVERSE ◄────┤ PROXY FORWARD ◄──┤ GRPC CLIENT │
└─────────────┘  └───────────────┘    └───────────────┘  └─────────────┘
As discovered in prior experiments, the current TunnelingProxy Proof of Concept does not have a proper termination/socket closing behaviour causing bugs to the grpc side. But if we use tinyproxy, which is a robust implementation of these ideas, the grpc works well without any problems. This means we can proceed with making the grpc work without blocking or being blocked by the proxy implementation details.
One route to success is to look at tinyproxy source code, and find out how it is closing sockets, and transfer the behaviour to our JS implementation. I have found that reqs.c is where they deal with the CONNECT requests and start the whole proxy behaviour with connptr->connect_method = TRUE;.