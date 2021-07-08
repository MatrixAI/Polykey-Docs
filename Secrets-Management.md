Today's digital landscape is a decentralized network of computing systems which includes web and mobile applications, micro-services, devices, Internet of Things and APIs (Application Programming Interfaces). Managing secret data is essential to the secure usage of this global network.

To understand secrets management, we must first understand how [secrets](Glossary#secret) are fundamental to the authentication and authorization of secure computing systems.

Authentication is a procedure for identifying an [agent](Glossary#agent) attempting to access a particular [resource](Glossary#resource), and to guarantee that only valid identities are allowed access to a resource. Authentication procedures are implemented as communication protocols between humans and machines, or between machines to other machines.

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
* to ensure that programs do not [leak privileges to other unauthorized programs](https://en.wikipedia.org/wiki/Privilege_escalation)
* to ensure that authorized programs that given the [right secret data at the right time and right place](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
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

Here is how Polykey helps in each situation, structured in terms of personas and usecases.

### Developers

#### Development Environment Secrets

As developers, we often have to setup development environments that allows us to edit our software source code as well as being able to test run the software in a simulated environment.

When these environments need access external resources such as databases like MySQL or SaaS services like Amazon S3, they require configuration that includes secret credentials.

This configuration can be setup in configuration files, as constants in the source code, or injected at the terminal via environment variables or command line parameters.

In 2011, Heroku developed a methodology called the [12 factor app](https://12factor.net/) that argued that the best way of setting secrets for development environments is through environment variables.

Operating systems will run software processes within process environment, and environment variables are key-value strings that can be set prior to launching the program which reads the environment variables on startup.

Developers use shells including `bash`, `zsh` and `sh` to create "parent" program environments that can be inherited by child programs. Environment variables in Unix-shells can be setup in 3 ways:

* For the shell itself - `X=3; echo "$X"`
* For the shell and child programs - `export X=3; echo "$X" && sh -c 'echo $X'`
* For the child program and its child programs (but not the shell) - `X=3 sh -c 'echo $X'`

The command `X=3 sh -c 'echo $X'` first sets the variable `X` to `3`, then runs the program `sh` (as a child program with respect to the shell) which will read and output the value of `X`.

This has several advantages:

* The environment variables are not persisted in the source code, this avoids a common vector for leaking secrets accidentally via source code version control systems such as Git, GitHub and GitLab.
* The environment variables can be easily programatically changed depending on different environments, so there is minimal change required between development and production environments.
* There is only 1 place to set secret configuration, which is the shell/process environment, which simplifies how to configure software.
* Environment variables are framework and programming language agnostic, all major operating systems support environment variables.
* Environment variables only exist while the process is alive, when the process dies, the environment variables would automatically be deleted.

There is one major challenge with using environment variables: If environment variables are temporary and only exist while the process is alive, then:

* How do we remember what environment variables need to be set when we log off for the day and start working on the application after a restart of the computer? 
* How do we communicate what environment variables are required to other developers who are also working on the same software system?
* How do we deal when there are many environment variables to be set? It would be a chore to have to set them every time we ran our application.

In order to meet these challenges, the development community evolved the above idea into a workflow pattern called "dotenv".

The idea is to create a `.env` file that is ignored by source code control systems, and is located at the root of your project repository. This file contains all of your application environment configuration, for example:

```
AWS_DEFAULT_REGION='ap-southeast-2'
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

NODE_ENV=development

PGDATABASE=postgres
PGUSER=root
PGPASSWORD=
PGHOST=localhost
PGPORT=5432

GOOGLE_MAPS_API_KEY=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

SPARKPOST_KEY=
```

This file is then loaded into your terminal shell with `source ./.env` when you start working on the software.

In Matrix AI, we also create a `.env.example` that is saved into the source control system, which lists all of the environment variables, and has commentary on what they are for. New developers then copy the `.env.example` to `.env` before sourcing it into their shell.

However by using `.env` file we end up now managing a configuration file.

There are still some problems here:

* The usage of `.env` is not secure at rest, the `.env` is a plaintext file and can easily be read by malicious programs or accidentally leaked or exposed.
* Security in transit isn't addressed, when working with other developers, you still need to communicate the right environment variable values to be used to access AWS, PostgreSQL or other services.
* Security in use is still primitive, there's nothing to address the principle of least privilege, and nothing tracking secret provenance.
* If you work on multiple projects with different environment variable configuration, it is possible to mix up your development shell environments by forgetting to exit a shell, and end up clobbering your secret variables

This is where Polykey can help.

Every Polykey node contains multiple vaults. Each vault is an encrypted filesystem. Rather than putting 1 large file containing all the secrets we want like `.env`, we break up each secret into separate files that will be put into the vault. These secrets can be more easily manipulated. This gives us flexibility to choose which secrets we need, and how they should be injected during use.

In this situation, developers can create a new vault for this project: `my-software-project`.

```sh
pk vault create my-software-project
```

Once we have this vault, we can now add in every secret that is necessary 

```sh
# using the argument style, note that we add 1 space ahead of the command ensure CLI history is not tracking this command
 pk secrets put my-software-project:AWS_ACCESS_KEY_ID '****'

# using the prompt style, finish the message by sending EOF <CTRL> + <D>
pk secrets put my-software-project:GOOGLE_MAPS_API_KEY
> '****'

# using the file descriptor style
pk secrets put my-software-project:PG_PASSWORD -f ./pg_password_data 
# ... now add in all the other secrets
```

Now when we want to start development on the project, we have 2 options:

1. Open up a shell with Polykey sourcing the environment variables
2. Use Polykey to inject environment variables into a sub-shell

Either result is the same, because you'll be running a shell with environment variables set so that your test runs of your software can inherit this environment configuration. Let's demonstrate both.

In the first case, we will reuse the `source` command and ask `pk` to constuct the equivalent of the `.env` file but entirely in-memory and only for this specific usage. We must also use process substitution `<(...)` so that the `pk` command output can be redirected into a temporary file descriptor that is read by the `source` command.

```sh
# one secret
source <(pk secrets env my-software-project:AWS_ACCESS_KEY_ID)

# multiple secrets
source <(pk secrets env my-software-project:AWS_ACCESS_KEY_ID my-software-project:GOOGLE_MAPS_API_KEY)

# globbing style (you can use globstar as well, this will only export immediate files)
source <(pk secrets env my-software-project:*)

# use the -e flag to export all variables
source <(pk secrets env -e my-software-project:*)
# use the -- to separate so you can export just one out of many
source <(pk secrets env -- my-software-project:AWS_ACCESS_KEY_ID -e my-software-project:GOOGLE_MAPS_API_KEY)
source <(pk secrets env -e -- my-software-project:AWS_ACCESS_KEY_ID my-software-project:GOOGLE_MAPS_API_KEY)
```

Now your shell has the relevant environment variables set by Polykey, and they will exist for as long as this current shell is alive.

In the second case, we ill use `pk secrets env` command to run a subshell, it can run any subprogram, but in the context of a development environment, you usually want a shell.

```sh
# one secret
pk secrets env my-software-project:AWS_ACCESS_KEY_ID bash

# multiple secrets
pk secrets env my-software-project:AWS_ACCESS_KEY_ID my-software-project:GOOGLE_MAPS_API_KEY bash

# globbing style
pk secrets env my-software-project:* bash

# the -e flag has no effect when using it this way
# this is because the subprogram determines whether to export variable or not
# it usually exports the variable
pk secrets env -e my-software-project:* bash
```

Now you have a subshell that has the environment variables configured, it will also automatically export it to child programs. When you have finished your development, you can just `exit` the shell, and the environment variables are gone!

Doing this with Polykey means you no longer leave around a `.env` file, however you can still make use of the `.env.example` to document (give default values and examples) what environment variables are needed when working on the project. However you can also just point your developers to a specific secret vault.

Now when you have other developers also working on the same project, you can share this vault with them through the Polykey network which ensures that the secrets are shared securely without going through any insecure third-party. Furthermore as the project develops, when new secrets and new configuration are added and existing secrets changed, it is trivial to inject these secrets into the vault, and to have your co-developers pull down updates to the vault.

```sh
pk vaults pull my-software-project
```

Polykey can setup automatic pulls regularly to acquire new updates, because the Polykey agent runs in the background.

> TODO:
> Show how different development environments can be handled
> Show how compose and split vaults
> Show how developers inject secrets from development to production
> Show how to handle secret provenance here
> Show how to rotate secrets easily in your development environment
> Show how we handle privilege bracketing (suppose you have a vault, you can refer to a minimal set of secrets when entering an environment)

### DevOps

#### Service Deployment and Updates

TBD

#### IoT

TBD

### Teams, Organizations and Companies

#### Delegation of Authority

Access control is the management, assignment and delegation of authority to resources for individuals groups and machines.

* Untracked delegation of authority - secret provenance and affects secret rotation
* Info-sec policies
* Shared corporate secrets - lastpass group

Provenance!

#### Employee Onboarding/Offboarding

Onboarding/Offboarding

Dealing with user-profiles, and user profile secrets.

https://en.wikipedia.org/wiki/User_profile

New employee, workstation user profiles.

Remote-ready employee onboarding and offboarding.

Provenance!

##### Device Provisioning

Device provisoning. Adding new devices into your system. Also BYOD and Remote Work.

Provenance!

### General Public

#### Cryptocurrencies

TBD

---

* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/26 - Vault Management
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/36 - Vault Version and History
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/35 - AWS SSM
* https://gitlab.com/MatrixAI/Engineering/Polykey/polykey-design/-/issues/3 - User Flow