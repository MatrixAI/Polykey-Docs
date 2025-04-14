# Managing Secrets

## Introduction

Secrets in Polykey are essential for securely managing sensitive information,
such as API keys, configuration files, or documents. These can be any file type
that you need to encrypt and manage securely. This section provides a detailed
guide on how to manage these secrets within vaults using Polykey-CLI.

:::tip Tip

In the Polykey CLI, you can get help with managing your Secrets Operations by
using the `--help` help command to get a detailed list of availiable options and
commands. Try running `polykey secrets --help`

:::

## Creating Secrets

:::note Note

**Create a Secret within a given Vault**

**Usage:** `polykey secrets create [options] <directoryPath> <secretPath>`

**Arguments:**

**directoryPath:** On disk path to the secret file with the contents of the new
secret.

**secretPath:** Path to the secret to be created,

specified as `<vaultName>:<directoryPath>`

:::

### Adding a Secret to a Vault

The `polykey secrets create` command clones an existing file from your local
machine and stores it into an encrypted vault, creating a secret in the process.
Thus, providing secure data-at-rest encryption of the file.

:::tip Tip

To create a secret, both the vault and file you are creating a secret from, must
already exist. Remember that to view the vaults contained within a node, you run
`polykey vaults list`. This is useful for viewing the names of the vaults you
are trying to manage secrets with, as vaultName is one of the command arguments
that is commonly used.

:::

#### Command Arguments

```bash
polykey secrets create <filePath> <vaultName>:<secretName>
```

:::info Info

The `<filePath>` for the file you are trying to create a secret from can either
be a working directory filepath or a root path. Also notice that we either have
1 space of seperation or a `:` between command arguments usually.

:::

#### Example usage

```bash
polykey secrets create ./API_ACCESS_KEY.txt my-api-vault:API_ACCESS_KEY
```

This command cloned the `API_ACCESS_KEY.txt` file from the terminal's working
directory and saved it in a vault named `my-api-vault`, specifying the
secretName alias as `API_ACCESS_KEY`. We could have also provided the secretName
alias as `API.ACCESS_KEY.txt` but for most text files in Polykey, specifying the
file type extension is redundant.

:::tip Tip

Since the secret or `<secretName>` stored in the vault does not specify the file
type in its metadata, when you are storing binary files such as images or
videos, you may want to specify the file extension in the `secretName` alias for
better access & manageability.

:::

## Listing Secrets

:::note Note

**List all Available Secrets for a Vault**

**Usage:** `polykey secrets ls|list [options] <vaultName>`

**Arguments:**

**vaultName:** Name of the vault to list secrets from

:::

To list the secret file(s) stored within a specific vault in your default
nodePath, use:

### Command Arguments:

```bash
polykey secrets ls <vaultName>
```

#### Example Usage

In this case, there's just one secret file contained in this vault, the secret
we created in the previous example.

```bash
$ polykey secrets ls my-api-vault
API_ACCESS_KEY
```

:::tip Secure Deletion of Local Secrets

After adding a secret to a vault, securely delete the local copy if it's no
longer needed. This ensures that no unsecured traces of sensitive information
remain on your local filesystem.

:::

## Retreiving Secrets

Retrieve a secret from the given vault using the polykey secrets get command.
This command accesses the encrypted content within a vault and outputs it,
allowing for further handling depending on the file type.

:::note Note

Retrieve a secret from the given vault

**Usage:** `polykey secrets cat [options] <secretPath>`

**Arguments:**

**secretPath:** Path to where the secret to be retrieved,

specified as `<vaultName>:<directoryPath>`

:::

### Text and Binary File Handling

The nature of the file affects how it is handled when retrieved:

- **Text Files:** Files such as .txt, .cfg, or script files like .sh are
  inherently text-based and can be displayed directly in the terminal. This
  feature is useful for quick checks and edits directly from the command line.

- **Binary Files:** Files like images, executables, or other non-text formats
  are binary files. These do not display readable content directly in the
  terminal and must be handled differently.

### Retrieving a text file

To view the contents of a text file stored in a vault directly from the
terminal, use the following command:

```bash
polykey secrets cat <vaultName>:<secretName>
```

#### Example

Retrieve the contents of the `API_ACCESS_KEY` stored in `my-vault`

```shell
$ polykey secrets cat my-vault:API_ACCESS_KEY
AKfjd39jdi3903KDje93j04j0
```

This method displays text files directly in the terminal, providing immediate
access to the contents.

### Retrieving a binary file

Binary files, such as images or executables, need to be handled appropriately to
view or use their contents correctly.

#### Steps to Retrieve a Binary File

To retrieve and handle a binary file, specify the output format by redirecting
the output to a file with the appropriate file extension:

```bash
polykey secrets cat <vaultName>:<secretName> > <fileName>.<ext>
```

