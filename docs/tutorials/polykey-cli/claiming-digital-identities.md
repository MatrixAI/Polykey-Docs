# Claiming Digital Identities: Establishing Identity Linkages in Polykey

In Polykey, claiming a digital identity is a crucial step that allows users to
establish their identity across various platforms and link these identities to
their cryptographic keys. This process involves authenticating with external
services, such as GitHub, and claiming ownership of an identity by posting a
cryptographic link to a publicly verifiable location.

This tutorial will guide you through the steps to authenticate with GitHub and
claim an identity using Polykey, enhancing security and streamlining identity
verification, making it easier for other users to discover and trust your nodes.

## Step 1: Authenticate with GitHub

Authentication with a service provider like GitHub is the first step toward
claiming your digital identity. This process allows Polykey to interact with
GitHub on your behalf and access necessary information to claim your identity.

![GitHub Authentication](/images/github-authentication.png)

_This image provides a demo example of the GitHub authentication process._

### Command Usage

:::info

```bash
polykey identities authenticate <providerId>
```

`<providerId>`: The identifier for the digital identity provider, such as
"github". :::

:::note Since Polykey currently only supports GitHub as an IdP, this is the
command that you will use to start the authentication process.

```bash
polykey identities authenticate github
```

:::

This command begins the authentication process with GitHub. Follow the prompts
in your terminal to complete the authentication, which may involve logging into
your GitHub account and authorizing Polykey to access your GitHub information
via a popup window.

:::tip The code prompted by the browser will be displayed in your terminal as
the user code. :::

### Lists all authenticated identities across all providers

`polykey identities authenticated` command will output the providerID and
corresponding identityID of the authenticated IdP. This is a way to check that
you completed the authentication process correctly.

#### Example Usage

```bash
polykey identities authenticated
```

##### Example Output

```bash
providerId	github.com
identityId	maverick
```

### Technical Use of Permissions

During the authentication process, here's what Polykey requests access to and
why:

- **Create Gists:** Polykey creates a gist under your GitHub account containing
  a cryptographic link. This link is a verifiable method that proves the
  ownership of your GitHub identity to anyone checking your Polykey gestalt
  graph.

- **Read All User Profile Data:** This enables Polykey to access your profile
  details, including your username, followers, and public repository data. This
  information is used to ensure that the identity you claim corresponds
  accurately to your public digital footprint, enhancing trust and verification.

- **Access User Email Addresses (read-only):** By accessing the email addresses
  associated with your account, Polykey can better manage notifications related
  to your secrets operations.

#### Security and Privacy Considerations

Polykey is committed to maintaining the highest standards of security and
privacy. All data accessed is used strictly for the operations mentioned and is
not shared with any third parties. Our privacy practices are designed to protect
your information and ensure its confidentiality. For more details, please refer
to our [privacy policy](https://polykey.com/privacy-policy).

## Step 2: Claim Your Identity

After successfully authenticating with GitHub, you can claim your identity. This
involves posting a cryptographic link to a publicly verifiable location, such as
a GitHub gist. This link serves as proof of ownership of the identity.

<img src="/images/cryptolink.png" alt="Cryptolink"
style={{ width: '70%', height: 'auto' }} />

### Command Usage

_This image provides a demo example of the cryptographic link that is
generated._

:::info

- `<providerIdentityId>`: The specific identity identifier from the provider you
  authenticated with, which you will claim.

- `polykey identities claim` argument for `<providerIdentityID>` = `github.com`+
  `:` + `GH username`

:::

Replace `my-gh-username` with your actual GitHub username. This command claims
your GitHub identity by posting a cryptographic link to a gist under your GitHub
profile.

```bash
polykey identities claim github.com:my-gh-username
```

## Step 3: Verify Your Claim

After claiming your identity, Polykey provides a link to a GitHub gist in your
terminal. This is your primary method to verify that your identity has been
correctly claimed.

![Claim Id](/images/claim-id.png)

_This image shows a demo example of the link to the gist that was created when
claiming the identity which forms a gestalt._

### Primary Verification Method

Check your GH gists. Replace `my-github-username` with your actual gh username
and navigate to the url.

```bash
https://gist.github.com/my-github-username
```

This gist contains the cryptographic link confirming that your Polykey identity
is correctly linked to your GitHub profile. Viewing this gist ensures your claim
was successful and publicly verifiable.

## Understanding Gestalt Graphs

In Polykey, claiming identities creates a **gestalt graph**—a dynamic,
interconnected network of your digital identities across various platforms. This
graph facilitates the federated identity model, allowing for more robust and
streamlined identity verification and management.

![gestalts](/images/gestalts.png)

_This image shows a federated gestalt graph example concept map._

### How Gestalt Graphs Work

Each node within the graph represents an identity or a claim, and edges
represent trust relationships or cryptographic verifications. As you claim more
identities or add nodes, the graph expands, enhancing its utility by making
identity verification straightforward and trust relationships more transparent.

### Claiming Multiple Identities

Polykey enables you to manage your digital presence flexibly by supporting the
claiming of multiple identities across different scenarios. Specifically, you
can:

- Link one node to several identity providers (IdPs), broadening your digital
  footprint and verification avenues as more IdPs are supported.

- Claim the same identity provider, such as a GitHub username, across multiple
  unique nodes you control, consolidating your digital identity while expanding
  your network's reach.

### Future Plans and IdP Support

Currently, Polykey supports GitHub as an identity provider (IdP). However, we
are actively working to expand our support to include a wider range of major
IdPs. This expansion will enhance Polykey's accessibility and versatility,
accommodating a broader user base. Additionally, organizations will have the
option to maintain their own IdPs, allowing for even greater customization and
control over identity management within Polykey.

### Benefits of Federated Identities

Using a federated identity model through gestalt graphs offers several benefits:

- **Enhanced Security**: By linking various identity proofs, it strengthens the
  authenticity and credibility of your digital identity.
- **Simplified Management**: Manage multiple identities through a single
  interface, reducing complexity and improving user experience.
- **Interoperability:** Easily interact across different platforms and services
  using a unified identity framework.

Understanding and utilizing gestalt graphs in Polykey not only secures your
operations but also significantly simplifies the process of digital identity
management.

## Conclusion

Claiming your digital identity in Polykey links your cryptographic operations to
external accounts like GitHub, securing your operations and facilitating
identity verification by others. This guide details the essential steps for
authenticating, claiming, and verifying your identity in Polykey.

In the next section, we will explore additional operations related to digital
identity management in Polykey, including discovery of other users, trust
management and permissions handling.
