# Glossary

Glossary of terminology in alphabetical order.

### Agent

Agent is any entity that possesses agency. That is the motivation and will to
act. This can be a real person, or a software agent.

### Augmentation

The process of establishing a [cryptolink](./glossary.md#cryptolink) between a
[Keynode](./glossary.md#keynode) and
[digital identity](./glossary.md#digital-identity), making a claim of ownership
of the Keynode over the digital identity, and of the
[agent](./glossary.md#agent) who is represented by the digital identity over the
Keynode.

### Authenticity

The ability to check that the source of origin of a piece of data is correct.

### Cryptolink

A statement of a [Keynode's](./glossary.md#keynode) ownership over a
[digital identity](./glossary.md#digital-identity), or its relatedness to
another Keynode.

### Digital identity

Digital information that can be used to represent a physical
[agent](./glossary.md#agent) or entity. In the case of Polykey, digital
identities are social media accounts existing on providers such as GitHub,
Facebook, Instagram, and LinkedIn.

### Discovery

The process of systematically finding other Polykey users, represented by their
[Gestalts](./glossary.md#gestalt), as well as the components of the Gestalt.

### Gestalt

The representation of an [agent](./glossary.md#agent) within Polykey. They
combine [identity](./glossary.md#identity) information from
[digital identities](./glossary.md#digital-identity) with Polykey
[Keynodes](./glossary.md#keynode).

### Identity

Information about a specific [agent](./glossary.md#agent), as well as its
attributes, that uniquely distinguishes it from other agents within a particular
context.

### Identity Proof

The claim existing on both a [Keynode's](./glossary.md#keynode)
[Sigchain](./glossary.md#sigchain) and on a
[digital identity](./glossary.md#digital-identity) as proof of the existence of
an [augmentation](./glossary.md#augmentation) between them.

### Integrity

The ability to check that a piece of data had not been mutated since its
creation.

### Keynode

Distributed nodes living on a user's computing device, identified by their own
public and private key pair. Keynodes store and manage
[Vaults](./glossary.md#vault).

### Point-of-presence

A point of communication between two entities. For example, a
[digital identity](./glossary.md#digital-identity) is a point-of-presence
between two [agents](./glossary.md#agent), usually human, at which information
pertaining to [identity](./glossary.md#identity) can be exchanged.

### Resource

A resource is any digital object that can be interacted with. Usually a resource
is protected by authentication and authorization policies. It can be a document,
a service, or a device.

### Sigchain

A chain of signed statements stored on a [Keynode](./glossary.md#keynode),
documenting the claims it has made over
[digital identities](./glossary.md#digital-identity) and other Keynodes.

### Secret

Any kind of data that that should only be known by selected agents. The 4 common
types of secret data are:

- Tokens - Any randomly generated string of data, e.g. `sdifjsd8943`
- Passwords - Any human provided string of data, e.g. `my-secret-password123!`
- Keys - Asymmetric public and private keypair, e.g. RSA and Ed25519 keypairs
- Certificates - A keypair that is combined with additional metadata (such as
  datetime) and signed by other relevant keypairs, e.g. X.509 certificates

Additionally there may also be larger pieces of data that may be considered
secret. These include documents, source code, intellectual property, emails...
etc.

Some secrets have intrinsic value, that is the secret data is what is valuable.
Other secrets have extrinsic value, which means the value lies in what the
secret protects, but not the secret data itself.

In Polykey, we consider secrets that have extrinsic value, the currency of
access control when working with decentralized services, resources and devices.

### Social Discovery

A form of [discovery](./glossary.md#discovery) by which
[Gestalts](./glossary.md#gestalt) are discovered through
[digital identities](./glossary.md#digital-identity), rather than from within
Polykey.

### Vault

The base file structure used within Polykey to store
[secrets](./glossary.md#secret). Each Vault makes use of an encrypted file
system to manage and share the secrets it contains.

### CLI

Command Line Interface

### UI

User Interface

### UX

User Experience
