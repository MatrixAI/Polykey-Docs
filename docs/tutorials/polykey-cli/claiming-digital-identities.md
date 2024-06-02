# Claiming Digital Identities

In Polykey, claiming a digital identity is a critical step that allows users to establish their identity across various platforms and link these identities to their cryptographic keys. This process involves authenticating with external services, such as GitHub, and claiming ownership of an identity by posting a cryptographic link to a publicly verifiable location.

This tutorial will guide you through the steps to authenticate with GitHub and claim an identity using Polykey. This process enhances security and streamlines identity verification, making it easier for other users to discover and trust your nodes.

## Step 1: Authenticate with GitHub

Authentication with a service provider like GitHub is the first step towards claiming your digital identity. It allows Polykey to access necessary information to claim your identity and to interact on your behalf.

### Command Usage

```bash
polykey identities authenticate <providerId>
```

- `<providerId>`: The identifier for the digital identity provider, such as "github".

#### Example

```bash
polykey identities authenticate github
```

This command initiates the authentication process with GitHub. Follow the prompts in your terminal to complete the authentication, which may involve logging into your GitHub account and authorizing Polykey to access your GitHub information. The code prompted by the browser is outputed on your terminal as the user Code.

<!-- paste image from demo -->

<!-- what info do they collect, what is the user authorizing?  -->

## Step 2: Claim Your Identity

After successfully authenticating with GitHub, you can claim your identity. This involves posting a cryptographic link to a publicly verifiable location, such as a GitHub gist. This link serves as proof of ownership of the identity.

### Command Usage

```bash
polykey identities claim <providerIdentityId>
```

- `<providerIdentityId>`: The specific identity identifier from the provider you authenticated with, which you will claim.

#### Example

```bash
polykey identities claim my-github-username
```

Replace my-github-username with your actual GitHub username. This command claims your GitHub identity by posting a cryptographic link to a gist under your GitHub profile.

<!-- post image from demo -->

## Step 3: Verify Your Claim

Verification ensures that your identity claim is publicly visible and correctly linked to your Polykey identity.

### Via GitHub

```bash
gist.github.com/my-github-username
```

The gist should contain the cryptographic link that connects your Polykey identity to your GitHub profile.

### Via Polykey

Verify the gestalt graph creation within Polykey:

#### Command Usage

```bash
polykey identities list
```

This lists all gestalts known to your node, including your own.

#### Example Output

```bash
gestalt
  actionsList
  identities
    github.com:CryptoTotalWar
  nodeIds
    vgijtpv0h8m1eajeir77g73muq88n5kj0413t6fjdqsv9kt8dq4pg
```

Seeing your node ID and GitHub username confirms the successful creation of your cryptographic link.

## Understanding Gestalt Graphs

Claiming identities forms a gestalt graph, a network of your federated digital identities. As you claim more identities or nodes, this graph grows, making it easier for others to discover and verify your identity.

It's possible to claim multiple identities. For instance, you can authenticate and claim a GitHub identity for each node you control.

## Conclusion

Claiming your digital identity in Polykey links your cryptographic operations to external accounts like GitHub, securing your operations and facilitating identity verification by others. This guide has detailed the essential steps to authenticate, claim, and verify your identity in Polykey.

In the next section, we will explore additional operations related to digital identity management in Polykey, including trust management and permissions handling.
