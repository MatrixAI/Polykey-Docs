TBD NAT Traversal

STUN references:

* https://tools.ietf.org/html/rfc8489
* https://tailscale.com/blog/how-nat-traversal-works/

TURN reference:

* https://tools.ietf.org/html/rfc8656

---

Current situation is:

1. We have tested TURN
2. We have not implemented ALL of TURN (this is because all of TURN is not necessary for us)
3. We have not tested STUN
4. We have not implemented ALL of STUN
5. The TURN relay/STUN MAY/(MOST LIKELY) is using uTP/MTP (which itself is running on UDP)

References:

* https://gitlab.com/MatrixAI/Engineering/Polykey/js-polykey/-/merge_requests/84

---

Example implementation of STUN and TURN:

* https://github.com/coturn/coturn
* https://www.rtcsec.com/post/2020/04/how-we-abused-slacks-turn-servers-to-gain-access-to-internal-services/


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