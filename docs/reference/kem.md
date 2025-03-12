---
title: 'Asymmetric Key Encapsulation Mechanism (KEM)'
date: 2025-03-10
author: 'Christina'
tags: ['cryptography', 'security', 'hybrid-cryptosystem', 'encryption', 'key-management']
---
# Asymmetric Key Encapsulation Mechanism (KEM)

Polykey's hybrid cryptosystem relies on Key Encapsulation Mechanism (KEM).
to securely encrypt symmetric keys using asymmetric cryptography. This allows Polykey to efficiently encrypt and decrypt the database key (DB Key)
while maintaining strong security.

## What is KEM?

A **Key Encapsulation Mechanism (KEM)** is a cryptographic protocol used to encrypt a 
symmetric key using an asymmetric keypair. Instead of encrypting entire messages with 
asymmetric encryption, which is inefficient, KEM encapsulates a randomly generated symmetric key, which is then used for encrypting actual data.

In Polykey, KEM is used to encrypt the DB Key using an Ed25519 public key. The encrypted DB Key can then be safely stored on disk, ensuring that only the rightful owner can decrypt and access the database.

## How KEM Works in Polykey

KEM in Polykey is implemented using Elliptic Curve Diffie-Hellman Ephemeral-Static (ECDH-ES). 
Here is how it works:

1. **Key Generation**
* A 32-byte Ed25519 keypair is generated.
* The public key is shared, and the private key is kept secret.

2. **Encapsulation**
* A random symmetric key is generated.
* This symmetric key is encrypted using the receiver's Ed25519 public key.
* The encrypted symmetric key is stored as a JWE (JSON Web Encryption) file.

3. **Decapsulation**
* The receiver uses their Ed25519 private key to decrypt the encapsulated symmetric key.
* This decrypted symmetric key is then used to decrypt the DB Key.
* Once the DB Key is restored, the full database can be decrypted and accessed.

## Why Polykey Uses KEM

Using KEM allows Polykey to securely encrypt keys without storing them in plaintext. 
This provides multiple advantages:

* **Security**: If an attacker compromises the database, they still cannot decrypt it without the encapsulated DB Key.
* **Efficiency**: Instead of encrypting the entire database with an asymmetric key, only the DB Key is encapsulated.
* **Forward Secrecy**: By using ephemeral sender keys, old messages remain protected even if a private key is compromised.
* **Decoupling of Encryption Layers**: The DB Key remains independent of user keypairs, allowing key rotations without requiring full database re-encryption.

## Polykey's Implementation of KEM

Polykey uses a customized KEM implementation based on ECDH-ES:

* The sender generates an ephemeral keypair for the encryption process.
* The receiver's public key is used to derive a shared secret.
* This shared secret is used to encrypt the DB Key using XSalsa20-Poly1305.
* The resulting ciphertext is stored in a JWE file on disk.

This ensures that even if an attacker gains access to the encrypted DB Key file, 
they cannot decrypt it without the private key.

## Key Takeaways

* **KEM** encapsulates the DB Key, making Polykey's encryption secure and efficient.
* **Ed25519 keys** are used for lightweight and strong asymmetric encryption.
* **JWEs** files store encrypted keys, ensuring that private data remains protected.
* **ECDH-ES** provides forward secrecy, reducing the impact of compromised keys.
* **XSalsa20-Poly1305** is used to encrypt the DB Key, balancing speed and security.

By using KEM, Polykey keeps database encryption secure while maintaining efficiency, ensuring that even if encrypted key files are leaked, they remain useless without the correct private key.