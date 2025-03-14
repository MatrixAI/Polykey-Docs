# `polykey vaults`

## `clone`

1. Clone a vault from another node ID
2. Requires vault name to be cloned as a parameter
3. Requires node ID of the node with access to the vault as a parameter

Usage:

```shell
$ polykey vaults clone newvault v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

$ polykey vaults list
vault         zS4cBAnYTa3221RYLPWT4q6
newvault      zMC3GPfmdx2XhXHN5Ra3tKT
```

## `create`

1. Create a new vault
2. Requires the vault name as a parameter

Usage:

```shell
$ polykey vaults create my-vault
Vault zMC3GPfmdx2XhXHN5Ra3tKT created successfully

$ polykey vaults list
vault         zS4cBAnYTa3221RYLPWT4q6
myvault       zMC3GPfmdx2XhXHN5Ra3tKT
```

## `rm`

1. Delete an existing vault
2. Requires the vault name as a parameter

Usage:

```shell
$ polykey vaults list
vault           zS4cBAnYTa3221RYLPWT4q6
delete-me       zEFsW8znHjfL6Y57juQcxEw

$ polykey vaults delete delete-me

$ polykey vaults list
vault  zS4cBAnYTa3221RYLPWT4q6
```

## `ls`

1. Lists all locally cloned vaults

Usage:

```shell
$ polykey vaults list
vault  zS4cBAnYTa3221RYLPWT4q6
```

## `log`

1. Get logs (including the version history) from a vault
2. A version commit can be used to reset the vault state to that version

Usage:

```shell
$ polykey vaults log vault
commit 8a8937f23baf0195081a429b3ea34bb26d498028
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 13:56:57 GMT+1100 (Australian Eastern Daylight Time)
secret2 deleted,renamedSecret added

commit cc6a5ac11b14615d9f8d9d633a7f8ab41e0a366c
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 13:50:13 GMT+1100 (Australian Eastern Daylight Time)
secret2 modified

commit ed6cfa5d7d9e358e74b7d61b2d77d5e80fdf65b2
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 13:49:25 GMT+1100 (Australian Eastern Daylight Time)
secret2 added

commit ffa56ccd5cf33f4cb4b3091824caa2600a9914d7
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 13:46:27 GMT+1100 (Australian Eastern Daylight Time)
random/random2 added

commit 240b4c4910e4fbe8b0f243477f5a43562982520d
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 13:46:00 GMT+1100 (Australian Eastern Daylight Time)
Initial Commit
```

## `permissions`

1. Lists permissions of a specified vault

Usage:

```shell
$ polykey vaults permissions newvault
vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00: pull, clone
```

## `pull`

1. Pull updated changes from a vault which is shared from another node

Usage:

```shell
# Specifying an alternate node path to simulate another node
$ polykey -np /tmp/nodeA secrets touch other-vault:other-secret

# Back to the original node
$ polykey secrets list other-vault

$ polykey vaults pull other-vault

$ polykey secrets list other-vault
other-secret
```

## `rename`

1. Rename an existing vault

Usage:

```shell
$ polykey vaults rename myvault renamedvault

$ polykey vaults list
vault             zS4cBAnYTa3221RYLPWT4q6
renamedvault      zUUqm8tN22MkaR3zvMKnKQw
```

## `scan`

1. Scans for new shared vaults from a specified node ID

Usage:

```shell
$ polykey vaults scan v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
other-vault      z2CtVYNDudjXQPPzdcSfSDa pull,clone
```

## `share`

1. Share a vault with another node using their node ID

Usage:

```shell
$ polykey vaults share myvault v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

$ polykey vaults permissions myvault
v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0: pull, clone
```

## `unshare`

1. Stop sharing a previously shared vault

Usage:

```shell
$ polykey vaults unshare myvault v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
```

## `version`

1. Set a vault to a previous or specific version obtained from the vault commit
   logs

Usage:

```shell
$ polykey secrets list myvault
file1

$ polykey vaults log myvault
commit 9833f539314c278422ee7d7891929214f62c3c24
committer v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
Date: Wed Dec 06 2023 14:25:07 GMT+1100 (Australian Eastern Daylight Time)
file1 added

commit ca9a7cc7a680866022eff2d66ce2444862dd4a5e
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 14:22:52 GMT+1100 (Australian Eastern Daylight Time)
Initial Commit

$ polykey vaults version myvault ca9a7cc7a680866022eff2d66ce2444862dd4a5e

$ polykey secrets list vaultFromOtherNode
# Vault is changed to a state before writing file1
```
