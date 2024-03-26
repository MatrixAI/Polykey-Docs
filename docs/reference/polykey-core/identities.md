# Identities

Identities are Polykey's method of establishing a gestalt which enables social discovery and sharing of vaults with ease. This incorporates an inherit trust in the
identity and the identity provider. This enables vaults to be securely cloned between identities without having to rely on nodeIDs.

## Identity

Every individual identity is composed of two elements

1. A provider ID, which is an identity provider akin to github.com, or tentatively in the future, meta, or X.
2. An Identity ID, which without the domain of a provider is an uniquely identifiable identity. This is usually a username on the providers' service.


```ts
type IdentityData = {
  providerId: ProviderId;
  identityId: IdentityId;
  name?: string;
  email?: string;
  url?: string;
};
```

## Specification

### `IdentitiesManager`

The `IdentitiesManager` class is repsonible for handling Gestalt IDs and linking them with nodeIDs.
It maps ProviderIDs and associated IdentityIDs together and into a gestalt.

---

#### `type ProviderId`

Identifies an identity provider

---

#### `type IdentityId`

Unique identifier for an identity within a providers domain. Usually in form of an username.

---

#### `type ProviderToken`

Authentication tokens from the providers' API, used to authenticate Identity IDs.

---

#### `type ProviderTokens`

Authentication tokens indexed by IdentityIDs

---

#### `createIdentitiesManager(...)`

Takes an object with the following properties:

- db
  - sigchain
  - keyRing
  - gestaltGraph
  - logger

Constructs an instance of IdentitiesManager.
The identities manager needs to be started with .start()

---

#### `public async start(): void`

Initializes and starts the identity manager. This method is responsible for setting up necessary configurations and initializing any required connections or services. It must be called before using the identity manager to ensure that all components are properly initialized.

#### Usage Example:

```typescript

await identitiesManager.start();
// The identity manager is now ready to be used
```

---

#### `public async stop(): void`

Gracefully stops the identity manager. This method is responsible for safely shutting down the identity manager, ensuring that all ongoing operations are completed and resources are released properly. This is typically called when the application is closing or when the identity manager is no longer needed.

```typescript

await identitiesManager.stop();
// The identity manager has been stopped
```
---

#### `async destroy(): void`

Destroys the instance of the identity manager. This method is used for cleanup purposes, ensuring that all resources, such as memory and network connections, are properly released. After calling this method, the instance of the identity manager becomes unusable.

```typescript

await identitiesManager.destroy();
// The identity manager instance has been destroyed
```
---

#### `public getProviders(): Record<ProviderId, Provider>`

Returns a record (an object) of all registered identity providers within the identity manager. Each key in the record is a ProviderId, and the corresponding value is the Provider object.
This method is useful for retrieving the complete list of providers that have been registered with the identity manager.

##### Returns:

    `Record<ProviderId, Provider>`: An object containing all registered providers indexed by their IDs.


##### Usage Example:

```ts
const providers = identitiesManager.getProviders();
for (const providerId in providers) {
  console.log(`Provider ID: ${providerId}, Provider:`, providers[providerId]);
}

```
---
#### `public getProvider(pId: ProviderId): Provider | undefined`

Retrieves a specific identity provider based on the provided ProviderId. If the provider exists in the manager, it returns the Provider object; otherwise, it returns undefined.

##### Parameters:

    `pId`: The unique identifier of the provider to be retrieved.

##### Returns:

    `Provider`: The provider object if found.
    `undefined`: If no provider with the given ID exists.

##### Usage Example:

```ts
const provider = identitiesManager.getProvider("github.com");
if (provider) {
// Perform actions with the provider
}
```
---

#### `public registerProvider(p: Provider): void`

Registers a new identity provider with the identities manager. If the provider already exists, it throws an ErrorProviderDuplicate error.

##### Parameters:

    `p`: The provider object to be registered. It must have a unique id.

##### Usage Example:

```ts

const githubProvider = new Provider({ id: "github.com", ... });
identitiesManager.registerProvider(githubProvider);
```

---

#### `public unregisterProvider(pId: ProviderId): void`

Removes a provider from the identities manager based on the provided ProviderId.

##### Parameters:

    pId: The unique identifier of the provider to be unregistered.

##### Usage Example:

```typescript

identitiesManager.unregisterProvider("github.com");
```

---

#### `public async getTokens(providerId: ProviderId, tran?: DBTransaction): Promise<ProviderTokens>`

Retrieves all authentication tokens associated with a given provider. This method can optionally use a database transaction (`DBTransaction`) if provided.


##### Parameters:

    `providerId`: The unique identifier of the provider.
    `tran` (optional): The database transaction to be used.

##### Returns:

     `Promise<ProviderTokens>`: A promise that resolves to a collection of authentication tokens indexed by IdentityId.


##### Usage Example:

```ts
const tokens = await identitiesManager.getTokens("github.com");
```

---

#### `public async getTokens(providerId: ProviderId, identityId: IdentityId, tran?: DBTransaction): Promise<ProviderTokens | undefined>`

Fetches a specific token for an identity within a provider's domain. Optionally uses a database transaction if provided.

##### Parameters:

    `providerId`: The unique identifier of the provider.
    'identityId': The identifier of the identity within the provider's domain.
    `tran` (optional): The database transaction to be used.

##### Returns:

     `Promise<ProviderTokens | undefined>`: A promise that resolves to the authentication token if found, or undefined if not.


##### Usage Example:

```ts
const token = await identitiesManager.getToken("github.com", "user123");
```

---

#### `public async putToken(providerId: ProviderId, identityId: IdentityId, providerToken: ProviderToken, tran?: DBTransaction): Promise<void>`

Stores or updates a token for a specific identity within a provider's domain. Optionally uses a database transaction.

##### Parameters:

    `providerId`: The unique identifier of the provider.
    'identityId': The identifier of the identity within the provider's domain.
    'providerToken': The authentication token to be stored.
    `tran` (optional): The database transaction to be used.

##### Usage Example:

```ts
await identitiesManager.putToken("github.com", "user123", "tokenValue123");
```

---



#### `public async delToken(providerId: ProviderId, identityId: IdentityId, tran?: DBTransaction): Promise<void>`

Deletes a token associated with a specific identity within a provider's domain. Optionally uses a database transaction.
##### Parameters:

    `providerId`: The unique identifier of the provider.
    'identityId': The identifier of the identity whose token is to be deleted.
    `tran` (optional): The database transaction to be used.

##### Usage Example:

```ts
await identitiesManager.delToken("github.com", "user123");
```

---


#### `public async handleClaimIdentity(providerId: ProviderId, identityId: IdentityId): Promise<IdentitySignedClaim>`

Handles the process of claiming an identity. This includes verifying provider authentication, creating an identity claim on the node, publishing the claim, and linking the node and identity in the gestalt graph.
##### Parameters:

    `providerId`: The unique identifier of the provider.
    'identityId': The identifier of the identity to be claimed.

##### Returns:

     `Promise<IdentitySignedClaim>`: A promise that resolves to the published Identity Claim.


##### Usage Example:

```ts
const claim = await identitiesManager.handleClaimIdentity("github.com", "user123");
```

---
