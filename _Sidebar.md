# Tutorials

* [Getting Started With PolyKey](https://github.com/MatrixAI/js-polykey/wiki/getting-started)

# How-To Guides

### Developers

* [Development Environment Secrets](Development-Environment-Secrets)

### DevOps

* Service Deployment Secrets with AWS ECS
* Cloud Agnostic Secrets Management
* Certificate Renewal with Let's Encrypt
* CI/CD Secrets with GitLab
* Internet of Things OTA Secret Update
* Microservice Authentication with Zero-Trust and MTLS

### Companies/Teams

* [Employee Onboarding and Offboarding](Employee-Onboarding-and-Offboarding)
* [Device Provisioning](Device-Provisioning)
* [Delegation of Authority](Delegation-of-Authority)

# Reference

### CLI

* [CLI API](CLI-API)
* environment variables
* parameterisation configuration priority
* different commands and their help pages
* [Bootstrapping](https://github.com/MatrixAI/js-polykey/wiki/bootstrapping)
* [CLI commands design](https://github.com/MatrixAI/js-polykey/wiki/CLI-commands-design-and-style)

### Agent

* [Agent Architecture](https://github.com/MatrixAI/js-polykey/wiki/agent-architecture)
* "Agent process" is the background process
* Node State
* State Version and Schema
* What is "keynode"

### Keys

* [Keys API](https://github.com/MatrixAI/js-polykey/wiki/key-api)
* [Cryptography](https://github.com/MatrixAI/js-polykey/wiki/cryptography)
* Root Keys
  - Key Renewal
* Root Certificate

### Vaults

* [Vault Storage](https://github.com/MatrixAI/js-polykey/wiki/vault-storage)
  - facade
  - efs
* [Vault Lifecycle](https://github.com/MatrixAI/js-polykey/wiki/vault-lifecycle)
* [Vault Sharing](https://github.com/MatrixAI/js-polykey/wiki/vault-sharing)
  - permissions
* [Vault Versioning](https://github.com/MatrixAI/js-polykey/wiki/Vault-Versioning)
* [Vault Operations](https://github.com/MatrixAI/js-polykey/wiki/Vault-Operations)
* [Vault API](https://github.com/MatrixAI/js-polykey/wiki/vault-api) - should be deleted
* [Git API](https://github.com/MatrixAI/js-polykey/wiki/git-api) - should be deleted (function descriptions are not required)

### Nodes

* [Node Connections](https://github.com/MatrixAI/js-polykey/wiki/Node-Connections)
* [Node Discovery with Kademlia](https://github.com/MatrixAI/js-polykey/wiki/Node-Discovery-with-Kademlia)
* [Node API](https://github.com/MatrixAI/js-polykey/wiki/node-api) - should be deleted
* [Node Identification](https://github.com/MatrixAI/js-polykey/wiki/node-identification)
* Trusted Seed Nodes

### gRPC and HTTP API

* [Client Service](https://github.com/MatrixAI/js-polykey/wiki/client-api)
* Agent Service
* Service Error Handling
* Service Versioning
* [Session Management](Session-Management)
  - SessionManager and Session
* [Infrastructure Overview](https://github.com/MatrixAI/js-polykey/wiki/infrastructure-overview) - should be synthesised
* [Privilege Model](https://github.com/MatrixAI/js-polykey/wiki/privilege-model) - should be synthesised
* [Using the PolykeyClient](Using-the-PolykeyClient)
* Protobuf Schemas and Compilation

### Gestalts

* [Gestalt Graph](https://github.com/MatrixAI/js-polykey/wiki/Gestalt-Graph)
* Gestalt Discovery

### Identities

* [Identification with Third Party Services](https://github.com/MatrixAI/js-polykey/wiki/identification-with-third-party-services)

### Sigchain

* [Sigchain](https://github.com/MatrixAI/js-polykey/wiki/Sigchain)
* Claims

### ACL

* [ACL](ACL)
* Structure of ACL, but not the usage of it

### Notifications

* Vault Sharing
* Gestalt Invite
* Node Linking

### Network

* [Network](https://github.com/MatrixAI/js-polykey/wiki/network)
* [Nat Traversal](https://github.com/MatrixAI/js-polykey/wiki/nat-traversal)
  - Signalling & Bidirectional Hole Punching
  - TURN Relays
* architecture
* error conditions

### DB

* [DB](DB)

### Workers

* [Workers API](https://github.com/MatrixAI/js-polykey/wiki/worker-api)
* Zero Copy Transfer with ArrayBuffer
* Worker Pool used by Keys and DB and Vaults (EFS)

# Theory

* [Secrets Management](Secrets-Management)
* [Decentralized Trust Network](Decentralized-Trust-Network)
* [Centralized vs Decentralized Platforms](Centralized-vs-Decentralized-Platforms)
* [Glossary](Glossary)

# Development Guide

* [Roadmap](Roadmap)
* [Style Guide](https://github.com/MatrixAI/js-polykey/wiki/style-guide)
* [Error Handling in PolyKey](https://github.com/MatrixAI/js-polykey/wiki/errors)
* [Async Functions](https://github.com/MatrixAI/js-polykey/wiki/async-functions)
  - Promise Usage
* Logging and Logging Hierarchy
* Async-Init - CreateDestroyStartStop vs StartStop... etc
* Dependency Injection - Required vs Optional and External vs Internal
* Linting
* CI/CD
* ID Usage - IdSortable, IdDeterministic, IdRandom
* Configuration
* Diagram Standard - Sequence, Component, tooling, State, Flow (Activity), Embedding
* Testing
  - Mocking
  - Execution Speed, breaking up tests
  - Timeouts & Parallelism
* Benchmarking
* Dependencies
* Development Environment using Nix
* Release & Distribution
* Testnet & Mainnet Deployment
* [[Building]]