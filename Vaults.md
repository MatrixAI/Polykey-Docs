Vaults are Polykey's method of securely storing secrets and information. Multiple vaults can be created which contain multiple secrets. These vaults are able to be securely transferred between nodes.

## Secrets

Vaults maintain their own encrypted file system (EFS) along with a virtual file system (VFS) to store secrets within their respective vault directories contained within the [`polykey` directory](./Home.md#polykey-directory). The EFS (https://gitlab.com/MatrixAI/Engineering/Polykey/js-encryptedfs) uses AES-256-GCM to encrypt data. In polykey, the respective vault keys are passed into the EFS for encryption and decryption. The cryptographic operations are performed in the VFS to maintain security.

**Current Implementation**

Currently, vault Keys are encrypted and stored on disk using an encrypted file system (EFS). This EFS uses AES-CBC and a mnemonic to encrypt the keys. The mnemonic itself is encrypted the the Root Private Key and stored on disk. This allows this data to be stored and loaded when stopping and starting Polykey. A secret inside a vault is also protected with EFS, using AES-CBC encryption with the Root Private Key.

**Intended Implementation**

Each vault has a key that is used to lock and unlock secrets. These keys are stored in the `VaultManager` as:
```ts
type VaultKeys = {[key: string]: VaultKey};
```

To ensure security when they are stored on disk, asymmetric encryption takes place on each vault key, using the Root Public Key. These keys are then stored on disk using the `level` library. For accessing secrets within a vault, the relevant key can be extracted from the `level` database which is then decrypted using the Root Private Key. Then this vault key can be used to access secrets.

### Encrypted File System

EFS stores the data in the following form:

`| salt (random, safeguards secrets) | init vector (random, initial state) | auth tag (verify data has not been modified) | encrypted data |`

A virtual file system (VFS) is also passed to the encrypted files system, in order to create the in-memory file system. Two operations can be performed using the Encrypted File System; reads and writes. In order to maintain security, the secrets are decrypted in memory and not on disk. For write operations, the encrypted file is stored on disk and then stored in memory using the Virtual File System. In read operations, the file is accessed on disk then stored and decrypted in memory using the Virtual File System.

# Specification
## `VaultManager`
The `VaultManager` class is responsible for handling the many vaults a polykey instance would have. It contains a mapping of the vault name to the [`Vault`](#Vault) object along with functions manage the vaults. This is what is exported from the `Vaults` module.

---
### `type VaultKey`

Buffer of a vault key

---
### `type VaultKeys`
* `[key: string]: VaultKey`

Associates key names with their key value

---
### `type Vaults`
* `[key: string]: Vault`

Associates vault names with their vault class

---
#### `new VaultManager(...)`
* `baseDir`: The base directory of the vaults
* `logger`: Logger for outputting information
* `vaults`: Indexed object containing names and instances of Vaults
* `vaultKeys`: Indexed object of key names and associated keys for each vault

Constructs an instance of vault manager.

---
#### `public async start(): void`
Starts the vault manager

---

#### `public async stop(): void`
Stops the vault manager

---

#### `public async addVault(vaultName: string): Promise<Vault>`
* `vaultName`: Name of vault

Adds a new vault. Returns the new vault if successful.
Throws `ErrorVaultDefined` exception if the vault name already exists in this `VaultManager`.

---

#### `public renameVault(currVaultName: string, newVaultName: string): boolean`
* `currVaultName`: Current name of vault
* `newVaultName`: New name of vault

Renames an existing vault. Returns a boolean describing the success of the operation. Throws 'ErrorVaultUndefined' exception if name of current vault does not exist, of 'ErrorVaultDefined' if the new vault name already exists.

---

#### `public deleteVault(vaultName: string): boolean`
* `vaultName`: Name of vault to be deleted

Delete an existing vault. Returns `true` if successful. Throws 'ErrorVaultUndefined' if the vault name does not exist.

---

#### `public getVault(vaultName: string): Vault`
* `vaultName`: Name of vault to get

Retrieves a Vault instance from the vault manager's mapping of vaults. Throws a `ErrorVaultUndefined` exception if the name given does not exist.

---

#### `public listVaults(): string`

List all vaults for the current node. Returns a string of vault names.

---

#### `public scanNodeVaults(nodeId: string): string`
* `nodeId`: ID of node to list vaults for

List all vaults for a node given a nodeId. Returns an string of vault names.

---

#### `public pullVault(vaultName: string, nodeId: string): boolean`
* `vaultName`: Name of vault to pull
* `nodeId`: ID of node to pull from

Pull a vault from another node. Returns `true` if successful. If the vault exists then the vault is pulled, changin the contents of the vault in the EFS. If it doesn't exist then the vault is cloned and the contents of the vault are written using the EFS. Throws an `ErrorVaultUndefined` if the vault does not exist on the nodeIds store and an `ErrorNodeUndefined` if the node is not discoverable (in the node domain).

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

### `type NodePermissions`
* `canPull`: Indicates the ability of to pull the vault

Contains all the permissions and their values. At this stage, only pulling is implemented.

---

### `type ACL`
* `[key: string]: NodePermissions`

Associates a node ID with a node permissions instance

---

### `type FileChange`
* `fileName`: The name of the file that has been changed
* `action`: The action performed on the file (added, removed, modified)

Contains the change information for a file

---

### `type FileChanges = Array<FileChange>`

Alias for a list of file changes

---

#### `new Vault(...)`
* `baseDir`: The base vault directory
* `vaultName`: The name of the vault
* `nodePermissions`: Indexed object of nodes and their permissions
* `efs`: The encrypted file system for the vault
* `mutex`: The mutex of the vault for blocking actions to a directory
* 'logger`: The logger of the vault for outputting information

Creates an instance of a vault, takes in a `key` which is passed to the `efs`.

---

#### `public async create()`
Creates the vault directory.

---

#### `public async destroy()`
Destroys a vault.

---

#### `public async initializeVault(): Promise<void>`
Initializes the repository for the vault

---

#### `public async vaultStats(): Promise<fs.Stats>`
Retrieves stats for a vault. Returns an fs.Stats object which is serializable.
---

#### `public pullVault(nodeId: string): void`
* `nodeId`: ID of node to pull from

Pulls the vault changes from a nodeId. No exceptions occur as the node ID has already been connected to.

---

#### `public cloneVault(nodeId: string): void`
* `nodeId`: ID of node to pull from

Clones the vault repository from a nodeId. No exceptions occur as the node ID has already been connected to.

---

#### `public async addSecret(secretName: string, content: Buffer): Promise<boolean>`
* `secretName`: Name of secret
* `content`: Content of the secret


Adds a secret to the vault. Returns `true` if success. If a secret of the same name already exists or a directory of the same name exists, an 'ErrorSecretExists' exception will be thrown. TODO: Ensure .git is not added, how?

---

#### `public changePermissions(nodeId: string, newPermissions: NodePermissions): void`
* `nodeId`: ID of node
* `newPermissions`: Permission(s) to change to

Changes the permissions of a node

---

#### `public checkPermissions(nodeId: string): NodePermissions`
* `nodeId`: ID of node to check permissions for

Returns the permissions of a node in the form of NodePermissions. Inside the NodePermissions return there will be fields which indicate the ability of the node with a boolean. Currently there is only functionality for pulling, therefore only the canPull field will exist.

---

#### `public async renameVault(newVaultName: string): Promise<boolean>`
* `newVaultName`: The name that the vault should be renamed to

Changes the name of the vault in memory and in the encrypted file system

---

#### `public async updateSecret(secretName: string, content: Buffer): Promise<void>`
* `secretName`: Name of secret to update
* `content`: New content of secret

Changes the contents of a secret

---

#### `public async renameVault(newSVaultName: string): Promise<boolean>`
* `newVaultName`: New name of vault

Changes the name of the vault: Returns `true` on success.

---

#### `public async renameSecret(currSecretName: string, newSecretName: string): Promise<boolean>`
* `currSecretName`: Current name of secret
* `newSecretName`: New name of secret

Changes the name of a secret in a vault: Returns `true` on success.

---

#### `public async listSecrets(): Promise<string>`
Retrieves a list of the secrets in a vault: Returns secrets as a string.

---

#### public getSecret(secretName: string): Buffer | string;
* `secretName`: Name of secret

Returns the contents of a secret. Uses the EFS to synchronously read in the contents of the file that has the secret name.

---

#### `public async deleteSecret(secretName: string, recursive: boolean): Promise<boolean>`
* `secretName`: Name of secret to delete
* `recursive`: Recursively delete secrets within

Removes a secret from a vault: Returns `true` on success. Throws exceptions if the Secret does not exist in the vault of if the secret is a directory and recursive is not true

---

#### `private async commitChanges(fileChanges: FileChanges, message: string)`
* `fileChanges`: List of file changes
* `message`: Commit message

Helper Method that commits the changes made to a vault repository

---

#### `private writeNodePermissions(): void`
Writes out the stored node permissions

---

#### `private loadNodePermissions(): void`
Loads the node permissions

---
