---
slug: /
---

Polykey - a decentralized secrets management system!

Visit our [Getting Started](https://github.com/MatrixAI/Polykey/wiki/getting-started) Guide to deploy your very own PolyKey agent.

Alternatively, review our **Reference** or **Background Information** sections.

# About

PolyKey is a decentralised distributed peer to peer (P2P) secret sharing & secret
management system. It is intended to be used by both humans and machines.
It synthesise a unified workflow between interactive password management and
infrastructure key management.

This project PolyKey (library) is the core library for running PolyKey. It
provides a CLI `polykey` or `pk` for interacting with the PolyKey system. The
main desktop GUI is located at https://github.com/MatrixAI/PolyKey.

PolyKey involves running distributed keynodes, which we will refer to as "nodes".
A host system can run multiple nodes. Each node manages one or more vaults which
are encrypted filesystems with automatic version history. You can share these
vaults with other users of PolyKey who are running their own keynodes.

# Wiki

The wiki is structured using Divio system: https://documentation.divio.com/

<img src="/images/divio_quadrant.png" width="70%" />

* Tutorials - these are a series of steps to introduce Polykey to new beginners to achieve a practical outcome
* How-To Guides - these are short guides on how to achieve a specific use-case which makes assumptions on the reader
* Reference - these are useful when you need remember how to use a particular command or function
* Theory - these are important for understanding the "why" of Polykey

Each sub-project has their own `Reference` and `How-To Guides`, however most `Tutorials`, `How-To Guides` and `Theory` are all located here in the master-project.
