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

This process can also be shown on the following state diagram:

![](http://www.plantuml.com/plantuml/png/VP1D2i8m48NtxnH3L-t27g0BwVnSf60M1QsGHBs-CKI9DRWfdVVoXIypXxZuUBkSWVGN7IcK9c8w74bU7tqN0caN3DuNI5CU9xex7zRhrijGGgr27G39ALSf3v3cKMtTgYs-g7NMqHB86FPnjEAHauTVe-l7SVn11FRzNYjI9dyvXUqMcE6YcRiAdjrsIij_0W00)

### TODO: textually expand on diagram (from [#258](https://github.com/MatrixAI/js-polykey/issues/258))