This command saves the binary content into a file in the current local
directory, preserving the file type as indicated by the extension `<ext>`.

#### Example

Retrieve an image stored in a vault and view it using system-specific commands:

```bash
$ polykey secrets cat my-NFT:Dali.png > Dali.png
$ open Dali.png
```

:::note Note

The use of `>` in the command line is a standard Unix redirection operator, used
here to direct the output from Polykey into a file. This operation is necessary
for handling binary files that require specific applications to open.

:::

:::tip Tip

Ensure the secret name includes the file extension (like Dali.png), which helps
clarify the file type when saving and accessing the retrieved file.

:::

## Creating a Directory of Secrets

To create a directory within a vault, use the polykey secrets mkdir command.
This command allows you to organize your secrets into directories within a
vault.

```bash
polykey secrets mkdir <vaultName>:<directoryPath>
```

### Example

To create a directory named "NFTs" within the "my-image-vault":

```bash
polykey secrets mkdir my-image-vault:NFTs
```

### Adding a Secret to a Directory in a Vault

After creating a directory, you can add secrets to it. This helps in organizing
similar types of secrets under a common directory.

```bash
polykey secrets create <filePath> <vaultName>:<directoryPath>/<secretName>
```

#### Example

To add the file "Dali.png" as a secret named "Dali.png" to the "NFTs" directory
within "my-image-vault":

```bash
polykey secrets create ./Dali.png my-image-vault:NFTs/Dali.png
```

:::note Note

To view secrets saved within a directory in a vault, using the
`polykey secrets ls <vaultName>` command for that vault will output all secrets
in the directory, _not_ the entire vault.

**Example Usage**

```bash
$ polykey secrets ls my-image-vault
NFTs/
$ polykey secrets ls my-image-vault:NFTs
NFTs/Dali.png
```

:::

## Renaming a Secret

To rename an existing secret:

```bash
polykey secrets rename <vaultName>:<oldSecretName> <newSecretName>
```

:::tip Tip

Use the `secrets ls` command to check on your renamed secretFile.

:::

## Updating a Secret

To update the contents of an existing secret:

```bash
polykey secrets write <vaultName>:<secretName>
```

### Example

```bash
$ cat ./rare-dali.png | polykey secrets write my-image-vault:nfts/dali.png
```

:::info Info

This is essentially replacing the file content of an existing secret while
preserving the identity of the secret. One way to verify that the update was
performed sucesfully is by viewing the mtime (modified time) timestamp from the
`secrets stat` command.

:::

## Retrieving Secret Metadata

To view metadata about a secret:

```bash
polykey secrets stat <vaultName>:<secretName>
```

### Example

```bash
polykey secrets stat my-image-vault:NFTs/Dali.png
```

```bash
$ polykey secrets stat myvault:file
dev      	0
ino      	124
mode     	16877
nlink    	2
uid      	0
gid      	0
rdev     	0
size     	0
atime    	Fri Aug 16 2024 16:55:58 GMT+1000 (Australian Eastern Standard Time)
mtime    	Mon Aug 19 2024 12:21:30 GMT+1000 (Australian Eastern Standard Time)
ctime    	Mon Aug 19 2024 12:21:30 GMT+1000 (Australian Eastern Standard Time)
birthtime	Fri Aug 16 2024 16:55:58 GMT+1000 (Australian Eastern Standard Time)
blksize  	0
blocks   	0
```

:::note

**Understanding Metadata Terms**

- **dev:** Device number on which the file resides.
- **ino:** File's inode number.
- **mode:** File permission and type encoded in numeric format.
- **nlink:** Number of hard links.
- **uid:** User ID of file's owner.
- **gid:** Group ID of file's owner.
- **rdev:** Device ID (if special file).
- **size:** File size in bytes.
- **atime:** Last access timestamp.
- **mtime:** Last modification timestamp.
- **ctime:** Last status change timestamp.
- **birthtime:** Creation time of the file.
- **blksize:** Block size for filesystem I/O.
- **blocks:** Number of 512-byte blocks allocated.

:::

## Deleting Secrets

To remove a secret from a vault:

```bash
polykey secrets rm <vaultName>:<secretName>
```

### Example

```bash
$ polykey secrets ls my-image-vault:nfts
nfts/dali.png
nfts/some-image.png
$ polykey secrets rm my-image-vault:nfts/some-image.png
# Note the lack of output
$ polykey secrets ls my-image-vault:nfts
nfts/dali.png
```

## Editing Secrets

To edit a secret directly within a vault using Polykey:

```bash
polykey secrets edit <vaultName>:<secretName>
```

:::warning Warning

The command `polykey secrets edit` on MacOS has a bug that we are investigating.
Use `polykey secrets update` in the meantime.

:::
