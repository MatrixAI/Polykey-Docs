# Nodes

In the Polykey network, nodes represent the foundational elements of connectivity and interaction.

## Node Structure

The structure of nodes in Polykey encompasses several key elements, each contributing to the node's identity, connectivity, and functionality within the network:

1. NodeId: The primary identifier for a node within the Polykey network. It uniquely identifies each node, playing a critical role in node-to-node interactions and communications.

2. NodeAddress: Comprises a host or hostname and a port. This combination allows for the location and accessibility of nodes within the network, facilitating direct connections and communications.

3. NodeContact: A record mapping NodeContactAddress to NodeContactAddressData. It contains detailed information about how and when a node was last connected, including the connection mode and last active timestamp.

4. NodeBucket: An array of node IDs and their corresponding contacts. Node buckets are used in distributed hash tables (DHTs) to organize nodes based on their distance in the network.

5. NodeGraphSpace: Indicates the space within the NodeGraph where a node resides. It is used to classify and manage nodes in different contexts or domains within the network.

6. ConnectionErrorCode and ConnectionErrorReason: Enums that define various error codes and reasons related to node connections, aiding in error handling and network stability.

7. SeedNodes: A record of initial nodes used for bootstrapping the network. Seed nodes provide the entry points for new nodes to join and integrate into the network.


```ts
type NodeAddressScope = 'local' | 'global';

type NodeAddress = [Host | Hostname, Port];

type NodeBucketIndex = number;

type NodeBucket = Array<[NodeId, NodeContact]>;
```
### Specification

### `NodeManager`


#### `type NodeId`

- A unique identifier for a node within the Polykey network, essential for node identification and interaction.

#### `type NodeAddress`

- A tuple comprising a host (or hostname) and a port, representing the network address of a node for connectivity.

#### `type NodeBucket`

- An array structure used in a distributed hash table (DHT) to organize nodes based on their network distance, containing pairs of `NodeId` and `NodeContact`.

#### `type NodeBucketIndex`

- A numerical index used to categorize nodes into different buckets within the DHT based on their proximity or distance.

#### `type NodeContactAddressData`

- Detailed information about a node's last connection, including the connection mode (direct, signal, relay), last connected time, and address scopes.

#### `type NodeIdEncoded`

- An encoded form of `NodeId`, facilitating the storage and transmission of node identifiers in a compact, serialized format.

---

### NodeManager Class Specification

#### `constructor(...)`

Initializes an instance of `NodeManager` with necessary dependencies and configuration.

##### Parameters:

- An object containing:
  - `db`: Database instance for data storage.
  - `keyRing`: Key management system.
  - `sigchain`: Signature chain for cryptographic operations.
  - `gestaltGraph`: GestaltGraph instance for managing node identities.
  - `taskManager`: TaskManager for handling asynchronous tasks.
  - `nodeGraph`: NodeGraph for managing node network topology.
  - `nodeConnectionManager`: Manages connections between nodes.
  - `mdnsOptions`: Optional multicast DNS options for local network discovery.
  - `connectionConnectTimeoutTime`: Timeout for establishing `NodeConnection`.
  - `refreshBucketDelayTime`: Interval for refreshing buckets in the DHT.
  - `refreshBucketDelayJitter`: Jitter applied to the bucket refresh interval.
  - `retryConnectionsDelayTime`: Interval for retrying connections to maintain network health.
  - `nodesConnectionFindLocalTimeoutTime`: Timeout for finding local connections via MDNS.
  - `logger`: Logger instance.

##### Usage Example:

```typescript
const nodeManager = new NodeManager({
  db: databaseInstance,
  keyRing: keyRingInstance,
  sigchain: sigchainInstance,
  gestaltGraph: gestaltGraphInstance,
  taskManager: taskManagerInstance,
  nodeGraph: nodeGraphInstance,
  nodeConnectionManager: nodeConnectionManagerInstance,
  mdnsOptions: { groups: [hostInstance], port: portNumber },
  connectionConnectTimeoutTime: 10000,
  refreshBucketDelayTime: 30000,
  refreshBucketDelayJitter: 5000,
  retryConnectionsDelayTime: 45000,
  nodesConnectionFindLocalTimeoutTime: 5000,
  logger: new Logger('NodeManager'),
});
```

