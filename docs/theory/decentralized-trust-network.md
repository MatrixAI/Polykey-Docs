# Decentralized Trust Network

The secure sharing of [secrets](./Glossary.md#secret) between people and machines involves authenticating [digital identities](./Glossary.md#identity), deciding whether to trust those digital identities, and authorising the privilege of accessing the secrets.

Authentication involves securely identifying an agent (person or machine) on the internet with whom we wish to share secret information. Without this, regardless of what encryption technology we use and how we use it, any secret shared would be compromised.

## Digital Identities and Identity Providers

To authenticate [digital identities](./Glossary.md#digital-identity), we must understand that they are digital artifacts (e.g. social media profiles, public keys, certificates) that exist on the internet and represent real-world [agents](./Glossary.md#agent). If multiple digital identities are used to represent a single agent, then each digital identity is a facet or [point of presence](./Glossary.md#point-of-presence) of the combined identity.

The most commonly used digital identities are hosted on centralized identity provider platforms. There are public (e.g. StackOverflow, GitHub, eBay, Facebook, LinkedIn, Twitter) and private platforms (e.g. Active Directory, Slack).

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/di-ceos.png" width="60%" />
    <br />
    <figcaption>From top left to bottom: Digital identities for the CEOs of Twitter, GitHub, LinkedIn, and FaceBook</figcaption>
  </figure>
</p>

### Reputation Systems and Trust Networks

Public identity provider platforms are [reputation systems](https://en.wikipedia.org/wiki/Reputation_system) that incentivise agents to perform digital activities (that may have physical real-world effects) in order to signal social proof, and thus build a network of trust via reputation. Reputation is a quantified unit of trust (a.k.a. [trust metric](https://en.wikipedia.org/wiki/Trust_metric)), and it is valuable[^1] because it represents status, grants privileges, and can be exchanged for benefits. Private platforms are simpler as trust/reputation is dictated by the platform's owner. For the purposes of this article, we're going to focus on public platforms.

[Social trust](https://en.wikipedia.org/wiki/Trust_(social_science)) is a subjective assessment of the quality and significance of another's influence on your own outcomes for a given situation. This assessment affects your expectation of, openness to and inclination of such influence. It is the heuristic shortcut that enables social cooperation, as without it decision makers would be paralysed by analysing all possibilities. Social trust is a vague notion that can be quantified into formal trust metrics or reputation. This is what enables the invention of automated reputation systems.

Reputation systems create a trust network between their users. At a high level, trust networks have 3 phases for any [trust-based decision making](https://en.wikipedia.org/wiki/Computational_trust):

1. Authentication & Identification - discovering identities by querying social proof information and tracing digital activities to identities
2. Trust Model Calculation - reputation is earned through gamified collaborative digital activities, and when combined with other metrics produces trustworthiness, e.g. friend and follower count, likes, stars and ratings.
3. Authorisation Decision - users rely on trustworthiness to decide how to engage in digital activities, e.g. retweeting, sharing photos, answering questions, trading goods & services.

For example, a user on the StackOverflow technical Q&A commmunity, may discover questions relating to a technical problem they are facing. When reviewing the answers, they can see the vote count and associated comments which leads them to calculate which answers are trustworthy. Finally they authorise a decision to use the answer to solve their problem, and reward the answerers by upvoting their answers.

The 3 phases form a core loop which continously improves the quality of service that these systems provide.

An important property of trust networks is "transitivity". This is where if A trusts B, and B trusts C, then A can trust C. Transitivity makes [social proof](https://en.wikipedia.org/wiki/Social_proof) possible, because it is the belief that people around you collectively hold more information about the current environment or situation than yourself.

Currently identity provider platforms are all isolated islands of trust. Transitivity is bounded to the scope of each trust network. This means the reputation gained on one network doesn't carry over to other networks. This increases the friction for users to adopt new (potentially better) reputation systems. This is called the [network-effect](https://en.wikipedia.org/wiki/Network_effect). It creates [economic moats](https://en.wikipedia.org/wiki/Economic_moat) for incumbent centralized identity provider monopolies, and increases the [switching costs](https://en.wikipedia.org/wiki/Switching_barriers) for users.

In order to get around this problem and enable seamless adoption, Polykey bootstraps a decentralized trust network on top of existing digital identities and identity provider platforms[^2]. Isolated trust networks are connected by [crossposting](https://en.wikipedia.org/wiki/Crossposting) cryptographically signed ownership claims on digital identities, via their respective identity provider platforms. Unlike centralized platforms, the usage of cryptography is necessary in decentralized environments to enable independent verification and guarantees such as message authenticity. This usage of cryptographic technology constructs a form of computational trust, which is ultimately only useful when anchored on social trust and social proof. This means the 2 phases of authentication & identification and trust model calculation are performed with existing reputation systems.

In our architecture, users can make a trust-based decision such as authorising secret sharing by considering pre-existing reputation. For example a user can authenticate an agent on Polykey's network by checking that they are cryptographically linked to a profile on GitHub, then establish a direct secure communication channel to transfer secrets.

## Trust Network Architecture

Polykey's trust network architecture is composed of several components.

### Keynode Sigchain

Polykey's secrets are stored in [Vaults](./Glossary.md#vault) that are managed and shared between [Keynodes](./Glossary.md#keynode). Each Keynode possesses a digital identity in Polykey's trust network. These identities start with root public & private key pair and along with other information is put together into a [X.509 certificate](https://en.wikipedia.org/wiki/X.509).

* The Keynode Identity Certificate provides information about its public key, as well as the owner of this public key.
* The key owner, as well as other entities (represented by their own X.509 certificates) can sign claims held on the Keynode Identity Certificate to verify their authenticity.
* This chain of signed claims (known as a [Sigchain](./Glossary.md#sigchain)) allows for the maintenance of a [chain of trust](https://en.wikipedia.org/wiki/Chain_of_trust), serving as an append-only log of signed actions and claims made by the Keynode.
* The Keynode's [root certificate](https://en.wikipedia.org/wiki/Root_certificate) acts as a [trust anchor](https://en.wikipedia.org/wiki/Trust_anchor), establishing trust for the entire Sigchain and allowing claims to hold an assumed level of trust, provided you trust the Keynode.

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/X509.png" width="90%" />
    <br />
    <figcaption>X.509 certificates act as the root of trust for Polykey Sigchains</figcaption>
  </figure>
</p>

These Keynodes are at the core of Polykey's system of authentication, which is managed by a Polykey Agent. The Polykey Agent has access to all of the Keynodes stored on a particular computing device and is the user's interface to all of Polykey's functionality.

### Gestalt Graph

Within Polykey, a [Gestalt](./Glossary.md#gestalt) refers to the representation of an agent. The name comes from the field of [Gestaltism](https://en.wikipedia.org/wiki/Gestalt_psychology), which is based on the idea that "the whole is greater than the sum of its parts". For our purposes, the "whole" here refers to an agent, and the "sum of its parts" refers both to digital identities and to secrets.

Our Gestalts are comprised of the following set of components:
- At least one Keynode
- Zero or more digital identities
- Node-to-Node and Node-to-Identity [cryptolinks](./Glossary.md#cryptolink)

Keynodes store secrets, digital identities are artifacts of the agent's identity, and cryptolinks are what join these components together. These cryptolinks are simply signed statements on Keynode Sigchains and digital identities, however, they can be visualized as the edges of a graph with Keynodes and digital identities as its vertices.

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/GestaltDiagram.png" width="70%" />
    <br />
    <figcaption>Visual depiction of a Polykey Gestalt</figcaption>
  </figure>
</p>

These cryptolink claims are statements of ownership:
- Node-to-Node claims consist of a doubly-signed statement on each of two Keynodes (with each of these signed by both Keynodes) and indicate that the two Keynodes are members of the same Gestalt.
- Node-to-Identity claims consist of a singly-signed statement on one Keynode claiming ownership over a particular digital identity, as well as a similar singly-signed statement (signed by the Keynode) on the digital identity (made by itself). This process is known as digital identity [augmentation](./Glossary.md#augmentation).
- Claims are ordered and are immutable once created, ensuring both their [authenticity](./Glossary.md#authenticity) and [integrity](./Glossary.md#integrity), and preventing the insertion of false claims into the Sigchain.
- A single Keynode can augment multiple digital identities, as well as make claims over other Keynodes, leading to the formation of a Gestalt that is comprised of all of the Keynodes and digital identities that represent a particular agent.

### Identity Augmentation Process

Our augmentation process is what allows Polykey to utilize digital identities for authentication. The inspiration for this comes from [Keybase](https://book.keybase.io/docs/server), however, we have chosen to develop a decentralized platform over Keybase's use of a central server and distributed clients.

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/keybase.png" width="70%" />
    <br />
    <figcaption>Digital identity augmentation as implemented within Keybase</figcaption>
  </figure>
</p>

The process of digital identity augmentation within Polykey involves four main stages, however, only the final three belong to the augmentation itself:
1. Authorization: Before a digital identity can be augmented, Polykey needs permission to access, and make changes to, the digital identity through its provider. We utilize [OAuth](https://auth0.com/docs/authorization/flows/device-authorization-flow) for this process, allowing only secure, delegated access to user data.
2. Updating access permissions: The first step of the augmentation process itself is to update Keynode and Gestalt permissions. This step links the Keynode and digital identity inside the user's Gestalt and updates (or creates) Keynode permissions in the ACL to reflect these changes (see [Sharing](Gestalts-and-Digital-Identities#sharing) below for an explanation of the ACL).
3. Generating a claim on the Sigchain: A cryptolink claim between a Keynode and digital identity begins on the Keynode. The claim is generated by providing the name of both the digital identity and its provider to the Keynode, which then constructs and appends the claim to its Sigchain. This claim can subsequently be retrieved and decoded by the Polykey Agent.
4. Posting of the claim on the digital identity: The final step is for a copy of the claim (which has been signed by the claiming Keynode) to be published by the digital identity on the digital identity provider. After this step has been completed, there is a record of the cryptolink (known as an [Identity Proof](./Glossary.md#identity-proof)) both within Polykey (on the Keynode's Sigchain) and on the digital identity provider (in its record of statements made by the digital identity). This has the benefit of allowing augmentations to be visible to (and traceable by) both agents within Polykey (both human and machine) and the public.

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/augmentation.png" width="90%" />
    <br />
    <figcaption>Polykey's Digital Identity (DI) augmentation process</figcaption>
  </figure>
</p>

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/augmentationv3.png" width="90%" />
    <br />
    <figcaption>Structure of a cryptolink generated via augmentation</figcaption>
  </figure>
</p>

### Gestalt Trust and Notifications

Once a Gestalt is trusted it then becomes possible to share secret information with it (see [Secrets Management](secrets-management) for a detailed discussion of secret sharing), however, this trust must extend both ways. We will refer to this concept as Gestalt Trust.

The need for trust to be a basis of authentication, which is then used to authorize secret sharing, ties in with Polykey's [access-control list](https://en.wikipedia.org/wiki/Access-control_list) (ACL), whereby Gestalt Trust is used as a basis for allowing and disallowing permissions that extend to both Keynodes and Vaults. Since there is no single encapsulating definition of trust, it is important for a strictly managed [trust network](https://en.wikipedia.org/wiki/Web_of_trust) to adaptively ensure security of secrets, especially as agents, services, and the relationships between them continue to evolve and change over time.

The ACL is a record of the access permissions that you allow other agents to have over the secrets you share. These permissions can only be given and revoked by yourself, and they can extend to either your entire Gestalt or only to certain Vaults. There are two types of permissions within Polykey's ACL: Keynode Permissions and Vault Permissions.
- Keynode Permissions: Permissions given to other Keynodes that extend to your entire Gestalt.
  - Notify: This permission allows a Keynode to send notifications to any of your own, including simple messages, invitations to join the Keynode's Gestalt (via a Node-to-Node claim), and notifications of the Keynode giving your access permissions over one of their Vaults.
  - Scan: This permission allows a Keynode to scan your Vaults to find any that they have access to.
- Vault Permissions: Permissions given to other Keynodes that extend only to one or more of your Vaults.
  - Clone: This permission allows a Keynode to clone your Vault to create a local copy in their Gestalt.
  - Pull: This permission allows a Keynode to pull changes from your Vault to update their local copy.

### Gestalt Discovery

While the ACL allows agents to control when, how, and who they share secrets with, it cannot help them make the judgments of trust necessary for this sharing to be authorized. This is where Polykey makes use of [discovery](./Glossary.md#discovery) to find and authenticate agents.

Recall the process for the formation of Gestalts; they are comprised of Keynodes, whose Sigchains store the cryptolink claims linking digital identities and other Keynodes into one entity. Keynodes can also store the names and locations of other Keynodes it knows, those both inside and outside of its Gestalt. As such, all Gestalts within Polykey can be connected to form a Gestalt Graph representing every user.

As a decentralized network, there is no central directory of Keynodes or digital identities within Polykey that can be used to monitor and manage the Gestalt Graph. Instead, each individual Keynode acts as a single directory, contacting known Keynodes (and each of these Keynodes' known Keynodes) to traverse and discover the entire Gestalt Graph. This process allows us to find Gestalts, however, there are further steps we must take before we can authenticate these representations as agents and begin to share secrets with them.

[Social Discovery](./Glossary.md#social-discovery) is Polykey's method of discovering agents you wish to share secrets with through digital identities. Because the augmentation process by which digital identities are claimed by Gestalt Keynodes involves publishing an Identity Proof on the claimed digital identity, digital identity providers can be systematically searched for these statements. Furthermore, since the Identity Proof must be signed by the claiming Keynode, its public key can be used to verify the authenticity of the claim, and its Sigchain can be searched for the corresponding cryptolink as an added measure of security.

Once we have found the Keynode claiming ownership of a particular digital identity, we can follow the cryptolink claims on its Sigchain to discover the rest of its Gestalt. In this way, it is possible to find other claimed digital identities on other providers, giving us more information that we can use in our decision of whether to trust the Gestalt or not. It is once we have made this decision that we can begin to share secret information because it is at this stage that we trust that the Gestalt is representative of the agent we wish to communicate with.

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/gestalt-discovery.png" width="90%" />
    <br />
    <figcaption>The Gestalt Discovery process</figcaption>
  </figure>
</p>

Because all of Polykey's Gestalts are connected, the trust between them forms a network. This network of trust can have implications that we would like to develop and investigate further as Polykey continues to grow both in terms of functionality and application.

<p align="center">
  <figure>
    <img src="images/gestalts-and-DIs/gestalt-trust-chain.png" width="90%" />
    <br />
    <figcaption>The beginnings of a trust network formed by Gestalts</figcaption>
  </figure>
</p>

It is clear that, in many ways, trust is the foundation of all of our interactions. If we wish to be able to securely share secrets with other agents, trust must be tied not only to our relationships with the agent, but also to the methods we use to discover, authenticate, and establish them. Not only that, but this trust must also extend to our authorization and establishment of information sharing protocols.

---

So how does one decide whether or not to trust a Gestalt? This process starts by trusting any one of the digital identities contained within it, and this trust is then propagated to the rest of the Gestalt.

If a large enough number of people believe that a digital identity is a reliable representation of a particular agent, then this information can be used as a qualifier for trust.

If we trust a digital identity, then we can also trust a Keynode claiming ownership over the digital identity, and by extension the Gestalt containing this Keynode (due to the embedded level of trust incorporated into Sigchain claims). Once we trust a Gestalt, we can also trust all of the Keynodes contained within it. Moreover, as a Gestalt grows and connects to a greater number of digital identities, the amount of information available to form a decision of trust also increases, and thus we can be more confident in our decision to trust the Gestalt.

With secrets as a currency of access control, even more sophisticated privilege granting systems can be built on top of Polykey.

---

References:

* https://en.wikipedia.org/wiki/Trust_metric
* https://en.wikipedia.org/wiki/Computational_trust
* https://en.wikipedia.org/wiki/Reputation_system
* https://en.wikipedia.org/wiki/Reputation_capital
* https://en.wikipedia.org/wiki/Trust_federation
* https://www.inkandswitch.com/backchannel/
* https://docs.deso.org/

---

[^1]: Social influence is intuitively known to be valuable, however formal systems for capitalising quantified social influence is a recent development, for example see the [DESO project](https://deso.org).

[^2]: Similar efforts have taken place in the [past](https://en.wikipedia.org/wiki/Trust_federation) and in the [current](https://en.wikipedia.org/wiki/Decentralized_identifiers), usually by creating a [new identity standard that subsumes all existing identities](https://xkcd.com/927/). Polykey is different because it doesn't introduce a new identity standard, it just cryptographically links existing popular digital identities that regular (non-technical) people understand and use on a daily basis.
