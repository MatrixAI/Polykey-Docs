Node Discovery is about:

```
type NodeId = string;
type NodeAddress = {
  type: 'ipv4';
  address: string;
  port: number;
} | {
  type: 'ipv6';
  address: string;
  port: number;
} | {
  type: 'dns':
  address: 'bootstrap.polykey.io';
  port: number;
};

// derive this type from node-forge, it already has a "cert" structure
type NodeCert = {
  version: number;
  //...
};

type NodeInfo = {
  address: NodeAddress;
  cert: NodeCert;
  // ...
};

function resolveNodeId(nodeId: NodeId): NodeAddress {
  // use kademlia and the DHT to find the `nodeId` and get the `NodeAddress`
}

function getNodeInfo(nodeId: NodeId): NodeInfo {
  // use kademlia and the DHT to find the `nodeInfo`
}
```

Once we have a `NodeId`, we want to get the `NodeInfo`. Inside the `NodeInfo`, there will be a `NodeAddress`.

The `NodeAddress` is sufficient attempting to connect to the other node via TCP/UDP.

There is more information in `NodeInfo` that we also need like the public key.

Where is this information stored?

It is stored in a DHT.

The DHT is implemented with Kademlia.

A DHT is a data structure, Kademlia is set of algorithms that work on the DHT.

Imagine that the table was like this:

```
// the node table is an object of key values
// the keys are the NodeId, the values are NodeInfo
type NodeTable = {
  [key: string]: NodeInfo
};
```

When PK first begins. There will be 2 nodes in the `NodeTable`.

It will be itself, and also the bootstrap node `bootstrap.polykey.io`.

If it is the bootstrap node, then it only has itself or OTHER bootstrap nodes.

The information for the bootstrap node is hardcoded into the source code of the js-polykey.

Which means the source code has:

1. The bootstrap node's NodeId
2. The bootstrap node's certificate (which means it has the bootstrap node's public key)
3. The bootstrap node's NodeAddress `bootstrap.polykey.io`

The current node (if it is not a bootstrap node), will need to generate it's own:

1. NodeId
2. Node Certificate & Node Key

And in addition, there's an option to generate a CSR "certificate signing request". This allows us to use third party CAs to sign the Node Certificate.

## Node Certificate Rotation

See: https://gitlab.com/MatrixAI/Engineering/Polykey/js-polykey/-/merge_requests/165#note_528808669

## NAT Busting

See NAT Busting.

## Discovery Techniques

* Hardcoded Discovery - bootstrap.polykey.io
* Manual Discovery - the user submits a certficate to PK node, and the PK adds it to the node table (I actually also know the NodeAddress) (if i know the NodeCertificate and NodeAddress, then I can add it manually to the NodeTable)
* Local Area Network Discovery - use multicast (not been tested (there is hardcoded port for this))
* Wide Area Network Discovery - use the DHT + Kademlia (you are synchronising the DHT automatically via kademlia protocol)

References

* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/34
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/28
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/33
* https://gitlab.com/MatrixAI/Engineering/Polykey/js-polykey/-/merge_requests/84