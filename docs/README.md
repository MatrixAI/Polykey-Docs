---
slug: /
displayed_sidebar: docs
---

# Polykey Documentation

Welcome to the Polykey documentation.

The documentation is structured using
[Divio system](https://documentation.divio.com/).

- [Tutorials](./tutorials) - these are a series of steps to introduce Polykey to
  new beginners to achieve a practical outcome
- [How-To Guides](/docs/how-to-guides) - these are short guides on how to
  achieve a specific use-case which makes assumptions on the reader
- [Theory](./theory/) - these are important for understanding the "why" of
  Polykey
- [Reference](./reference/) - these are useful when you need remember how to use
  a particular command or function

<img src={require('@site/images/divio_quadrant.png').default} width="100%" />

## Introduction

Polykey helps yourself, teams and software agents to manage and share secrets in
a secure and easy-to-use manner.

- Usable for average humans, you don't need to be a cryptography or
  cybersecurity expert to securely manage and share secrets.
- Can be integrated into software for automation of secret workflows.
- Unifies the workflow between interactive password management and
  infrastructure key management.
- Decentralized and local-first software that does not hand over your secrets to
  the cloud. You maintain sovereignty over your secrets on your devices.
- Easily backup and synchronise your secrets across all your devices: desktop,
  mobile or server.
- End to end encryption for all network communication.
- All data is encrypted at rest, thus preventing compromise even if devices are
  lost or stolen.

PolyKey is an open-source decentralised peer to peer secrets management system.
It provides a software agent that runs on your device locally. Each agent
process is a node in the Polykey peer to peer network. This agent manages your
secret data and is capable of sharing secrets with other trusted Polykey agents.
The secret data can be placed inside any directory on your computer including on
USB storage.

## Features

TBD

## Principles

There are 2 main concepts to understand in Polykey:

- Secrets Management
- Decentralized Trust

### Secrets Management

Polykey was built from the ground up to focus on secrets management.

Secrets can be any kind of data that enables some sort of capability in the
physical or virtual world.

The world is full of secrets. For example, a password is a secret that enables
you to login to a website. A private key is a secret that enables you to sign
and verify some data. A symmetric key is a secret that enables you to encrypt
and decrypt some data. A token is a secret that enables software agents and
machines to authenticate to remote services. A credit card is a secret that
enables payments.

Polykey is designed to manage all kinds of secrets. It is not limited to
passwords or keys.

For this reason, we think of secrets as "capabilities".

All secrets put into vaults. Each vault is a persistent fully-encrypted virtual
filesystem with automatic version history. Vaults can be shared with other
Polykey agents.

Polykey's secrets management concept provides users with secure communication
and secure computation.

### Decentralized Trust

Sharing secrets depends secure communications. Secure communications depends on
trusted identities.

Polykey introduced a concept called "Gestalt Identity".

A Gestalt Identity is a collection of digital identities (social media profiles
and Polykey nodes) that all represent the same entity.

When you start a Polykey agent, it immediate forms its own gestalt with the
Polykey node as its only identity. Link up your digital identities to the node
in order to expand your gestalt.

As you deploy more Polykey agents, you can join existing gestalts.

Your gestalt is how other users are able to share secrets with a trusted
identity. Your identity is the sum of the reputation of all your digital
identities that are part of the gestalt.

## Comparison to other Tools

TBD
