# Symmetric Data Encapsulation Scheme (DES)

Polykey’s state is completely stored in the database. This means everything critical to the system's function—keys, metadata, and configurations—is written to disk. To ensure the security and integrity of this data, we encrypt the database using a **32-byte Data Encryption Key (DB Key)** and the **XChaCha20-Poly1305-IETF** symmetric encryption algorithm, provided by **libsodium**.

## Why We Use Symmetric Encryption

Encryption is non-negotiable for a system like Polykey, where data security is a core priority. Symmetric encryption is used for:

- **Confidentiality** - Ensuring database contents are only accessible to the rightful owner.
- **Integrity** - Preventing unauthorized tampering by detecting any modifications.
- **Performance** - Symmetric encryption is significantly faster than asymmetric encryption for large datasets.

## Database Encryption Key (DB Key)

### **How the DB Key Works**

The DB Key is a **randomly generated 32-byte key** that encrypts all database content. This key is stored on disk, but never in plaintext—it is always encrypted before being written to storage.

The DB Key is used to encrypt and decrypt the entire database, meaning that without it, **all data in the system is inaccessible**.

### **Why the DB Key is Not Derived from the Root Key**

A common approach in cryptographic systems is to derive all keys from a single root key. However, this is not how Polykey manages database encryption. The DB Key is independent from the root key for the following reasons:

1. **Key Rotation & Flexibility**  
   If the root key were used to derive the DB Key, changing the root key would require re-encrypting the entire database. This would be a **catastrophic** operation in terms of efficiency and usability. Instead, by keeping the DB Key separate, the database can remain encrypted even when the root key is changed.

2. **Minimizing Attack Surfaces**  
   If an attacker compromises the root key, they still cannot access the database contents without the DB Key. This adds an extra layer of security.

3. **Persistence Across Keypair Changes**  
   In Polykey, root keypairs can be swapped out periodically for security reasons (like how passwords should be rotated). By decoupling the DB Key, the database encryption remains stable across key rotations.

## Encryption Algorithm: XChaCha20-Poly1305-IETF

Polykey uses **XChaCha20-Poly1305-IETF**, a widely respected symmetric encryption scheme known for its:

- **256-bit key size** - Strong encryption without performance tradeoffs.
- **192-bit nonce** - Ensures nonce reuse attacks are virtually impossible.
- **Authenticated encryption** - Includes integrity checks, so any unauthorized modifications are detected.

### **Why XChaCha20-Poly1305?**

1. **Nonce Misuse Resistance**  
   Unlike AES-GCM, which has strict nonce reuse requirements, XChaCha20 allows for random nonce generation with no risk of catastrophic failures.

2. **High Performance**  
   Stream ciphers like XChaCha20 are significantly faster than block ciphers like AES in many scenarios, making them well-suited for encrypting large datasets.

3. **Compatibility with Libsodium**  
   Libsodium is a battle-tested cryptographic library that provides a simple and secure implementation of XChaCha20-Poly1305, reducing the risk of implementation errors.

## Key Rotation & Secure Storage

### **Key Rotation Strategy**

Regular key rotation is a fundamental security practice. However, since re-encrypting an entire database is computationally expensive, Polykey manages key rotations in a way that minimizes disruption:

1. **The DB Key is swapped periodically** - This reduces long-term key exposure.
2. **New keys are securely generated and encrypted using KEM (Key Encapsulation Mechanism)** - This ensures a smooth transition without exposing old encrypted data.
3. **Polykey handles the transition automatically** - Users do not need to worry about database re-encryption when keypairs are rotated.

### **How the DB Key is Stored**

The DB Key is **never stored in plaintext**. Instead, it is encrypted and saved as a **JWE (JSON Web Encryption) file**. This file is securely managed to ensure that only authorized nodes can decrypt and use it.

## Security Considerations

- **Loss of the DB Key = Complete Data Loss**  
  If the encrypted DB Key is lost, **all data within Polykey is permanently inaccessible**. Users must ensure backups are properly managed.

- **Frequent Key Rotation is Good Practice**  
  Regularly rotating the DB Key prevents long-term exposure and mitigates risks from potential future cryptographic weaknesses.

- **Secure Backup Management is Critical**  
  Since Polykey does not store plaintext recovery keys, **users must securely back up their 24-word recovery code** to ensure they can regain access if needed.

## Conclusion

The **Symmetric Data Encapsulation Scheme (DES)** is a critical component of Polykey's security model. By leveraging XChaCha20-Poly1305-IETF for high-speed encryption and ensuring the **DB Key remains independent from the root key**, Polykey maintains a **balance between security, performance, and usability**.
