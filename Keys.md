The keys domain manages all of the operations relating to keys.

For most operations we use `node-forge`.

For PGP-related operations we use `kbpgp`.

Other alternatives include `PKI.js` and related libraries.

## Types

The relevant types from `node-forge` are all in `pki.rsa`:

```
interface KeyPair {
    publicKey: PublicKey;
    privateKey: PrivateKey;
}

interface PublicKey {
    n: jsbn.BigInteger;
    e: jsbn.BigInteger;
    encrypt(data: Bytes, scheme?: EncryptionScheme, schemeOptions?: any): Bytes;
    verify(digest: Bytes, signature: Bytes, scheme?: SignatureScheme): boolean;
}

interface PrivateKey {
    n: jsbn.BigInteger;
    e: jsbn.BigInteger;
    d: jsbn.BigInteger;
    p: jsbn.BigInteger;
    q: jsbn.BigInteger;
    dP: jsbn.BigInteger;
    dQ: jsbn.BigInteger;
    qInv: jsbn.BigInteger;
    decrypt(data: Bytes, scheme?: EncryptionScheme, schemeOptions?: any): Bytes;
    sign(md: md.MessageDigest, scheme?: SignatureScheme): Bytes;
}
```

In our `keys/KeyManager.ts`, we alias the above types and compose them into PK-specific types.

```ts
import { pki } from 'node-forge';

type RootKey = pki.rsa.KeyPair;
```

```ts
interface KeyManager {
  generateRootKey(): RootKey;
  signWithRootKey(key: RootKey)...
}
```

Anything dealing with random should be using `node-forge` anyway, since we can centralise on a single crypto library to achieve this.