# bootstrap

A live keynode is a live process known as a PolyKey Agent process. A dead
keynode consists of only the keynode state stored at the node path.

When launching the Polykey Agent, the node goes into a bootstrapping phase. This
is where it constructs the keynode state. The keynode state is also known as the
node path. This can exist in your operating system's user profile data.

On Linux this would be `~/.local/share/polykey`. However you can select the
exact location of the node path, it can be anywhere.

This location is where all the vault state, networking state, discovery state
will be stored.

If the node detects that the node state is already initialised, and it is not
corrupted, then it will attempt to unseal the node state by asking the user for
the root password for the root key.

If the node state has not been initialised, then the first thing that a node
will do is to generate a root certificate and the root key consisting the root
public key and root private key.

The root private key needs to be password protected. The user must supply the
root password in order to encrypt the root public key.

The root certificate is an X.509 certificate. This certificate will serve as the
secure digital identity of the keynode.

The root public key which is encoded in the root certificate is the globally
unique identity of the keynode. This is known as the node ID. The node ID is
used to identify the node in the peer to peer distributed hash table .

Our current root keys are RSA keys. Eventually we will move to using Ed25519 keys.
Because our current root keys are RSA keys, they are very long. Our node IDs are
therefore MD5 hashes of the PEM-encoded RSA public key. This is temporary until
we have integrated Ed25519 keys, and our node IDs will be much shorter.

Note that current modern websites tend to use ECDSA root keys, this is similar to
Ed25519, but we will be looking to use Ed22519 instead of ECDSA in the future.

Here are some examples.

RSA:

```
        Subject Public Key Info:
            Public Key Algorithm: RSA
                Public-Key: (4096 bit)
                Modulus:
                    b7:5b:b2:ca:29:f3:5b:21:b4:6a:d0:ec:42:d2:d6:
                    b4:ce:73:69:38:cc:60:49:03:c5:d4:e0:64:9f:bb:
                    f8:05:d0:26:f8:c2:bd:18:73:62:b6:ac:e5:b3:04:
                    d4:31:0a:1b:19:7e:e8:2c:f1:01:0b:e1:48:dd:cc:
                    37:44:ec:fc:85:6e:c5:51:78:1b:f7:58:c5:29:f9:
                    b4:5a:65:73:0c:c7:d2:a0:e5:88:b6:38:c0:e2:f1:
                    c3:2b:55:74:ce:ec:a0:63:e3:11:2f:02:b4:e4:e6:
                    0a:5b:ab:83:8d:b7:e2:86:9c:06:54:5b:e8:13:75:
                    26:57:8d:e6:a5:49:dc:a4:1a:48:b4:13:b3:56:27:
                    19:76:96:b0:95:4d:da:a8:c4:d6:33:e3:eb:8c:34:
                    af:b7:b9:41:a6:5d:52:25:44:9a:68:83:0a:29:2f:
                    5d:5d:86:55:6c:31:d4:f5:06:ff:c4:ab:cf:af:67:
                    cb:d2:ea:3b:c3:2d:0f:cd:72:c5:8c:4d:93:24:10:
                    77:4e:48:59:98:b9:91:d9:59:3e:4e:5a:53:6e:27:
                    e2:98:1a:78:35:47:f2:cb:3f:a4:14:ad:c0:a0:fd:
                    4d:fb:b4:aa:e6:66:05:49:ef:45:a0:0d:52:b1:09:
                    c7:40:76:85:af:b1:d0:7a:39:66:24:86:2c:49:fa:
                    40:2f:98:af:91:ca:0d:6a:58:ef:7d:4b:3f:cd:f9:
                    60:15:37:59:10:5c:e2:4a:c3:18:1d:ad:a9:b4:38:
                    53:77:4f:48:ae:e4:e0:0a:27:e9:84:b0:cf:5e:6d:
                    5c:30:61:b0:fa:c4:1d:33:d5:1b:13:0f:5a:c7:3a:
                    d6:27:a3:da:bf:fb:bd:31:74:5f:8a:be:eb:02:c4:
                    a8:b6:b4:64:c6:b0:43:9e:83:08:51:9d:81:30:0f:
                    6c:5a:3e:cd:2c:1c:87:35:33:61:b2:d4:65:d9:b1:
                    f2:28:71:8b:9c:ca:45:ae:53:6b:dd:9a:a6:77:af:
                    56:84:79:65:10:6d:d0:f2:e0:8c:fa:d1:6f:57:e7:
                    26:c0:e9:30:f6:34:61:b4:86:36:8b:5b:4e:47:2d:
                    50:0d:dd:4e:8c:5d:5c:49:6e:2a:71:7c:d8:5d:8b:
                    ab:46:73:ed:64:df:9b:3a:7d:11:92:e7:9f:da:9d:
                    13:c0:86:2c:ef:83:63:76:95:12:c3:0d:a8:f9:e6:
                    75:a4:df:60:86:98:5d:85:14:a7:0f:d2:b2:20:05:
                    53:27:b0:d7:89:c2:a4:0e:4f:20:1c:89:02:ee:06:
                    ff:ac:11:5b:30:a4:bd:35:cd:9a:6a:4f:c4:2c:01:
                    56:58:94:e6:ca:30:3b:bf:14:6d:60:d7:90:02:98:
                    04:79
                Exponent: 65537 (0x10001)
```

