Vaults are encapsulated properties of `VaultManager`. A `Vault` is only constructed by requesting one from the `VaultManager`. That is, whilst a `Vault` has `create`/`destroy`/`start`/`stop` functions, these are **always only called internally by `VaultManager`**. Therefore, note that `Vault` is **not** dependency injected into `VaultManager`: we don't construct a `Vault` and then pass it to the `VaultManager`.

### TODO: Add details about open/close/create and implications with memory/EFS to relate to this diagram.

![](http://www.plantuml.com/plantuml/png/VP0n2uCm48Nt_8h3tJ_WK8JIGeVgKEWkvg22IIGv1v7-z-RYMIkbdNAyx-Mzuyf0ZQVHzEhHQGGq0qsWCRI-6wXpLgbe88IiSd1lnfuoQ09KpkARr0DQr1zKX5a1YELYSuF6-IdnQneNr-QfBPpEDpRmA_IfOAqvzYxiQaIOVqKmbmZU5_ByiAvMGEinVabXIaJcoLZm0SYxwGjBPVpEmu95swMxE6pqJtQ9LiVZlm00)

Vaults are stored in a `VaultMap`, mapping from the vault ID to the `Vault` itself. Locking is required on this `VaultMap` to ensure consistent creation, destruction, opening, and closing. This `VaultMap` follows the generic `ObjectMap` flow for creation of a vault:

![](http://www.plantuml.com/plantuml/png/VL11JiCm4Bpd5NDC3oXtAa4Hue04GkeFGZ9H3AuTrckL_XxNYL6WY9DtPsTclRCBseh6WwroKGadjbe1Pa3zu5HEC0ulhs_izBcTC7XPkiV-TWCTwL2V63OLC8ls33vAH_3J10rdESy-bspWwgPfX1h5GHPPqsoNOL0_vP8s4BNpHNKSZKt0a-_UOGA4bcrW-axgrZowFbFBoXaoG_NRylfUs2fXa-Fs1yAB1FBuQ7HSi--wZsZaBuDoLY7s_JS4zRD_7grtBEJzV5Xn_IUlabOvS9UUUB1V)