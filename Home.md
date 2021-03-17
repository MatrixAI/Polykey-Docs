PolyKey is decentralised distributed peer to peer (P2P) secret sharing & secret
management system. It is intended to be used by both humans and machines.
It synthesise a unified workflow between interctive password management and
infrastructure key management.

This project PolyKey (library) is the core library for running PolyKey. It
provides a CLI `polykey` or `pk` for interacting with the PolyKey system. The
main desktop GUI is located at https://github.com/MatrixAI/PolyKey.

PolyKey involves running distributed keynodes, which we will refer to as "nodes".
A host system can run multiple nodes. Each node manages one or more vaults which
are encrypted filesystems with automatic version history. You can share these
vaults with other users of PolyKey who are running their own keynodes.

## Bootstrapping

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

The root certficate is an X.509 certificate. This certificate will serve as the
secure digital identity of the keynode.

The root public key which is encoded in the root certificate is the globally
unique identity of the keynode. This is known as the node ID. The node ID is
used to identify the node in the peer to peer distributed hash table (DHT).

Our current root keys are RSA keys. Eventually we will move to using Ed25519 keys.
Because our current root keys are RSA keys, they are very long. Our node IDs are
therefore MD5 hashes of the PEM-encoded RSA public key. This is temporary until
 we have integrated Ed25519 keys, and our node IDs will be much shorter.

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
`bootstrap.polykey.io`. This in the future will likely be load balanced via
both DNS load balancing and also TCP/UDP load balancing.

The `bootstrap.polykey.io` is itself a Polykey keynode. This node is maintained
by the official Polykey team. This nodes serves 3 duties:

1. P2P DHT synchronisation to allow globally decentralised nodes to share their node table information
2. STUN NAT traversal - to faciliate direct P2P connections between compatible nodes
3. TURN Relay NAT traversal - to facilitate proxied P2P connections between incompatible nodes

The first duty is the most important one. Without the `bootstrap.polykey.io`, it
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

## Vaults

Each vault is encrypted with a vault key. The vault keys themselves are protected by
the root key. The root key is a public & private keypair that is presented via
an X.509 certificate. This certificate serves as a basis for secure
communication and standardised way of presenting secure digital identity
information.

## Sharing

The sharing process involves:

1. Social Identity Discovery - given a trusted digital identity, find linked node public keys
2. Node Discovery - given a node public key, find the point of presence (IP address)

### Social Identity Discovery

In Social Identity Discovery, you will discover other digital identities on the
social networks that you trust. These digital identities will be augmented with a
cryptolink that provides information on their keynodes. We use the public key
of the nodes to identify the nodes.

### Node Discovery

In Node Discovery, we use a peer to peer distributed hash table (DHT) and the
kademlia protocol to resolve node public keys to their IP addresses. From here
we can then perform connection attempt.