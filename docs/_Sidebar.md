# Tutorials

* [Getting Started With PolyKey](./Getting-Started.md)

# How-To Guides

### Developers

* [Development Environment Secrets](./Development-Environment-Secrets.md)

### DevOps

* Service Deployment Secrets with AWS ECS
* Cloud Agnostic Secrets Management
* Certificate Renewal with Let's Encrypt
* CI/CD Secrets with GitLab
* Internet of Things OTA Secret Update
* Microservice Authentication with Zero-Trust and MTLS

### Companies/Teams

* [Employee Onboarding and Offboarding](./Employee-Onboarding-and-Offboarding.md)
* [Device Provisioning](./Device-Provisioning.md)
* [Delegation of Authority](./Delegation-of-Authority.md)

### General

* Managing Secret Sprawl (Secret Provenance)
* Cryptocurrency Wallet

# Theory

* [Secrets Management](./Secrets-Management.md)
* [Decentralized Trust Network](./Decentralized-Trust-Network.md)
* [Centralized vs Decentralized Platforms](./Centralized-vs-Decentralized-Platforms.md)
* [Glossary](./Glossary.md)

# Reference

### CLI

* [CLI API](./CLI-API.md)
* environment variables
* parameterisation configuration priority
* different commands and their help pages
* [Bootstrapping](./Bootstrapping.md)
* [CLI commands design](./CLI-commands-design-and-style.md)

### Agent

* [Agent Architecture](./Agent-Architecture.md)
* "Agent process" is the background process
* Node State
* State Version and Schema
* What is "keynode"

### Keys

* [Keys API](./Key-API.md)
* [Cryptography](./Cryptography.md)
* Root Keys
  - Key Renewal
* Root Certificate

### Vaults

* [Vault Storage](./Vault-Storage.md)
  - facade
  - efs
* [Vault Lifecycle](./Vault-Lifecycle.md)
* [Vault Sharing](./Vault-Sharing.md)
  - permissions
* [Vault Versioning](./Vault-Versioning.md)
* [Vault Operations](./Vault-Operations.md)
* [Vault API](./Vault-API.md) - should be deleted
* [Git API](./Git-API.md) - should be deleted (function descriptions are not required)

### Nodes

* [Node Connections](./Node-Connections.md)
* [Node Discovery with Kademlia](./Node-Discovery-with-Kademlia.md)
* [Node API](./Node-API.md) - should be deleted
* [Node Identification](./Node-Identification.md)
* Trusted Seed Nodes

### gRPC and HTTP API

* [Client Service](./Client-API.md)
* Agent Service
* Service Error Handling
* Service Versioning
* [Session Management](./Session-Management.md)
  - SessionManager and Session
* [Infrastructure Overview](./Infrastructure-Overview.md) - should be synthesised
* [Privilege Model](./Privilege-Model.md) - should be synthesised
* [Using the PolykeyClient](./Using-the-PolykeyClient.md)
* Protobuf Schemas and Compilation

### Gestalts

* [Gestalt Graph](./Gestalt-Graph.md)
* Gestalt Discovery

### Identities

* [Identification with Third Party Services](./Identification-with-Third-Party-Services.md)

### Sigchain

* [Sigchain](./Sigchain.md)
* Claims

### ACL

* [ACL](./ACL.md)
* Structure of ACL, but not the usage of it

### Notifications

* Vault Sharing
* Gestalt Invite
* Node Linking

### Network

* [Network](./Network.md)
* [Nat Traversal](./NAT-Traversal.md)
  - Signalling & Bidirectional Hole Punching
  - TURN Relays
* architecture
* error conditions

### DB

* DB

### Workers

* [Workers API](./Worker-API.md)
* Zero Copy Transfer with ArrayBuffer
* Worker Pool used by Keys and DB and Vaults (EFS)

# Development Guide

* [Roadmap](./Roadmap.md)
* [Software Architecture](./Software-Architecture.md)
* [Style Guide](./Style-Guide.md)
* [Error Handling in PolyKey](./Errors.md)
* [Async Functions](./Async-Functions.md)
  - Promise Usage
* [API Design](./API-Design.md)
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
* [Building](./Building.md)
* [Chocolatey](./Chocolatey.md)
