# Claim Your Digital Identity

This guide helps you link your Polykey node to a GitHub identity, enhancing discoverability and trust within the network.

<details>
<summary>Why Link a GitHub Identity?</summary>
Linking your node to GitHub allows other users to discover and interact with your node using a familiar and verifiable identity, simplifying trust-building across the network.
</details>

## Prerequisites

- Ensure your Polykey node is installed and running.
- Have your GitHub login credentials ready.

<details>
<summary>What data does Polykey manage from the authenticated IdP ?</summary>

- **Technical Use of Permissions**: During the authentication process, Polykey requests access to create gists, read all user profile data, and access user email addresses (read-only) to ensure accurate identity verification and manage notifications.

- **Security and Privacy Considerations**: Polykey adheres to high standards of security and privacy, using accessed data strictly for mentioned operations and not sharing it with third parties. For more details, refer to our [privacy policy](https://polykey.com/privacy-policy).
</details>

## Step 1: Authenticate with GitHub

Authenticate your node with GitHub to allow Polykey to access necessary information for identity linking.

```bash
polykey identities authenticate github.com
```

:::tip

Follow the prompts in your terminal, log into your GitHub account, and authorize the requested permissions.

:::

![GitHub Authentication](/images/github-authentication.png)

## Step 2: Claim Your Identity

Claim your GitHub identity to establish a verifiable link between your node and your GitHub account.

```bash
polykey identities claim github.com:<my-gh-username>
```

:::tip
Replace `my-gh-username` with your actual GitHub username.
:::

<img src="/images/cryptolink.png" alt="Cryptolink" style={{ width: '70%', height: 'auto' }} />

## Step 3: Verify Your Claim

Once claimed, you'll receive a link to a GitHub gist that verifies the identity link.

![Claim Id](/images/claim-id.png)
:::note
Visit the provided gist URL to confirm the link's presence and validity.
:::

## Understanding the Impact

Claiming a GitHub identity with your Polykey node creates a gestalt graph, enhancing your node's discoverability and trust within the network.

![gestalts](/images/gestalts.png)

<details>
<summary>Learn More About Gestalt Graphs</summary>

### Understanding Gestalt Graphs

**Gestalt Graphs** are visual representations of the relationships and trust connections between different digital identities within Polykey. Each node on a graph symbolizes an identity or a claim, and the edges between nodes represent cryptographic verifications or trust relationships.

#### How Gestalt Graphs Work

- **Nodes**: Represent individual identities linked to Polykey, such as a GitHub username.
- **Edges**: Signify the trust connections or verification links between various identities.

As you expand your digital presence by claiming more identities, or by adding more nodes to your network, the gestalt graph grows accordingly. This dynamic expansion enhances the network's utility by streamlining the process of identity verification and making the establishment of trust relationships more transparent and traceable.

#### Claiming Multiple Identities

Polykey allows for flexible management of digital identities, accommodating multiple use cases:

- **Multiple IdPs for a Single Node**: You can link one Polykey node to several identity providers, enhancing your digital verification pathways and security.
- **Single IdP Across Multiple Nodes**: Claim and link the same identity provider, like a GitHub username, across multiple Polykey nodes you control, thus broadening your digital identity and reach within the network.

#### Future Plans and IdP Support

Currently, Polykey integrates with GitHub as a primary identity provider. Our ongoing development aims to broaden this integration to include various major identity providers (IdPs), significantly enhancing accessibility and user engagement. Future updates will also allow organizations to implement their own IdPs, offering even greater control and customization of identity management operations within Polykey.

#### Benefits of Federated Identities

Adopting a federated identity model through gestalt graphs provides several advantages:

- **Enhanced Security**: Links multiple identity proofs to fortify the authenticity and credibility of your digital identity.
- **Simplified Identity Management**: Manages multiple identities through a unified interface, reducing complexity and streamlining user interactions.
- **Interoperability**: Facilitates seamless interactions across different platforms and services, leveraging a cohesive identity framework.

Utilizing gestalt graphs within Polykey enhances operational security and simplifies digital identity management, making it an indispensable tool for users navigating complex digital environments.

</details>

## Conclusion

Successfully linking your Polykey node to your GitHub identity not only secures your digital interactions but also facilitates easier and more reliable verification by other network participants.
