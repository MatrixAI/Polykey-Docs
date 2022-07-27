A vault can be shared with other keynodes (and their respective gestalt) in the wider Polykey network. Although attempts to clone or pull vaults from an unauthorised keynode is disallowed to preserve the security of these vaults. Therefore, an attempt to clone/pull a vault will only be executed if the requesting keynode has the appropriate permissions set by the vault holder.

Permissions are altered in PolyKey by using the `share` and `unshare` commands. Permissions are stored by associating a `vaultId` to a `nodeId` which is then associated with a `vaultAction`. Sharing a vault will set `clone` and `pull` permissions for a particular keynode, however, these permissions will propagate to all other keynodes within its gestalt. Sharing a vault will also grant `scan` permissions to the keynode (and its gestalt). A notification is also sent to the corresponding keynode to alert them that a vault has been shared to them.

If we consider two remote keynodes, `A` and `B`, the cloning process would be as follows:

1. `B` creates vault, `v`
2. `B` shares vault `v` with `A`

   A couple of things occur:

   1. `B` enables the scan, pull, and clone permissions (these changes to the keynode `A`'s permissions propagate to all other known nodes in its gestalt).
   2. `B` sends a notification to `A` to inform them that they can clone/pull the vault (a `VaultShare` notification)

3. `A` clones `v` from `B`

   This cloning process is depicted as follows:

   ### TODO: Add diagram of process. See [#258](https://github.com/MatrixAI/Polykey/issues/258)

Using the same setup, the pulling process would be as follows:

1. `B` creates vault, `v`
2. `B` shares vault `v` with `A`
3. `A` clones `v` from `B`
4. `B` makes changes to vault, `v`
5. `A` pulls `v` from `B`

However, neither the vault to pull from nor the node Id need to be specified in pulling a vault. Each time that a vault is cloned or pulled, the `nodeId` and `vaultId` to pull from are stored as metadata to be used as default behaviour. Changes can also be pulled from other vaults as long as the original vault is the same as the vault that is receiving the changes. However, currently cloned vaults are inherently immutable and so this feature is not useful at this stage. No mutations can be performed on cloned vaults: a mutable copy of the vault needs to be created to do so.