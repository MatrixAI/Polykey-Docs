# Network

The network module establishes and maintains the network communication between a GRPC client and a GRPC server in two different keynodes. Currently, it supports direct and natted p2p connection, relay connection is yet to be developed. Additionally, the communication established using the network module is secure, through the application level TLS protocol.

Under the hood, the network module is maintaining a forward proxy for forwarding data out of the keynode, and a reverse proxy for receiving data into the keynode. All the data going out and into the keynode are secured using TLS. Some keynodes are reachable using their IP addresses directly, while many live behind some NAT devices preventing direct connections to be established. For those connections that are natted, the network module uses a nat traversal technique called hole-punch to establish a direct p2p connection. It is worth noting that all types of connection other than Symmetric NAT are supported, and the Symmetric NAT connection can be supported through relay that are yet to be implemented.

New architecture:

```
┌────────────┐ clientHost forwardHost                               forwardHost clientHost┌────────────┐
│            │ clientPort forwardPort                               forwardPort clientPort│            │
│ GRPCClient ├────────────────┐                                            ┌──────────────┤ GRPCClient │
│            │                │      ┌───────┐             ┌───────┐       │              │            │
└────────────┘                └──────►       │             │       ◄───────┘              └────────────┘
                                     │ Proxy ◄─────────────► Proxy │
┌────────────┐                ┌──────┤       │  proxyHost  │       ├───────┐              ┌────────────┐
│            │                │      └───────┘  proxyPort  └───────┘       │              │            │
│ GRPCServer ◄────────────────┘                                            └──────────────► GRPCServer │
│            │ serverHost reverseHost                               reverseHost serverHost│            │
└────────────┘ serverPort reversePort                               reversePort serverPort└────────────┘
```

Where you can get connection information.

```
       getConnectionInfoByClient
                   │
                   │
                   │
                   │
                   ▼
┌────────────┐ clientHost forwardHost                               forwardHost clientHost┌────────────┐
│            │ clientPort forwardPort                               forwardPort clientPort│            │
│ GRPCClient ├────────────────┐                                            ┌──────────────┤ GRPCClient │
│            │                │      ┌───────┐             ┌───────┐       │              │            │
└────────────┘                └──────►       │             │       ◄───────┘              └────────────┘
                                     │ Proxy ◄─────────────► Proxy │
┌────────────┐                ┌──────┤       │  proxyHost  │       ├───────┐              ┌────────────┐
│            │                │      └───────┘  proxyPort  └───────┘       │              │            │
│ GRPCServer ◄────────────────┘                     ▲                      └──────────────► GRPCServer │
│            │ serverHost reverseHost               │               reverseHost serverHost│            │
└────────────┘ serverPort reversePort               │               reversePort serverPort└────────────┘
                                                    │                    ▲
                                                    │                    │
                                        getConnectionInfoByProxy         │
                                                                         │
                                                                         │
                                                             getConnectionInfoByReverse
```

---

# Network Architecture

Each keynode contains two networking components:

1. Forward Proxy
2. Reverse Proxy

The purpose of a forward proxy is forwarding data from GRPC Client to a remote GRPC server, whereas the purpose of a reverse proxy is forwarding data from a remote GRPC Client to a local GRPC server. The architecture is shown below.