---

#### `public async start(): Promise<void>`

Starts the NodeManager, initializing network services, task handlers, and MDNS for node discovery.

##### Functionality:

- Registers task handlers for various operations like refreshing buckets, garbage collection, connection checks, and node graph synchronization.
- Sets up initial refresh bucket tasks and schedules tasks for checking connections.
- Initializes multicast DNS (MDNS) for local network discovery and service registration.
- Adds event listeners for handling node connections.

##### Usage Example:

```typescript
await nodeManager.start();
```

---

#### `public async stop(): Promise<void>`

Stops the NodeManager, halting network services, task handlers, and MDNS operations.

##### Functionality:

- Removes event listeners for node connections.
- Stops the MDNS service.
- Cancels all scheduled tasks and deregisters task handlers.

##### Usage Example:

```typescript
await nodeManager.stop();
```

---

#### `public acquireConnection(...): ResourceAcquire<NodeConnection>`

Acquires a connection to a specified node, establishing a new connection if necessary.

##### Parameters:

- `nodeId`: Identifier of the target node (`NodeId`).
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Validates the target node ID and checks for an existing connection.
- If no connection exists, initiates a `findNode` operation to establish a connection.
- Returns a resource acquisition function for the established node connection.

##### Returns:

- `ResourceAcquire<NodeConnection>`: A function to acquire the connection resource.

##### Usage Example:

```typescript
const connectionAcquire = nodeManager.acquireConnection(targetNodeId);
const connection = await connectionAcquire();
```

---

#### `public withConnF(...): PromiseCancellable<T>`

Facilitates communication with another node over the network using an existing or new connection.

##### Parameters:

- `nodeId`: Identifier of the target node (`NodeId`).
- `f`: A function that handles communication with the node connection.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Acquires a connection to the specified node.
- Executes the provided function `f` with the established connection.
- Handles the connection lifecycle, ensuring proper acquisition and release.

##### Returns:

- `PromiseCancellable<T>`: A cancellable promise that resolves to the result of the function `f`.

##### Usage Example:

```typescript
const result = await nodeManager.withConnF(targetNodeId, async (conn) => {
  // Perform operations using the connection
});
```

---

#### `public withConnG(...): AsyncGenerator<T, TReturn, TNext>`

Executes a generator function for network communication with another node.

##### Parameters:

- `nodeId`: Identifier of the target node (`NodeId`).
- `g`: A generator function to handle communication.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Retrieves or establishes a connection to the specified node.
- Executes the generator function `g` using the connection.
- Manages the connection resource, ensuring proper handling of errors and release.

##### Returns:

- `AsyncGenerator<T, TReturn, TNext>`: An asynchronous generator yielding results from the generator function `g`.

##### Usage Example:

```typescript
for await (const data of nodeManager.withConnG(targetNodeId, async function* (conn) {
  // Yield results from the generator function
})) {
  // Handle yielded data
}
```

---

#### `public findNode(...): PromiseCancellable<[NodeAddress, NodeContactAddressData] | undefined>`

Attempts to find a node within the network using various connection strategies.

##### Parameters:

- An object containing:
  - `nodeId`: Identifier of the target node (`NodeId`).
  - `connectionConnectTimeoutTime`: Timeout for individual connections.
  - `connectionFindMDNSTimeoutTime`: Timeout for finding connections via MDNS.
  - `concurrencyLimit`: Limit for concurrent connection attempts.
  - `limit`: Total connection attempt limit.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Utilizes signal-based, direct, and MDNS discovery strategies to locate the node.
- Manages concurrent and total connection attempts with specified limits.
- Resolves to the node's address and contact data upon successful discovery.

##### Returns:

