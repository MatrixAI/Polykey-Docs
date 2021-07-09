In today's world, entities can almost entirely be represented by their presences across digital identity providers. Through social discovery these entities can be located and authenticated, subsequently allowing for the secure sharing of secrets with desired parties.

Digital identities contain a vast amount and variety of information, so much so that digital identities can often go as far as to authenticate agents and allow them access to services and secrets (an example of this would be using your Facebook account to log into other websites). This ability comes not only from a digital identity's collection of factual information (e.g. an agent's name, age, and acquaintances), but also information about an agent's behavior.

Unlike factual information, behavioral information is hard to imitate. Because of this it can be quite a reliable representation of an agent, and people are sensitive to this. Social proof, the idea that the people around you will often collectively hold more information about the current environment or situation than yourself, taps into this idea. If a large number of people believe that a digital identity is a reliable representation of a certain physical agent, then you may have sufficient evidence to believe that this is true yourself.

Polykey takes advantage of this idea through the use of Gestalts, a word that comes from the adage "the whole is more than the sum of its parts". Gestalts, as implemented within Polykey, combine the information that is contained within digital identities with the secrets held within the vaults of a keynode to become a full representation of an entity. It is composed of at least one keynode, which can be connected via cryptolinks to other keynodes and to digital identities, and acts as a point of presence between identities and agents.

Gestalts are created through a secure process of augmentation: by posting a signed claim on both an identity provider and the sigchain of a keynode, a user can augment an identity (in other words, establish a cryptolink between the digital identity and keynode), showing that the specified keynode has ownership over the augmented digital identity. This claim is immutable once created, ensuring both the authenticity and integrity of the augmentation.



* Social discovery is about being able to easily find entities (whether this be friends, teams, people, or machines) to be able to securely share secret information with them
* Identities can be found through the identity's provider via an API. Such identities include GitHub, Facebook, Twitter, LinkedIn etc.
  * Identities are used to aid in authentication - if you trust that an identity belongs to a particular entity then it is authenticated
* Gestalts are formed from identities: a message (or cryptolink) is posted by the user onto both a digital identity (on the identity provider) and a keynode (on its sigchain), which subsequently links them together via a process of augmentation
  * These messages are immutable once created, ensuring both their authenticity and integrity
  * The gestalt is formed through cryptolinks between nodes and identities as well as nodes with other nodes (cryptolinks cannot be formed between identities and other identities)
  * Gestalts act as a point of presence between identities (digital information) and entities (for example, people)
  * The linking of digital identities to keynodes provides a method of using social proof to confirm that the gestalt is representative of its supposed agent - if other people are saying that this person is who they say they are then you can be more confident that this is indeed the case
* To share secrets with another gestalt, you must trust it. This trust can be based on an arbitrary qualification, such as social proof, but the quality and source of this information needs to meet certain acceptance criteria
  * Trust is a judgement made by qualifying the information that is provided - information should not be accepted at face value
  * Trust is not a binary decision, there are multiple levels of trust, and there are factors regarding trust that need to be considered such as whether or not it is transitive (for example, if you trust a gestalt, and that gestalt trusts another gestalt, does this mean that you should trust it as well?)
  * If you trust a gestalt then you trust that it has not been compromised - the identity is still representative of the agent it is supposed to represent
* Once you trust another gestalt you can begin to share secret information with it (see [Secrets Management](secrets-management))
* All of this machinery is necessary to easily manage the sharing of secrets in a way that aids the user experience
  * Discovery is made easier

## Relationships
identities -> gestalt -> trust -> sharing -> discovery

if you can trust a system -> can start sharing secret info with system
need to make sure this system represents the entity we think it is -> trusting a gestalt means making a judgement that the gestalt represents the real-world entity
-> leads to an explanation about how we form gestalts



## Other notes
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


In today's world, a person's physical presence can almost entirely be represented by their digital presences across social media providers. For example, a person's Facebook profile can provide information not only about their name and appearance, but also where they have been, who they are acquainted with, and what things they like. Not only do these digital identities contain information, but they can also be used to provide access to services, devices, and secrets.

Secrets, by themselves, cannot be connected to an individual by ownership. Secrets can be shared, leaked, or lost.

Every Polykey user can be represented by a connected graph of keynodes and digital identities, otherwise known as a Gestalt. Keynodes store vaults, which in turn store secrets, and digital identities are the user's digital presences on third-party applications. Keynodes and digital identities are connected through ownership claims; immutable messages created on social media providers and keynode sigchains which are used to form cryptolinks.

TBD

Synthesize from:

* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/31
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/33
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/27

Topics:

* Digital Identities
* Gestalts
* Social Discovery
