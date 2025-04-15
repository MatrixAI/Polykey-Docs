# Encryption Algorithms and Security Considerations

## Overview

Polykey's security model is built on modern cryptographic principles to ensure
confidentiality, integrity, and authentication across all operations. This
document outlines the encryption algorithms Polykey employs, their strengths,
and key security considerations for maintaining a secure system.

## Encryption Algorithms Used in Polykey

Polykey integrates a hybrid cryptosystem, combining symmetric and asymmetric
cryptographic algorithms for optimal security and performance.

### Symmetric Encryption

-### Symmetric Encryption

- **XChaCha20-Poly1305 (IETF)**  
  - **Key Size:** 256 bits  
  - **Nonce Size:** 192 bits  
  - **MAC Size:** 128 bits  
  - This extended 192-bit nonce allows random nonces to be safely used, reducing the risk of nonce reuse and making the encryption scheme misuse-resistant.  
  - A stream cipher approach is employed, encrypting data per block with a fresh, random nonce each time.
  - Polykey stores its persistent state in an encrypted database, protected by a “Data Encryption Key” (DEK). This DEK is **not** derived from the root key, so rotating the root key does **not** require re-encrypting the entire database.
  - By combining encryption and authentication, XChaCha20-Poly1305 ensures both confidentiality and integrity of the stored data.

### Asymmetric Encryption

- **X25519 (Elliptic Curve Diffie-Hellman)**

  - Used for key exchange and secure session establishment.
  - Based on Curve25519, which is efficient and resistant to side-channel
    attacks.
  - Provides forward secrecy by generating ephemeral session keys.

- **Ed25519 (Elliptic Curve Digital Signature Algorithm)**
  - Used for signing and verifying messages and transactions.
  - Strong resistance to side-channel attacks.
  - Deterministic signatures prevent nonce-related vulnerabilities.

### Key Encapsulation Mechanism (KEM)

- **ECIES (Elliptic Curve Integrated Encryption Scheme)**
  - Facilitates secure encryption of symmetric keys during key exchange.
  - Uses elliptic curve cryptography for efficient and secure key wrapping.
  - Ensures confidentiality and authenticity of the exchanged key.

## Security Considerations

### 1. Key Management

- **Recovery Codes:** Users must securely store their 24-word recovery code, as
  Polykey does not store private keys.
- **Key Rotation:** Regular key rotation mitigates the risk of long-term key
  exposure.
- **Secure Storage:** Encrypted key material must be stored in a secure
  environment to prevent unauthorized access.

### 2. Forward Secrecy

- Polykey ensures forward secrecy through ephemeral key exchange using X25519.
- If a private key is compromised, past communications remain secure.

### 3. Authentication & Integrity

- Digital signatures (Ed25519) ensure data authenticity and prevent tampering.
- Authenticated encryption (AES-GCM) guarantees data integrity.

### 4. Resistance to Quantum Threats

- While current encryption methods are secure, future quantum computing
  advancements may break classical cryptography.
- Polykey's roadmap includes exploring post-quantum cryptographic alternatives.

### 5. Attack Surface Reduction

- Minimizing reliance on outdated cryptographic algorithms.
- Eliminating common cryptographic pitfalls such as RSA-based key exchanges,
  which are vulnerable to decryption with modern computing power.

## Conclusion

Polykey employs a combination of AES-GCM, X25519, Ed25519, and ECIES to ensure
strong security across all cryptographic operations. By following best practices
in key management, forward secrecy, and attack surface reduction, Polykey
maintains a robust security posture. Future updates may incorporate post-quantum
cryptographic schemes to address emerging threats.