- `PromiseCancellable<[NodeAddress, NodeContactAddressData] | undefined>`: A cancellable promise resolving to the node's address and contact data, if found.

##### Usage Example:

```typescript
const nodeInfo = await nodeManager.findNode({ nodeId: targetNodeId });
```

---

#### `public findNodeBySignal(...): PromiseCancellable<[[Host, Port], NodeContactAddressData]>`

Attempts to connect to a node using signal-based (hole punched) connections.

##### Parameters:

- `nodeId`: NodeId of the target node.
- `nodeConnectionsQueue`: A shared helper class for managing node connections.
- `connectionConnectTimeoutTime`: Timeout for each individual connection.
- `ctx`: Optional context for timed operations.

##### Functionality:

- Seeds the initial queue with the closest connections.
- Attempts to establish a connection using signal-based methods.
- Continues trying connections until the target node is successfully connected or all options are exhausted.

##### Returns:

- `PromiseCancellable<[[Host, Port], NodeContactAddressData]>`: A promise that resolves to the node's address and connection data if successful.

##### Usage Example:

```typescript
const result = await nodeManager.findNodeBySignal(nodeId, nodeConnectionsQueue);
```

---

#### `public findNodeByDirect(...): PromiseCancellable<[[Host, Port], NodeContactAddressData]>`

Tries to establish a direct connection to a node without using signaling.

##### Parameters:

- `nodeId`: NodeId of the target node.
- `nodeConnectionsQueue`: A shared helper class for managing node connections.
- `connectionConnectTimeoutTime`: Timeout for each individual connection.
- `ctx`: Optional context for timed operations.

##### Functionality:

- Initiates the process by seeding the queue with the closest nodes.
- Attempts to connect directly to each node in the queue.
- Proceeds with attempts until a successful connection is made or all options are explored.

##### Returns:

- `PromiseCancellable<[[Host, Port], NodeContactAddressData]>`: A promise that resolves to the node's address and connection data upon successful direct connection.

##### Usage Example:

```typescript
const directConnection = await nodeManager.findNodeByDirect(nodeId, nodeConnectionsQueue);
```

---

These methods provide specialized strategies for finding and connecting to nodes within the Polykey network. `findNodeBySignal` leverages signal-based connections for nodes that might be behind NATs or firewalls, while `findNodeByDirect` attempts direct connections when signaling is not necessary. Both methods are essential for maintaining a robust and flexible network, allowing nodes to establish connections in various network environments.

---

#### `public queryMDNS(...): PromiseCancellable<Array<[Host, Port]>>`

Queries the network via MDNS for Polykey nodes matching a specific NodeId.

##### Parameters:

- `nodeId`: The NodeId of the target node.
- `ctx`: Optional context for timed operations.

##### Functionality:

- Performs an MDNS query to discover services associated with the specified NodeId.
- Returns the list of discovered addresses and ports for the target node.

##### Returns:

- `PromiseCancellable<Array<[Host, Port]>>`: A promise that resolves to an array of host-port tuples found via MDNS.

##### Usage Example:

```typescript
const mdnsAddresses = await nodeManager.queryMDNS(targetNodeId);
```

---

#### `public findNodeByMDNS(...): PromiseCancellable<[[Host, Port], NodeContactAddressData]>`

Attempts to find a node in the local network using MDNS and establish a connection.

##### Parameters:

- `nodeId`: The NodeId of the target node.
- `ctx`: Optional context for timed operations.

##### Functionality:

- Queries MDNS for the target node's addresses.
- Attempts to establish a connection to the node using the discovered addresses.
- Throws an error if no addresses are found or if the connection attempt fails.

##### Returns:

- `PromiseCancellable<[[Host, Port], NodeContactAddressData]>`: A promise that resolves to the node's address and connection data upon successful MDNS discovery and connection.

##### Usage Example:

```typescript
const mdnsConnection = await nodeManager.findNodeByMDNS(targetNodeId);
```

---

#### `protected async queueDataFromRequest(...)`

