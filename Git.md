# Git

In Polykey, vaults and secret sharing is managed through git. Polykey uses the `isomorphic-git` library. Within the git implementation there are three domains.

## Sepcification

---

## GitBackend

 `GitBackend` deals with the formatting of information that is distributed between nodes. Functions declared in this class are packaged into the Git Request class.

---

#### `new GitBackend(...)`
* `baseDir`: The base directory of the vaults
* `getFileSystem`: Function to get EFS of a vault
* `getVaultNames`: Function that lists the current vaults in vault manager
* `logger`: Logger to output information

Constructs an instance of git backend

---

#### `public async handleInfoRequest(repoName: string): Promise<Buffer>`
* `repoName`: Name of the vault repository

A handler to create a utf8 encoded buffer of information about a remote vault repository. The format of this response can be found in https://git-scm.com/docs/pack-protocol/2.17.0. This is passed between nodes using the `GitRequest` class and is used by `isomorphic-git`.

---

#### `public async handlePackRequest(repoName: string, body: Buffer): Promise<Buffer>`
* `repoName`: Name of the vault repository to request information from
* `body`: Details of the requested information

A handler used to request specific information from a remote vault repository. he format of this response can be found in https://git-scm.com/docs/pack-protocol/2.17.0. This is also passed between nodes using the `GitRequest` class and is used by `isomorphic-git`.

---

## GitRequest

 `GitRequest` is a custom http client that defines custom functions for the transfer of vault repository information in `isomorphic-git`.

---

#### `new GitRequest(...)`
* `requestInfo`: Function to get the info of a vault repository
* `requestPack`: Function to get the pack object
* `requestVaultNames`: Function to get the vault names of a node

Constructs an instance of git request

---

#### `public async request({ url, method, headers, body }): `
* `url`: URL of remote repository
* `method`: Action to perform on the vault repo
* `headers`: Header of the request
* `body`:  Body of the request

Custom http request which uses handleInfoRequest and handlePackRequest for http 'GET' and 'POST' methods respectively.

---

#### `public async scanVaults(): Promise<Buffer>`

Returns a string of the vault names from a connected node.

---

