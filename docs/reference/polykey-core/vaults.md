# Vaults

Vaults are Polykey's method of securely storing secrets and information. Multiple vaults can be created which contain multiple secrets. These vaults are able to be securely transferred between nodes.

## Vaults

Each vault has a unique id, which is generated when it gets created. It is generated using Base58, and stored in the encryptedfs under its id. Within Polykey, the ID gets mapped to the vault, the current vaultName as well as the vaultKey, and in leveldb, the name and key gets stored under the ID.

## Secrets

Vaults maintain their own encrypted file system (EFS) along with a virtual file system (VFS) to store secrets within their respective vault directories contained within the [`polykey` directory](/README.md). The EFS (https://gitlab.com/MatrixAI/Engineering/Polykey/js-encryptedfs) uses AES-256-GCM to encrypt data. In polykey, the respective vault keys are passed into the EFS for encryption and decryption. The cryptographic operations are performed in the VFS to maintain security.

Each vault has a key that is used to lock and unlock secrets. These keys are stored in the `VaultManager` as:

```ts
type VaultKeys = { [key: string]: VaultKey };
```

To ensure security when they are stored on disk, asymmetric encryption takes place on each vault key, using the Root Public Key. These keys are then stored on disk using the `level` library. For accessing secrets within a vault, the relevant key can be extracted from the `level` database which is then decrypted using the Root Private Key. Then this vault key can be used to access secrets.

When the `VaultManager` is started, if metadata is found, then it is decrypted, and loaded into memory.

### Metadata

Metadata is stored using `leveldb`, under `~/.local/share/polykey/vaultKeys`. It is simply a key-value store, and it is being used to store `vaultNames` as key, and the encrytped vault key as the value. It is updated on every relevant `VaultManager` operation including:

- `addVault`
- `renameVault`
- `deleteVault`

### Encrypted File System

EFS stores the data in the following form:

`| salt (random, safeguards secrets) | init vector (random, initial state) | auth tag (verify data has not been modified) | encrypted data |`

A virtual file system (VFS) is also passed to the encrypted files system, in order to create the in-memory file system. Two operations can be performed using the Encrypted File System; reads and writes. In order to maintain security, the secrets are decrypted in memory and not on disk. For write operations, the encrypted file is stored on disk and then stored in memory using the Virtual File System. In read operations, the file is accessed on disk then stored and decrypted in memory using the Virtual File System.

## Specification

## `VaultManager`

The `VaultManager` class is responsible for handling the many vaults a polykey instance would have. It contains a mapping of the vault name to the [`Vault`](#Vault) object along with functions manage the vaults. This is what is exported from the `Vaults` module.

---

### `type VaultKey`

Buffer of a vault key

---

### `type VaultKeys`

- `[key: string]: VaultKey`

Associates key names with their key value

---

### `type Vaults`

- `[key: string]: Vault`

Associates vault names with their vault class

---

#### `new VaultManager(...)`

Takes an object with the following properties:

- `baseDir`: The base directory of the vaults
- `keyManager`: A keyManager object
- `fs?`: A filesystem object, defaults to `fs/promises`
- `logger?`: Logger for outputting information, defaults to a `new Logger()`

Constructs an instance of vault manager. The VaultManager needs to be started with `start()`

---

#### `public async start(): void`

Starts the vault manager

---

#### `public async stop(): void`

Stops the vault manager

---

#### `public async started(): Promise<boolean>`

Checks to see whether or nor the current VaultManager instance has been started. This will be of use when ensuring that the VaultManager is fully initialized before attempting any changes, such as refreshing root keys.

---

#### `public async addVault(vaultName: string): Promise<Vault>`

- `vaultName`: Name of vault

Adds a new vault. Returns the new vault if successful.

- Throws `ErrorVaultDefined` exception if the vault name already exists in this `VaultManager`.

Also generates a new vault key and writes encrypted vault metadata to disk.

---

#### `public async renameVault(currVaultName: string, newVaultName: string): Promise<boolean>`

- `currVaultName`: Current name of vault
- `newVaultName`: New name of vault

Renames an existing vault. Returns a boolean describing the success of the operation.

- Throws `ErrorVaultUndefined` exception if name of current vault does not exist
- Throws `ErrorVaultDefined` if the new vault name already exists.

Updates references to vault keys and writes new encrypted vault metadata to disk.

---

#### `public deleteVault(vaultName: string): boolean`

- `vaultName`: Name of vault to be deleted

Delete an existing vault. Deletes file from filesystem and updates mappings to vaults and vaultKeys. If it fails to delete from the filesystem, it will not modify any mappings and return false.

- Throws `ErrorVaultUndefined` if vault name does not exist.

---

#### `public getVault(vaultName: string): Vault`

- `vaultName`: Name of vault to get

Retrieves a Vault instance from the vault manager's mapping of vaults.

- Throws `ErrorVaultUndefined` if the name given does not exist.

---

#### `public listVaults(): string`

Retrieve all the vaults for current node, returns an Array of vault names managed currently by the vault manager.

---

#### `public scanNodeVaults(nodeId: string): string`

- `nodeId`: ID of node to list vaults for

List all vaults for a node given a nodeId. Returns an string of vault names.

---

#### `public pullVault(vaultName: string, nodeId: string): boolean`

- `vaultName`: Name of vault to pull
- `nodeId`: ID of node to pull from

Pull a vault from another node.

Returns `true` if successful. If the vault exists then the vault is pulled, changing the contents of the vault in the EFS by calling the corresponding `pullVault` function for the vault. If it doesn't exist then the vault is cloned and the contents of the vault are written using the EFS.

- Throws `ErrorVaultUndefined` if the vault does not exist on the nodeIds store
- Throws `ErrorNodeUndefined` if the node is not discoverable (in the node domain).

---

#### `public reencryptVaultData(): void`

When keypair is rotated, decrypt vault data and reencrypt with new keypair

---

#### `private async writeVaultData(): Promise<void>`

Writes encrypted vault data to disk. This includes encrypted vault keys and names. The encryption is done using the root key

---

#### `private async putValueLeveldb(vaultName: string, vaultKey: Buffer): Promise<void>`

- `vaultName` name of vault
- `vaultKey` vault key

Puts the vaultName value and the encrypted value for vaultKey into the leveldb

---

#### `private async deleteValueLeveldb(vaultName: string): Promise<void>`

- `vaultName` name of vault

Deletes the vault from the leveldb

---

#### `private async loadVaultData(): Promise<void>`

Load existing vaults data into memory from vault metadata path. If metadata does not exist, does nothing.
This method is called at the during the `start()` method and will attempt to populate the `vaults` and `vaultKeys` mappings of the `VaultManager` based on the information in the metadata.

---

## `Vault`

This class represents the Vaults inside polykey, including functionality to manage its secrets, and git functionalities. Vaults are generally handled through the VaultManager.

```ts
const vaultManager = new VaultManager(...);
await vaultManager.addVault('MyVault');
const vault = vaultManager.getVault('MyVault');
// Create the vault, and initialize the vault's git repository for use
await vault.create();
await vault.initializeVault();

// Add a secret
await vault.addSecret("MySecret", "my-banking-details");
```

---

### `type NodePermissions`

- `canPull`: Indicates the ability of to pull the vault

Contains all the permissions and their values. At this stage, only pulling is implemented.

---

### `type ACL`

- `[key: string]: NodePermissions`

Associates a node ID with a node permissions instance

---

### `type FileChange`

- `fileName`: The name of the file that has been changed
- `action`: The action performed on the file (added, removed, modified)

Contains the change information for a file

---

### `type FileChanges = Array<FileChange>`

Alias for a list of file changes

---

#### `new Vault(...)`

- `baseDir`: The base vault directory
- `vaultName`: The name of the vault
- `nodePermissions`: Indexed object of nodes and their permissions
- `efs`: The encrypted file system for the vault
- `mutex`: The mutex of the vault for blocking actions to a directory
- 'logger`: The logger of the vault for outputting information

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

- `nodeId`: ID of node to pull from

Pulls the vault changes from a nodeId. No exceptions occur as the node ID has already been connected to and the existence of the vault has been checked by the VaultManager.

---

#### `public async addSecret(secretName: string, content: Buffer): Promise<boolean>`

- `secretName`: Name of secret
- `content`: Content of the secret

Adds a secret to the vault.

Returns `true` if success.

- Throws `ErrorSecretExists` if a secret of the same name already exists or a directory of the same name exists
- Throws `ErrorGitFile` exception if the file is a `.git` file
- Throws `ErrorVaultUnintialised` if secret is added without the vault being initialised

---

#### `public async addSecretDirectory(secretDirectory: string): Promise<void>`

- `secretDirectory`: Path to secret on disk

Adds a secret to the vault.

Returns `true` if success. If a secret of the same name already exists or a directory of the same name exists, that directory/secret will be updated.

- Throws `ErrorGitFile` if a secret is a `.git` file
- Throws `ErrorVaultUninitialised` if a secret is being added without the vault being initialised

---

#### `public changePermissions(nodeId: string, newPermissions: NodePermissions): void`

- `nodeId`: ID of node
- `newPermissions`: Permission(s) to change to

Changes the permissions of a node

---

#### `public checkPermissions(nodeId: string): NodePermissions`

- `nodeId`: ID of node to check permissions for

Returns the permissions of a node in the form of NodePermissions. Inside the NodePermissions return there will be fields which indicate the ability of the node with a boolean. Currently there is only functionality for pulling, therefore only the canPull field will exist.

---

#### `public async renameVault(newVaultName: string): Promise<boolean>`

- `newVaultName`: The name that the vault should be renamed to

Changes the name of the vault in memory and in the encrypted file system

---

#### `public async updateSecret(secretName: string, content: Buffer): Promise<void>`

- `secretName`: Name of secret to update
- `content`: New content of secret

Changes the contents of a secret

---

#### `public async renameSecret(currSecretName: string, newSecretName: string): Promise<boolean>`

- `currSecretName`: Current name of secret
- `newSecretName`: New name of secret

Changes the name of a secret in a vault: Returns `true` on success.

- Throws `ErrorGitFile` is the currSecretName or newSecretName is '.git'
- Throws `ErrorSecretDefined` if the new name of the secret already exists

---

#### `public async listSecrets(): Promise<string>`

Retrieves a list of the secrets in a vault: Returns secrets as a string.

---

#### public getSecret(secretName: string): Buffer | string;

- `secretName`: Name of secret

Returns the contents of a secret. Uses the EFS to synchronously read in the contents of the file that has the secret name.

- Throws `ErrorSecretUndefined` if secret with specified name does not exist

---

#### `public async deleteSecret(secretName: string, recursive: boolean): Promise<boolean>`

- `secretName`: Name of secret to delete
- `recursive`: Recursively delete secrets within

Removes a secret from a vault: Returns `true` on success.

- Throws `ErrorGitFile` if secretName is '.git'
- Throws `ErrorRecursiveDelete` if the specified secret is a directory but the deletion is not recursive
- Throws `ErrorSecretUdefined` if the secret does not exist

---

#### `private async commitChanges(fileChanges: FileChanges, message: string)`

- `fileChanges`: List of file changes
- `message`: Commit message

Helper Method that commits the changes made to a vault repository

---

#### `private writeNodePermissions(): void`

Writes out the stored node permissions

---

#### `private loadNodePermissions(): void`

Loads the node permissions

---

## Vault API

A polykey keynode will have an X.509 root certificate. This certificate is a secure way of presenting information for the keynode’s digital identity. The X.509 certfificate contains an asymmetric keypair, namely a root public key and root private key and that is specific to each keynode. These are 4096 bit RSA keys which are protected by a password when the keynode is initialised. When the passphrase is provided, the root keypair can be used for a number of different functions.

### Vault Access

When a new vault is created, it is sealed using a 256 bit symmetric key. This symmetric key is generated by encrypting a random 256 bit buffer using AES and the root private key. To access the derived vault key, the root private key must be known. Each time a new vault is created, a new 256 bit is generated and stored.

### Secret Access

Within each vault there can be a number of secrets. Each secret is protected with an Encrypted File System, which stores a file using AES-GCM encryption. The data is stored in the following form:

`| salt (random, safeguards secrets) | init vector (random, initial state) | auth tag (verify data has not been modified) | encrypted data |`

A virtual file system is also passed to the encrypted files system, in order to create the in-memory file system. Two operations can be performed using the Encrypted File System; reads and writes. In order to maintain security, the secrets are decrypted in memory and not on disk. For write operations, the encrypted file is stored on disk and then stored in memory using the Virtual File System. In read operations, the file is accessed on disk then stored and decrypted in memory using the Virtual File System.

### Root Keypair Rotation

In some cases, the root keypair will need to be replaced with a new keypair or ‘rotated’. There is no need to generate new vault keys or other instances of encrypted data. Instead, the new root keypair can be generated. Then, the required metadata and vault keys are decrypted using the old root keypair and re-encrypted using the new root keypair. Therefore, PolyKey has now transferred to usage of the new root keypair without the entire removal of all data encrypted by the old root keypair.

### Metadata

In order to keep track of important information after PolyKey has been closed, this data is written on disk. The data that is stored includes the keynode’s gestalt graph, provider tokens, keys and node information. Some of this information, for example the vault keys of a keynode, needs to be encrypted before being stored in order to maintain security. To do this a bip39 mnemonic is encrypted using the root private key and stored on disk. The Encrypted File System mentioned previously then uses this mnemonic to encrypt the relevant data and store it on disk. This data is loaded and decrypted when required to access certain areas of PolyKey.

## Vault Lifecycle

Vaults are encapsulated properties of `VaultManager`. A `Vault` is only constructed by requesting one from the `VaultManager`. That is, whilst a `Vault` has `create`/`destroy`/`start`/`stop` functions, these are **always only called internally by `VaultManager`**. Therefore, note that `Vault` is **not** dependency injected into `VaultManager`: we don't construct a `Vault` and then pass it to the `VaultManager`.

Creating a vault will generate a vault Id and link this to a provided name that is stored in metadata, providing that neither already exists. An encrypted filesystem will be started for the vault. Opening a vault will return the existing live vault (and encrypted filesystem) from the vault map, or will create the vault from existing metadata (if it exists) by starting the encrypted file system assigned to the vault. Closing a vault will remove the vault from the vault map, meaning that a encrypted file system will have to be created. Destroying a vault removes all references to the vault, including metadata and vault contents so that it cannot be opened again.

### TODO: Add details about open/close/create and implications with memory/EFS to relate to this diagram. Also add a list of exceptions for error handling (for example: what happens when we call `destroyVault` on a vault that doesn't exist?) List these exceptions out.

![](http://www.plantuml.com/plantuml/png/ZO_1IiGm48RlUOfXB-gXFi0UP44KFBWU1E-X-PN0x4GoKt7VthH3rRfOlNJedo_p_TcfnMh3WODbOz1J7DY8ypFwOz_-sx51GvWcRVR5YGr5fNqHXF53M-eylnD3bSYKHIrAZoqbnFH5tTm--ivsKA1oPeJthFPfU7Y587spU11yh9euls7cbYvtQA3PSir55nOFWe-_t-FSRnP_RjTTqTp6jzr7YI-ebtr5uwVe_28uC-7ZlPzmWbejnrFQEvyk7zEPTcIbIcdf4lvlaHqa3GV-0000)

Vaults are stored in a `VaultMap`, mapping from the vault ID to the `Vault` itself. Locking is required on this `VaultMap` to ensure consistent creation, destruction, opening, and closing. This `VaultMap` follows the generic `ObjectMap` flow for creation of a vault:

```ts
type ObjectMap = Map<
  ObjectId,
  {
    resource?: Object;
    lock: MutexInterface;
  }
>;
```

![](http://www.plantuml.com/plantuml/png/VL11JiCm4Bpd5NDC3oXtAa4Hue04GkeFGZ9H3AuTrckL_XxNYL6WY9DtPsTclRCBseh6WwroKGadjbe1Pa3zu5HEC0ulhs_izBcTC7XPkiV-TWCTwL2V63OLC8ls33vAH_3J10rdESy-bspWwgPfX1h5GHPPqsoNOL0_vP8s4BNpHNKSZKt0a-_UOGA4bcrW-axgrZowFbFBoXaoG_NRylfUs2fXa-Fs1yAB1FBuQ7HSi--wZsZaBuDoLY7s_JS4zRD_7grtBEJzV5Xn_IUlabOvS9UUUB1V)

---

## Vault Operations

To view and write to the contents of a vault, there are various operations that can be performed on the underlying secrets in the vault. These are specified in the `VaultOps`: a high-level set of functions that operate on the contents of a vault.

Because each vault holds a singleton reference to the `EFS`, these operations take an individual `Vault` as their parameter (or multiple vaults, where the operation performs operations between vaults).

In the future, these will be extended to provide unix operations on and between the contents of vaults (for example, `mv`, `touch`).

---

## Vault Sharing

A vault can be shared with other keynodes (and their respective gestalt) in the wider Polykey network. Although attempts to clone or pull vaults from an unauthorised keynode is disallowed to preserve the security of these vaults. Therefore, an attempt to clone/pull a vault will only be executed if the requesting keynode has the appropriate permissions set by the vault holder.

Permissions are altered in PolyKey by using the `share` and `unshare` commands. Permissions are stored by associating a `vaultId` to a `nodeId` which is then associated with a `vaultAction`. Sharing a vault will set `clone` and `pull` permissions for a particular keynode, however, these permissions will propagate to all other keynodes within its gestalt. Sharing a vault will also grant `scan` permissions to the keynode (and its gestalt). A notification is also sent to the corresponding keynode to alert them that a vault has been shared to them.

If we consider two remote keynodes, `A` and `B`, the cloning process would be as follows:

1. `B` creates vault, `v`
2. `B` shares vault `v` with `A`

   A couple of things occur:

   1. `B` enables the scan, pull, and clone permissions (these changes to the keynode `A`'s permissions propagate to all other known nodes in its gestalt).
   2. `B` sends a notification to `A` to inform them that they can clone/pull the vault (a `VaultShare` notification)

3. `A` clones `v` from `B`

   This cloning process is depicted as follows:

   ### TODO: Add diagram of process. See [#258](https://github.com/MatrixAI/Polykey/issues/258)

Using the same setup, the pulling process would be as follows:

1. `B` creates vault, `v`
2. `B` shares vault `v` with `A`
3. `A` clones `v` from `B`
4. `B` makes changes to vault, `v`
5. `A` pulls `v` from `B`

However, neither the vault to pull from nor the node Id need to be specified in pulling a vault. Each time that a vault is cloned or pulled, the `nodeId` and `vaultId` to pull from are stored as metadata to be used as default behaviour. Changes can also be pulled from other vaults as long as the original vault is the same as the vault that is receiving the changes. However, currently cloned vaults are inherently immutable and so this feature is not useful at this stage. No mutations can be performed on cloned vaults: a mutable copy of the vault needs to be created to do so.

---

## Vault Storage

A `Vault` is an encrypted filesystem, used to store and manage secrets.

Each `Vault` contains a shared, singleton reference to the EFS, and apply their reads and writes to a specific directory on the EFS (matching the vault's ID).

```
┌──────────────────────────────────────────────┐
│                                              │
│                 VaultManager                 │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │                  VaultMap                │ │
│ │           (VaultId -> VaultData)         │ │
│ └─────────────────────┬────────────────────┘ │
│                       │                      │
│        ┌──────────────┼──────────────┐       │
│        │              │              │       │
│ ┌──────▼─────┐ ┌──────▼─────┐ ┌──────▼─────┐ │
│ │ Vault Foo  │ │ Vault Bar  │ │ Vault Baz  │ │
│ │ /123sdf984 │ │ /34891zxf! │ │ /a!?@#8911 │ │
│ └──────┬─────┘ └──────┬─────┘ └──────┬─────┘ │
│        │              │              │       │
│        │              │              │       │
│  ┌─────▼──────────────▼──────────────▼─────┐ │
│  │               EncryptedFS               │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘

```

However, the root of the vaults filesystem is contained inside a contents folder specific for that vault, meaning that a vault cannot access file outside of its containing directory. The `git` metadata is stored inside the vault directory, but outside of the `contents` directory so as to not interfere with any secrets.

```
/vaults
  /aiwr84y3f83f
    /.git
    /contents
      secret-1
      secret-2
```

---

## Vault Versioning

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

### TODO: textually expand on diagram (from [#258](https://github.com/MatrixAI/Polykey/issues/258))