Queries a target node for the closest nodes to a specified node and adds them to the connection queue.

##### Parameters:

- `nodeId`: NodeId to find the closest nodes to.
- `nodeIdTarget`: NodeId of the node to make RPC requests to.
- `nodeConnectionsQueue`: Shared class instance for managing node connections.
- `ctx`: Context for timed operations.

##### Functionality:

- Makes a remote procedure call (RPC) to the target node to retrieve the closest active and local nodes to the specified node.
- Adds the retrieved nodes to the node connections queue for further connection attempts.

##### Usage Example:

```typescript
await nodeManager.queueDataFromRequest(nodeId, nodeIdTarget, nodeConnectionsQueue, context);
```

---

#### `public pingNode(...): PromiseCancellable<[NodeAddress, NodeContactAddressData] | undefined>`

Attempts to establish a connection with a specified node or uses an existing connection to confirm its reachability.

##### Parameters:

- `nodeId`: NodeId of the target node.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Utilizes `findNode` to attempt to establish a connection to the target node.
- Returns the node's address and contact data if the connection is successfully established or already exists.

##### Returns:

- `PromiseCancellable<[NodeAddress, NodeContactAddressData] | undefined>`: A promise that resolves to the node's address and contact data, or undefined if the connection cannot be established.

##### Usage Example:

```typescript
const result = await nodeManager.pingNode(targetNodeId);
```

---

#### `public pingNodeAddress(...): PromiseCancellable<boolean>`

Attempts to make a direct connection to a specified node address without ICE (Interactive Connectivity Establishment).

##### Parameters:

- `nodeId`: NodeId of the target node.
- `host`: Host address of the target node.
- `port`: Port number of the target node.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Checks for an existing connection to the target node.
- Tries to establish a direct connection under certain conditions, such as an existing connection, NAT configuration, or public accessibility.
- Returns `true` if the connection is established or already exists, `false` otherwise.

##### Returns:

- `PromiseCancellable<boolean>`: A promise that resolves to `true` if the connection is successful, `false` otherwise.

##### Usage Example:

```typescript
const isPingSuccessful = await nodeManager.pingNodeAddress(nodeId, host, port);
```

---

#### `public requestChainData(...): PromiseCancellable<Record<ClaimId, SignedClaim>>`

Requests chain data (claims) from a target node, optionally filtering by a specific claim ID.

##### Parameters:

- `targetNodeId`: NodeId of the target node to request data from.
- `claimId?`: Optional specific claim ID to request.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Connects to the target node and requests its chain data.
- Verifies the received claims before adding them to the returned record.
- Optionally filters the request for a specific claim ID.

##### Returns:

- `PromiseCancellable<Record<ClaimId, SignedClaim>>`: A promise that resolves to a record of claim IDs and their corresponding verified claims.

##### Usage Example:

```typescript
const chainData = await nodeManager.requestChainData(targetNodeId, specificClaimId);
```

---

#### `public claimNode(...): PromiseCancellable<void>`

Initiates the process of claiming a node, generating and exchanging signed claims between nodes.

##### Parameters:

- `targetNodeId`: NodeId of the target node to claim.
- `tran?`: Optional database transaction.
- `ctx?`: Optional context for timed operations.

##### Functionality:

- Generates a claim for linking the node and exchanges it with the target node for cross-signing.
- Both nodes verify and sign each other's claims.
- Updates the Gestalt Graph with the newly established link.

##### Usage Example:

```typescript
await nodeManager.claimNode(targetNodeId);
```

---

#### `public async *handleClaimNode(...): AsyncGenerator<AgentRPCResponseResult<AgentClaimMessage>>`

Handles a claim node request from another node, processing the exchange of claims.

##### Parameters:

- `requestingNodeId`: NodeId of the node initiating the claim request.
- `input`: Async iterable of agent RPC request parameters for claim messages.
- `tran?`: Optional database transaction.

##### Functionality:

