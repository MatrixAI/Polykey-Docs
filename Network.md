# Keynode Architecture

Each keynode contains two networking components:

1. Forward Proxy
2. Reverse Proxy

The purpose of a forward proxy is forwarding data from GRPC Client to a remote GRPC server. Whereas the purpose of a reverse proxy is forwarding data from a remote GRPC Client to a local GRPC server. The architecture is shown below.

![NetworkArchitecture1](https://user-images.githubusercontent.com/38675169/116488112-eeed6300-a8d4-11eb-8a6f-73c0d724f9c0.png)

In this architecture, the GRPC server, forward proxy, and reverse proxy instance persists over multiple RPC calls, whereas a new GRPC client instance is created for each RPC call. The implication of this is you can reuse the GRPC Server, Forward Proxy (and its sockets), Reverse Proxy (and its sockets) as many times as you want. And all GRPC client need to know is there exists a forward proxy that it should send data to.

The forward proxy always has an HTTP server and an uTP (Micro Transport Protocol) socket listening, a socket TCP socket may be opened for each outgoing GRPC client call. Similarly, the reverse proxy always has an uTP socket listening, and a new TCP socket may be opened for each incoming GRPC client call.


# Communication Mechanism

Conceptually, when a GRPC client want to communicate with a remote GRPC server, the following process would happen:

![NetworkArchitecture3](https://user-images.githubusercontent.com/38675169/116488143-02003300-a8d5-11eb-9acb-992e3c8b512f.png)

First, the GRPC client indicates its will to communicate with another GRPC server by sending an HTTP `CONNECT` request to the forward proxy. The HTTP `CONNECT` request doesn't carry the actual payload of the GRPC request but some important information such that the forward proxy knows how to forward the actual GRPC payload to where the client wanted. The information contains an authentication token and a directly connectable address and port of the remote reverse proxy. (More on directly connectable address and port later.)

Along with the HTTP `CONNECT` request, a new TCP socket between the GRPC client and forward proxy is established, and this is where the grpc payload would be transferred from client to forward proxy.

Once the forward proxy received the HTTP `CONNECT` request and necessary information, it would attempt to connect to the remote reverse proxy through an uTP socket, which is essentially a UDP socket but provides reliable packet delivery. It's important to keep in mind that the forward proxy doesn't forward data immediately after the uTP socket has been established, it waits until the remote reverse proxy acknowledged the communication with the server is established.

Then, the reverse proxy realises a new uTP connection has been established, so it creates a new TCP socket between the GRPC server and itself, pipe data between the uTP (from forward proxy) and TCP socket, acknowledge the communication has been established, and forward proxy starts forwarding data. As a result, the GRPC client can communicate with the GRPC server now.


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


# Directly Connectable

The most simple form of a directly connectable address and port is one that can be directly connected. (Yes.) That means you can connect to the server at the address and port without doing anything special.

Another form of a directly connectable address and port is the HOLE PUNCHED address and port. If a connection cannot be connected directly, that may be because there's NAT involve, and it is not directly connectable. However, if we successfully hole punched the address and port, and keep the connection alive by sending keep alive packets, then we say the connection is directly connectable.

We intend to add relay connection in the future to accomodate situations where address and port cannot be connected directly nor can be hole punched.

# Forward Proxy Usage

Keep in mind that the forward proxy interacts with the GRPC client. When a client wants to send a request to GRPC server, it needs to send it through the forward proxy. You can tell GRPC client to use the forward proxy by setting the environment variable. Read on.

To start a forward proxy, you need to provide an authentication token of type string. This is a token for GRPC client to access the forward proxy, and block anyone who doesn't hold a valid token.

Once a forward proxy is `started`, the first thing you should be doing is setting the environment variables for GRPC clients as follows:

```javascript
const proxyAuthToken = 'yoasobi';
const proxyPort = fwProxy.getHttpPort(); // not .getSocketPort()
process.env["grpc_proxy"] = `http://${proxyAuthToken}@${fwAddress}:${proxyPort}`;
```

After the environment variable is set, you need to manage your directly connectable addresses through the forward proxy. It's **important** to keep in mind that for a GRPC client to send a request to the remote GRPC server successfully, the **public IP address of the remote reverse proxy associated with the remote GRPC server must be added to the connection tracker in the forward proxy**. 

There are two situations for adding the connection:

1. If the connection can be connected directly, add a direct connection in the forward proxy only.
2. If the connection needs to be hole punched, add a NAT connection in the forward proxy, and ensure the remote reverse proxy is also adding a NAT connection to the forward proxy at the same time.

Verify your understanding with the diagram below. If keynode A's GRPC client want to contact Keynode B and C's GRPC server. Then A's forward proxy needs to add the address of reverse proxy of both GRPC servers to the connection tracker. But only keynode B's reverse proxy need to add A's forward proxy to its connection tracker as A and B are natted to each other.

![ConnTrack](https://user-images.githubusercontent.com/38675169/116488241-383db280-a8d5-11eb-9e4d-d4f4edb3e75a.png)

Additionally, if you no longer need to make any more requests to the GRPC Server, or you just want to disconnect from it, you can remove the connection from the forward proxy (and reverse proxy if NATTED).

Finally, you can close the forward proxy and it stops maintaining any natted connections, and termiante the socket.


# Reverse Proxy Usage

Reverse proxy interacts with the GRPC server and the goal of the reverse proxy is forward incoming packets from forward proxy to the GRPC server.

Reverse proxy can be instatiated straightaway without providing anything special.

You can start the reverse proxy by providing the local address and port of the GRPC server so that it can forward data to.

If a forward proxy wants to connect to this reverse proxy, you need to add a NAT connection to the connection tracker as described in the forward proxy above.


# Unidirectional Communication

If you want GRPC clients making requests from keynode A to keynode B ONLY, then you just need to add a connection in A's forward proxy (and B's reverse proxy if natted). With this setup, keynode B's client cannot contact A's GRPC server.

Note that the response of the GRPC request can be transferred back from B to A. You just cannot initate a request from B to A.


# Bidirectional Communication

If you want GRPC clients in keynode A and B making requests to each other. You need to perform two unidirectional commuinication establishment, one from A's forward proxy, the other from B's forward proxy.


# Limitations

Due to the lack of relaying services, the network module only allows direct connection and hole punchable connections. Any other connections such as the Symetric NAT scenario cannot be connected.

There is not yet a way to notify the caller in the case where a connection failed to be kept alive, or timed out.