# `polykey keys`

## `cert`

1. Get the root certificate of the active node

Usage:

```shell
> polykey keys cert

Root certificate:
-----BEGIN CERTIFICATE-----
MIIC0jCCAoSgAwIBAgIQBlaVPQYkcACb+V/kQIRIlDAFBgMrZXAwQDE+MDwGA1UE
AxM1djN1c3BzMzQydGtjaWdhNGVta2dhYWMyamljaGJxczBkcjN2MGJhdjkwZDJk
aDFxMmYxY2cwHhcNMjMxMjAxMDMzMjMyWhcNMjQxMTMwMDMzMjMyWjBAMT4wPAYD
VQQDEzV2M3VzcHMzNDJ0a2NpZ2E0ZW1rZ2FhYzJqaWNoYnFzMGRyM3YwYmF2OTBk
MmRoMXEyZjFjZzAqMAUGAytlcAMhAB+5ngyC7RkoKI61IKUwU5MivXAN2P4Fq+kD
RNiHQnhZo4IBkjCCAY4wDAYDVR0TBAUwAwEB/zALBgNVHQ8EBAMCAf4wRQYDVR0l
BD4wPAYIKwYBBQUHAwEGCCsGAQUFBwMCBggrBgEFBQcDAwYIKwYBBQUHAwQGCCsG
AQUFBwMIBggrBgEFBQcDCTCBlgYDVR0RBIGOMIGLgjV2M3VzcHMzNDJ0a2NpZ2E0
ZW1rZ2FhYzJqaWNoYnFzMGRyM3YwYmF2OTBkMmRoMXEyZjFjZ4Y6cGs6Ly92M3Vz
cHMzNDJ0a2NpZ2E0ZW1rZ2FhYzJqaWNoYnFzMGRyM3YwYmF2OTBkMmRoMXEyZjFj
Z4cEfwAAAYcQAAAAAAAAAAAAAAAAAAAAATAdBgNVHQ4EFgQUGur5t1Y33OU+YPcK
PWUq2KXW4l4wHwYLKwYBBAGDvk8CAgEEEBYOMS4yLjEtYWxwaGEuMzIwUQYLKwYB
BAGDvk8CAgIEQgRANMZ/GuBKGdmijymM4hGzV/RhabCl7zJ7OgZdUhYOocUu4c4x
O9DPdx4SOczFu4xKE6e21xNkFibh/WT9fE1LAjAFBgMrZXADQQDNk0RgKut0HBM0
bQGkBvy3xvbW+b7mY/aYgnBdPwk4q2eXq4OO3L6ZpJKLjIdHw6zcUFT8YCcYTC3x
6+I9Qi0G
-----END CERTIFICATE-----
```

## `certchain`

1. Gets the Root Cert-Chain

Usage

```shell
> polykey keys certchain
```

## `encrypt`

1. Encrypts a file with the Root keypair.
2. Requires the filePath and NodeID as parameters.

Usage:

```shell
> polykey keys encrypt /home/addievo/Desktop/Work/Polykey-CLI/random2.txt vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00

Encrypted data: "pã}z}^ÄRÈ\u001bÛ7/+Ì\rRÕ\u0003âÍ®\u008eêÎP©EÃ½±2?\u001aláí.ôöxV\u0007uÖ«\u0089\u007f»y.Ê"
```

## `decrypt`

1. Decrypts the encrypted file.
2. Requires filePath and NodeID (current node) which encrypted the file.

Usage:

```shell
> polykey keys decrypt /filePath nodeID
```

## `keypair`

1. Exports the private key JWE and public key JWK

Usage:

