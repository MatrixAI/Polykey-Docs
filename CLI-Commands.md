# Local Commands:
### Agent
|  Command  |             Description              |
|-----------|--------------------------------------|
| start     | Starts the polykey agent             |
| status    | Gets the status of the polykey agent |
| stop      | Stops the polykey agent              |
| bootstrap | Initializes a keynode                |


### Vaults
|  Command  |             Description              |
|-----------|--------------------------------------|
| create    | Creates a vault                      |
| delete    | Deletes a vault                      |
| list      | Lists all available vaults           |
| rename    | Renames a vault                      |
| stats     | Gets the stats of a vault            |

### Secrets
|  Command  |              Description               |
|-----------|----------------------------------------|
| create    | Creates a secret                       |
| delete    | Deletes a secret                       |
| edit      | Edits a secret                         |
| get       | Gets the contents of a secret          |
| list      | Lists all the secrets within a vault   |
| mkdir     | Makes a directory inside a vault       |
| dir       | Adds a directory of secrets to a vault |
| rename    | Renames a vault                        |
| stats     | Gets the stats of a vault              |
| env       | Injects secrets into an environment    |
| update    | Updates a secret with new content      |

### Keys
|  Command  |              Description               |
|-----------|----------------------------------------|
| delete | Deletes a key |
| get | Gets the value of a key |
| list (no implementation in keys domain) | Lists the available keys |
| primary |  Get the root keypair |
| put| Stores the provided key|
| renew| Renews the root keypair|
| reset| Resets the root keypair|
| decrypt| Decrypts data using the root keypair|
| encrypt| Encrypts data using the root keypair|
| sign| Signs data using the root keypair|
| verify| Verifies a signature using the root keypair|
| root| Gets the root certificate|
| chain| Get the certificate chain|
| password| Change the password of the root keypair|

### Nodes
|  Command  |              Description               |
|-----------|----------------------------------------|
| add| Adds a node to the node graph |
| delete| Deletes a node from the node graph |
| get| Gets the node info for a particular node |
| stealth| Opens or closes the node to connections (close not implemented in nodes?) |

### Identities
|  Command  |              Description               |
|-----------|----------------------------------------|
| augment| Augment the keynode on a given provider and identity |
| authenticate| Authenticate a social identity provider (Github only at the moment) |
| list| Lists registered providers|
| get| Gets a token|
| put| Stores a token|
| delete| Deletes a token|

### Gestalt
|  Command  |              Description               |
|-----------|----------------------------------------|
| get| Gets a gestalt with the associated node or identity|
| list| Lists the available gestalts|
| set | Set or unset a node or identitiy|
| link| Link or unlink a node to node or identity|

# Agent Commands:
### Agent
### Vaults
|  Command  |              Description               |
|-----------|----------------------------------------|
| pull| Pulls a vault from another node|
| scan| Scans the vaults of another node|
### Secrets

### Keys

### Nodes
|  Command  |              Description               |
|-----------|----------------------------------------|
| localNodes| Gets the closest local nodes from another node|
| ping | Sends a hole punched message to another node |

### Identities

### Gestalt

