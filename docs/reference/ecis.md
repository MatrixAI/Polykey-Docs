# Elliptic Curve Integrated Encryption Scheme (ECIES)

## Overview

Polykey's security model is built around **Elliptic Curve Integrated Encryption Scheme (ECIES)**. ECIES is a hybrid cryptosystem that combines the efficiency of symmetric encryption with the security of asymmetric encryption, making it ideal for key exchange and encrypted communication.

At its core, ECIES allows secure communication between parties without requiring them to share a secret key in advance. Instead, it uses elliptic curve cryptography (ECC) to derive a shared secret dynamically, ensuring both confidentiality and authenticity.

## Why Polykey Uses ECIES

Polykey leverages ECIES because it provides:

* **Strong security**: ECC-based key exchange ensures forward secrecy.
* **Efficient performance**: ECC is computationally faster than RSA at equivalent security levels.
* **Hybrid encryption**: Uses symmetric encryption for bulk data and asymmetric encryption for key exchange.
* **Secure key encapsulation**: Keys are encrypted in a way that prevents exposure during transmission.

## How ECIES Works

ECIES works by using Elliptic Curve Diffie-Hellman (ECDH) for key exchange and a symmetric cipher for encryption.

The encryption process follows these steps:

1. **Key Exchange**:

* The sender generates a temporary ephemeral key pair.
* The sender derives a shared secret using their ephemeral private key and the recipient's public key.

2. **Key Derivation**:

* The shared secret is used to generate encryption keys through a Key Derivation Function (KDF).

3. **Encryption**:

* A symmetric encryption algorithm (e.g., XChaCha20-Poly1305 ) encrypts the plaintext.
* An authentication tag is generated to prevent tampering.

4. **Transmission**:

* The ciphertext, ephemeral public key, and authentication tag are sent to the recipient.

5. **Decryption**:

* The recipient uses their private key to derive the shared secret.
* The symmetric key is reconstructed using the same KDF.
* The ciphertext is decrypted, and authenticity is verified.

## ECIES in Polykey

Polykey uses ECIES as the foundation for secure communication, storage, and key management. Specifically, it is used for:

* **Key Encapsulation Mechanism (KEM)**: Encapsulating encryption keys for secure storage.
* **Node-to-Node Communication**: Establishing secure tunnels between Polykey nodes.
* **Key Exchange**: Securely transferring symmetric encryption keys for encrypted storage.

### Key Encapsulation and Secure Storage

Polykey encrypts sensitive keys using ECIES-based encapsulation. This means:

* The Data Encryption Key (DB Key) is never stored in plaintext.
* The DB Key is wrapped using ECIES before being saved.
* Only an authenticated node with the correct private key can unwrap the DB Key and decrypt the database.

### Secure Messaging Between Nodes

When Polykey nodes communicate, they exchange keys using ECIES. This allows them to:

* Establish a secure session without pre-sharing a secret key.
* Prevent man-in-the-middle attacks by ensuring only authorized nodes can decrypt messages.
* Authenticate each other using their public-private key pairs.

## Why ECIES is Preferred Over RSA

Historically, RSA-based encryption was the standard for key exchange, but ECIES provides several advantages:

| Feature | ECIES (ECC) | RSA |
|---------|------------|-----|
| **Key Size (bits)** | 256 | 2048 |
| **Security Level** | Stronger | Weaker at equivalent key size |
| **Performance** | Faster | Slower |
| **Key Exchange** | Supported | Not ideal for key exchange |

Because ECIES achieves the same level of security as RSA with much smaller key sizes, it is the preferred choice for modern cryptographic systems like Polykey.

## Future-Proofing Against Quantum Attacks

Polykey is designed to evolve with cryptographic advancements. While ECIES is secure today, quantum computers could potentially break ECC in the future. When quantum-resistant encryption becomes practical, Polykey will migrate to a Post-Quantum Integrated Encryption Scheme (PQIES).

## Conclusion

ECIES is at the heart of Polykey's encryption model, providing secure, efficient, and scalable key exchange. By combining elliptic curve cryptography with hybrid encryption techniques, Polykey ensures strong security, efficient performance, and forward secrecy.

Polykey's implementation of ECIES allows:

* Secure key exchange without pre-shared secrets.
* Confidential and authenticated communication between nodes.
* Safe and efficient key storage using encapsulated encryption.

As cryptographic standards evolve, Polykey remains committed to using the most secure and performant encryption schemes available.
