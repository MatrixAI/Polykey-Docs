The history of changes to a vault's contents are retained in a git history (through the use of `isomorphic-git`). 

This history can be used to move backwards or forwards along the various versions of the vault's contents. Consider the history like a linked chain of commits, that can be safely traversed up and down.

However, note that if a mutation is performed when viewing a vault at an earlier version, any later versions are discarded from the chain.

This versioning process is displayed in the following visualisation:

```
               .
A -> B -> C -> D

> pk vaults version vault1 B
     .
A -> B -> C -> D

> pk vaults version vault1 D
               .
A -> B -> C -> D

> pk vaults version vault1 B
     .
A -> B -> C -> D

> // make some changes and commit these whilst still at commit B
          .
A -> B -> E
```

### TODO: change this to a generic state diagram, see [#258](https://github.com/MatrixAI/js-polykey/issues/258)