# Git

In Polykey, vaults and secret sharing is managed through git. Polykey uses the
`isomorphic-git` library. Within the git implementation there are three domains.

[GitBackend](https://github.com/MatrixAI/Polykey/wiki/git-api#GitBackend)

[GitRequest](https://github.com/MatrixAI/Polykey/wiki/git-api#GitRequest)

[GitFrontend](https://github.com/MatrixAI/Polykey/wiki/git-api#GitFrontend)

---

## GitBackend

`GitBackend` deals with the formatting of information that is distributed
between nodes. Functions declared in this class are packaged into the Git
Request class.

---

#### `new GitBackend(...)`

- `baseDir`: The base directory of the vaults
- `getFileSystem`: Function to get EFS of a vault
- `getVaultNames`: Function that lists the current vaults in vault manager
- `logger`: Logger to output information

Constructs an instance of git backend

---

#### `public async handleInfoRequest(repoName: string): Promise<Buffer>`

- `repoName`: Name of the vault repository

A handler to create a utf8 encoded buffer of information about a remote vault
repository. The format of this response can be found in
https://git-scm.com/docs/pack-protocol/2.17.0. This is passed between nodes
using the `GitRequest` class and is used by `isomorphic-git`.

---

#### `public async handlePackRequest(repoName: string, body: Buffer): Promise<Buffer>`

- `repoName`: Name of the vault repository to request information from
- `body`: Details of the requested information

A handler used to request specific information from a remote vault repository.
he format of this response can be found in
https://git-scm.com/docs/pack-protocol/2.17.0. This is also passed between nodes
using the `GitRequest` class and is used by `isomorphic-git`.

---

## GitRequest

`GitRequest` is a custom http client that defines custom functions for the
transfer of vault repository information in `isomorphic-git`.

---

#### `new GitRequest(...)`

- `requestInfo`: Function to get the info of a vault repository
- `requestPack`: Function to get the pack object
- `requestVaultNames`: Function to get the vault names of a node

Constructs an instance of git request

---

#### `public async request({ url, method, headers, body }): `

- `url`: URL of remote repository
- `method`: Action to perform on the vault repo
- `headers`: Header of the request
- `body`: Body of the request

Custom http request which uses handleInfoRequest and handlePackRequest for http
'GET' and 'POST' methods respectively.

---

#### `public async scanVaults(): Promise<Buffer>`

Returns a string of the vault names from a connected node.

---

## GitFrontend

`GitFrontend` is responsible for converting HTTP messages from isomorphic-git
into requests and sending them to a specific node.

---

#### `new GitFrontend(...)`

- `connectToNode`: Function that returns a NodeConnection;
- `logger`: To output information;

Constructs an instance of git frontend

---

#### `public connectToNodeGit(nodeId: string): GitRequest`

- `nodeId`: Id of the node to connect to

Creates a nodeConnection to the given node, passes in this connection to the
requestPack, requestInfo and requestVaultNames functions and packages this in a
gitRequest object which is returned.

---

#### `private async requestInfo(vaultName: string, nodeConnection: NodeConnection): Promise<Uint8Array>`

- `vaultName`: Name of the targetted vault repository
- `nodeConnection`: A method to contact the node client

Uses the node connection to get the client of the targeted node. Then uses
handleInfoRequest to send a request to the client through grpc which sends a
vault repository's information in response as a Uint8Array.

---

#### `private async requestPack(vaultName: string, body: Uint8Array, nodeConnection: NodeConnection): Promise<Uint8Array>`

- `vaultName`: Name of the targetted vault repository
- `body`: Details of the request
- `nodeConnection`: A method to contact the node client

Uses the node connection to get the client of the targeted node. Then uses
`handlePackRequest` to send a request to the client through grpc which sends a
vault repository's information in response as a Uint8Array.

---

#### `private async requestVaultNames(nodeConnection: NodeConnection): Promise<string[]>`

- `nodeConnection`: A method to contact the node client

Uses the node connection to get the client of the targeted node. Then uses
`handleGetVaultNames` to send a request to the client through grpc which sends a
vault repository's information in response as a string.

---
