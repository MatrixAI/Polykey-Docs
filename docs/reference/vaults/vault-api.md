# Vault API

A polykey keynode will have an X.509 root certificate. This certificate is a secure way of presenting information for the keynode’s digital identity. The X.509 certfificate contains an asymmetric keypair, namely a root public key and root private key and that is specific to each keynode. These are 4096 bit RSA keys which are protected by a password when the keynode is initialised. When the passphrase is provided, the root keypair can be used for a number of different functions.

### Vault Access

When a new vault is created, it is sealed using a 256 bit symmetric key. This symmetric key is generated by encrypting a random 256 bit buffer using AES and the root private key. To access the derived vault key, the root private key must be known. Each time a new vault is created, a new 256 bit is generated and stored.

### Secret Access

Within each vault there can be a number of secrets. Each secret is protected with an Encrypted File System, which stores a file using AES-GCM encryption. The data is stored in the following form:

`| salt (random, safeguards secrets) | init vector (random, initial state) | auth tag (verify data has not been modified) | encrypted data |`

A virtual file system is also passed to the encrypted files system, in order to create the in-memory file system. Two operations can be performed using the Encrypted File System; reads and writes. In order to maintain security, the secrets are decrypted in memory and not on disk. For write operations, the encrypted file is stored on disk and then stored in memory using the Virtual File System. In read operations, the file is accessed on disk then stored and decrypted in memory using the Virtual File System.

### Root Keypair Rotation

In some cases, the root keypair will need to be replaced with a new keypair or ‘rotated’. There is no need to generate new vault keys or other instances of encrypted data. Instead, the new root keypair can be generated. Then, the required metadata and vault keys are decrypted using the old root keypair and re-encrypted using the new root keypair.  Therefore, PolyKey has now transferred to usage of the new root keypair without the entire removal of all data encrypted by the old root keypair.

### Metadata

In order to keep track of important information after PolyKey has been closed, this data is written on disk. The data that is stored includes the keynode’s gestalt graph, provider tokens, keys and node information.  Some of this information, for example the vault keys of a keynode, needs to be encrypted before being stored in order to maintain security. To do this a bip39 mnemonic is encrypted using the root private key and stored on disk. The Encrypted File System mentioned previously then uses this mnemonic to encrypt the relevant data and store it on disk. This data is loaded and decrypted when required to access certain areas of PolyKey.
