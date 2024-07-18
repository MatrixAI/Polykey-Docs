# Claiming Your Digital Identity

Welcome to Polykey, where securing your digital identity is seamless and secure. This guide walks you through linking your Polykey node with GitHub, enabling you to claim and authenticate your digital identity effortlessly. By posting a cryptographic link to a publicly verifiable location, you enhance security and simplify identity verification, making trust-building with others straightforward.

Let's start by authenticating with GitHub, your gateway to claiming ownership of your digital identity in Polykey.

<details>
<summary>More Details</summary>

- **Technical Use of Permissions**: During the authentication process, Polykey requests access to create gists, read all user profile data, and access user email addresses (read-only) to ensure accurate identity verification and manage notifications.

- **Security and Privacy Considerations**: Polykey adheres to high standards of security and privacy, using accessed data strictly for mentioned operations and not sharing it with third parties. For more details, refer to our [privacy policy](https://polykey.com/privacy-policy).
</details>

## Step 1: Authenticate with GitHub

Authentication with GitHub is the first step toward claiming your digital identity. This process allows Polykey to interact with GitHub on your behalf and access necessary information to claim your identity.

```bash
polykey identities authenticate github.com
```

:::tip
Follow the prompts in your terminal to complete the authentication, which may involve logging into your GitHub account and authorizing Polykey to access your GitHub information via a popup window.
:::

![GitHub Authentication](/images/github-authentication.png)

## Step 2: Claim Your Identity

After successfully authenticating with GitHub, claim your identity by posting a cryptographic link to a publicly verifiable location, such as a GitHub gist. This link serves as proof of ownership of the identity.

```bash
polykey identities claim github.com:my-gh-username
```

:::tip
Replace `my-gh-username` with your actual GitHub username.
:::

<img src="/images/cryptolink.png" alt="Cryptolink" style={{ width: '70%', height: 'auto' }} />

## Step 3: Verify Your Claim

After claiming your identity, polykey provides a link to a GitHub gist in your terminal. This is one method to verify that your identity has been correctly claimed.

![Claim Id](/images/claim-id.png)
:::note
This gist contains the cryptographic link confirming that your Polykey identity is correctly linked to your GitHub profile.
:::

### Primary Verification Method

Check your GH gists. Replace `my-github-username` with your actual gh username and navigate to the url.

```bash
https://gist.github.com/my-github-username
```

This gist contains the cryptographic link confirming that your Polykey identity is correctly linked to your GitHub profile. Viewing this gist ensures your claim was successful and publicly verifiable.

## Understanding Gestalt Graphs

In Polykey, claiming identities creates a **gestalt graph**—a dynamic, interconnected network of your digital identities across various platforms. This graph facilitates the federated identity model, allowing for more robust and streamlined identity verification and management.

![gestalts](/images/gestalts.png)

_This image shows a federated gestalt graph example concept map._

### How Gestalt Graphs Work

Each node within the graph represents an identity or a claim, and edges represent trust relationships or cryptographic verifications. As you claim more identities or add nodes, the graph expands, enhancing its utility by making identity verification straightforward and trust relationships more transparent.

### Claiming Multiple Identities

Polykey enables you to manage your digital presence flexibly by supporting the claiming of multiple identities across different scenarios. Specifically, you can:

- Link one node to several identity providers (IdPs), broadening your digital footprint and verification avenues as more IdPs are supported.

- Claim the same identity provider, such as a GitHub username, across multiple unique nodes you control, consolidating your digital identity while expanding your network's reach.

### Future Plans and IdP Support

Currently, Polykey supports GitHub as an identity provider (IdP). However, we are actively working to expand our support to include a wider range of major IdPs. This expansion will enhance Polykey's accessibility and versatility, accommodating a broader user base. Additionally, organizations will have the option to maintain their own IdPs, allowing for even greater customization and control over identity management within Polykey.

### Benefits of Federated Identities

Using a federated identity model through gestalt graphs offers several benefits:

- **Enhanced Security**: By linking various identity proofs, it strengthens the authenticity and credibility of your digital identity.
- **Simplified Management**: Manage multiple identities through a single interface, reducing complexity and improving user experience.
- **Interoperability:** Easily interact across different platforms and services using a unified identity framework.

Understanding and utilizing gestalt graphs in Polykey not only secures your operations but also significantly simplifies the process of digital identity management.

## Conclusion

Claiming your digital identity in Polykey links your cryptographic operations to external accounts like GitHub, securing your operations and facilitating identity verification by others. This guide details the essential steps for authenticating, claiming, and verifying your identity in Polykey.

In the next section, we will explore additional operations related to digital identity management in Polykey, including discovery of other users, trust management and permissions handling.
