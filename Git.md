# Git

In Polykey, vaults and secret sharing is managed through git. Polykey uses the `isomorphic-git` library. Within the git implementation there are three domains.

## Sepcification

---

## GitBackend

 `GitBackend` deals with the formatting of information that is distributed between nodes.

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