- Processes the incoming claim request, verifying and signing the received claim.
- Generates a new claim for the requesting node and sends it for cross-signing.
- Updates the Gestalt Graph with the link between the two nodes.

##### Usage Example:

```typescript
for await (const response of nodeManager.handleClaimNode(requestingNodeId, input)) {
  // Process response
}
```

---

#### `public setNode(...): PromiseCancellable<void>`

Adds or updates a node in the NodeGraph, ensuring node authentication and managing node bucket constraints.

##### Parameters:

- `nodeId`: NodeId of the node to add or update.
- `nodeAddress`: Address of the node.
- `nodeContactAddressData`: Additional contact data for the node.
- `block`: Flag to block the operation until any ongoing garbage collection finishes.
- `force`: Flag to add the node without authentication or in a full bucket, replacing the oldest node.
- `connectionConnectTimeoutTime`: Timeout for ping operations during garbage collection.
- `ctx`: Optional context for timed operations.
- `tran`: Optional database transaction.

##### Functionality:

- Skips adding if the nodeId is the same as the manager's nodeId.
- Handles three scenarios:
  1. Node exists: updates the node.
  2. Node doesn't exist and bucket has room: adds the node.
  3. Node doesn't exist and bucket is full: pings the oldest node and decides to update or replace it based on ping success.
- If `force` is true, replaces the oldest node regardless of ping result.
- Adds nodes to a pending list if the bucket is full and `force` is false.

##### Usage Example:

```typescript
await nodeManager.setNode(nodeId, nodeAddress, nodeContactAddressData, block, force, connectionTimeout);
```

---

#### `public async unsetNode(nodeId: NodeId, tran: DBTransaction): Promise<void>`

Removes a node from the NodeGraph.

##### Parameters:

- `nodeId`: NodeId of the node to remove.
- `tran`: Database transaction.

##### Functionality:

- Removes the specified node from the NodeGraph.

##### Usage Example:

```typescript
await nodeManager.unsetNode(targetNodeId, transaction);
```

---

#### `public async getBucket(bucketIndex: number, tran?: DBTransaction): Promise<NodeBucket | undefined>`

Retrieves a specific bucket from the NodeGraph based on its index.

##### Parameters:

- `bucketIndex`: Index of the bucket to retrieve.
- `tran`: Optional database transaction.

##### Functionality:

- Fetches and returns the specified bucket from the NodeGraph.

##### Returns:

- `Promise<NodeBucket | undefined>`: A promise that resolves to the requested bucket or undefined if not found.

##### Usage Example:

```typescript
const bucket = await nodeManager.getBucket(bucketIndex, transaction);
```

---

#### `protected garbageCollectBucket(...): PromiseCancellable<void>`

Performs garbage collection on a specific bucket in the NodeGraph.

##### Parameters:

- `bucketIndex`: Index of the bucket to perform garbage collection on.
- `connectionConnectTimeoutTime`: Timeout for each ping operation during garbage collection.
- `ctx`: Optional context for timed operations.
- `tran`: Optional database transaction.

##### Functionality:

- Iterates over each node in the specified bucket.
- Pings each node to check its responsiveness.
- Removes unresponsive nodes to make room for pending nodes.
- Fills the bucket with pending nodes until full, discarding any remaining pending nodes.
- Ensures concurrency control and respects the cancellation signal.

##### Usage Example:

```typescript
await nodeManager.garbageCollectBucket(bucketIndex, connectionTimeout, ctx, transaction);
```

---

#### `protected async addPendingNode(...): Promise<void>`

Adds a node to the pending list for a specified bucket, possibly triggering garbage collection.

##### Parameters:

- `bucketIndex`: Index of the bucket for the pending node.
- `nodeId`: NodeId of the node to be added.
- `nodeAddress`: Address of the node.
- `nodeContactAddressData`: Additional contact data for the node.
- `block`: Flag to run garbage collection synchronously.
- `connectionConnectTimeoutTime`: Timeout for ping operations during garbage collection.
- `ctx`: Context for timed operations.
- `tran`: Optional database transaction.

