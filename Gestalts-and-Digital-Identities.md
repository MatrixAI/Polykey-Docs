In today's world, agents can almost entirely be represented by their presences across digital identity providers. Through social discovery these agents can be located and authenticated, subsequently allowing for the secure sharing of secrets with desired entities.

Digital identities contain a vast amount and variety of information, so much so that digital identities can often go as far as to authenticate agents and allow them access to services and secrets (an example of this would be using your Facebook account to log into other websites). This ability comes not only from a digital identity's collection of factual information (e.g. an agent's name, age, and acquaintances), but also information about an agent's behavior.

Unlike factual information, behavioral information is hard to imitate. Because of this it can be quite a reliable representation of an agent, and people are sensitive to this. Social proof, the idea that the people around you will often collectively hold more information about the current environment or situation than yourself, taps into this idea. If a large number of people believe that a digital identity is a reliable representation of a certain physical agent, then you may have sufficient evidence to believe that this is true yourself.

Polykey takes advantage of this idea through the use of Gestalts, a word that comes from the adage "the whole is more than the sum of its parts". Gestalts, as implemented within Polykey, combine the information that is contained within digital identities with the secrets held within the vaults of a keynode to become a full representation of an agent. It is composed of at least one keynode, which can be connected via cryptolinks to other keynodes and to digital identities, and acts as a point of presence between identities and agents.

Gestalts are created through a secure process of augmentation: by posting a signed claim on both an identity provider and the sigchain of a keynode, an agent can augment an identity (in other words, establish a cryptolink between the digital identity and keynode), showing that the specified keynode has ownership over the augmented digital identity. This claim is immutable once created, ensuring both the authenticity and integrity of the augmentation.

So how does one decide whether or not to trust a Gestalt? While trust can be based on an arbitrary qualification in theory, the quality and source of the information used to check against this qualification should meet certain acceptance criteria. Trust is a judgement that is made by qualifying the information that is provided, and should never be given based on information that has been accepted at face value. To complicate things further, trust is not a binary decision; rather, it has multiple levels and considerations that must be made. Polykey aims to simplify this process by having all of the relevant information needed to make a judgement of trust contained within the Gestalts themselves.

In the case of trusting a Gestalt, this means that you trust it has not been compromised and that it remains representative of the agent it supposedly represents. When choosing to trust a Gestalt, you must start by trusting one of the digital identities contained within the Gestalt, and this trust is then consequently extended to the rest of the Gestalt. Once you trust a Gestalt then you are able to share secret information with it (see [Secrets Management](secrets-management) for a detailed discussion of secret sharing and management), however this trust must extend both ways.

At the end of all of this architecture is an overarching goal: to easily manage the sharing of secrets with other agents. This is made possible through the process of social discovery implemented within Polykey. By searching for a particular agent using the software's interface it is possible to search through all of the digital identities that are owned by any Gestalt's keynode. Once an identity has been found its authenticity can be confirmed through social proof and its integrity is ensured by the augmentation process. Once one identity within a Gestalt has been discovered it is then possible to traverse it to discover other identities under the control of the same entity such that there is more information upon which to make a judgement of trust.


Other notes
* Digital presence vs physical presence + digital identities -> people are defined by their digital lives
  * Information contained in digital identities can be used to aid authentication + allow us to access machines and secrets
  * This information can be linked to a person's physical presence as well
  * Secrets themselves cannot be connected to an individual, especially shared ones (e.g. within an organization), however, a digital identity combines this information with behavior and can be used to represent an individual
  * Social discovery therefore helps us be certain that whoever we are interacting with actually is who they say they are - can trust them with our secrets
* What is the benefit of social discovery and how does it work outside of Polykey
  * Social discovery is whenever one user discovers information about another user
  * An example of this could be looking up a person's name on Facebook and finding out other information about them such as who they're friends with
* What are gestalts (both in general and in terms of Polykey)
  * The world gestalt comes from the idea that "the whole is greater than the sum of its parts", in other words, you cannot understand an entire structure by merely looking at all of its components separately - there is information that can only be conveyed by looking at the whole in its complete form
  * A person is more than just their individual digital identities and secrets - these need to be combined and connected together in order to see the person's full physical identity
  * Polykey users are represented by gestalts: connected graphs containing a person's digital identities and keynodes (secrets)
* How does social discovery work re Polykey gestalts
  * When a user links a digital identity to their gestalt, they must make an ownership claim by creating an immutable message via the relevant social media provider
  * By finding this ownership claim, you can find the owner's gestalt, and subsequently traverse the gestalt (similar to a breadth-first-search style graph traversal) to find the rest of the gestalt
