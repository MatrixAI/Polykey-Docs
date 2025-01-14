import DocCardList from '@theme/DocCardList';

# Commands

Similar to Polykey, the CLI commands will be divided into 7 domains which reflect functions that can be performed within specific sections of the program.

There are 3 levels which indicate the personas that would use each command. The first level represents a new user who will not directly interact with encryption but rather will primarily use the vault system. The second and third levels indicate users who will use cryptography commands beyond the existing vault system.

The node path is optionally supplied to all commands and will indicate the polykey node to use. If no path is specified, the default path is used.

There are no 'lock' or 'unlock' commands. Polykey is unlocked through one of two methods. Each command will specify an optional password parameter. Entering a password directly into the CLI is insecure as the CLI history can reveal the password. Therefore a file containing the password must be supplied to the command. This will create a session with a timeout of 5 minutes. If no commands are entered within the 5 minute timer, then the session is destroyed and the password must be entered again. The other method for creating a session will occur when no session exists and a CLI command is executed. A prompt will appear for the password to be entered, which will create a session if entered successfully. A session with a Polykey Agent is a singleton, so only one session can be used with an Agent at anytime.

![](http://www.plantuml.com/plantuml/uml/RP7HIiKm38RlynHxWVCASlHE1144xsCRjtgwjYJfEGpntKqtnonuiQRvbtpqJywYo5hd2FdzavmEBpakJxJiwKFEAifOTk5-fAJ35wnzTkRIhbe5llUIDwnHnMeS4og1fqWMOX05feGphIq2fSO8uZ21JCXq45x9Mlz1a0yA8-d6cYy-CDYtKobTeHQF-WTbNXg7pGUu2KE2mc56NbeJtUmKunKKkMNsuCdnKjHGMvGm9hWIXuzbEA3FsLEZelVxqqRIu_-ZfwH1mrPKTMgfGoLBnjcImuHobNPD5n12TfDHu7S9m-bqTsoWKzSrTCeszKxQnjXh5dkXUUcLu_LmfkJh77y0)

### Bootstrap

The bootstrap subcommand solely deals with the construction of the state of polykey.

The supplied or assumed node path must exist and be empty for a successful execution, otherwise the command will exit with code [EX_USAGE (64)].

| Command   | Description                               | Level | Interaction |
|-----------|-------------------------------------------|-------|-------------|
| bootstrap | Initializes a Polykey node at a node path | 1     | Local       |

### Agent

The agent subcommand allows control over the Polykey agent process.

| Command | Description                             | Level | Interaction |
|---------|-----------------------------------------|-------|-------------|
| start   | Starts the Polykey Agent                | 1     | Local       |
| stop    | Stops the Polykey Agent                 | 1     | Local       |
| status  | Gets the status of the Polykey Agent    | 1     | Local       |
| unlock  | Starts a session for the current client | 1     | Local       |
| lock    | Locks the current client session        | 1     | Local       |
| lockall | Locks all active sessions on the agent  | 1     | Local       |

### Vaults

The vaults subcommand will deal with CRUD (Create, read, update and delete) operations on Polykey vaults.

| Command      | Description                         | Level | Interaction |
|--------------|-------------------------------------|-------|-------------|
| create       | Creates a new vault                 | 1     | Local       |
| rm \| remove | Removes an existing vault           | 1     | Local       |
| ls \| list   | Lists all existing vaults           | 1     | Local       |
| rename       | Renames an existing vault           | 1     | Local       |
| stats        | Gets the stats of an existing vault | 1     | Local       |
| share        | Shares vaults with a gestalt        | 1     | Local       |
| unshare      | Unshares vaults with a gestalt      | 1     | Local       |
| permissions  | Gets the permissions for a vault    | 1     | Local       |
| pull         | Pulls a vault from another node     | 1     | Agent-Agent |
| scan         | Lists the vaults of another node    | 1     | Agent-Agent |
| clone        | Clones a vault from another node    | 1     | Agent-Agent |

### Secrets

The secrets subcommand will deal with CRUD (Create, read, update and delete) operations on secrets within a Polykey vault.

As secrets subcommands are performed within a single vault, paths are specified using the following notation `<vaultName>:<secretPath>`. As each vault maintains separate filesystems, secrets cannot be transferred across vaults.

| Command      | Description                                                           | Level | Interaction |
|--------------|-----------------------------------------------------------------------|-------|-------------|
| create       | Creates a new secret                                                  | 1     | Local       |
| rm \| remove | Removes an existing secret                                            | 1     | Local       |
| ed \| edit   | Edits an existing secret or creates one if it doesn't exist           | 1     | Local       |
| cat          | Gets the contents of one or more secrets                              | 1     | Local       |
| ls \| list   | Lists the secrets within an existing directory                        | 1     | Local       |
| mkdir        | Makes a directory inside an existing vault                            | 1     | Local       |
| dir          | Adds a directory of secrets to an existing vault                      | 1     | Local       |
| rename       | Renames an existing secret                                            | 1     | Local       |
| write        | Updates an existing secret with new content taken from standard input | 1     | Local       |
| env          | Injects existing secrets into an environment                          | 2     | Local       |

### Keys

The keys subcommand will deal with operations using the root keypair and root certificate.

Keys database is an internal implementation for storing keys from other domains and currently cannot be manipulated by users.

Encryption using the root keypair has a size limit depending on the size of the public key.

For signature and verification using the root keypair, the data and signature will be input and output separately. In the future, this will be done using a specific file format which allows the signature and data to be compiled into one file.

| Command   | Description                                 | Level | Interaction |
|-----------|---------------------------------------------|-------|-------------|
| cert      | Gets the root certificate                   | 1     | Local       |
| certchain | Get the certificate chain                   | 1     | Local       |
| root      | Get the root keypair                        | 1     | Local       |
| renew     | Renews the root keypair                     | 1     | Local       |
| password  | Change the password of the root keypair     | 1     | Local       |
| reset     | Resets the root keypair                     | 2     | Local       |
| decrypt   | Decrypts data using the root keypair        | 2     | Local       |
| encrypt   | Encrypts data using the root keypair        | 2     | Local       |
| sign      | Signs data using the root keypair           | 3     | Local       |
| verify    | Verifies a signature using the root keypair | 3     | Local       |

### Nodes

The node subcommand allows manipulation of Polykey's peer-to-peer system.

| Command     | Description                           | Level | Interaction |
|-------------|---------------------------------------|-------|-------------|
| add         | Adds a node to the node graph         | 1     | Local       |
| connections | Lists all active node connections     | 1     | Agent       |
| claim       | Makes a claim to a node               | 1     | Agent-Agent |
| find        | Attempts to find a node in the DHT    | 1     | Agent-Agent |
| ping        | Pings a node to check if it is online | 1     | Agent-Agent |
| getall      | Gets all nodes from the node graph    | 1     | Agent-Agent |

### Identities

The identities subcommand allows control over the node's identity and its links with other social identities.

| Command       | Description                                                         | Level | Interaction |
|---------------|---------------------------------------------------------------------|-------|-------------|
| claim         | Claim an identity for this keynode                                  | 1     | Local       |
| authenticate  | Authenticate a social identity provider (Github only)               | 1     | Local       |
| get           | Gets the gestalt of a node or identity                              | 1     | Local       |
| list          | Lists the available gestalts                                        | 1     | Local       |
| trust         | Trusts a node id or identity                                        | 1     | Local       |
| untrust       | Untrusts a node id or identity                                      | 1     | Local       |
| search        | Searches the provider for a connected identity                      | 1     | Local       |
| allow         | Set a specific permission for a node or an identity                 | 2     | Local       |
| disallow      | Remove a specific permission for a node or identity                 | 2     | Local       |
| discover      | Starts discovery process using node or identity as a starting point | 1     | Agent-Agent |
| permissions   | Gets the permission for a node or an identity                       | 1     | Local       |
| queue         | Prints out vertices queued for discovery                            | 1     | Local       |
| invite        | Invites another keynode                                             | 1     | Local       |
| authenticated | Lists all authenticated identities across all providers             | 1     | Local       |

### Notifications

| Command | Description                                     | Level | Interaction |
|---------|-------------------------------------------------|-------|-------------|
| send    | Sends a notification to another node            | 1     | Agent-Agent |
| read    | Displays notifications and marks them as "read" | 1     | Local       |
| clear   | Clears all read and unread notifications        | 1     | Local       |

## CLI Commands Design and Style

- Toggles should be `-f` `-v` flags that when used are `true` and when not used are `false`. These can be joined up together like `-fv`, but this may be confusing with the multiword options, and in which case I usually don't use the joined up versions. Flags should be sparing, users should not need to remember every flag they need to do something.
- Options should ideally be optional `--key value` and `-k value`. In some cases they represent key-value parameters which are not optional. Make sure that multi-word options are like `--multi-word` and their short form is `-mw`.
- Parameters should be positional so `polykey subcommand param1 param2`, in that case they are usually not optional and are required, it is possible to have arbitrary arity of parameters so you can have 1, or many.
- Exception is `polykey subcommand -k value -k2 value -k3 value`, which is a key value parameters, this would not be optional, but in many cases if the commands are designed well, you should be able to have all values as parameters.

Make sure you're using the output formatting functions in the `src/bin/utils.ts`. This ensures you have a consistent set outputs, whether it is a list, table, json or otherwise. We can have `-f` to indicate different output formats for these.

And for testing, try to use the `main` exported function, but I think as you said on slack there are new methods that make it easier to test these that might have been created by @DrFacepalm or @scottmmorris.

Finally make sure all your options/flags/parameters are consistent across all subcommands. In some cases we find better names we should switch to those.

Subcommands have better recall and discoverability:

- Subcommands have full words which is easier to understand, and easier to remember, less ambiguity
- Subcommands can be auto-suggested (because they have a deterministic position), flags cannot be
- High level commands should always be subcommands, not hidden behind flags
- Minimize optionality, increase conventionality, reduce user configuration headache, things should be as expected and intuitive as complexity allows

<DocCardList />
