# `polykey vaults`

## `clone`
1. Clone a vault from another nodeID
2. Requires vaultName to be cloned as a parameter
3. Requires nodeID of the Node with access to the vault as a parameter

Usage:

```shell
> polykey vaults clone vaultFromOtherNode v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

> polykey vaults list

vault1                  zS4cBAnYTa3221RYLPWT4q6
vault2                  zUUqm8tN22MkaR3zvMKnKQw
vaultFromOtherNode      zMC3GPfmdx2XhXHN5Ra3tKT
```


## `create`
1. Create a new Vault
2. Requires vaultName as a parameter


Usage:

```shell
> polykey vaults create vault1

Vault zS4cBAnYTa3221RYLPWT4q6 created successfully
```

## `delete`
1. Delete an existing Vault
2. Requires vaultName as a parameter

Usage:

```shell
> polykey vaults list

thisVaultWillBeDeleted  zEFsW8znHjfL6Y57juQcxEw
vault1                  zS4cBAnYTa3221RYLPWT4q6

> polykey vaults delete thisVaultWillBeDeleted

> polykey vaults list

vault1  zS4cBAnYTa3221RYLPWT4q6
```

## `list`
1. Lists all currently available vaults

Usage:

```shell
> polykey vaults list

vault1  zS4cBAnYTa3221RYLPWT4q6
vault2  zUUqm8tN22MkaR3zvMKnKQw
```

## `log`
1. Get logs incl version history from a vault

Usage:

```shell
> polykey vaults log vault2

commit 8a8937f23baf0195081a429b3ea34bb26d498028
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 13:56:57 GMT+1100 (Australian Eastern Daylight Time)
secret2 deleted,thisSecretHasBeenRenamed added

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
> polykey -np ./tmp/nodeA vaults permissions vaultFromOtherNode

vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00: pull, clone
```

## `pull`
1. Pull updated changes from a vault which is shared from another Node

Usage:

```shell
> polykey -np ./tmp/nodeA secrets create /home/addievo/Desktop/Work/> polykey-CLI/random.txt vaultFromOtherNode:secretFromOtherNode

> polykey secrets list vaultFromOtherNode

> polykey vaults pull vaultFromOtherNode

> polykey secrets list vaultFromOtherNode

secretFromOtherNode
```

## `rename`
1. Rename an existing Vault

Usage:

```shell
> polykey vaults rename vault2 thisHasBeenRenmaed && > polykey -- vaults list

thisHasBeenRenmaed      zUUqm8tN22MkaR3zvMKnKQw
vault1                  zS4cBAnYTa3221RYLPWT4q6
```

## `scan`
1. Lists shared vaults from a specified nodeID

Usage:

```shell
> polykey vaults scan v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

vaultFromOtherNode      z2CtVYNDudjXQPPzdcSfSDa pull,clone
```

## `share`
1. Share Vault with another Node, with their node ID

Usage:

```shell
> polykey -np ./tmp/nodeA vaults share vaultFromOtherNode vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00

> polykey -np ./tmp/nodeA vaults permissions vaultFromOtherNode

vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00: pull, clone
```

## `unshare`
1. Stop sharing a previously shared vault

Usage:

```shell
> polykey -np ./tmp/nodeA vaults unshare vaultFromOtherNode vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
```

## `version`
1. Set a vault to a previous or specific version

Usage:

```shell

> polykey  secrets list vaultFromOtherNode

secretFromOtherNode

> polykey vaults log vaultFromOtherNode

commit 46ad871a2164effc00a9b2a1ba0591b0b3ba1883
committer v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
Date: Wed Dec 06 2023 14:25:42 GMT+1100 (Australian Eastern Daylight Time)
Merge branch 'HEAD' of http://

commit 9833f539314c278422ee7d7891929214f62c3c24
committer v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
Date: Wed Dec 06 2023 14:25:07 GMT+1100 (Australian Eastern Daylight Time)
secretFromOtherNode added

commit ca9a7cc7a680866022eff2d66ce2444862dd4a5e
committer vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
Date: Wed Dec 06 2023 14:22:52 GMT+1100 (Australian Eastern Daylight Time)
Initial Commit

commit 4faa50023c14ad0dbc7bb6204a691d361234ea22
committer v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0
Date: Wed Dec 06 2023 14:18:24 GMT+1100 (Australian Eastern Daylight Time)
Initial Commit

> polykey vaults version vaultFromOtherNode ca9a7cc7a680866022eff2d66ce2444862dd4a5e

> polykey secrets list vaultFromOtherNode

# Vault is cloned to state before secretFromOtherNode was pulled
```
