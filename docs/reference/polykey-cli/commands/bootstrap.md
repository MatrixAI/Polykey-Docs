# `polykey bootstrap`

Bootstraps the node state and sets up a key root pair.

A live node is a live process known as a PolyKey Agent process.

A node consists of only the node state stored at the node path.

On Linux this would be `~/.local/share/polykey`. However you can select the exact location of the node path, it can be anywhere.

This location is where all the vault state, networking state, discovery state
will be stored.

If the node detects that the node state is already initialised, and it is not
corrupted, then it will attempt to unseal the node state by asking the user for
the root password for the root key.

If the node state has not been initialised, then the first thing that a node
will do is to generate a root certificate and the root key consisting the root
public key and root private key.

The root private key needs to be password protected. The user must supply the
root password in order to encrypt the root private key.

The root certificate is an X.509 certificate. This certificate will serve as the secure digital identity of the node.

The root public key which is encoded in the root certificate is the globally
unique identity of the node. This is known as the node ID. The node ID is
used to identify the node in the peer to peer network.

The root key pair uses Ed25519 protocol.

Usage:

```sh
polykey --node-path ./tmp/nodeZ bootstrap
✔ Enter new password … *
✔ Confirm new password … *
rule budget game easily collect alone zoo panda clump advice drill area click enhance chicken raise sadness glare relief easily glove chicken draft draw
```
