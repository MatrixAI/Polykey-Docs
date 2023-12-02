# Getting Started

## KeyManager

This class is responsible for managing the public and private keys as well as any crypto operations using those keys. The symmetric vault keys are also managed by this instance.

The KeyManager is able to be loaded separately to the PolyKey main class and then passed into PolyKey. This is useful for loading the keypair prior to initializing PolyKey.

```
// Initialize key manager first
const keyManager = new KeyManager()
await keyManager.loadKeyPair('./keys/private.key', './keys/public.key')

// Initialize polykey instance
const pk = new PolyKey(keyManager)
```

### Key Generation

The key manager class can generate new symmetric keys using key derivation and the loaded private key

```
const newKey = await keyManager.generateKey('secret passphrase')
```
