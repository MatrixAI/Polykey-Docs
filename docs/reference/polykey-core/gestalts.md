# Gestalt Graph

:::info
For auto-generated programmatic reference, please see the docs here:
https://matrixai.github.io/Polykey/modules/gestalts.html
:::

Gestalt Graphs in Polykey represent a unified social plane that links identities to NodeIDs. This facilitates the sharing
of vaults and secrets by allowing users to rely on either NodeIDs or social IDs (based on their preference) when sharing information.

## Gestalt

Gestalts in Polykey represent a unique identification system that blends the concept of node-based and identity-based identifiers.
This allows users to establish a more comprehensive and user-friendly way of interacting within the Polykey network.
Each Gestalt ID can consist of one or both of the following elements:

1. NodeID: This is the primary identifier for a user within the Polykey network. It specifically denotes the ID of the node running the Polykey Agent.
   The NodeID is fundamental for interactions that are primarily node-centric, facilitating operations and communications that are tied to the technical infrastructure of the network.
2. Identity ID: This element extends the notion of identity beyond just the technical node. It consists of:

- ProviderID: This identifies the social identity provider. It's a key element that signifies the external platform or service (like GitHub, Google, etc.) that the user's social identity is associated with.
- IdentityID: This is the specific user ID within the domain of the chosen identity provider. It's the unique identifier given to a user by the external identity provider, differentiating them from other users on that platform.
- Optional Personal Information:
  - Name: The user's name, providing a more human-readable identifier.
  - Email: The user's email address, offering another layer of identity that can be used for communication or verification purposes.URL: A URL that might be associated with the user's identity, such as a personal website or a profile page on the identity provider's platform.
  - URL: A URL that might be associated with the user's identity, such as a personal website or a profile page on the identity provider's platform.

```ts
type GestaltInfo =
  | ['node', GestaltNodeInfo]
  | ['identity', GestaltIdentityInfo];

type GestaltNodeInfo = {
  nodeId: NodeId;
  // The `undefined` is a hack to include the optional reserved properties
  [key: string]: JSONValue | undefined;
};

interface GestaltNodeInfoJSON extends Omit<GestaltNodeInfo, 'nodeId'> {
  nodeId: {
    type: 'IdInternal';
    data: Array<number>;
  };
}

type GestaltIdentityInfo = {
  providerId: ProviderId;
  identityId: IdentityId;
  name?: string;
  email?: string;
  url?: string;
  // The `undefined` is a hack to include the optional reserved properties
  [key: string]: JSONValue | undefined;
};
```

### Specification

### `Gestalt Graph`

#### `type Gestalt`

- Represents the overall structure of the Gestalt Graph, encompassing matrices, nodes, and identities.

#### `type GestaltAction`

- Denotes specific actions applicable within the Gestalt Graph, such as 'notify', 'scan', or 'claim'.

#### `type GestaltActions`

- A record type mapping GestaltAction to a null value, used for action-related operations in the Gestalt Graph.

#### `type GestaltKey`

- An opaque type representing a unique key within the Gestalt Graph, used for secure operations and identifications.

#### `type GestaltLinkId`

- A unique identifier for a link within the Gestalt Graph, representing connections between nodes and identities.

#### `type GestaltNodeInfo`

- Contains information about a node in the Gestalt Graph, primarily the NodeID and optional JSON value properties

#### `type GestaltNodeInfoJSON`

- The JSON representation of GestaltNodeInfo, with nodeId in a specific internal ID format for serialization.

#### `type GestaltIdentityInfo`

- Describes an identity within the Gestalt Graph, including providerId, identityId, and optional personal information (name, email, URL).

#### `type GestaltLink`

- Represents a link (edge) in the Gestalt Graph, which can be either a node-to-node link (GestaltLinkNode) or a node-to-identity link (GestaltLinkIdentity).

#### `type GestaltLinkNode`

- A type for links between nodes in the Gestalt Graph, containing a link ID, a signed claim, and metadata.

#### `type GestaltInfo`

- A union type that can represent either GestaltNodeInfo or GestaltIdentityInfo, used for describing elements in the Gestalt Graph.

#### `type GestaltLinkIdentity`

