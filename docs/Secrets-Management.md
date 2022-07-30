Today's digital landscape is a decentralized network of computing systems which includes web and mobile applications, micro-services, devices, Internet of Things and APIs (Application Programming Interfaces). Managing secret data is essential to the secure usage of this global network.

To understand secrets management, we must first understand how [secrets](./Glossary.md#secret) are fundamental to the authentication and authorization of secure computing systems.

Authentication is a procedure for identifying an [agent](./Glossary.md#agent) attempting to access a particular [resource](./Glossary.md#resource), and to guarantee that only valid identities are allowed access to a resource. Authentication procedures are implemented as communication protocols between humans and machines, or between machines to other machines.

Authorization is a way of controlling access to resources after the agent is identified. The access to resources have many names including privileges, permissions, authorities or capabilities. Managing authorization means granting, revoking or tracking of privileges to identified agents. Authorization systems are implemented as data-models that assign privileges to agents and resources.

Authentication and authorization can be combined to be solved by a single platform, and such a platform is called "AAA architecture" which stands for "Authentication, Authorization and Accounting". The accounting part is about tracking privilege use, either for audit logging or for usage rate limiting.

We use the term "agent" because today's computing infrastructure isn't just between humans and machines, but also between machines and machines. Software agents are automatically interacting with other software agents to execute digital operations in the background.

Both authentication protocols and authorization models make use of secret data which can consist of tokens, passwords, keys or certificates in order to facilitate their operation.

For example, you have probably used a secret password to authenticate yourself to the device you are using to read this article. At the same time, the ability for you to launch the browser program (Chrome, Firefox... etc) is a privilege assigned to your identity on the device via the authorization model built into your operating system.

<img src="https://raw.githubusercontent.com/flocke/andOTP/master/assets/screenshots/main_activity.png" width="100"/>

In the context of authentication, secrets are used to uniquely identify agents. These secrets can be a knowledge factor i.e. "something you know", or a possession factor i.e. "something you have". For example some computer systems give you the ability to specify a password that only you should know, and a way for you to generate tokens that only you can have such as one-time password (OTP) multi-factor authentication tokens.

In the context of authorization, secrets can be unique tokens or certificates that encode privileges. These are held by the agent and checked when performing an action on some secure resource. In some cases, the resource may be encrypted which requires a secret decryption key that must be held by the agent to perform operations on the resource.

Therefore the secure management of these secrets is crucial to ensure authentication and authorization systems are not compromised. If a secret is compromised in authentication, the authenticity of actions is compromised. If a secret is compromised in authorization, control of relevant resources can be compromised. This can lead to identity theft, data breaches, data loss and malware attacks.

## Secure Management of Secrets

The management of secrets is about managing secret data in 3 situations:

* [Data at rest](https://en.wikipedia.org/wiki/Data_at_rest) - secrets that sit on your hard drive
* [Data in transit](https://en.wikipedia.org/wiki/Data_in_transit) - secrets being transmitted over a network
* [Data in use](https://en.wikipedia.org/wiki/Data_in_use) - secrets that is being used by programs

When managing secrets at rest, the goals are:

* to be able to create, read, update and delete these secrets efficiently without jumping through extra hoops
* to be able to access these secrets without being limited by the geography where the secret data is stored
* to prevent accidental data loss, data corruption or malicious hacking

When managing secrets in transit, the goals are:

* to prevent [eavesdropping](https://en.wikipedia.org/wiki/Network_eavesdropping) where the secrets can be intercepted over the network
* to ensure [privacy and optionally anonymity](https://en.wikipedia.org/wiki/Internet_privacy) of the agents communicating
* to prevent [third-party tampering](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) of the secret data that are in-flight
* to easily identify who or what you are sending secret data to, to avoid mistakes in communication

When managing secrets in use, the goals are:

* to ensure that programs are receiving the [minimal privileges](https://en.wikipedia.org/wiki/Principle_of_least_privilege) required to do its job and nothing more
* to ensure that programs only have privileges for the [duration they need it for](https://en.wikipedia.org/wiki/Privilege_bracketing)
* to ensure that programs do not [leak privileges to other unauthorized programs](https://en.wikipedia.org/wiki/Privilege_escalation)
* to ensure that authorized programs are given the [right secret data at the right time and right place](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
* to ensure program configuration is updated when relevant secrets are rotated or expired

Different technologies and techniques have been invented to help secure data in all 3 situations. For example:

* Full disk encryption secures data in your hard drive
* HTTPS protocols secures data in transit during internet communication
* Privilege separation, capability systems and memory encryption are used to secure data in use

Polykey has synthesized from these different technologies to produce a system that helps agents (that means humans and machines) secure secrets in all 3 situations. It does this while also providing these properties:

* Decentralized storage with no third party single point of failure which is holding your secrets
* Peer to peer architecture allowing customizable infinite redundancy and flexible privilege separation
* Secure at rest with transparent filesystem encryption
* Ensure secret provenance with version history tracking and audit logging
* Integrated into social identity platforms to eliminate friction in identifying agents you want to share secrets with
* CLI and GUI interfaces to enable secret management all computing areas
* Open source for full transparency

Polykey is on-going development project, some features are coming soon.