![architecture0](https://user-images.githubusercontent.com/38675169/120810705-9de52480-c58e-11eb-8c0a-8d49486a74b5.jpg)

Within the architecture, the GRPC client, forward proxy, reverse proxy, and GRPC server instance persist over multiple GRPC calls, meaning you can reuse the communication channel.

The GRPC client uses an HTTP Connect request to acquire a TCP socket for channelling GRPC data to forward proxy. Then, the forward proxy establishes an UTP socket with TLS encryption to the reverse proxy for channelling the GRPC data from the forward proxy to the reverse proxy. Lastly, another TCP socket is established between the reverse proxy and GRPC server for channelling GRPC data from the reverse proxy to the GRPC server.

The GRPC client is aware of the existence of the forward proxy, whereas the GRPC server is not aware of any proxies. Therefore, once the connection is fully established, the GRPC client and server works just like they are directly connected with each other and no proxies forwarding data in between. Additionally, the TCP connection between the GRPC client and Forward proxy, and the GRPC server and the reverse proxy are not encrypted, only the UTP connection between the two proxies are encrypted.

There is another UTP channel for out of band communications between the two proxies, and it is used for sending hole-punch and keep-alive messages. This out of band channel is similar to UDP datagrams in a sense that it is unreliable, and not connection oriented. However, it enables the establishment of peer to peer natted connections.

The egress and ingress host and port are used for communication between the proxies, the public address of them are unknown to themselves but will be known by the receiving party due to NAT translation.

## Communication Mechanism

The communication mechanism of the network module is shown below.

![sequence0](https://user-images.githubusercontent.com/38675169/120810769-accbd700-c58e-11eb-8dd0-26b06e321553.jpg)

The HTTP Connect requests a TCP socket between the GRPC client and forward proxy, and the TCP connection establishment happens immediately after the request.

Once the forward proxy receives the HTTP Connect request, the forward proxy starts hole-punching using the Ping and Pong messages and starts UTP connection establishment at the same time.

Once the connection between the proxies are punched and connected, the reverse proxy establishes a TCP connection with the GRPC server.

Some time after the establishments, the socket composition happens, which pipes the data from one socket into another, allowing data to pass through.

Finally, forward sends a connection established response to the client indicating the connection to the GRPC server is successfully established and data can be sent through the socket.

To keep the connection alive, which is especially important for the natted ones, as NAT and firewalls forget the connection after a short period of time, the Ping and Pong messages are sent periodically to keep the connection open.

# Hole Punch

Hole punch is a NAT traversal technique used for establishing a direct connection between two keynodes where at least one keynodes are behind the NAT.

The idea of hole punching is simple, all it does is coordinating both keynodes to start sending UDP packets to each other's public IP and port at roughly the same time. This would implicitly alters NAT's firewall rules and allows direct communication to happen.

Once hole punch is completed successfully, a periodic UDP packet should be sent from both sides to keep the connection (or rather, the altered firewall rules) alive.

A simple scenario is shown below where the keynode A and B are behind a NAT, and the firewall in the NATs disallow any incoming packets.

![Punch1](https://user-images.githubusercontent.com/38675169/116488183-12181280-a8d5-11eb-8e3c-8ae1c48c61ae.png)

If keynode A is the one that send the first hole punch packet to keynode B, this packet would not be allowed into B's NAT due to the firewall rule. However, since A's firewall saw a packet going out to B, it is expecting packets coming back from B, and tempororily allows B's incoming packets.

![Punch2](https://user-images.githubusercontent.com/38675169/116488201-1e9c6b00-a8d5-11eb-9c9a-d5905725f500.png)

Then, the keynode B also sends a hole punch packet to keynode A, this packet would be allowed into A's NAT due to the altered firewall rules. Also noted that B's NAT also allows A's incoming packet for the same reason as above.

![Punch3](https://user-images.githubusercontent.com/38675169/116488202-1fcd9800-a8d5-11eb-85dd-55c5b6b9b018.png)

At this point, the connection is considered to be established. And subsequent packets are allowed in and out of both keynodes.

![Punch4](https://user-images.githubusercontent.com/38675169/116488203-20662e80-a8d5-11eb-8ec8-0dacd185d4f0.png)

The catch is that the firewall rules are temporary, which means the rules would be deleted if it sees no packets flowing between the two keynodes after a certain period of time, typically 30 seconds. Therefore , there needs to be a keep alive packet sent from both sides periodically to keep the connection alive.

For hole punch to work, following conditions must be satified:

1. All the NAT involved must be either a Full-Cone, Port Restricted, or Address Restricted NAT. Symmetric NAT cannot be punched.
2. Both sides must be punching at roughly the same time.
3. Knowing the `public` IP address and port of both sides.

This whole hole punching process is part of the NAT connection management included in Forward and Reverse proxy.

# Unidirectional Communication

If you want GRPC clients making requests from keynode A to keynode B ONLY, then you just need to add a connection in A's forward proxy (and B's reverse proxy if natted). With this setup, keynode B's client cannot contact A's GRPC server.

Note that the response of the GRPC request can be transferred back from B to A. You just cannot initate a request from B to A.

# Bidirectional Communication

If you want GRPC clients in keynode A and B making requests to each other. You need to perform two unidirectional commuinication establishment, one from A's forward proxy, the other from B's forward proxy.

# Limitations

Due to the lack of relaying services, the network module only allows direct connection and hole punchable connections. Any other connections such as the Symetric NAT scenario cannot be connected.

There is not yet a way to notify the caller in the case where a connection failed to be kept alive, or timed out.

# Improvements

We can separate the networking to 3 layers:

- P2P application layer
- RPC layer
- Data Transfer layer

Right now these are:

- Kademlia & Automerge and Nodes Domain
- GRPC
- UTP - micro transport protocol (using UDP)

It is ideal to have these 3 layers separated so that it is possible innovate on them separately. So in the future, it may be possible to do instead:

- P2P - Kademlia/Automerge.. whatever
- RPC - JSONRPC or whatever
- Data Transfer - QUIC, Wireguard, both are based on UDP (wireguard in userspace would be relevant too)

There are some constraints on relevant protocols/libraries:

- For the Data Transfer it must be capable of NAT-busting which means it must be on UDP and we must be able to craft signalling packets to bust NAT, it must also work in user-space and be compatible on Linux, Windows, Unix, iOS and Android, the data transfer layer requires security as well, so TLS could work on top if it doesn't have it, or wireguard has native security, we must have control over the underlying IPs so we can relay it over relay servers to really bust NAT, must support IPv6... etc.
- For the RPC layer it must either not specify the network like JSON RPC, or if it does, it must be proxyable like GRPC, if proxyable it must be plaintext possible, so that the security can be injected at a lower layer. It should also support streaming beyond just unary.
- For the P2P layer they must be done as in-memory functions, that can we translate to RPC commands, they must not specify a particular network protocol at all

As you can see there's alot of constraints which narrows down choices. The most generic stack possible would be:

- QUIC/UTP/Wireguard - data transfer layer, wireguard may be difficult unless you can control it as a library
- JSON-RPC
- Custom on top

## NAT Traversal

STUN references:

- https://tools.ietf.org/html/rfc8489
- https://tailscale.com/blog/how-nat-traversal-works/

TURN reference:

- https://tools.ietf.org/html/rfc8656

---

Current situation is:

1. We have tested TURN
2. We have not implemented ALL of TURN (this is because all of TURN is not necessary for us)
3. We have not tested STUN
4. We have not implemented ALL of STUN
5. The TURN relay/STUN MAY/(MOST LIKELY) is using uTP/MTP (which itself is running on UDP)

References:

- https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/84

---

Example implementation of STUN and TURN:

- https://github.com/coturn/coturn
- https://www.rtcsec.com/post/2020/04/how-we-abused-slacks-turn-servers-to-gain-access-to-internal-services/

# Network Module

## Initialisation.

To initialise the network module, the caller must provides a way to:

1. Get a list of existing nodes.
2. Get information of a specific peer node.
3. Update a specific peer node.
4. Connect to a specific peer node.
5. Get information of this node.
6. Get private key.
7. Get a logger.

## Capabilities

Once the network module is initialised, it offers two capabilities:

1. `Start` Networking
2. `Stop` Networking

`Stop` must be called after `Start` to correctly release resources allcoated.

## Start Networking

Start a `uTP` server listening at address `0.0.0.0:1315`. Note that this could be on any port, specified ahead of launch in the config.

Once the address and port are successfully binded and listening has started, start the `NAT Traversal Service` on the socket that the `uTP` server is using.

## Stop Networking

Stop `NAT Traversal Service`.

Stop `uTP` server.

Close each established `Socket Pipe`.

Reset the record of established `Socket Pipe`.

## Incoming Connection Handler

When a new `uTP` connection is established, create a `TCP Socket Pipe` using that `uTP` connection.

Add it to a record of established `Socket Pipes` so we can refer to it later.

## Get UDP Address

From `Nat Traversal Service`, get the actual public IP address that the peer is using.

# `uTP` Server

It is a wrapper around a `socket`, also keeps a record of incoming connection.

It takes an incoming connection handler, as described above, which is called on each incoming connection.

---

# NAT Traversal Testing

We can test our NAT Traversal by simulating various NAT architectures using linux network namespaces and netfilter rules (using `nftables`). A private network can be simulated using two network namespaces - one for the clients (where we run our test Polykey Agents) and one for the router. If two Agents on two separate simulated private networks can send hole punching packets to each other, then we have defeated the NAT architecture implemented on each of the two routers.

The `nftables` rules for simulating different NAT architectures are as follows:

All of the below commands share the following values:

- `AGENT_HOST` = proxy host of the agent behind NAT
- `AGENT_PORT` = proxy port of the agent behind NAT
- `ROUTER_EXT` = name of the outfacing interface on the router the agent is behind (for connecting to servers)
- `ROUTER_EXT_IP` = ip address of the outfacing interface on the router
- `DMZ_PORT` = port on the router for sending packets to the DMZ

## DMZ (no NAT)

```
nft add table ip nat
nft "add chain ip nat prerouting { type nat hook prerouting priority -100 ; }"
nft "add chain ip nat postrouting { type nat hook postrouting priority 100 ; }"
nft add rule ip nat postrouting ip protocol udp ip saddr $AGENT_HOST meta oif $ROUTER_EXT snat to "${ROUTER_EXT_IP}:${DMZ_PORT}"
nft add rule ip nat prerouting udp dport $DMZ_PORT meta iif $ROUTER_EXT dnat to "${AGENT_HOST}:${AGENT_PORT}"
```

## Port-Restrited Cone NAT (endpoint-independent NAT)

```
nft add table ip nat
nft "add chain ip nat prerouting { type nat hook prerouting priority -100 ; }"
nft "add chain ip nat postrouting { type nat hook postrouting priority 100 ; }"
nft add rule ip nat postrouting meta oif $ROUTER_EXT masquerade persistent
```

## Symmetric NAT (endpoint-dependent NAT)

```
nft add table ip nat
nft "add chain ip nat prerouting { type nat hook prerouting priority -100 ; }"
nft "add chain ip nat postrouting { type nat hook postrouting priority 100 ; }"
nft add rule ip nat postrouting meta oif $ROUTER_EXT masquerade random
```