- Similar to GestaltLinkNode, but specifically for linking a node to an identity, including a signed claim and additional metadata.

#### `type GestaltId`

- A general type for identifiers within the Gestalt Graph, used for referencing nodes, identities, or links.

---

#### `static async createGestaltGraph(...):Promise<GestaltGraph>`

Creates and initializes an instance of `GestaltGraph`.

##### Parameters:

An object containing:

    `db`: The database instance.
    `acl`: Access control list instance.
    `logger?`: Logger instance.
    `fresh?`: To indicate if a new gestalt graph should be created.

##### Returns:

`Promise<GestaltGraph>`: Resolves to an instance of `GestaltGraph`.

##### Usage Example:

```ts
const gestaltGraph = await GestaltGraph.createGestaltGraph({
  db: databaseInstance,
  acl: aclInstance,
  logger: new Logger('GestaltGraph'),
  fresh: true,
});
```

---

#### `public async start(...): Promise<void>`

Starts the gestalt graph, optionally clearing existing data for a fresh start.

##### Parameters:

An object containing:

    `fresh?`: To indicate if a new gestalt graph should be created.

##### Usage Example:

```ts
await gestaltGraph.start({ fresh: true });
```

---

#### `async stop(...): Promise<void>`

Stops the gestalt graph, ensuring a clean shutdown.

##### Usage Example:

```ts
await gestaltGraph.stop();
```

---

#### `async destroy(...): Promise<void>`

Destroys the gestalt graph instance, clearing all related data from the database.

##### Usage Example:

```ts
await gestaltGraph.destroy();
```

---

### Vertex Management Methods

#### `public async setNode(...): Promise<['node', NodeId]>`

Sets or updates a node in the gestalt graph.

##### Parameters:

    `nodeInfo`: Information about the node (GestaltNodeInfo).
    `tran?`: Optional database transaction.

##### Returns:

    `Promise<['node', NodeId]>`: A promise resolving to a tuple indicating the type ('node') and the `NodeId`.

##### Usage Example:

```ts
const gestaltNodeId = await gestaltGraph.setNode(nodeInformation);
```

---

#### `public async setIdentity(...): Promise<['identity', ProviderIdentityId]>`

Sets or updates an identity in the gestalt graph.

##### Parameters:

    `identityInfo`:  Information about the identity (GestaltIdentityInfo).
    `tran?`: Optional database transaction.

##### Returns:

    `Promise<['identity', ProviderIdentityId]>`:  A promise resolving to a tuple indicating the type ('identity') and
    the `ProviderIdentityId`.

##### Usage Example:

```ts
const gestaltIdentityId = await gestaltGraph.setIdentity(identityInformation);
```

---

#### `public async setVertex(...): Promise<GestaltId>`

Sets either a node or an identity in the gestalt graph.

##### Parameters:

    `gestaltInfo`: Either GestaltNodeInfo or GestaltIdentityInfo.
    `tran?`: Optional database transaction.

##### Returns:

    `Promise<GestaltId>`: A promise resolving to the gestalt identifier.

##### Usage Example:

```ts
await gestaltGraph.setVertex(gestaltInfo);
```

---

#### `public async unsetNode(...): Promise<void>`

Unsets a node from the gestalt graph.

##### Parameters:

      `nodeId`: The `NodeId` of the node to remove.
      `tran?`: Optional DB transaction.

##### Usage Example:

```ts
await gestaltGraph.unsetNode(nodeId);
```

---

#### `public async unsetIdentity(...): Promise<void>`

Unsets (removes) an identity from the gestalt graph.

##### Parameters:

      `providerIdentityId`:  The `ProviderIdentityId` of the identity to remove.
      `tran?`: Optional DB transaction.

##### Usage Example:

```ts
await gestaltGraph.unsetIdentity(providerIdentityId);
```

---

#### `public async unsetVertex(...): Promise<void>`

Unsets (removes) either a node or an identity from the gestalt graph.

##### Parameters:

      `gestaltId`:  Either a NodeId or a ProviderIdentityId.
      `tran?`: Optional DB transaction.

##### Usage Example:

```ts
await gestaltGraph.unsetVertex(gestaltId);
```

---

### Linking and Unlinking Vertices Methods

