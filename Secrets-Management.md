Today's digital landscape is a decentralized network of computing systems which includes web and mobile applications, micro-services, devices, Internet of Things and APIs (Application Programming Interfaces). Managing secret data is essential to the secure usage of this global network.

To understand secrets management, we must first understand how secrets are fundamental to the authentication and authorization of secure computing systems.

Authentication is a procedure for identifying an [agent](Glossary#agent) attempting to access a particular [resource](Glossary#resource), and to guarantee that only valid identities are allowed access to a resource. Authentication procedures are implemented as communication protocols between humans and machines, or between machines to other machines.

Authorization is a way of controlling access to resources after the agent is identified. The access to resources have many names including privileges, permissions, authorities or capabilities. Managing authorization means granting, revoking or tracking of privileges to identified agents. Authorization systems are implemented as data-models that assign privileges to agents and resources.

Authentication and authorization can be combined to be solved by a single platform, and such a platform is called "AAA architecture" which stands for "Authentication, Authorization and Accounting". The accounting part is about tracking privilege use, either for audit logging or for usage rate limiting.

We use the term "agent" because today's computing infrastructure isn't just between humans and machines, but also between machines and machines. Software agents are automatically interacting with other software agents to execute digital operations in the background.

Both authentication protocols and authorization models make use of secret data which can consist of tokens, passwords, keys or certificates in order to facilitate their operation.

For example, you have probably used a secret password to authenticate yourself to the device you are using to read this article. At the same time, the ability for you to launch the browser program (Chrome, Firefox... etc) is a privilege assigned to your identity on the device via the authorization model built into your operating system.

In the context of authentication, secrets are used to uniquely identify agents. These secrets can be a knowledge factor i.e. "something you know", or a possession factor i.e. "something you have". For example some computer systems give you the ability to specify a password that only you should know, and a way for you to generate tokens that only you can have such as one-time password (OTP) multi-factor authentication tokens.

> Add photo of MFA
> And password entry/pin code on a phone

In the context of authorization, secrets can be unique tokens or certificates that encode privileges. These are held by the agent and checked when performing an action on some secure resource. In some cases, the resource may be encrypted which requires a secret decryption key that must be held by the agent to perform operations on the resource.

Therefore the secure management of these secrets is crucial to ensure authentication and authorization systems are not compromised. If a secret is compromised in authentication, the authenticity of actions is compromised. If a secret is compromised in authorization, control of relevant resources can be compromised. This can lead to identity theft, data breaches, data loss and malware attacks.

## Secure Management of Secrets

The management of secrets is about managing secret data in 3 situations:

* [Data at rest](https://en.wikipedia.org/wiki/Data_at_rest) - secrets that sit on your hard drive
* [Data in transit](https://en.wikipedia.org/wiki/Data_in_transit) - secrets being transmitted over a network
* [Data in use](https://en.wikipedia.org/wiki/Data_in_use) - secrets that is being used by programs

When managing secrets at rest, the goals are:

* to be able to create, read, update and delete these secrets efficiently without going extra hoops
* to be able to access these secrets without being limited by the geography where the secret data is stored
* to prevent accidental data loss, data corruption and malicious hacking

When managing secrets in transit, the goals are:

* to prevent [eavesdropping](https://en.wikipedia.org/wiki/Network_eavesdropping) where the secrets can be intercepted over the network
* to ensure [privacy and optionally anonymity](https://en.wikipedia.org/wiki/Internet_privacy) of the agents communicating
* to prevent [third-party tampering](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) of the secret data that are in-flight
* to easily identify who or what you are sending secret data to, to avoid mistakes in communication

When managing secrets in use, the goals are:

* to ensure that programs are receiving the [minimal privileges](https://en.wikipedia.org/wiki/Principle_of_least_privilege) required to do its job and nothing more
* to ensure that programs only have privileges for the [duration they need it for](https://en.wikipedia.org/wiki/Privilege_bracketing)
* to ensure that programs do not [leak privileges to other unauthorized programls](https://en.wikipedia.org/wiki/Privilege_escalation)
* to ensure that authorized programs that given the [right secret data at the right time and right place](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
* to ensure program configuration is updated when relevant secrets are rotated or expired

Different technologies and techniques have been invented to help secure data in all 3 situations.

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

Here is how Polykey helps in each situation, structured in terms of personas and usecases.

### Secrets at Rest

TBD

### Secrets in Transit

TBD

### Secrets in Use

TBD

## Types of Secret Data

The 4 common types of secret data are:

Tokens - 

Passwords - 

Keys - 

Certificates -

Additionally there may also be larger pieces of data that may be considered secret. These include documents, source code, intellectual property, intelligence, emails... etc. These types of secrets have inherent value.








INDICATE THAT THEY ARE CURRENCY




Secrets (tokens, passwords, keys and certificates) are the currency of access control when working with decentrlised services, resources and devices.




**Note that secrets are used for BOTH Authentication and Authorization!**



---

The purpose of this article is to:

* Provide a theory/discussion about what secrets management is about
* Why is it important
  - Data Provenance => Secret Provenance
* How does it apply in the real world
  - Personas
    * Developers
    * System Administrators/DevOps - dealing with machine infrastructure
    * Team Leads - leaders of teams
    * Companies - whole corporations
      - Onboarding
      - Device Management
  - Deployments
    * Web Services
    * IoT
    * BYOD and Remote Work
    * Cryptocurrencies/the importance of Tokens
* Where does Polykey come in
  - Developers
* How does Polykey provide an implementation of this theory
* Understanding-Oriented
* Useful when you're studying
* Theoretical knowledge

To do this we need a table of contents here...

A skeleton of what this secrets management article is about

* The Problem of Access Control in Decentralised World of People, Services and Devices
* Secret Provenance


Access control is the management, assignment and delegation of authority to resources for individuals groups and machines.

The interaction between access control and decentralised services, resources and devices is now the most important cyber security frontier.

The explosion of web services, APIs, IoT, big-data and digitisation requires more acces control

Decentralised access control involves the management of secrets.

Secrets (tokens, passwords, keys and certificates) are the currency of access control when working with decentrlised services, resources and devices.

Delegation of authority faces problems like:

* Unmanaged secret sharing - insecure sharing mechanisms (like privnote, putting secrets on third parties platforms like slack that are not designed to hold secrets)
* Untracked delegation of authority - secret provenance and affects secret rotation
* Last mile integration of secrets - which is prone to human error, and compromise by leaving secrets insecure locations
* Info-sec policies
* Dece

Our solution is a decentralised access control workflow that understands secrets as sharable capabilities, manages the storage and sharing of these capabilities and tracks the sassignment and delegation of authorities


Terminology:

* Agents/Subjects/Users - These entities perform access with privileges. They can be individuals, groups/teams of people or machines which can be software-agents or hardware-agents (a.k.a. "devices").
* Resources/Objects/Files/Services - The resource being accessed.
* Permissions/Privilege/Authority - The data that specifies what kind of access is allowed.
* Secure at Rest
* Secure in Transit
* Secure in Use



Access control is the management, assignment and delegation of authority to resources for individuals, groups and machines.



* Machines and Services require secrets to act as agents of capabilities

* People 


* Resources, Files, Services

* Secrets used for Authentication
* Secrets used for Authorisation


Authentication is a procedure for identifying an agent attempting to access a particular resource, and to guarantee that only valid identities are allowed access to a resource. It is differentiated from authorisation, as it does not deal with the granting or revoking or tracking of privileges once identity has been established. However the issue of authentication and authorisation is often combined together to be solved by a single platform, and such a platform can be called "AAA architecture" which stands for "Authentication, Authorisation and Accounting". The accounting part is to deal with tracking privilege use, either for audit logging or for usage rate limiting.


Access Control

Decetnralised world of services, resources and devices and people.

* People
* Services
* Devices



Also see Polykey-Design repo

Secrets as Capabilities

Secret Injection

Secret Provenance

Authentication & Authorisation

* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/26 - Vault Management
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/36 - Vault Version and History
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/35 - AWS SSM
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/3 - User Flow

> Many secrets for many different things are hard to manage - mental strain for users not using any secrets manager to find their own solution to keeping things secret or remembering a single secret which they use for multiple things. Secrets managers are meant to provide a solution to this.

> The most common solutions are centralised stores of secrets. In situations of network separation, no access to secrets can leave an organisation paralysed. You are also trusting a third party to have proper security practices when storing data or credentials and a security breach on their end can cause many organisations to have to change their secrets.

> Cybersecurity isn't always at the forefront of people's minds. Secrets management is generally tasked to specific people or a team and as the organisation grows and people come and leave the team, knowledge about the organisational operations get spread out and people end up having specific roles and not much knowledge outside of their immediate work. Personal cybersecurity is, generally speaking, very lacking as it falls to companies to manage their applications securely.

---

* For Developer
* For Teams
* For Tech Companies
* For Average People
* For Sysadmin/Devops
* For Machine Infrastructure
* Dashline/Doppler/Hashicorp Vault
* Tokenisation/crypto people