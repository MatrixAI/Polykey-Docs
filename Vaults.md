# Vaults

Vaults are Polykey's method of securely storing secrets and information. Multiple vaults can be created which contain multiple secrets. Each vault is a separate folder within the [`polykey` directory](./Home.md#polykey-directory). 

Vault Keys are encrypted and stored on disk using an encrypted file system (EFS). This EFS uses AES-CBC and a mnemonic to encrypt the keys. The mnemonic itself is encrypted the the Root Private Key and stored on disk. This allows this data to be stored and loaded when stopping and starting Polykey. A secret inside a vault is also protected with EFS, using AES-CBC encryption with the Root Private Key.

**Intended Implementation**

Each vault has a key that is used to lock and unlock it. These keys are stored in the `VaultManager` as:
```ts
type VaultKeys = {[key: string]: VaultKey};
```

These are encrypted and stored on disk, using asymmetric encrryption, using the Root Public Key. Decryption of this structure is done using the Root Private Key.

### Encrypted File System

EFS stores the data in the following form:

`| salt (random, safeguards secrets) | init vector (random, initial state) | auth tag (verify data has not been modified) | encrypted data |`

A virtual file system (VFS) is also passed to the encrypted files system, in order to create the in-memory file system. Two operations can be performed using the Encrypted File System; reads and writes. In order to maintain security, the secrets are decrypted in memory and not on disk. For write operations, the encrypted file is stored on disk and then stored in memory using the Virtual File System. In read operations, the file is accessed on disk then stored and decrypted in memory using the Virtual File System.

### Git

In order to share secrets and vaults, the `isomorphic-git` library will be used.

# Specification
## `VaultManager`
The `VaultManager` class is responsible for handling the many vaults a polykey instance would have. It contains a mapping of the vault name to the [`Vault`](#Vault) object along with functions manage the vaults. This is what is exported from the `Vaults` module.

---
#### `new VaultManager(...)`
* `attributes`
TODO

---
#### `public async start(): void`
Starts the vault manager

---

#### `public async stop(): void`
Stops the vault manager

---

#### `public addVault(name: string): boolean`
* `name`: Name of vault

Adds a new vault. Returns `true` if successful

---

#### `public renameVault(currName: string, newName: string): boolean`
* `currName`: Current name of vault
* `newName`: New name of vault

Renames an existing vault. TODO: Behaviour if vault does not exist? if the name is same? What should it return on success

---

#### `public deleteVault(name: string): boolean`
* `name`: Name of vault to be deleted

Delete an existing vault. Returns `true` if successful

---

#### `public getVault(name: string): Vault`
* `name`: Name of vault to get

Retrieves a Vault instance from the vault manager's mapping of vaults. TODO: Behaviour if vault does not exist? should it be Vault | undefined? Returns a `Vault` object.

---

#### `public listVaults(nodeId: string): Array<Vault>`
* `nodeId`: ID of node to list vaults for

List all vaults for a node given a nodeId. Returns an Array of `Vault` objects.

---

#### `public pullVault(name: string, nodeId: string): boolean`
* `name`: Name of vault to pull
* `nodeId`: ID of node to pull from

Pull a vault from another node. Returns `true` if successful. TODO: does this function do any side effects? What happens if `name` / `nodeId` is incorrect?

---

#### `public shareVault(name: string, nodeId: string): void`
* `name`: Name of vault to share
* `nodeId`: ID of node

Change a nodes permission rights for a vault TODO: This will have to be expanded. What permissions should be used for what purpose?

---

#### `public reencryptVaultData(): void`
When keypair is rotated, decrypt vault data and reencrypt with new keypair

---

#### `private writeVaultData(): void`
Store existing vaults data on disk (keys, names)

---

#### `private loadVaultData(): void`
Load existing vaults data into memory (keys, names)

---

## `Vault`

This class represents the Vaults inside polykey, including functionality to manage its secrets, and git functionalities.

---
#### `public initializeVault(): void`
Creates the repositiory for the vault. TODO: Where?

#### `public vaultStats(): fs.Stats`
Retreives stats for a vault. TODO: what do these stats look like?

---
#### `public pullVault(nodeId: string): void`
* `nodeId`: ID of node to pull from

Pulls this vault from a nodeId. TODO: What happens in exception cases?

---
#### `public addSecret(name: string, content: Buffer): boolean`
* `name`: Name of secret
* `content`: Content of the secret


Adds a secret to the vault. Returns `true` if success. TODO: can this fail? when and how?

---
#### `public changePermissions(nodeId: string, canEdit: boolean): void`
* `nodeId`: ID of node
* `canEdit`: Permission to change to

Changes the editing permissions of a node

---
#### `public checkPermissions(nodeId: string): boolean`
* `nodeId`: ID of node to

Returns the editing permissions of a node. TODO: What does this return? true if it can be edited? what does this mean

---
#### `public updateSecret(name: string, content: Buffer): void`
* `name`: Name of secret to update
* `content`: New content of secret

Changes the contents of a secret

---
#### `public renameSecret(currName: string, newName: string): boolean`
* `currName`: Current name of secret
* `newName`: New name of secret

Changes the name of a secret in a vault: Returns `true` on success.

---
#### `public listSecrets(): Array<string>`
Retrieves a list of the secrets in a vault: Returns an Array of secrets as strings.

---

#### public getSecret(name: string): Buffer | string;
* `name`: Name of secret

Returns the contents of a secret. TODO: Expand. how does this work

---
#### `public deleteSecret(name: string, recursive: boolean): boolean`
* `name`: Name of secret to delete
* `recursive`: Recursively delete secrets within

Removes a secret from a vault: Returns `true` on success.

---
#### `private async commitChanges(name: string, message: string)`
* `name`: Name of secret
* `message`: Commit message

Helper Method that commits the changes made to a vault repository

---
#### `private writeNodePermissions(): void`
Writes out the stored node permissions

---
#### `private loadNodePermissions(): void`
Loads the node permissions

---
#### `private reloadSecrets(): void`
Reload secrets from on disk