#### `public async linkNodeAndNode(...): Promise<GestaltLinkId>`

Links two nodes within the gestalt graph.

##### Parameters:

    `nodeInfo1`: Information about the first node (GestaltNodeInfo).
    `nodeInfo2`: Information about the second node (GestaltNodeInfo).
    `linkNode`: The link node data, excluding the id (`Omit<GestaltLinkNode, 'id'>`).
    `tran?`: Optional DB transaction.

##### Functionality:

- Validates if the link node's issuer and subject match the provided node information.
- Ensures the nodes are not already linked; if they are, it only updates the link node.
- Handles ACL changes based on whether the nodes are new or existing in the gestalt graph.
- Creates and links a new GestaltLinkId if the nodes are not already connected.

##### Returns:

    `Promise<GestaltLinkId>`: A promise resolving to the Gestalt Link ID of the newly created or updated link.

##### Usage Example:

```ts
const gestaltLinkId = await gestaltGraph.linkNodeAndNode(
  nodeInfo1,
  nodeInfo2,
  linkNodeData,
);
```

---

#### `public async unlinkNodeAndNode(...): Promise<void>`

Unlinks two nodes in the gestalt graph, ensuring that their connection is removed.

##### Parameters:

    `nodeInfo1`: Information about the first node (GestaltNodeInfo).
    `nodeInfo2`: Information about the second node (GestaltNodeInfo).
    `tran?`: Optional DB transaction.

##### Functionality:

- Validates the existence of both nodes as vertices in the graph.
- Checks if a link exists between the two nodes.
- Removes the link and checks if the nodes have become singletons in the graph.
- Handles the ACL updates if the gestalt splits into separate gestalts.

##### Usage Example:

```ts
await gestaltGraph.unlinkNodeAndNode(nodeId1, nodeId2);
```

---

#### `public async linkNodeAndIdentity(...): Promise<GestaltLinkId>`

Links a node and an identity within the gestalt graph.

##### Parameters:

    `nodeInfo`: Information about the node (GestaltNodeInfo).
    `identityInfo`: Information about the identity (GestaltIdentityInfo).
    `linkIdentity`: The link identity data, excluding the id (`Omit<GestaltLinkIdentity, 'id'>`).
    `tran?`: Optional DB transaction.

##### Functionality:

- Validates if the link identity's issuer and subject match the provided node and identity information.
- Handles the scenario where either the node or the identity or both are new in the graph.
- Manages ACL changes depending on the existence of the node and identity in the gestalt graph.
- Creates a new GestaltLinkId for the connection and manages updates if the node and identity are already connected.

##### Returns:

    `Promise<GestaltLinkId>`: A promise resolving to the Gestalt Link ID of the newly created or updated link.

##### Usage Example:

```ts
const gestaltLinkId = await gestaltGraph.linkNodeAndIdentity(
  nodeInfo,
  identityInfo,
  linkIdentityData,
);
```

---

#### `public async unlinkNodeAndIdentity(...): Promise<void>`

Unlinks a node and an identity in the gestalt graph, effectively removing their connection.

