# Managing Multiple Nodes

Managing multiple local nodes can be useful for various scenarios. For instance, you might want one node for personal projects and another for professional work, ensuring that the vaults and their contents remain separate according to their usage context.

This setup is also beneficial for demonstrations, allowing you to simulate sharing vaults between two nodes on a network without needing another live user.

## Steps to Manage Multiple Nodes Locally

### 1. Initialize Your Nodes

Open two terminal sessions (Shell A and Shell B). Assuming you have already bootstrapped one node with a default node path:

**Shell B (for your new node, now called nodeB):**

```bash
polykey agent start --node-path ./nodeB --background
```

This command starts a new Polykey agent in the background for nodeB. When you run this for the first time, it will prompt you to set a password, similar to the initial bootstrap of any new node.

### 2. Configure Node Environment

To avoid having to specify the node path for every command in a session:

#### **Export the environment variable in Shell B:**

```bash
export PK_NODE_PATH='./nodeB'
```

This sets the environment for nodeB in Shell B, allowing you to execute Polykey commands specific to nodeB without constantly adding the node-path flag.

### 3. Verify Node Status

In both shell sessions, check that each node is active:

```bash
polykey agent status
```

This command confirms the node's status and provides the nodeId, which is crucial for the next steps.

### 4. Node Discovery and Trust Establishment

Before sharing any vaults, both nodes need to discover each other and establish trust. Use the `nodeId` obtained from the status output:

#### **Shell A (default node):**

```bash
polykey identities discover <nodeB_Id>
polykey identities trust <nodeB_Id>
```

#### **Shell B (nodeB):**

```bash
polykey identities discover <default_nodeId>
polykey identities trust <default_nodeId>
```

### 5. Share a Vault from the Default Node to nodeB

Choose a vault to share, for example, `Weather-Ops`.

#### **Shell A (default node):**

```bash
polykey vaults share Weather-Ops <nodeB_Id>
```

### 6. Access the Shared Vault from nodeB

#### **Shell B (nodeB):**

```bash
polykey vaults scan <default_nodeId>
polykey vaults clone Weather-Ops <default_nodeId>
```

These commands list and then clone the shared vault to nodeB's local storage.

### 7. Validate the Operation

Check that the vault is now available in nodeB:

#### **Shell B (nodeB):**

```bash
polykey vaults list
```

## Conclusion

This tutorial demonstrated how to set up and manage multiple local nodes using Polykey. You learned to initialize nodes, configure sessions, discover and trust other nodes, share vaults, and access shared resources. Such a setup is invaluable for developers managing separate environments for different projects or testing functionality without another user.

This approach not only streamlines the management of multiple nodes but also ensures that all operations are performed securely and efficiently within controlled environments.
