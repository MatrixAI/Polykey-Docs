ed25519 ssh is 68 characters
AAAAC3NzaC1lZDI1NTE5AAAAIINmZfQTk1NpZcfbkZinFf0w99OF0/CJ88VRajsJ4xrT

md5sum (128bits) (hex encoding) of the PEM encoded public key is 32 characters
67d27e8471b4e20fc521dfc973bbb49b

md5sum (128bits) and base64 encoding is 24 characters
Z9J+hHG04g/FId/Jc7u0mw==

sha256 is also 256bits
sha512 is also 512bits

sha256 (256 bits) (hex encoding)
2717ebe9a13779589c20e09c4e86e3f58a0c84c5328b13f4f0502fdbb0209547

256/8 = 32 bytes = 64 hex characters

```
md5sum - hex encoding and 32 characters
sha256sum - hex encoding and 64 characters
sha512sum - hex encoding and 128 characters

# base64 encoding is much shorter
openssl dgst -md5 binary | openssl enc -base64 # 24 characters
openssl dgst -sha256 -binary | openssl enc -base64 # 44 characters
openssl dgst -sha512 -binary | openssl enc -base64 # 88 characters
```

The Ed25519 signature scheme has a max length of 256 bits, which is a max length of 32 bytes.

So if we use sha256 fingerprint, we will always the same number of bytes which is 32.

Then with a base64 encoding, you always end up with 44 characters.

A proposed Node ID is there a string of 44 characters no matter what. Even if we are using RSA 4096 or Ed25519 or whatever.