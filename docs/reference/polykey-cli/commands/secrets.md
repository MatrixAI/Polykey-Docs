# `polykey secrets`

## `create`

1. Create a secret within a given vault
2. Requires a file path as input which contains the secret

Usage:

```shell
$ polykey secrets create ~/random.txt vault1:secret1
```

## `rm`

1. Removes one or more secrets from a specified vault
2. Ignores paths which do not exist and continues execution
3. Pass in the `-r` option to remove directories

Usage:

```shell
$ polykey secrets rm vault1:secret1

$ polykey secrets cat vault1:secret1
cat: secret1: No such file or directory
ErrorPolykeyCLICatSecret: Failed to concatenate one or more secrets

$ polykey secrets rm vault1:abc vault1:xyz

$ polykey secrets cat vault1:secret1
cat: abc: No such file or directory
cat: xyz: No such file or directory
ErrorPolykeyCLICatSecret: Failed to concatenate one or more secrets

$ polykey secrets rm vault1:file1 vault1:invalid vault1:file2
rm: cannot remove 'invalid': No such file or directory
ErrorPolykeyCLIRemoveSecret: Failed to remove one or more secrets
# Files 'file1' and 'file2' have been removed

$ polykey secrets rm vault1:dir1
rm: cannot remove 'test': Is a directory
ErrorPolykeyCLIRemoveSecret: Failed to remove one or more secrets

$ polykey secrets rm -r vault1:dir1
# Command finishes successfully this time
```

## `dir`

1. Adds a directory within a given vault
2. Requires dir to be added as a parameter
3. Requires the vault where to the dir is to be added

Usage:

```shell
$ polykey secrets dir ~/test-dir vault1
```

## `ed`

1. Edit a secret within a vault by launching the preferred editor
2. If the secret doesn't exist, a new and empty secret is created for editing
3. If the edited file isn't saved or the editor crashes, the secret will not be
   written

:::warning This command does not work on Windows yet :::

Usage:

```shell
$ polykey secrets ed vault1:secret2
# This opens an editor window in your editor of choice, vim/nano/etc..

$ polykey secrets cat vault1:secret2
I edited this secret inside an editor
```

## `cat`

1. Fetches one or more secrets from a specified vault and concatenates them
2. Skips to the next argument if a secret encounters an error while reading
3. File contents are printed out to `stdout` and errors to `stderr`
4. If no paths are specified, this command takes input from `stdin` and prints
   it to `stdout`

:::tip `^D` in the terminal stands for the key combination 'Ctrl-D' :::

Usage:

```shell
$ polykey secrets cat vault1:secret2
I edited this secret inside an editor

$ polykey secrets cat vault1:secret2 vault1:secret3
I edited this secret inside an editorThis was written using create, though

$ polykey secrets cat vault1:secret2 vault1:invalid vault1:secret3
I edited this secret inside an editor
cat: invalid: No such file or directory
This was written using create, though
ErrorPolykeyCLICatSecret: Failed to concatenate one or more secrets

$ polykey secrets cat vault1:secret2 vault1:invalid vault1:secret3 2>/dev/null
I edited this secret inside an editorThis was written using create, though

$ polykey secrets cat
abc
abc
123
123
abc^D^Dabc
^D
```

## `ls`

1. Lists all secrets within a specific directory inside a specified vault

Usage:

```shell
$ polykey secrets ls vault1
secret1
secret2
secret3
file1
file2
abc
xyz
dir1

$ polykey secrets ls vault1:dir1
dir1/.hidden-file
dir1/nothing-to-see-here
```

## `mkdir`

1. Creates an empty directory within a vault
2. Skips invalid operations
3. To make a nested directory, pass in the `-p` option

Usage:

```shell
$ polykey secrets mkdir vault1:testdir

$ polykey secrets mkdir vault1:dir123 vault1:dir456

$ polykey secrets mkdir vault1:dir-abc vault1:abc/def/ghi vault1:dir-def
mkdir: cannot create directory abc/def/ghi: No such file or directory

$ polykey secrets mkdir -p vault1:abc/def/ghi

$ polykey secrets ls vault1:abc
abc/def

$ polykey secrets ls vault1:abc/def
abc/def/ghi
```

## `rename`

1. Rename a secret
2. Requires secret location (vaultName:secretName) as a parameter
3. Requires new name of the secret as a parameter

Usage:

```shell
$ polykey secrets ls vault1
secret2

$ polykey secrets rename vault1:secret2 new-name

$ polykey secrets ls vault1
new-name
```

## `stat`

1. Get the stats of a specified secret from a vault
2. Requires secret location (vaultName:secretName) as a parameter

:::note The mode (or file permissions) doesn't exist within a vault :::

Usage:

```shell
$ polykey secrets stat vault1:new-name
Stats for "new-name"
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
blocks: 1
```

## `env`

1. Export one or multiple secrets within a vault as environment variables
2. Run a command with the specified variables, or export them in the current
   working environment

:::note Separate the environment variables from the command by passing in a `--`
:::

Usage:

```shell
$ polykey secrets ls my-project
OPENAI_API_KEY
GOOGLE_MAPS_API_KEY
PROD_DB_PASSWORD

$ polykey secrets env my-project:OPENAI_API_KEY
OPENAI_API_KEY='do not commit your keys to github'

$ polykey secrets env my-project:OPENAI_API_KEY my-project:PROD_DB_PASSWORD
OPENAI_API_KEY='do not commit your keys to github'
PROD_DB_PASSWORD='password123abc'

$ polykey secrets env my-project
OPENAI_API_KEY='do not commit your keys to github'
GOOGLE_MAPS_API_KEY='abc123'
PROD_DB_PASSWORD='password123abc'

$ polykey secrets env my-project -- bash -c 'echo $OPENAI_API_KEY'
do not commit your keys to github

$ echo $OPENAI_API_KEY
# It is not set in the current shell yet

$ . <(polykey secrets env my-project)

$ echo $OPENAI_API_KEY
do not commit your keys to github
```

## `write`

1. Reads input from `stdin` and writes it to the specified file
2. If the file doesn't exist, it gets created

:::tip `stdin`, or standard input, can be either manually entered by typing, or
piped in through another command.

To close the input steam and save the file, press `^D`, or 'Ctrl-D' in a new
line, or press `^D` twice on the same line. :::

Usage:

```shell
$ polykey secrets write vault1:file
this will be entered into the file
testing123
abc^D^D

$ polykey secrets cat vault1:file
this will be entered into the file
testing123
abc
```
