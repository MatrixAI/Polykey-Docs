# Managing Multiple Local Nodes

Managing multiple local

nodes in Polykey can serve various purposes. For example, you might maintain one node for personal projects and another for professional work. This segregation ensures that the vaults and their respective contents remain distinct based on their usage context.

This approach is particularly advantageous for demonstrations or training
purposes, as it allows you to simulate sharing vaults between two nodes on the
network without requiring another live user. It also enables a robust
environment for testing node interactions and features in a controlled manner.

Each node in Polykey operates with its own dedicated agent, and nodes are stored
locally with specified node paths. When you first initialize Polykey, a default
node and its path are created. This default node path can be viewed by running
specific Polykey commands, which we will cover. To manage multiple nodes
effectively, each node you create will have its designated node path that
directs all operations specifically to that node's environment.

## Understanding Node Paths

The default node, which you bootstrap when you first install Polykey, resides at
a standard location on your file system. This location can be found using:

```bash
polykey nodes --help
```

For any additional nodes, such as nodeB, you will specify a new node path during
their creation. This is critical because each node operates independently,
requiring its unique path for all interactions:

```bash
polykey agent start --node-path ./nodeB --background
```

This command initializes a Polykey agent using the nodePath flag to specify the
node we are starting an agent for. If unsure of the syntax to use for command
operations, adding the --help at the end of each subcommand provides useful
context.

:::note Note

 If a node has not been created before, initializing the Polykey agent
for it will also initiate the bootstrap process. 

:::

When working with multiple nodes, specifying the node path in each command can
become cumbersome. To streamline this process in your terminal shell session,
you can set an environment variable for the node path, which we will demonstrate
later.

## Steps to Manage Multiple Nodes Locally

### 1. Initialize Your Nodes

Open two terminal sessions (Shell A for your default node and Shell B for your
new node that we will save a new path called nodeB). If you have not already
started the Polykey agent for your default node, you can start it as follows:

**Shell A (default node):**

```bash
polykey agent start --background
```

This initializes your default node in the background. The command does not
specify a node path, so it automatically targets the default node path.

**Shell B (for your new node, nodeB):**

```bash
polykey agent start --node-path ./nodeB --background
```

This command starts a new Polykey agent for nodeB in the background. The first
time you run this, it will prompt you to set a password, just like bootstrapping
any new node. Remember, each node operates with its dedicated agent, ensuring
that their operations are isolated from each other.

### 2. Configure Node Environment

To avoid having to specify the node path for every command in a session:

#### **Export the environment variable in Shell B:**

```bash
export PK_NODE_PATH='./nodeB'
```

This sets the environment for nodeB in Shell B, allowing you to execute Polykey
commands specific to nodeB without constantly adding the node-path flag.

### 3. Verify Node Status

In both shell sessions, check that each node is active:

```bash
polykey agent status
```

This command confirms the node's status and provides the nodeId, which is
crucial for the next steps.

### 4. Node Discovery and Trust Establishment

Before sharing any vaults, both nodes need to discover each other and establish
trust. Use the `nodeId` obtained from the status output:

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

This tutorial demonstrated how to set up and manage multiple local nodes using
Polykey. You learned to initialize nodes, configure sessions, discover and trust
other nodes, share vaults, and access shared resources. Such a setup is
invaluable for developers managing separate environments for different projects
or testing functionality without another user.

This approach not only streamlines the management of multiple nodes but also
ensures that all operations are performed securely and efficiently within
controlled environments.
