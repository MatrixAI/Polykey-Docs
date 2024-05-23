import DocCardList from '@theme/DocCardList';

# Polykey CLI

The Polykey Command Line Interface (CLI) is the primary user interface for the Polykey system, tailored for developers and system administrators. It was conceived from the necessity of managing secrets efficiently during software development and deployment workflows.

## Overview

The Polykey CLI is the first and primary interface to the Polykey system. It is intended for developers and system administrators who require an advanced tool for managing secrets efficiently. New features are introduced in the CLI first, serving as a testing and integration ground before being ported to other user interfaces. This approach ensures that the features are reliable and refined for professional use.

We designed the CLI user-experience (UX) to be suitable for a human operator, but also to be easily scripted and integrated into other tools.

The tutorial here should be followed in order, and the goal is to make use of Polykey to manage secrets for a simple application from development to deployment.

The CLI is open-source and available on GitHub: [Polykey CLI](https://github.com/MatrixAI/Polykey-CLI).

We automatically build and test the CLI on the following platforms:

- Linux x64
- Linux arm64
- MacOS x64
- MacOS arm64
- Windows x64
- Docker

:::note
Polykey is currently in beta. Its interface is at various levels of stability. So bear with us as we perfect its design. You can contribute by discussing with us on [Discord](https://discord.gg/h3UShM8WUN) or creating issue tickets in the [Polykey-CLI repo on GitHub](https://github.com/MatrixAI/Polykey-CLI).
:::

## Getting Started

To begin managing & sharing secrets effectively with Polykey, follow the tutorials in the sequence outlined below:

:::tip
You may also reference the following [demo video](https://vimeo.com/884649667) for the getting started tutorial but you will first need to complete the installation instructions for Polykey-CLI.
:::

1. **[Installation](/docs/tutorials/polykey-cli/installation)**: Set up Polykey CLI on your preferred platform.
2. **[Bootstrap Keypair](/docs/tutorials/polykey-cli/bootstrapping)**: Initialize your node and connect to the Polykey network.
3. **[Managing Vaults](/docs/tutorials/polykey-cli/managing-vaults)**: Create and manage secure vaults for effective secrets storage.
4. **[Managing Secrets](/docs/tutorials/polykey-cli/managing-secrets)**: Explore comprehensive methods for handling and organizing secrets within vaults.
5. **[Claiming Digital Identities](/docs/tutorials/polykey-cli/claiming-digital-identities)**: Authenticate and establish your identity across the Polykey network.
6. **[Discovering Other User's Identities](/docs/tutorials/polykey-cli/discovering-other-users)**: Locate and verify identities of other users to manage access.
7. **[Sharing Vaults](/docs/tutorials/polykey-cli/sharing-vaults)**: Share vaults securely with trusted peers.

These initial tutorials will guide new users through the basic functionalities of setting up Polykey, starting their node (similar to creating a Web3 wallet connected to a P2P network), creating virtual encrypted vaults, and managing secret files within these vaults. This foundation prepares users for more advanced network functionalities, such as identity claims, discovery of other users' nodes, and secure sharing of secrets and vaults through end-to-end encryption.

After mastering these basics, you'll be ready to explore intermediate use-cases such as:

- Managing multiple local nodes
- Linking multiple nodes to a single identity
- Using Polykey's `env` command to inject secrets into your development environment

These topics will be covered in more detail in the next section of our documentation, providing you with the tools to leverage Polykey's full potential in more complex operational environments.

<DocCardList />
