# Git

In Polykey, vaults and secret sharing is managed through git. Polykey uses the `isomorphic-git` library. Within the git implementation there are three domains.

## Sepcification

---

## GitBackend

 `GitBackend` deals with the formatting of information that is distributed between nodes. Functions declared in this class are packaged into the Git Request class.

---

#### `new GitBackend(...)`
* `baseDir`: The base directory of the vaults
* `getFileSystem`: Function to get EFS of vault
* `getVaultNames`: 
* `logger`: Logger to output information

Constructs an instance of git backend

---

#### `public async handleInfoRequest(repoName: string): Promise<Buffer>`
* `repoName`: Name of the vault repository

A handler to create a utf8 encoded buffer of information about the vault repository. This is passed back between nodes using the `GitRequest` class and is used by `isomorphic-git` when pulling/cloning vaults

---

#### `public async handlePackRequest(repoName: string, body: Buffer): Promise<Buffer>`
* `repoName`: Name of the vault repository


---

## GitRequest

 `GitRequest` is a custom http client for `isomorphic-git`.

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
* `headers`:
* `body`: 

Custom http request which uses handleInfoRequest and handlePackRequest for http 'GET' and 'POST' methods respectively.

---

#### `public async scanVaults(): Promise<Buffer>`

Returns a string of the vault names

---