##### Functionality:

- Adds a node to the pending list for the specified bucket.
- If `block` is true, runs garbage collection synchronously.
- Sets up a garbage collection task if not blocking.

##### Usage Example:

```typescript
await nodeManager.addPendingNode(bucketIndex, nodeId, nodeAddress, nodeContactAddressData, block, connectionTimeout, ctx, transaction);
```

---

#### `protected async setupGCTask(bucketIndex: number): Promise<void>`

Sets up a garbage collection task for a specific bucket in the NodeGraph.

##### Parameters:

- `bucketIndex`: Index of the bucket for which the garbage collection task is set up.

##### Functionality:

- Checks for existing garbage collection tasks for the specified bucket.
- Schedules a new task if none are active or scheduled.
- Ensures that duplicate scheduled tasks are removed.

##### Usage Example:

```typescript
await nodeManager.setupGCTask(bucketIndex);
```

---

#### `public async resetBuckets(): Promise<void>`

Resets all buckets in the NodeGraph in response to a key renewal.

##### Functionality:

- Reorders all nodes across all buckets according to the new node ID after key renewal.

##### Usage Example:

```typescript
await nodeManager.resetBuckets();
```

---

#### `public refreshBucket(...): PromiseCancellable<void>`

Performs a Kademlia refresh bucket operation for a specific bucket.

##### Parameters:

- `bucketIndex`: Index of the bucket to refresh.
- `connectionConnectTimeoutTime`: Timeout for each connection attempt during the refresh operation.
- `ctx`: Optional context for timed operations.

##### Functionality:

- Generates a random node ID within the range of the specified bucket.
- Conducts a network lookup for the generated node ID, prompting an update of node graph information.

##### Usage Example:

```typescript
await nodeManager.refreshBucket(bucketIndex, connectionTimeout, ctx);
```

---

#### `protected async setupRefreshBucketTasks(tran?: DBTransaction): Promise<void>`

Sets up tasks for refreshing buckets in the NodeGraph.

##### Parameters:

- `tran`: Optional database transaction.

##### Functionality:

- Iterates over existing refresh bucket tasks and resets their delays.
- Recreates missing tasks for buckets that lack a scheduled refresh operation.
- Adjusts tasks to account for jitter in the refresh delay.

##### Usage Example:

```typescript
await nodeManager.setupRefreshBucketTasks(transaction);
```

---

#### `public async updateRefreshBucketDelay(...): Promise<Task>`

Updates the delay for a scheduled refresh bucket task.

##### Parameters:

- `bucketIndex`: Index of the bucket for which the refresh task is being updated.
- `delay`: Delay time for the refresh bucket task (defaults to the class's `refreshBucketDelayTime`).
- `lazy`: Boolean indicating if the task should be lazily scheduled.
- `tran`: Optional database transaction.

##### Functionality:

- Iterates over existing tasks for the specified bucket and updates the delay for the first task found.
- Cancels duplicate tasks found for the same bucket.
- Creates a new task if none are scheduled or existing.

##### Usage Example:

```typescript
const task = await nodeManager.updateRefreshBucketDelay(bucketIndex, delay, lazy, transaction);
```

---

#### `public syncNodeGraph(...): PromiseCancellable<void>`

Performs an initial synchronization of the NodeGraph with the network.

##### Parameters:

- `initialNodes`: Array of initial node IDs and addresses to connect with.
- `connectionConnectTimeoutTime`: Timeout for connection establishment.
- `blocking`: Boolean indicating if the operation should block until completion.
- `ctx`: Optional context for timed operations.

##### Functionality:

- Connects to initial nodes provided.
- Performs a `find-node` operation for the node's own ID.
- Reschedules refresh bucket operations for buckets above the closest node found.
- The process ensures the node joins the network and populates its k-buckets.

##### Usage Example:

```typescript
await nodeManager.syncNodeGraph(initialNodes, timeout, blocking, ctx);
```

---

