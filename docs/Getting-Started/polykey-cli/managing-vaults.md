# Managing Vaults

## Introduction

Vaults in Polykey are secure containers where you can store and manage secrets
like passwords, tokens, certificates, and keys. Vaults are encrypted and only
accessible within your Polykey node. This section covers the basics of managing
vaults, including creating, listing, deleting, viewing vault history, and
renaming them.

## Creating a Vault

To create a new vault, use the following command:

```bash
polykey vaults create <vaultName>
```

#### Example

Create a new vault named `myvault`:

```bash
polykey vaults create myvault
```

#### Example Output

```bash
Vault zUvPxC9aKNw94E1yR9dffzY created successfully
```

## Listing Vaults

To see all the vaults you have, use the list command. This provides a simple way
to view all vault names and their identifiers.

```bash
polykey vaults list
```

#### Example Output

```bash
my-software-project	zD8XRJw2SoRoUW5e2mBR9tJ
myvault            	zD3cWJLBDEMWcbwNbjuUevo
myvault-101        	zErezdpLocYs1VRZPV3wcqS
```

## Deleting a Vault

If you need to remove a vault, you can delete it using the delete command:

```bash
polykey vaults delete <vaultName>
```

#### Example

Delete the vault named myvault:

```bash
polykey vaults rm myvault
```

This operation does not produce output on successful execution, indicating the
vault has been removed.

## Viewing Vault History

Each vault maintains a version history which tracks changes over time. Use the
log command to view the history of commits to a vault.

```bash
polykey vaults log <vaultName>
```

#### Example

View the log for `my-software-project`:

```bash
polykey vaults log my-software-project
```

#### Example Output

```bash
commitId   b568873376cd74a6c58755f73d1068cbb52cbc84
committer  vgijtpv0h8m1eajeir77g73muq88n5kj0413t6fjdqsv9kt8dq4pg
timestamp  Tue May 14 2024 21:27:52 GMT-0600 (Mountain Daylight Time)
message    "AWS_SECRET_ACCESS_KEY added\n"
commitId   4d664db1f90f4c03d6c72be0fba4d3d1a3e7bda0
committer  vgijtpv0h8m1eajeir77g73muq88n5kj0413t6fjdqsv9kt8dq4pg
timestamp  Tue May 14 2024 21:27:43 GMT-0600 (Mountain Daylight Time)
message    "AWS_ACCESS_KEY_ID added\n"
```

## Renaming a Vault

To change the name of an existing vault, use the rename command. This allows you
to update the vault's name to something more descriptive or appropriate.

```bash
polykey vaults rename <oldVaultName> <newVaultName>
```

#### Example

Rename `myvault-1` to `myvault-101`:

```bash
polykey vaults rename myvault-1 myvault-101
```

Confirm the rename by running:

```bash
polykey vaults list
```

## Conclusion

Managing vaults is a foundational skill in using Polykey effectively. This
section has guided you through the essential commands needed to create, manage,
and organize your vaults within Polykey. Further capabilities such as setting
permissions, sharing vaults, and pulling vaults from other nodes will be covered
in the Secrets Management section of our documentation. These basic
functionalities ensure that your secrets are well-organized and secure within
the network.

For a full list of vault commands and options, run:

```bash
polykey vaults -h
```
