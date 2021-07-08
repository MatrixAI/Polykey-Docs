Glossary of terminology in alphabetical order.

### Agent

Agent is any entity that possesses agency. That is the motivation and will to act. This can be a real person, or a software agent.

### Resource

What is Resource

### Secret

Any kind of data that that should only be known by selected agents. The 4 common types of secret data are:

* Tokens - Any randomly generated string of data, e.g. `sdifjsd8943`
* Passwords - Any human provided string of data, e.g. `my-secret-password123!`
* Keys - Asymmetric public and private keypair, e.g. RSA and Ed25519 keypairs
* Certificates - A keypair that is combined with additional metadata (such as datetime) and signed by other relevant keypairs, e.g. X.509 certificates

Additionally there may also be larger pieces of data that may be considered secret. These include documents, source code, intellectual property, emails... etc.

Some secrets have intrinsic value, that is the secret data is what is valuable. Other secrets have extrinsic value, which means the value lies in what the secret protects, but not the secret data itself.