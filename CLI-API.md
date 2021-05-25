# Overview

Similar to Polykey, the CLI commands will be divided into 7 domains which reflect functions that can be performed within specific sections of the program.

There are 3 levels which indicate the personas that would use each command. The first level represents a new user who will not directly interact with encryption but rather will primarily use the vault system. The second and third levels indicate users who will use cryptography commands beyond the existing vault system.

The node path is optionally supplied to all commands and will indicate the polykey node to use. If no path is specified, the default path is used.

There are no 'lock' or 'unlock' commands. Polykey is unlocked through one of two methods. Each command will specify an optional password parameter. Entering a password directly into the CLI is insecure as the CLI history can reveal the password. Therefore a file containing the password must be supplied to the command. This will create a session with a timeout of 5 minutes. If no commands are entered within the 5 minute timer, then the session is destroyed and the password must be entered again. The other method for creating a session will occur when no session exists and a CLI command is executed. A prompt will appear for the password to be entered, which will create a session if entered successfully. A session with a Polykey Agent is a singleton, so only one session can be used with an Agent at anytime.

![](http://www.plantuml.com/plantuml/png/RL7HIWGn37pFL-mFt2_8wOk888BWUzp6tNhTjYJf7OluxwQxBgNWGvjcc1aopLaKMSiI87ryqQZ3QmhhCwr7-v2IYZBc0xYVAEhm3PlExfJhKul0pq5vnn9KZ3CoeH8u2cGbU55WYhZG9X789GIG4MFJlf69_X6JymeJwUwoN9ndi7FuKRn2oSu4pSfIL1-s133Ew2DazWloMaLqirj88QF8BR43HoElMSrgh-Ad25TY_xaEpVGbEQgkwDmnMfrAb33et7XFZg9wzJkvw5pR4PMicHPh6lMHH77xi1PGkKXznelnu6ydm-bqrnRIeTjMEcHVGWVjVzjZLdkW1koG5gM7Zx7XJD6L9Vm2)

### Bootstrap

The bootstrap subcommand solely deals with the construction of the state of polykey.

The supplied or assumed node path must exist and be empty for a successful execution, otherwise the command will exit with code [EX_USAGE (64)].

| Command   |            Description                    | Level |  Interaction |   Parameters    |
|-----------|-------------------------------------------|-------|--------------|-----------------|
| bootstrap | Initializes a Polykey node at a node path |   1   |              | Node Path (opt) |

### Agent

The agent subcommand allows control over the Polykey agent process.

|  Command  |             Description              | Level | Interaction        |      Parameters     |
|-----------|--------------------------------------|-------|--------------------|---------------------|
|   start   |      Starts the Polykey Agent        |   1   |    Client-Agent    | Node Path (opt), Password file (opt) |
|   stop    |      Stops the Polykey Agent         |   1   |    Client-Agent    | Node Path (opt), Password file (opt) |
|  status   | Gets the status of the Polykey Agent |   1   |    Client-Agent    | Node Path (opt), Password file (opt) |

### Vaults

The vaults subcommand will deal with CRUD (Create, read, update and delete) operations on Polykey vaults.

|  Command  |             Description              | Level |    Interaction   | Parameters |
|-----------|--------------------------------------|-------|------------------|------------|
| create    | Creates a new vault                  |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| delete    | Deletes an existing vault            |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| list      | Lists all existing vaults            |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| rename    | Renames an existing vault            |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| stats     | Gets the stats of an existing vault  |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| pull      | Pulls a vault from another node      |   1   |    Agent-Agent   | Node Path (opt), Password file (opt) |
| scan      | Lists the vaults of another node     |   1   |    Agent-Agent   | Node Path (opt), Password file (opt) |

### Secrets

The secrets subcommand will deal with CRUD (Create, read, update and delete) operations on secrets within a Polykey vault.

As secrets subcommands are performed within a single vault, paths are specified using the following notation `<vaultName>:<secretPath>`. As each vault maintains separate filesystems, secrets cannot be transferred across vaults.

|  Command  |              Description               | Level |    Interaction   | Parameters |
|-----------|----------------------------------------|-------|------------------|------------|
| create    | Creates a new secret                             |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| delete    | Deletes an existing secret                       |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| edit      | Edits an existing secret                         |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| get       | Gets the contents of an existing secret          |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| list      | Lists the secrets within an existing vault       |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| mkdir     | Makes a directory inside an existing vault       |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| dir       | Adds a directory of secrets to an existing vault |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| rename    | Renames an existing secret                       |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| env       | Injects existing secrets into an environment     |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| update    | Updates an existing secret with new content      |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |

### Keys

The keys subcommand will deal with operations using the root keypair and root certificate.

Keys database is an internal implementation for storing keys from other domains and currently cannot be manipulated by users.

Encryption using the root keypair has a size limit depending on the size of the public key.

For signature and verification using the root keypair, the data and signature will be input and output separately. In the future, this will be done using a specific file format which allows the signature and data to be compiled into one file.

|  Command  |              Description                     | Level |    Interaction   | Parameters |
|-----------|----------------------------------------------|-------|------------------|------------|
|   root    |  Gets the root certificate                   |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   chain   |  Get the certificate chain                   |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|  primary  |  Get the root keypair                        |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   renew   |  Renews the root keypair                     |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   reset   |  Resets the root keypair                     |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| password  |  Change the password of the root keypair     |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|  decrypt  |  Decrypts data using the root keypair        |   2   |    Client-Agent  | Node Path (opt), Password file (opt) |
|  encrypt  |  Encrypts data using the root keypair        |   2   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   sign    |  Signs data using the root keypair           |   3   |    Client-Agent  | Node Path (opt), Password file (opt) |
|  verify   |  Verifies a signature using the root keypair |   3   |    Client-Agent  | Node Path (opt), Password file (opt) |

### Nodes

The node subcommand allows manipulation of Polykey's peer-to-peer system.

|  Command  |              Description                        | Level |    Interaction   | Parameters |
|-----------|-------------------------------------------------|-------|------------------|------------|
|    add    |  Adds a node to the node graph                  |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|  delete   |  Deletes a node from the node graph             |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|    get    |  Gets the node info for a particular node       |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|  stealth  |  Opens or closes the node to connections        |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |


### Identities

The identities subcommand allows control over the node's digital identity.

|   Command    |                     Description                        | Level |    Interaction   | Parameters |
|--------------|--------------------------------------------------------|-------|------------------|------------|
|   augment    |  Augment the keynode on a given provider and identity  |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
| authenticate |  Authenticate a social identity provider (Github only) |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |

### Gestalts

The gestalts subcommand allows management of trust between other identities.

|  Command  |                     Description                       | Level |    Interaction   | Parameters |
|-----------|-------------------------------------------------------|-------|------------------|------------|
|   get     |  Gets a gestalt with the associated node or identity  |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   list    |  Lists the available gestalts                         |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   trust     |  trusr or untrust a gestalt                         |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |
|   link    |  Link or unlink a node to node or identity            |   1   |    Client-Agent  | Node Path (opt), Password file (opt) |