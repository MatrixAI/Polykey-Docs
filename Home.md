PolyKey is decentralised distributed peer to peer secret sharing & secret
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

Each vault is encrypted with a vault key. The vault keys themselves are protected by
the root key. The root key is a public & private keypair that is presented via
an X.509 certificate. This certificate serves as a basis for secure 
communication and standardised way of presenting secure digital identity 
information.

Once a node is started, it connects to other nodes on the internet via 2 
protocols:

1. Social Identity Discovery - given a trusted digital identity, find linked node public keys
2. Node Discovery - given a node public key, find the point of presence (IP address)

In Social Identity Discovery, you will discover other digital identities on the 
social networks that you trust. These digital identities will be augmented with a 
cryptolink that provides information on their keynodes. We use the public key 
of the nodes to identify the nodes.

In Node Discovery, we use a peer to peer distributed hash table (DHT) and the 
kademlia protocol to resolve node public keys to their IP addresses. From here
we can then perform connection attempt.