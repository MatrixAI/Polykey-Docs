# Architecture

### Node ID

In order to interact with other nodes, PolyKey uses a unique node ID identifier.
Currently, the fingerprint of the root public key of a keynode is calculated
using a sha256 has function and is then transformed into base64 encoding to
obtain a keynode’s Node ID. This will consistently produce a string of 44
characters. In the future, PolyKey will used an ed25519 public key directly
encoded using base64 to create the Node ID. As the signature of ed25519 keys can
be up to 256 bits, the length of the node ID would be a maximum of 44
characters.

![](http://www.plantuml.com/plantuml/png/XP0nIyL048Jx-nLR2n6BMDY4W5g8AC52R3UNLKzoTs5lJmZYVtzx926yDA_ScMyokMcJ84lseudz3rc1Pvf376WxtsAKUs9ndywY4FoPZ-lRcpiesYAP_urzrTpJWo9r3VOR6QqGGn9suMkdtZ6FeYr9mSTWUPw41iX98UZO_POMjVV0Io0VWxCNUOzJKJpohCA4ZZMo8Yh0LTNixUT6fTRMOxhSZywkHhEyIZzlrccWm8TTpE4kpE5VJ4jXqA5F)

## Sharing

The sharing process involves:

1. Social Identity Discovery - given a trusted digital identity, find linked
   node public keys
2. Node Discovery - given a node public key, find the point of presence (IP
   address)

### Social Identity Discovery

In Social Identity Discovery, you will discover other digital identities on the
social networks that you trust. These digital identities will be augmented with
a cryptolink that provides information on their keynodes. We use the public key
of the nodes to identify the nodes.

### Node Discovery

In Node Discovery, we use a peer to peer distributed hash table (DHT) and the
kademlia protocol to resolve node public keys to their IP addresses. From here
we can then perform connection attempt.

## Polykey Directory

| Platform | Directory                                     |
| -------- | --------------------------------------------- |
| Linux    | `HOMEDIR/.local/share/polykey`                |
| Darwin   | `HOMEDIR/Library/Application Support/polykey` |
| Windows  | `HOMEDIR/AppData/Local/polykey`               |
