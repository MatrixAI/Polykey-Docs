# Key Management and Storage in Polykey

Key management is the backbone of secure systems, dictating how encryption keys
are generated, stored, shared, and revoked. In Polykey, key management is
designed to balance security, usability, and cryptographic best practices,
ensuring data remains protected without imposing excessive complexity on users.

## Symmetric vs. Asymmetric Encryption

Polykey leverages both symmetric and asymmetric encryption for different parts
of the system.

### Symmetric Encryption

- Uses a shared secret key for both encryption and decryption.
- Highly efficient and fast.
- Requires a secure channel to distribute the shared key.
- Vulnerable to _man-in-the-middle (MITM) attacks_ if the key is intercepted.

### Asymmetric Encryption

- Uses a key pair: a public key (shared openly) and a private key (kept secret).
- The public key encrypts data, and only the corresponding private key can
  decrypt it.
- More computationally expensive but solves the secure key distribution problem.
- A fundamental part of trust-based cryptographic systems.

Polykey employs a hybrid cryptosystem, combining symmetric and asymmetric
encryption to achieve both efficiency and security.

## Key Storage Mechanisms

### Root Key Pair

The root keypair in Polykey consists of:

- **1 Public Key**
- **1 Private Key**

It is based on the Ed25519 key scheme, which is optimized for both security and
performance. The private key is never exposed in plaintext and is stored
securely within the system.

- **PublicKeyX** -> x25519 version
- **PrivateKeyX** -> x25519 version
- **SecretKey** -> `PrivateKey || PublicKey` (concatenated)

This structure enables secure key derivation and avoids the need for
re-concatenation when using cryptographic libraries like Libsodium.

### Key Encapsulation Mechanism (KEM)

Polykey uses Elliptic Curve Diffie-Hellman (ECDH) Key Encapsulation Mechanism
(KEM) to securely exchange encryption keys. This ensures that keys remain
protected even if the transport channel is compromised.

Supported methods:

- **ECDH-SS (Static-Static)**
  - Uses pre-established key pairs.
  - No forward secrecy.
  - Key compromise exposes all past and future messages.
- **ECDH-ES (Ephemeral\*Static)**
  - Uses an ephemeral keypair for the sender.
  - Provides **forward secrecy**, meaning past messages remain safe even if
    future keys are compromised.

### Encapsulated JWK Storage

Polykey uses **JWK (JSON Web Key) encryption** to store and manage keys
securely. The JWK format ensures compatibility with modern cryptographic systems
and allows:

- Secure key wrapping.
- Efficient key rotation.
- Interoperability with other secure systems.

Encrypted JWKs are stored using **Flattened JWE JSON**, ensuring the integrity
and confidentiality of keys at rest.

## Security Considerations

### Forward Secrecy

Forward secrecy ensures that past communications remain secure even if a key is
compromised. This is achieved through ephemeral key exchange mechanisms like
ECDH-ES.

### Trusted Identity and Key Authenticity

One of the major challenges in key management is ensuring that public keys
belong to the correct entity. Polykey does not rely on traditional Centralized
Certificate Authorities (CAs). Instead, it utilizes:

- **Decentralized trust models** to verify keys.
- **Identity-based key management** to ensure key authenticity.

This eliminates the single point of failure problem present in CA-based models.

### Secure Key Distribution

Key distribution is managed through secure channels to prevent interception.
Polykey uses encapsulateWithPublicKey() to encrypt the database key (symmetric
JWK), ensuring it can only be decrypted by authorized entities.

## Summary

Polykey's key management and storage strategy is built on strong cryptographic
foundations while maintaining practical usability. By combining:

- **Hybrid cryptosystems** (symmetric + asymmetric encryption),
- **Elliptic Curve KEMs** for key exchange,
- **JWK-based encrypted storage**, and
- **Decentralized identity verification**,

Polykey ensures that stored and transmitted data remain secure, resilient, and
future-proof against evolving cryptographic threats.
