---
title: 'Root Keypair Generation'
date: 2025-03-12
author: 'Christina'
tags: ['json-web-signature', 'cryptography', 'json-web-token', 'json-web-key', 'security' 'polykey', 'json-web-encryption']
---
# JSON Web X Standards in Polykey

## Overview

Polykey uses the **JSON Web X (JWX)** standards to represent keys, encrypt data, and authenticate messages. These standards provide interoperability with other cryptographic systems, making Polykey flexible and compatible across different implementations.

The core JSON Web X standards used in Polykey are:

* **JSON Web Token (JWT)**: Used to package claims in a structured format.
* **JSON Web Algorithm (JWA)**: Defines cryptographic algorithms used in JSON-based security applications.
* **JSON Web Signature (JWS)**: Ensures integrity and authenticity by signing messages.
* **JSON Web Encryption (JWE)**: Encrypts messages to ensure confidentiality.
* **JSON Web Key (JWK)**: Represents cryptographic keys in a JSON format.

## Why Polykey Uses JSON Web X Standards

The JWX family of standards was chosen for Polykey due to:

* **Interoperability**: JSON-based cryptographic systems are widely used and supported.
* **Flexibility**: The standards allow different cryptographic algorithms and key representations.
* **Usability**: JSON is a widely understood and easily parsed format.
* **Security**: Strong cryptographic primitives ensure integrity, confidentiality, and authenticity.

However, some of these standards have historically been too flexible, which has led to implementation mistakes. Despite this, JWX standards are generally far better than **legacy PKCS** (Public Key Cryptography Standards), which are more difficult to understand and implement correctly.

## Understanding JSON Web Tokens (JWT)

JWT is a container format that holds structured claims, typically for authentication or authorization. It consists of:

1. **Header**: Specifies the algorithm and type.
2. **Payload**: Contains claims (e.g., user data, permissions, expiration).
3. **Signature**: Ensures the integrity and authenticity of the token.

Example JWT payload:

```json
{
  "userId": "12345",
  "username": "johndoe",
  "exp": 1716239022
}
```

WT is not inherently secure. Without encryption, the payload is base64-encoded but not hidden. If sensitive data is included, it must be encrypted using JWE.

## JSON Web Signature (JWS) vs. JSON Web Encryption (JWE)

### JSON Web Signature (JWS)

JWS represents signed data. This ensures the integrity and authenticity of a message.
* Signed with a symmetric key: Provides integrity & authenticity.
* Signed with an asymmetric key: Provides integrity, authenticity, and non-repudiation.

JWS does not encrypt data, it only verifies that the message has not been tampered with.

### JSON Web Encryption (JWE)

JWE is used to encrypt data. It supports both symmetric and asymmetric encryption.

* Encrypted with a **symmetric key**: Efficient but requires shared key distribution.
* Encrypted with an **asymmetric key**: More secure for key exchange but computationally heavier.

If a payload needs both signing and encryption, the process is:
1. Sign the data with JWS.
2.	Encrypt the signed data with JWE.

# How Polykey Uses JWX

### JWK and Key Management

Polykey stores cryptographic keys in JSON Web Key (JWK) format. This allows standardized key representation and exchange.
* **Public and private keys** are encoded as JWKs.
* **JWKs are used in Polykey’s Key Encapsulation Mechanism** (KEM) to protect symmetric keys.
* **JWKs can be exported/imported**, making them interoperable with other systems.

### Storing JWX Objects

JWX objects in Polykey can be stored in three representations:

1. **Compact Representation**: Short, URL-safe format (used in JWTs).
2. **General Representation**: More flexible JSON structure.
3. **Flattened Representation**: Used for encrypted JWKs, ensuring a structured encryption format.

Polykey specifically encrypts JWKs as Flattened JWE JSON, meaning private keys are stored securely while remaining accessible when needed.

## Future of JWX in Polykey

There are alternative standards, like **PASETO** (Platform-Agnostic Security Tokens) and **PASERK** (PASETO Embedded Key Format), that attempt to reduce security risks found in JWX. However, these standards are not widely adopted yet, and Polykey continues to rely on JWX for its flexibility and industry support.

# Conclusion

JSON Web X standards form the backbone of Polykey’s security model. They provide:

* Interoperability with modern cryptographic systems.
* Secure key management through JWK and JWE.
* Authentication & Integrity using JWS.
* Confidentiality via JWE encryption.

By leveraging these standards, Polykey ensures its encryption and authentication mechanisms are both robust and flexible.