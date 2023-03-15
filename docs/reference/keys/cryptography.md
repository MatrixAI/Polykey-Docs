# Cryptography

The keys domain manages all of the operations relating to keys.

We have fixed all the parameters for all cryptographic operations reduce the complexity of using cryptography.

When we need to change the parameters, we will be releasing new versions of Polykey.

Backwards compatibility will be maintained where possible, but we want to avoid doing complex crypto-protocol negotation.

## Architecture

All keynodes start with a root key pair and corresponding root certificate using the X.509 standard.

The root key pair is an asymmetric keypair consisting of a public key and private key.

The public key is the full unique identity for the keynode. It is given freely to other keynode.

The current root keypair is an 4096-bit RSA keypair.

Due to the length of a 4096-bit RSA public key, the node identity `NodeId` is a fingerprint of the public key.

The exact formula is a base64 encoding of a sha256 sum of the ASN.1 `SubjectPublicKeyInfo` encoding of the RSA public key.

This ensures that the `NodeId `will always be 44 characters long.

In the future we will be looking to use Ed25519 keys as they are shorter and more modern.

The keys domain maintains a keys path which is a subdirectory of the node path.

For example: `~/.local/share/polykey/keys`.

When a keynode first starts, a root keypair is generated (randomly or deterministically with a seed) or loaded from the keys path.

The root keypair is used to generate an X.509 certificate.

This certificate represents a signed digital identity for the keynode.

It is used presenting information about the keynode in a secure manner, and for establishing secure communication between keynodes with MTLS.

The root key pair is used for encrypting, decrypting, signing and verifying all other cryptographic information used by the keynode.

With respect to the vaults domain, the root key pair is used for encrypting and decrypting the symmetric vault keys.

With respect to the identities domain, the root key pair is used for signing and verifying cryptolinks.

## Encryption and Decryption

The encryption algorithm has a byte size limit. This is given by `utils.maxEncryptSize(keyByteSize, hashByteSize)`.

Therefore root key encryption is not intended to be used for large messages.

The correct way to encrypt and decrypt large messages is to first generate a symmetric key for encryption and decryption.

Then encrypt the symmetric key with the root key.

An example of this is: https://crypto.stackexchange.com/a/15

We do this already in our vaults domain, but this functionality should be more broadly available in the keys domain.

## Signing and Verification

Signing and verifying is useful for ensuring authenticity of messages.

Use the private key to sign, and the public key to verify.

## Renewing the Root Certificate

The certificate starts out as a self-signed certificate.

All certificates expire. The expiry date can be set to an arbitrary duration after the current date.

The root keypair should be regenerated often to prevent compromise.

We have 3 ways of changing the root certificate:

1. Resetting the root certificate - this generates a new certificate with the same root key pair, the result is a self-signed certificate
2. Resetting the root key pair - this generates a new key pair and generates a new self-signed certificate
3. Renewing the root key pair - this generates a new key pair and generates a new certificate that is signed by the current certificate, the current certificate becomes the old certificate, and now all certificates form a certificate chain

Use 1. if you need to update the duration.

Use 2. when the current key is compromised.

Use 3. when you are updating the duration of the certificate but you want to ensure that there's a zero-downtime migration of all secure connections to your keynode.

Most of time you will use 3.

Other keynodes or systems may still trust the old certificate, but because the old certificate is signing the new certificate, the new certificate can still be trusted, since it is part of a certificate chain.

## Certificate Validation

The certificate validation logic is different from the HTTPS TLS.

Keynodes do not have domain names, and do not fixed IP addresses.

The Common Name of the certificate is instead the public key fingerprint.

The certificate validation has to go through instead checking that the public key fingerprint is a `NodeId` that the current agent trusts, and that it is the public key that signed the certificate.

The certificate information is then trusted. The common name is not useful here, as the claim on the public key is self-evident. But other attribute information here can be trusted, for example all the cryptolink information.

The default certificate generates only has common name information which points back to its public key, therefore its claim is self-evident.

Only when the certificate gains extra attributes, is that useful as a time-limited trusted information.

## Cryptographic Primitives

All cryptographic primitives (including CSPRNG) are implemented with `node-forge`.

Other potential libraries include:

- `kbpgp`
- `PKI.js`

We have aliased types from inside `node-forge` in `keys/types.ts` in case we need to change our cryptographic library.

---

X.509 OIDs registered for us.

```
/**
 * Polykey OIDs start at 1.3.6.1.4.1.57167.2
 */
const oids = {
  // 1.3.6.1.4.1.57167.2.1
  attributes: {
    cryptoLinks: '1.3.6.1.4.1.57167.2.1.1',
  },
  // 1.3.6.1.4.1.57167.2.2
  extensions: {
    polykeyVersion: '1.3.6.1.4.1.57167.2.2.1',
    nodeSignature: '1.3.6.1.4.1.57167.2.2.2',
  },
};
```
