A vault can be shared with other keynodes (and their respective gestalt) in the wider Polykey network. 

If we consider two remote keynodes, `A` and `B`, the cloning process would be as follows:

1. `B` creates vault, `v`
2. `B` shares vault `v` with `A`

   A couple of things occur:

   1. `B` enables the scan, pull, and clone permissions (these changes to the keynode `A`'s permissions propagate to all other known nodes in its gestalt).
   2. `B` sends a notification to `A` to inform them that they can clone/pull the vault (a `VaultShare` notification)

3. `A` clones `v` from `B`

   This cloning process is depicted as follows:

   ### TODO: Add diagram of process. See [#258](https://github.com/MatrixAI/js-polykey/issues/258)
