To view and write to the contents of a vault, there are various operations that can be performed on the underlying secrets in the vault. These are specified in the `VaultOps`: a high-level set of functions that operate on the contents of a vault.

Because each vault holds a singleton reference to the `EFS`, these operations take an individual `Vault` as their parameter (or multiple vaults, where the operation performs operations between vaults).

In the future, these will be extended to provide unix operations on and between the contents of vaults (for example, `mv`, `touch`). 