##### Parameters:

    `nodeId`: Identifier of the node (NodeId).
    `providerIdentityId`: Identifier of the identity (ProviderIdentityId).
    `tran?`: Optional DB transaction.`

##### Functionality:

- Checks the existence of both the node and the identity in the graph.
- Validates and removes the link between the node and the identity.
- Adjusts the graph to reflect the unlinking, potentially setting vertices as singletons.
- Manages ACL permissions appropriately, copying permissions if the gestalt splits.

##### Usage Example:

```ts
await gestaltGraph.unlinkNodeAndIdentity(nodeId, providerIdentityId);
```

---

### Generic Vertex Linking Method

#### `public linkVertexAndVertex(...): Promise<GestaltLinkId>`

Links two vertices (nodes or identities) within the gestalt graph. This method is an abstraction that can handle linking between two nodes, a node and an identity, or an identity and a node.

##### Overloads:

1. Linking Two Nodes:

- `gestaltInfo1`: First node's information (`['node', GestaltNodeInfo]`).
- `gestaltInfo2`: Second node's information (`['node', GestaltNodeInfo]`).
- `link`: Link node data (`['node', Omit<GestaltLinkNode, 'id'>]`).

2. Linking Node and Identity:

- `gestaltInfo1`: Node's information (`['node', GestaltNodeInfo]`).
- `gestaltInfo2`: Identity's information (`['identity', GestaltIdentityInfo]`).
- `link`: Link identity data (`['identity', Omit<GestaltLinkIdentity, 'id'>]`).

3. Linking Identity and Node:

- `gestaltInfo1`: Identity's information (`['identity', GestaltIdentityInfo]`).
- `gestaltInfo2`: Node's information (`['node', GestaltNodeInfo]`).
- `link`: Link identity data (`['identity', Omit<GestaltLinkIdentity, 'id'>]`).

---

#### `public linkVertexAndVertex(...): Promise<GestaltLinkId>`

Links two vertices (either nodes or identities) within the gestalt graph, dynamically handling the link type based on the vertex types.

##### Parameters:

    `gestaltInfo1`: Information about the first vertex (GestaltInfo).
    `gestaltInfo2`: Information about the second vertex (GestaltInfo).
    `link`: The link data, excluding the id.
    `tran?`: Optional database transaction

##### Functionality:

- Determines the types of the vertices and delegates the linking operation to either linkNodeAndNode or linkNodeAndIdentity, based on the vertex types.
- Handles linking between two nodes, a node and an identity, or an identity and a node.

##### Returns:

    `Promise<GestaltLinkId>`: A promise resolving to the Gestalt Link ID of the newly created or updated link.

##### Usage Example:

```ts
const gestaltLinkId = await gestaltGraph.linkVertexAndVertex(
  gestaltInfo1,
  gestaltInfo2,
  linkData,
);
```

---

#### `public unlinkVertexAndVertex(...): Promise<void>`

Unlinks two vertices (either nodes or identities) within the gestalt graph, dynamically handling the unlinking type based on the vertex types.

##### Parameters:

    `gestaltInfo1`: Information about the first vertex (GestaltInfo).
    `gestaltInfo2`: Information about the second vertex (GestaltInfo).
    `tran?`: Optional database transaction

##### Functionality:

- Determines the types of the vertices and delegates the unlinking operation to either unlinkNodeAndNode or unlinkNodeAndIdentity, based on the vertex types.
- Handles unlinking between two nodes, a node and an identity, or an identity and a node.

##### Usage Example:

```ts
await gestaltGraph.unlinkVertexAndVertex(gestaltId1, gestaltId2);
```

---

### Gestalt Action Methods

#### `public getGestaltActions(...): Promise<GestaltActions>`

Retrieves the actions associated with a specific gestalt (node or identity) in the gestalt graph.

##### Parameters:

    `gestaltId`: Identifier of the gestalt (GestaltId).
    `tran?`: Optional database transaction

##### Functionality:

- Determines the type of the gestalt (node or identity).
- Checks the existence of the gestalt in the graph.
- Retrieves the associated permissions from the ACL.
- Returns the actions associated with the gestalt.

##### Returns:

    `Promise<GestaltActions>`: A promise resolving to the actions associated with the gestalt.

##### Usage Example:

```ts
const actions = await gestaltGraph.getGestaltActions(gestaltId);
```

---

#### `public setGestaltAction(...): Promise<void>`

Sets a specific action for a gestalt (node or identity) in the gestalt graph.

##### Parameters:

    `gestaltId`: Identifier of the gestalt (GestaltId).
    `action`: The action to set (GestaltAction).
    `tran?`: Optional database transaction

##### Functionality:

- Validates the existence of the gestalt in the graph.
- Sets the specified action in the ACL for the node or the node linked to the identity.

##### Usage Example:

```ts
await gestaltGraph.setGestaltAction(gestaltId, 'notify');
```

---

#### `public unsetGestaltAction(...): Promise<void>`

Unsets a specific action for a gestalt (node or identity) in the gestalt graph.

##### Parameters:

    `gestaltId`: Identifier of the gestalt (GestaltId).
    `action`: The action to unset (GestaltAction).
    `tran?`: Optional database transaction

##### Usage Example:

```ts
await gestaltGraph.unsetGestaltAction(gestaltId, 'notify');
```

---
