# Getting Started
This tutorial covers the basic usage of the Polykey CLI. It will cover the basics of storing, retrieving, and sharing secrets using the Polykey testnet.

## Prerequisites:
- If you haven't installed Polykey CLI already, you can follow the installation guide [here](installation.md#node-package-manager).

## 1. Bootstrapping
In order to interact with Polykey, the CLI communicates with an agent that runs as a background process that handles both external and local connections to your Polykey instance.

To start the Polykey agent process, we'll use the `pk agent start` command.
```bash
# To start the Polykey agent as a background process, run:
❯ pk agent start --background

# You'll be prompted to enter a password for the root keypair, this is used for encryption, remember this for later.
✔ Please enter the password: ****
```

:::note
If your system has less than 256MB of memory, the Polykey agent may fail to start. If this happens, append the `--password-mem-limit min` paramater when running the `pk agent start` command. This will allocate less memory to the Polykey agent for password generation. Note that this may make your Keynode easier to bruteforce.
:::

You can then check the status of the Agent at any time using the `pk agent status` command. Lets make sure the Polykey agent is up and running using said command.
```bash
❯ pk agent status

# Make sure the "status" displays as "LIVE" in the output. The output should look something like this:
status  "LIVE"
pid     36820
nodeId  "vgpr76t6aq7095h7fd78562446hur75gncm18l733pjbvuu4t5mtg"
clientHost      "127.0.0.1"
clientPort      45525
proxyHost       "0.0.0.0"
proxyPort       53928
agentHost       "127.0.0.1"
agentPort       37921
forwardHost     "127.0.0.1"
forwardPort     44015
publicKeyJWK    "{\"alg\":\"EdDSA\",\"kty\"...[\"verify\"]}"
certChainPEM    "-----BEGIN CERTIFICATE-----\...\n-----END CERTIFICATE-----\n"
```


## 2. Creating Your First Vault
Vaults are individual encrypted filesystems used to store and manage secrets. They can serve as individual contexts for storing keys and secrets that correspond to certain projects, deployments, etc.

Lets create a new vault using the `pk vaults create` command.
```bash
❯ pk vaults create "treasure"

# You'll be prompted to enter the password you chose earlier.
✔ Please enter the password: ****
```

## 3. Storing Your First Secret
Secrets are arbitrary encrypted data that either you've stored in a Vault.

As an example, we'll both create and access a secret in the vault that we've just created using the `pk secrets create` command.
```bash
# Use this to create a simple text file, this'll be stored into Polykey as secret later.
❯ echo "bounty of gold" >> ./bounty.txt

# Now add this add the contents of this file to your Polykey vault:
❯ pk secrets create ./bounty.txt treasure:bounty

# Now, to access this secret again:
❯ pk secrets get treasure:bounty

# Output:
bounty: bounty of gold
```

Note that when using the `pk secrets create` command, the second paramater (or "secretPath") is a string that contains the name of the vault and the name and the name of the secret delimited by a colon. Ie. `treasure:bounty`

## TODO 4. Sharing it with another node and 5. Sharing it with another gestalt
Note:

Not entirely sure as to how to connect to the testnet to do this at the moment as trying to set the seed-node to one on the testnet gives warnings that it did not succeed.

Also we should talk about keys in this guide as well...

Maybe Bootstrapping stage needs to be elaborated upon...
