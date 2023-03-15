# Node Connections

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
