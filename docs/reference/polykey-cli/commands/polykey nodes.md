# `polykey nodes`

## `add`

1. Adds an eexternal node to the nodeGraph
2. NodeID to be added is a required parameter
3. Host is the second required parameter
4. Port is the third required parameter

Usage:

```shell
> polykey nodes add v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0 127.0.0.1 50366
```

## `claim`

1. Claim a different node into your nodeGraph as your own
2. Requires the claim permission from the node to be claimed
3. Requires nodeID as a parameter

Usage:

```shell
# From node which is being claimed

> polykey -np ./tmp/nodeA identities allow vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00 claim


> polykey nodes claim v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

Successfully generated a cryptolink claim on Keynode with ID v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
```

## `connections`

1. Lists all the active connections from the nodeGraph

Usage:

```shell
> polykey nodes connections

host            hostname        nodeIdEncoded                                           port    timeout usageCount
127.0.0.1       N/A             v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0   50366   50126   0
```

## `find`

1. Attempts to find a node
2. Requires nodeID as a parameter

Usage:

```shell
> polykey nodes find vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00

Found node at 127.0.0.1 53002
```

## `ping`

1. Pings a node to check if it is online and accessible
2. Requires nodeID as a parameter

Usage:

```shell
> polykey nodes ping vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00

Node is Active.
```

## `getall`

1. Gets all the nodes (active and previously active) from the nodeGraph

Usage:

```shell
> polykey nodes getall

NodeId v8l4cktkgpvg321cnedt9c3f9d8httkhvobsr09gpqf5frmv0gnog, Address v8l4cktkgpvg321cnedt9c3f9d8httkhvobsr09gpqf5frmv0gnog.mainnet.polykey.com-1314, bucketIndex 254
NodeId vuok4kot57278bmh8p6s5srnid99mnlrt0n7rm3saq6q9bpcv6bo0, Address vuok4kot57278bmh8p6s5srnid99mnlrt0n7rm3saq6q9bpcv6bo0.mainnet.polykey.com-1314, bucketIndex 255
```
