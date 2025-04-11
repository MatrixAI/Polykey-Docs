import DocCardList from '@theme/DocCardList';

# Polykey CLI

The Polykey Command Line Interface (CLI) is the primary user interface for the
Polykey system, tailored for developers and system administrators. It was
conceived from the necessity of managing secrets efficiently during software
development and deployment workflows.

## Overview

The Polykey CLI is the first and primary interface to the Polykey system. It is
intended for developers and system administrators who require an advanced tool
for managing secrets efficiently. New features are introduced in the CLI first,
serving as a testing and integration ground before being ported to other user
interfaces. This approach ensures that the features are reliable and refined for
professional use.

We designed the CLI user-experience (UX) to be suitable for a human operator,
but also to be easily scripted and integrated into other tools.

The tutorial here should be followed in order, and the goal is to make use of
Polykey to manage secrets for a simple application from development to
deployment.

The CLI is open-source and available on GitHub:
[Polykey CLI](https://github.com/MatrixAI/Polykey-CLI).

### Supported Platforms

Polykey is continuously built and tested on:

- Linux x64
- MacOS x64 / arm64
- Windows x64
- Docker

:::note Note

 Polykey is currently in beta. Its interface is at various levels of
stability. So bear with us as we perfect its design. You can contribute by
discussing with us on [Discord](https://discord.gg/h3UShM8WUN) or creating issue
tickets in the
[Polykey-CLI repo on GitHub](https://github.com/MatrixAI/Polykey-CLI). 

:::

## Getting Started

Start your journey with Polykey by following the tutorials below in sequence:

:::tip For a visual walkthrough, check out our
[getting started demo video](https://vimeo.com/884649667) after installing
Polykey. :::

1. **[Installation](/docs/tutorials/polykey-cli/installation)** - Install
   Polykey CLI on your platform.
2. **[Bootstrap Keypair](/docs/tutorials/polykey-cli/bootstrapping)** - Set up
   your node and connect to the network.
3. **[Managing Vaults](/docs/tutorials/polykey-cli/managing-vaults)** - Securely
   store secrets within encrypted vaults.
4. **[Managing Secrets](/docs/tutorials/polykey-cli/managing-secrets)** -
   Organize and handle secrets within your vaults.
5. **[Claiming Digital Identities](/docs/tutorials/polykey-cli/claiming-digital-identities)** -
   Establish and authenticate your identity within the network.
6. **[Discovering Other User's Identities](/docs/tutorials/polykey-cli/discovering-other-users)** -
   Find and verify other users to manage permissions.
7. **[Sharing Vaults](/docs/tutorials/polykey-cli/sharing-vaults)** - Share your
   encrypted vaults securely with peers.
8. **[Managing Multiple Nodes](/docs/tutorials/polykey-cli/managing-multiple-nodes)** -
   Operate multiple local nodes/agents.
9. **[Using Environment Variables](/docs/tutorials/polykey-cli/using-environment-variables)** -
   Master `polykey secrets env` for dynamic environment management.

Explore advanced scenarios in subsequent sections, including:

- Managing multiple local nodes
- Integrating multiple nodes with a single identity
- Injecting secrets directly into your development environments using Polykey’s
  `env` command

This will prepare you to fully exploit Polykey’s capabilities in diverse and
complex operational settings.

<DocCardList />