```shell
> polykey keys keypair

✔ Enter new password … *
✔ Confirm new password … *
publicKey       {"alg":"EdDSA","kty":"OKP","crv":"Ed25519","x":"H7meDILtGSgojrUgpTBTkyK9cA3Y_gWr6QNE2IdCeFk","ext":true,"key_ops":["verify"]}
privateKey      {"ciphertext":"l-6itRP2FtVWBvGVjS56P497WJsS8fpmiyKlaT8ohOg_-BT2Jz-I8pLSqrsJdieusIkVvjLrHkIzjI4CCVvFW37iV5mMiH18uGvNmHeQZfrHK701dck18IlqffuE6wxSd1bzi2BAvYTGl5aCuE8qR2SAcFfwBUCOvvkC0NDNi5S-L5G9dxlooWLtoU5u90Mfp5re2RVIyoT8Sa6E4smU91418E7_poSOQt6tl0Ny9MeV6sAHdKE","iv":"F87gVlMZM_wvcwl4IWXfI4F7I6QIHGTq","tag":"VJCuy2YQru7OMHHPTTOxRA","protected":"eyJhbGciOiJBcmdvbjJpZC0xLjMiLCJjdHkiOiJqd2sranNvbiIsImVuYyI6IlhDaGFDaGEyMC1Qb2x5MTMwNS1JRVRGIiwibWVtIjoyNjg0MzU0NTYsIm9wcyI6Mywic2FsdCI6InJSckVCTjA2bkd4UmJpdjlHRlNua2cifQ"}
```

## `password`

1. Resets the Polykey agent password.
2. Requires authentication

Usage:

```shell
> polykey keys password

✔ Enter new password … *
✔ Confirm new password … *
```

## `public`

1. Subset of keypair, returns only the JWK
2. Requires authentication

Usage:

```shell
> polykey keys public

✔ Enter new password … *
✔ Confirm new password … *
```

## `private`

1. Subset of keypair, returns only the JWE
2. Requires authentication

Usage:

```shell
> polykey keys private

✔ Enter new password … *
✔ Confirm new password … *
```

## `renew`

1. Renews your public and private key
2. Requires authentication

Usage:

```shell
> polykey keys renew

✔ Enter new password … *
✔ Confirm new password … *

> polykey keys keypair

Key       {"alg":"EdDSA","kty":"OKP","crv":"Ed25519","x":"Jj9iDoV7IWPV3gj65exxVNPpX5-zz_W-uPSOaGZvHxM","ext":true,"key_ops":["verify"]}
privateKey      {"ciphertext":"tJ1Q_CZnCKHpcZEgrdZGwdz9Clw9FXR8_NZt8Kz1r-2jYF5dVqTbca-qYHUFJL-Sq2WkzObw_HNfPNVpEXl_OquzaqOUuB7lF1MRgJeINZxjpy9zDcHDIniQR7QxGVafFAoZLJLPsQ_WjpPMTEmfLtsI5wpfH5IjflPWGqJTt-l8FeZzZT5FO6ZHJoEKzPYe6aYbfHusyDa9oCfUXTGzRfrPrlh1hKSF4xL4z92XOiTqBZlX118","iv":"a2RTJr848wjZoe-GXH7Mpl-mwdLWZoyE","tag":"jt2KpzM4PKTEqHLoaGA8wQ","protected":"eyJhbGciOiJBcmdvbjJpZC0xLjMiLCJjdHkiOiJqd2sranNvbiIsImVuYyI6IlhDaGFDaGEyMC1Qb2x5MTMwNS1JRVRGIiwibWVtIjoyNjg0MzU0NTYsIm9wcyI6Mywic2FsdCI6InNtWEhYMGxKektHblhFeTRPaWJzT3cifQ"}
```

## `reset`

1. Resets the root keypair

Usage:

```shell
> polykey keys reset
```

## `sign`

1. Sign a file with the root KeyPair
2. Filepath is a required parameter

Usage:

```shell
> polykey keys sign /home/addievo/Desktop/Work/Polykey-CLI/random.txt
Signature:      "xØg»³ðÕi65ÕFéö~}\u0089(\tÇdí\u0080â\u000e\u009c)ÊUË\u0092A÷\u00178XJå}½\u008d]ýÂ=ø!ÒDa=\`lz¼Úß¤!\u0085ô2ò\t"
```

## `verify`

1. Verifies a signature of a target node, when provided a file path
2. Filepath is a required parameter

Usage:

```shell
polykey keys verify /filePath
```
