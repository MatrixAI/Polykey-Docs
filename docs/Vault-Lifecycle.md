Vaults are encapsulated properties of `VaultManager`. A `Vault` is only constructed by requesting one from the `VaultManager`. That is, whilst a `Vault` has `create`/`destroy`/`start`/`stop` functions, these are **always only called internally by `VaultManager`**. Therefore, note that `Vault` is **not** dependency injected into `VaultManager`: we don't construct a `Vault` and then pass it to the `VaultManager`.

Creating a vault will generate a vault Id and link this to a provided name that is stored in metadata, providing that neither already exists. An encrypted filesystem will be started for the vault. Opening a vault will return the existing live vault (and encrypted filesystem) from the vault map, or will create the vault from existing metadata (if it exists) by starting the encrypted file system assigned to the vault. Closing a vault will remove the vault from the vault map, meaning that a encrypted file system will have to be created. Destroying a vault removes all references to the vault, including metadata and vault contents so that it cannot be opened again.

### TODO: Add details about open/close/create and implications with memory/EFS to relate to this diagram. Also add a list of exceptions for error handling (for example: what happens when we call `destroyVault` on a vault that doesn't exist?) List these exceptions out.

![](http://www.plantuml.com/plantuml/png/ZO_1IiGm48RlUOfXB-gXFi0UP44KFBWU1E-X-PN0x4GoKt7VthH3rRfOlNJedo_p_TcfnMh3WODbOz1J7DY8ypFwOz_-sx51GvWcRVR5YGr5fNqHXF53M-eylnD3bSYKHIrAZoqbnFH5tTm--ivsKA1oPeJthFPfU7Y587spU11yh9euls7cbYvtQA3PSir55nOFWe-_t-FSRnP_RjTTqTp6jzr7YI-ebtr5uwVe_28uC-7ZlPzmWbejnrFQEvyk7zEPTcIbIcdf4lvlaHqa3GV-0000)

Vaults are stored in a `VaultMap`, mapping from the vault ID to the `Vault` itself. Locking is required on this `VaultMap` to ensure consistent creation, destruction, opening, and closing. This `VaultMap` follows the generic `ObjectMap` flow for creation of a vault:

```ts
type ObjectMap = Map<ObjectId,
  {
    resource?: Object;
    lock: MutexInterface;
  }
>;
```

![](http://www.plantuml.com/plantuml/png/VL11JiCm4Bpd5NDC3oXtAa4Hue04GkeFGZ9H3AuTrckL_XxNYL6WY9DtPsTclRCBseh6WwroKGadjbe1Pa3zu5HEC0ulhs_izBcTC7XPkiV-TWCTwL2V63OLC8ls33vAH_3J10rdESy-bspWwgPfX1h5GHPPqsoNOL0_vP8s4BNpHNKSZKt0a-_UOGA4bcrW-axgrZowFbFBoXaoG_NRylfUs2fXa-Fs1yAB1FBuQ7HSi--wZsZaBuDoLY7s_JS4zRD_7grtBEJzV5Xn_IUlabOvS9UUUB1V)