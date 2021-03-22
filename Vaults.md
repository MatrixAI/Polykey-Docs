# Vaults

Vaults are Polykey's method of securely storing secrets and information. Multiple vaults can be created which contain multiple secrets. Vault Keys are encrypted and stored on disk using an encrypted file system (EFS). This EFS uses AES-CBC and a mnemonic to encrypt the keys. The mnemonic itself is encrypted the the Root Private Key and stored on disk. This allows this data to be stored and loaded when stopping and starting Polykey. A secret inside a vault is also protected with EFS, using AES-CBC encryption with the Root Private Key.

### Encrypted File System

EFS stores the data in the following form:

`| salt (random, safeguards secrets) | init vector (random, initial state) | auth tag (verify data has not been modified) | encrypted data |`

A virtual file system (VFS) is also passed to the encrypted files system, in order to create the in-memory file system. Two operations can be performed using the Encrypted File System; reads and writes. In order to maintain security, the secrets are decrypted in memory and not on disk. For write operations, the encrypted file is stored on disk and then stored in memory using the Virtual File System. In read operations, the file is accessed on disk then stored and decrypted in memory using the Virtual File System.

### Git

In order to share secrets and vaults, the `isomorphic-git` library will be used.

## Specification

There will be a Vault manager class:

```
interface VaultManager {

  /**
   * Starts vault manager
   */
  public async start(): void {

  };

  /**
   * Stops vault manager
   */
  public async stop(): void {

  };

  /**
   * Add a new vault
   */
  public addVault(name: string): boolean {

  };

  /**
   * Rename an existing vault
   */
  public renameVault(currName: string, newName: String): boolean {

  };
  
  /**
   * Delete an existing vault (return if successful)
   */
  public deleteVault(name: string): boolean {
    
  };
  
  /**
   * Retrieve all the vaults for a node
   */
  public listVaults(nodeId: string): Array<Vault>;
  
  /**
   * Pull a vault from another node
   */
  public pullVault(name: string, nodeId: string): boolean;
  
  /**
   * Change a nodes permission rights for a vault
   */
  public shareVault(name: string, nodeId: string): void;

  /**
   * When keypair is rotated, decrypt vault data and reencrypt
   * with new keypair
   */
  public reencryptVaultData(): void;
  
  /* === Helpers === */
  
  /**
   * Retreieves the Vault instance
   */
  private getVault(name: string): Vault;
  
  /**
   * Store existing vaults data on disk (keys, names)
   */
  private writeVaultData(): void;
  
  /**
   * Load existing vaults data into memory (keys, names)
   */
  private loadVaultData(): void;
}
```
There will also be a Vault class:

```
interface Vault {
      /**
       * Creates the repositiory for the vault
       */
       public initializeVault(): void;

       /**
        * Retreives stats for a vault
        */
       public vaultStats(): fs.Stats;
 
       /**
        * Pulls this vault from a nodeId
        */
       public pullVault(nodeId: string): void;
 
       /**
        * Adds a secret to the vault
        */
       public addSecret(name: string, content: Buffer): boolean;
 
       /**
        * Changes the editing permissions of a node
        */
       public changePermissions(nodeId: string, canEdit: boolean): void;
 
       /**
        * Returns the editing permissions of a node
        */
       public checkPermissions(nodeId: string): boolean;
 
       /**
        * Changes the contents of a secret
        */
       public updateSecret(name: string, content: Buffer): void;
 
       /**
        * Changes the name of a secret in a vault
        */
       public renameSecret(currName: string, newName: string): boolean;
 
       /**
        * Retrieves a list of the secrets in a vault
        */
       public listSecrets(): Array<string>;
 
       /**
        * Returns the contents of a secret
        */
       public getSecret(name: string): Buffer | string;
 
       /**
        * Removes a secret from a vault
        */
       public deleteSecret(name: string, recursive: boolean): boolean;
 
       /* === Helpers === */
 
       /**
        * Commits the changes made to a vault repository
        */
       private async commitChanges(name: string, message: string);
 
       /**
        * Writes out the stored node permissions
        */
       private writeNodePermissions(): void;
 
       /**
        * Loads the node permissions
        */
       private loadNodePermissions(): void;
 
       /**
        * Reload secrets from on disk
        */
       private reloadSecrets(): void;
}
```