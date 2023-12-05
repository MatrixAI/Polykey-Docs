# Nodes

## Node Connections

Connections can be established between keynodes across the global Polykey network.

`NodeConnection` objects are stored in a `NodeConnectionMap`, mapping from the node ID of the target node to the connection to this node. Locking is required on this `NodeConnectionMap` to ensure consistent creation and usage of existing node connections. This `NodeConnectionMap` follows the generic `ObjectMap` flow for creation of a vault, where the `resource` is the `NodeConnection` itself:

```ts
type ObjectMap = Map<
  ObjectId,
  {
    resource?: Object;
    lock: MutexInterface;
  }
>;
```

![](http://www.plantuml.com/plantuml/png/VL11JiCm4Bpd5NDC3oXtAa4Hue04GkeFGZ9H3AuTrckL_XxNYL6WY9DtPsTclRCBseh6WwroKGadjbe1Pa3zu5HEC0ulhs_izBcTC7XPkiV-TWCTwL2V63OLC8ls33vAH_3J10rdESy-bspWwgPfX1h5GHPPqsoNOL0_vP8s4BNpHNKSZKt0a-_UOGA4bcrW-axgrZowFbFBoXaoG_NRylfUs2fXa-Fs1yAB1FBuQ7HSi--wZsZaBuDoLY7s_JS4zRD_7grtBEJzV5Xn_IUlabOvS9UUUB1V)

### TODO: add notes on:

- bucket structure (effect of node ID size)
- Process of Kademlia (a diagram would be beneficial here)

## Node Discovery

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
  address: 'bootstrap.polykey.com';
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

It will be itself, and also the bootstrap node `bootstrap.polykey.com`.

If it is the bootstrap node, then it only has itself or OTHER bootstrap nodes.

The information for the bootstrap node is hardcoded into the source code of the Polykey.

Which means the source code has:

1. The bootstrap node's NodeId
2. The bootstrap node's certificate (which means it has the bootstrap node's public key)
3. The bootstrap node's NodeAddress `bootstrap.polykey.com`

The current node (if it is not a bootstrap node), will need to generate it's own:

1. NodeId
2. Node Certificate & Node Key

And in addition, there's an option to generate a CSR "certificate signing request". This allows us to use third party CAs to sign the Node Certificate.

## Node Certificate Rotation

See: https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/165#note_528808669

## NAT Busting

See NAT Busting.

## Discovery Techniques

- Hardcoded Discovery - bootstrap.polykey.com
- Manual Discovery - the user submits a certficate to PK node, and the PK adds it to the node table (I actually also know the NodeAddress) (if i know the NodeCertificate and NodeAddress, then I can add it manually to the NodeTable)
- Local Area Network Discovery - use multicast (not been tested (there is hardcoded port for this))
- Wide Area Network Discovery - use the DHT + Kademlia (you are synchronising the DHT automatically via kademlia protocol)

References

- https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/34
- https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/28
- https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/33
- https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/84

## Node Identification

Each Polykey keynode has a unique node ID. This node ID is the "public key fingerprint": a SAH-256 hash of the 4096-bit RSA public key. This produces 32 unique bytes that represent the node ID.

### TODO: Incorporate details from [#261](https://github.com/MatrixAI/Polykey/issues/261), depending on how we choose to canonicalise the node ID.

<details>
<summary>Old details... unnecessarily verbose and some out of date, but keeping for now</summary>

The problem is that we are attempting to use X.509 certificates where neither hostname nor IP address are reliable identifiers. We are attempting to use them in peer to peer scenario where we do not know what the hostname will be, and we do not know what the IP address will be. This might be fine for our direct grpc peer to peer connections, but it may be more difficult to achieve if we want to present an HTTPS API, in which HTTP clients will want to verify the common name or subject alternative names. We need to test if wildcard certificates work for this purpose.

The identification of the Node is through the public key.

The common name of the certificate should be arbitrary.

HTTPS does however require a common name to match the hostname/IP address.

PK HTTPS server isn't just on localhost.

Question is whether gRPC also requires the common name to be verified.

What happens if there's no common name, and no IP address specified?

MTLS is still possible, but there's no authentication as who is speaking.

Unless we have a custom verification where we only verify on the existence of the key.

---

We can stick the public key fingerprint (or public key) as the common name as well.

But we would need custom verification here when used in gRPC.

We could also use BIP39 and the other BIP standards to have a human readable name, these are non-FQDNs. These can also act as unique identifiers.

---

According to the standard: https://tools.ietf.org/html/rfc2818#section-3.1 and https://security.stackexchange.com/questions/61699/is-cn-hostname-verification-against-ssl-certificate-required-for-non-browser-sof

It is possible to "disable the name check". Which is what we want to do in the case of HTTP/HTTPS and grpc clients. Our name check is the public key check, there's no need to do further checks of this kind.

But if we are to allow arbitrary http clients, it may be necessary to not just use our self-signed certs, but to allow the user to use their own certs for this, such as they want a CA signed cert to represent the PK node. In that case, we should actually be generating a CSR. And by doing this we can integrate PK into existing CAs like letsencrypt and such.

However our CSR will have custom attributes that the CA will need to sign for. Specifically attributes that are important our own things.

---

Verify this: http://www.oid-info.com/#ra to ensure we have proper custom OID generation.

---

https://pen.iana.org/pen/PenApplication.page - OID

https://waterjuiceweb.wordpress.com/2019/08/21/oh-my-oid/

---

Further standards are here: https://www.iana.org/protocols/apply

---

This is the check process: https://en.wikipedia.org/wiki/Certification_path_validation_algorithm

---

Polykey Node Certificate

- Public Key/Private Key is RSA 4096
- Common Name is the Node Id
- The Node Id is the Public Key Fingerprint (fingerprint is public key -> sha256 -> base64)
- The signature is SHA512-RSA (if the issuer is RSA, the signature is RSA)

In the future:

- Public Key/Private Key is Ed25519
- Common Name is the Node Id
- The Node Id is the Public Key Fingerprint (fingerprint is public key -> base64)
- The signature is SHA512-Ed22519

</details>
