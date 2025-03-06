# Root Keypair Generation in Polykey

Polykey’s entire encryption model revolves around Hybrid Elliptic Curve Integrated Encryption Scheme (ECIES), and the Root Keypair is the foundation of everything. It’s the cryptographic identity of a node, making secure communication, encryption, and key derivation possible.

This doc covers:
* What the Root Keypair is.
* How it’s generated.
* How it spits out a DEK (Data Encryption Key).

---

## What is the Root Keypair?
The Root Keypair is an Ed25519 elliptic curve keypair that serves as the node’s identity in Polykey.

It’s made up of:
* Private Key **:** A 256-bit secret, randomly generated and never shared.
* Public Key **:** Derived from the private key and used for authentication and key exchange.

### Why do we care?
1. Identity **:** Every Polykey node has a unique Root Public Key 
2. Key Exchange **:** It’s used in the Key Encapsulation Mechanism (KEM) to securely share encryption keys.
3. Data Encryption **:** It’s how we derive a DEK , which encrypts stored data.

---

## Generating the Root Keypair
The process is deterministic, secure, and clean:

1. Get High Entropy Randomness 
  * A cryptographically secure random number generator (CSPRNG) provides the randomness needed.
  * This ensures the private key is unpredictable and safe.

2. Generate the Ed25519 Keypair  
  * A 256-bit private key is generated.
  * A public key is derived from it using Curve25519 elliptic curve math.

3. Store the Keypair  
  * The private key is stored securely in the Polykey vault.
  * The public key is used for authentication and key exchange.

4. Use It to Generate a DEK  
  * The Root Keypair is fed into a KDF (Key Derivation Function) to generate a DEK (Data Encryption Key).
  * The DEK is then used to encrypt Polykey’s stored data.

---

## How is the DEK Made?
The DEK (Data Encryption Key) is derived from the Root Keypair using a KDF. Here’s the breakdown:

1.   Elliptic Curve Diffie-Hellman (ECDH) 
   * The Root Private Key and another node’s Public Key are combined to create a shared secret.
   
2.   Run It Through a KDF
   * A Key Derivation Function (probably HKDF-SHA256) turns the shared secret into a 256-bit symmetric DEK.
   
3.   Store or Re-Derive the DEK 
   * The DEK is either stored securely or regenerated when needed.

---

## Wrapping it Up
The Root Keypair is the cornerstone of Polykey’s encryption model. It enables secure messaging, key exchange, and encryption using Ed25519 elliptic curve cryptography.

The DEK, derived from the Root Keypair, locks down all stored data with strong encryption. This whole setup is more efficient, faster, and more secure than traditional RSA-based encryption.

That’s it. Root Keypair = Identity. DEK = Encrypted data. Simple, secure, and built for performance.