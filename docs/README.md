---
slug: /
displayed_sidebar: docs
---

# Polykey Documentation

<!-- Web of Trust that has a blockchain wallet feeling to it

- Introduce the Polykey network (have some sort of media)
  - a pk agent needs to run for a specified node.
  - this allows the node the agent is running for, to communicate through the network
    - you can share vaults b/w nodes that contain secrets
    - You can more easily discovery, trust, and grant permissions to nodes
    - you can push/pull secrets in the vaults
    - secrets are encrypted at rest and in transit
 -->

 <!-- Polykey-CLI usage 

 - breakdown some functionality 
 - The CLI on your machine is somewhat of an entry point to Polykey because it's how you familiarize yourself better with the functionality but mostly because it lets you become a node operator  -->

<!-- Polykey Client Library

- this will be where most of the innovation and value from PK comes from, integrating a free and open-source secrets manager in your deployed applications for running secrets management operations  -->

## Introduction

Polykey helps yourself, teams and software agents to manage and share secrets in a secure and easy-to-use manner.

- Usable for average humans, you don't need to be a cryptography or cybersecurity expert to securely manage and share secrets.
- Can be integrated into software for automation of secret workflows.
- Unifies the workflow between interactive password management and infrastructure key management.
- Decentralized and local-first software that does not hand over your secrets to the cloud. You maintain sovereignty over your secrets on your devices.
- Easily backup and synchronise your secrets across all your devices: desktop, mobile or server.
- End to end encryption for all network communication.
- All data is encrypted at rest, thus preventing compromise even if devices are lost or stolen.

PolyKey is an open-source decentralised peer to peer secrets management system. It provides a software agent that runs on your device locally. Each agent process is a node in the Polykey peer to peer network. This agent manages your secret data and is capable of sharing secrets with other trusted Polykey agents. The secret data can be placed inside any directory on your computer including on USB storage.

## Principles

There are 2 main concepts to understand in Polykey:

- Secrets Management
- Decentralized Trust

### Secrets Management

Polykey was built from the ground up to focus on secrets management.

Secrets can be any kind of data that enables some sort of capability in the physical or virtual world.

The world is full of secrets. For example, a password is a secret that enables you to login to a website. A private key is a secret that enables you to sign and verify some data. A symmetric key is a secret that enables you to encrypt and decrypt some data. A token is a secret that enables software agents and machines to authenticate to remote services. A credit card is a secret that enables payments.

Polykey is designed to manage all kinds of secrets. It is not limited to passwords or keys.

For this reason, we think of secrets as "capabilities".

All secrets put into vaults. Each vault is a persistent fully-encrypted virtual filesystem with automatic version history. Vaults can be shared with other Polykey agents.

Polykey's secrets management concept provides users with secure communication and secure computation.

### Decentralized Trust

Sharing secrets depends secure communications. Secure communications depends on trusted identities.

Polykey introduced a concept called "Gestalt Identity".

A Gestalt Identity is a collection of digital identities (social media profiles and Polykey nodes) that all represent the same entity.

When you start a Polykey agent, it immediate forms its own gestalt with the Polykey node as its only identity. Link up your digital identities to the node in order to expand your gestalt.

As you deploy more Polykey agents, you can join existing gestalts.

Your gestalt is how other users are able to share secrets with a trusted identity. Your identity is the sum of the reputation of all your digital identities that are part of the gestalt.

<!-- I deleted the instructions for downloading the CLI repo source code... should mention it here.

I deleted instructions on how to contribute. We should have that somewhere else.

  </TabItem>

  <TabItem value="source" label="Source">

## Source

The official source repository is on GitHub. There is an additional mirror on GitLab.

```shell
git clone https://github.com/MatrixAI/Polykey-CLI.git
```

Use `npm install` to setup the project.

:::tip

If you have `nix-shell` available, enter into `nix-shell` and it will automatically setup the development environment.

:::

  </TabItem> -->

<!-- ---

We need to have a sepererate section on installing Polykey-CLI on docker

 <TabItem value="docker" label="Docker">



  </TabItem> -->
