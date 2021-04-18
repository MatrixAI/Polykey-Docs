Welcome to our js-polykey repo!

Visit our [Getting Started](https://github.com/MatrixAI/js-polykey/wiki/getting-started) Guide to deploy your very own PolyKey agent.

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