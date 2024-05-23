# `polykey secrets`

## `create`
1. Create a secret within a given vault
2. Requires a filepath as input which contains the secret


Usage:

```shell
> polykey secrets create /home/addievo/Desktop/Work/Polykey-CLI/random.txt vault1:secret1
```

## `delete`
1. Deletes a secret from a specified vault

Usage:

```shell
> polykey secrets delete vault1:secret1

> polykey secrets get vault1:secret1

ErrorPolykeyRemote: Remote error from RPC call
```
## `dir`
1. Adds a directory within a Given Vault
2. Requires dir to be added as a parameter
3. Requires the vault where to the dir is to be added

Usage:

```shell
> polykey secrets dir /home/addievo/Desktop/Work/Polykey-CLI/random vault2
```

## `edit`
1. Edit a secret within a vault

Usage:

```shell
> polykey secrets create /home/addie/Desktop/Work/Polykey-CLI/random.txt vault2:secret2
> polykey secrets edit vault2:secret2
# This opens an editor window in your editor of choice, vim/nano/vsc
(node:121206) [DEP0147] DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed. Use fs.rm(path, { recursive: true }) instead
(Use `node --trace-deprecation ...` to show where the warning was created npm run polykey -- secrets get vault2:secret2

> polykey secrets get vault2:secret2

Yo-THISISEDITED
```

## `get`
1. Fetches a secret from a specified vault

Usage:

```shell
> polykey secrets get vault2:secret2

Yo-THISISEDITED
```

## `list`
1. Lists all secrets inside a specified vault

Usage:

```shell
> polykey secrets list vault2


random/random2
secret2
```

## `mkdir`
1. Creates an empty directory within a vault

Usage:

```shell
> polykey secrets mkdir vault2:thisIsTheNewDir
```

## `rename`
1. Rename a secret
2. Requires secret location (vaultName:secretName) as a parameter
3. Requires new name of the secret as a parameter

Usage:

```shell
> polykey secrets rename vault2:secret2 thisSecretHasBeenRenamed

> polykey secrets list vault2

random/random2
thisSecretHasBeenRenamed
```

## `stat`
1. Get the stats of a specified secret from a vault
2. Requires secret location (vaultName:secretName) as a parameter

Usage:

```shell
> polykey secrets stat vault2:thisSecretHasBeenRenamed

Stats for "thisSecretHasBeenRenamed"
dev: 0
ino: 1455
mode: 33188
nlink: 1
uid: 0
gid: 0
rdev: 0
size: 16
atime: Wed Dec 06 2023 13:56:57 GMT+1100 (Australian Eastern Daylight Time)
mtime: Wed Dec 06 2023 13:50:07 GMT+1100 (Australian Eastern Daylight Time)
ctime: Wed Dec 06 2023 13:56:52 GMT+1100 (Australian Eastern Daylight Time)
birthtime: Wed Dec 06 2023 13:49:19 GMT+1100 (Australian Eastern Daylight Time)
blksize: 4096
blocks:
```

## `update`
1. Update a secret

Usage:

```shell
> polykey secrets list vault2

random/random2
thisSecretHasBeenRenamed

> npm run polykey -- secrets update /home/addievo/Desktop/Work/Polykey-CLI/random.txt vault2:thisSecretHasBeenRenamed
```