ECDSA:

```
        Subject Public Key Info:
            Public Key Algorithm: ECDSA
                Public-Key: (256 bit)
                X:
                    de:db:39:24:5f:4d:61:ed:2e:9b:2f:89:2c:9d:2e:
                    7b:9d:56:28:3c:2e:4f:eb:71:cf:41:08:39:b8:25:
                    e1:5a
                Y:
                    17:5d:2c:b9:e5:de:f9:e9:5e:17:02:8d:d3:e6:a7:
                    a4:b4:25:42:c4:a9:8e:13:4b:4d:0a:50:35:6e:6f:
                    67:b3
                Curve: P-256
```

The root key is used to generate and encrypt symmetric vault keys. The vault
keys will be used to encrypt the vault filesystems.

After the root certificate, root keys are generated, and initial state
directories are generated, the node enters the network bootstrapping phase.

This means it will start a gRPC server listening on `0.0.0.0:1314`. This gRPC
server is how the Polykey CLI and Polykey GUI and Polykey Browser Extension will
communicate with the Polykey Agent.

It will also start an uTP server on `0.0.0.0:1314` over UDP for NAT traversal.

It will also start an HTTP 1.1 server on `0.0.0.0:1315` for HTTP integration.

All keynodes are preconfigured to trust and contact the bootstrap keynode
`bootstrap.polykey.com`. This in the future will likely be load balanced via
both DNS load balancing and also TCP/UDP load balancing.

The `bootstrap.polykey.com` is itself a Polykey keynode. This node is maintained
by the official Polykey team. This nodes serves 3 duties:

1. P2P DHT synchronisation to allow globally decentralised nodes to share their node table information
2. STUN NAT traversal - to faciliate direct P2P connections between compatible nodes
3. TURN Relay NAT traversal - to facilitate proxied P2P connections between incompatible nodes

The first duty is the most important one. Without the `bootstrap.polykey.com`, it
is not possible for nodes that are on separate subnets to discover each other.

Users are able to run their own "bootstrap nodes". Corporate networks can run
their own bootstrap nodes. You can override the bootstrap node configuration to
point to other bootstrap nodes. You can pay us to run bootstrap nodes.

The second and third duties are much more process intensive and is there to
allow users of PolyKey to bust through NATs. NATs were developed to get around
the limited amount of IPv4 addresses available. With IPv6 they are now
considered obsolete. Some corporate networks may still use NATs as a
rudimentary firewall. In the future, PolyKey will fully support IPv6 and the
need for STUN or TURN NAT busting will be lessened.

At this point the node is setup and fully operational. It is time to create
vaults, put secrets into them, discover your friends and enemies, and share
your vaults with them.
