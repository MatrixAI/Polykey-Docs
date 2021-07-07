TBD

Synthesize from:

* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/31
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/33
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/27

Topics:

* Digital Identities
* Gestalts
* Social Discovery


# Purpose of this article:
* Digital presense vs physical presence + digital identities -> people are defined by their digital lives
  * Information contained in digital identities can be used to aid authentication + allow us to access machines and secrets
  * This information can be linked to a person's physical presence as well
  * Secrets themselves cannot be connected to an individual, espeically shared ones (e.g. within an organization), however, a digital identity combines this information with behavior and can be used to represent an individual
  * Social discovery therefore helps us be certain that whoever we are interacting with actually is who they say they are - can trust them with our secrets
* What is the benefit of social discovery and how does it work outside of Polykey
  * Social discovery is whenever one user discovers information about another user
  * An example of this could be looking up a person's name on Facebook and finding out other information about them such as who they're friends with
* What are gestalts (both in general and in terms of Polykey)
  * The world gestalt comes from the idea that "the whole is greater than the sum of its parts", in other words, you cannot understand an entire structure by merely looking at all of its components seperately - there is infomation that can only be conveyed by looking at the whole in its complete form
  * A person is more than just their individual digital identities and secrets - these need to be combined and connected together in order to see the person's full physical identity
  * Polykey users are represented by gestalts: connected graphs containing a person's digital identities and keynodes (secrets)
* How does social discovery work re Polykey gestalts
  * When a user links a digital identity to their gestalt, they must make an ownership claim by creating an immutable message via the relevant social media provider
  * By finding this ownership claim, you can find the owner's gestalt, and subsequenty traverse the gestalt (similar to a breadth-first-search style graph traversal) to find the rest of the gestalt



keywords
1. identity - authentication/secrets management
2. trust - how do you know you can trust an identity? transitivity ->communication + quality of info - needs to meet certain qualifiers/acceptance criteria
   1. when you trust someone - judegemtn on how to qualify info they provide
   2. don't accept info at face value
   3. not binary -> levels
   4. relationship between 2 gestalts - is it transitive? a->b, b->c => a->c?
3. gestalt - point of presence (there is some info (digital) that represents an entity e.g. person)
4. BLUF - bottom line upfront (big idea upfront(summary) - then build up componentry)
   1. gestalts + digital identities - key argument/idea 1-2 sentences
5. social discovery
6. secret sharing
7. compromise - identity providing info that's no longer representative of it (identity represents agent)
8. social proof - Social proof is considered prominent in ambiguous social situations where people are unable to determine the appropriate mode of behavior, **and is driven by the assumption that the surrounding people possess more knowledge about the current situation.**
   1. are other people trusting the gestalt representative of the person/entity
9. sigchain - chain of messages where each message is signed with a cyryptographic key - can prove authenticity/integrity of message
   1.  authenticity - can check the message came from who it was meant to
   2.  integrity - hasn't been mutated since




identities -> gestalt -> trust -> sharing

if you can trust a system -> can start sharing secret info with system
need to make sure this system represents the entity we think it is -> trusting a gestalt means making a judgement that the gestalt represents the real-world entity
-> leads to an explanation about how we form gestalts

1. how do you find identities - identity provider "webcrawl" through api
   1. github
   2. facebook/twitter/linkedin
2. how do you form gestalts from identities
   1. augmentation process - post message (cryptolink) on social media (indentity) provider + on the keynode's sigchain
   2. gestalt formed by forming cryptolinks between pk nodes + identities & nodes + nodes
3. how do you trust this gestalt - trust can be an arbitrary qualification
   1. to make a judgement to trust a gestalt based on social proof
4. how do you share secret info with a trusted gestalt
   1. leads to another part of wiki ()
5. all of this machinery necessary for implementing social discovery - about user experience (able to find entities e.g. friends teams people machines) + be able to securely share secret info with them (bottom line) - intro
6. conclusion about social discovery




In today's world, a person's physical presence can almost entirely be represented by their digital presences across social media providers. For example, a person's Facebook profile can provide information not only about their name and appearance, but also where they have been, who they are acquainted with, and what things they like. Not only do these digital identities contain information, but they can also be used to provide access to services, devices, and secrets.

Secrets, by themselves, cannot be connected to an individual by ownership. Secrets can be shared, leaked, or lost.

Every Polykey user can be represented by a connected graph of keynodes and digital identities, otherwise known as a Gestalt. Keynodes store vaults, which in turn store secrets, and digital identities are the user's digital presences on third-party applications. Keynodes and digital identities are connected through ownership claims; immutable messages created on social media providers and keynode sigchains which are used to form cryptolinks.
