---
slug: /
displayed_sidebar: docs
---

# Welcome to the Polykey documentation

- [Tutorials:](https://polykey.com/docs/tutorials) Step-by-step guides that
  introduce Polykey through practical outcomes.

- [How-To Guides:](https://polykey.com/docs/how-to-guides) Short, targeted
  instructions for achieving specific use-cases, assuming prior familiarity.

- [Theory:](https://polykey.com/docs/theory/) Conceptual foundations explaining
  the rationale behind Polykey.

- [Reference:](https://polykey.com/docs/reference/) Lookup documentation for
  commands, functions, and technical specifications.

## Introduction

Polykey helps individuals, teams, and software agents manage and share secrets
securely and intuitively.

- **User-Friendly:** Designed for everyday users, with no need to be a
  cryptography or cybersecurity expert.

- **Automation-Ready:** Integrates into software workflows for automated secret
  handling.

- **Unified Secrets Management:** Bridges the gap between personal password
  management and infrastructure-level key handling.

- **Decentralized and Local-First:** Your secrets never leave your device unless
  you choose to share them.

- **Seamless Synchronization:** Backup and sync secrets across desktops, mobile
  devices, and servers.

- **Comprehensive Encryption:** All data is end-to-end encrypted in transit and
  encrypted at rest.

Polykey is an open-source, peer-to-peer secrets management system. Each Polykey
agent runs locally as a node in the network, managing secrets and enabling
sharing with trusted peers. Secrets are stored within encrypted vaults and can
be placed anywhere on your system, including external storage like USB drives.

## Features

Polykey delivers robust, decentralized secrets management through the following
capabilities:

- **Decentralized & Local-First:** Operates entirely on your device in a
  peer-to-peer network, giving you full control over your secrets.

- **State-of-the-Art Cryptography:** Employs XChaCha20-Poly1305 for encryption,
  X25519 for key exchange, and Ed25519 for signatures, ensuring confidentiality
  and integrity.

- **Secure Vault Architecture:** Secrets are organized into fully encrypted,
  version-controlled vaults that function like a secure, virtual filesystem,
  enabling safe storage, backup, and sharing with trusted peers. Data remains
  encrypted at rest, even when the Polykey agent is not running. It is only
  decrypted when the agent is launched and the user authenticates.

- **Gestalt Identity Model:** Aggregates multiple digital identities into a
  unified, trusted representation to facilitate secure sharing.

- **Integration & Automation:** Works interactively or via CLI integration for
  seamless inclusion in CI/CD pipelines and system workflows.

- **Cross-Platform & Open Source:** Actively maintained, open-source, and
  operable across multiple environments.

- **Forward-Looking Security:** Investigating post-quantum cryptography and
  advanced protective mechanisms to stay ahead of evolving threats.

## Core Concepts

### Secrets Management

Polykey was purpose-built for secrets management: any data that enables
capability.

- **Passwords** for authentication

- **Private Keys** for signing or decryption

- **Tokens** for machine-to-service authentication

- **Credit Card Info** for payments

All secrets are stored in encrypted vaults with automatic versioning. Vaults can
be shared securely with other Polykey agents. Secrets are treated as
capabilities, or elements that grant power in both digital and physical systems.

### Decentralized Trust

Secret sharing relies on secure communications, which require trusted
identities. Polykey introduces this via the concept of a Gestalt.

A **Gestalt Identity** is a collection of digital identities (e.g. social
profiles or Polykey nodes) representing the same person or agent.

- When a Polykey agent starts, it begins with a single-node gestalt.

- Users can link other identities to expand trust.

- Gestalts allow others to verify and trust your identity when sharing secrets.

Trust in Polykey is compositional, built from the integrity of all linked
identities in your gestalt.
