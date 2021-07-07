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


> existing tech doesn't meet these goals completely
> introducing polykey which allows you to meet these goals


There have many technologies invented to help secure data in all 3 situations, for example:

* HTTPS protocols secures internet communication
* Full disk encryption secures data in your hard drive
* Capability systems, memory encryption secures data in use

What makes Polykey different is that it helps agents (that means humans and machines) securely share secrets.

It does this while having these nice properties:

* Being decentralized so that there's no third party single point of failure which is holding your secrets
* Peer to peer architecture allowing customizable infinite redundancy and flexible privilege separation
* Secure at rest with transparent filesystem encryption
* Ensure secret provenance with version history tracking and audit logging

HERE IS WHERE we can talk about secret provenance (with respect to goals), but this is common to all personas

## Sharing Secrets

What's the purpose of sharing secrets?

What do we mean by sharing secrets?

How does this occur with respect to personas

Let's introduce the usecases



Principle of least privilege

Privilege separation

Privilge bracketing



Data Provenance

And Secret Provenance

What Makes Polykey Different with respect to Secrets Management.

Polykey helps you secure secrets in all 3 situations.




Preferably we would like to protect secret data in all 3 data situations, but there may be tradeoffs that need to be made in any particular context. 

In the world of cloud connected web applications, our priorities should start with securing data in transit first (HTTPS), securing data at rest second (full disk encryption and hashing), and finally attempt to secure data in use (capability systems, security policies and memory encryption).

This of couse goes for data that aren't secrets as well, as it's good to have defence in depth.


Provenance!!

And different personas

Go into different usecases


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