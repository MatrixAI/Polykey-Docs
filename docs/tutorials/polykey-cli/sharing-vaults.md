# Sharing Vaults With Secrets

In Polykey, sharing vaults containing secrets is essential for collaborative environments. This guide will walk you through the process of securely sharing your vaults and enabling other users to access and synchronize secrets between trusted nodes.

## Prerequisites for Sharing Vaults

Before sharing a vault, ensure that both nodes have established trust and appropriate permissions are set. For details on setting trust and access permissions, refer to the "Discovering Users' Nodes and Managing Access Permissions" section.

### Common Debugging Techniques for Sharing Secrets

To share secrets between two nodes on different machines, both must be actively connected to the Polykey network. Here are some techniques to ensure connectivity and troubleshoot common issues:

- **Node Ping:** Use `polykey nodes ping <nodeID>` to check if the intended recipient's node is active and reachable.

- **Node Connections:** The `polykey nodes connections` command lists all nodes currently connected to the network. Ensure your node appears on this list.

- **Restarting Polykey Agent:** If connectivity issues persist, try restarting the Polykey agent. Persistent errors might indicate restrictive network settings blocking communication.

- **Network Alternatives:** If connectivity issues are due to restrictive networks, try connecting from a different network environment.

- **Multiple Nodes:** To test sharing functionality without another user, set up multiple nodes on your system. Refer to the managing multiple nodes section for guidance.

## Sharing the Vault

Share a vault with another node using the `polykey vaults share` command:

```bash
polykey vaults share <vaultName> <nodeId>
```

- `<vaultName>`: The name of the vault you wish to share.
- `<nodeId>`: The Node ID of the node you are sharing the vault with.

:::tip

Remember, you can run the following commands to reference the argument names to pass into your command:

- `polykey vaults list`
- `polykey identities list`

:::

### Example

```bash
polykey vaults share my-software-project v4c11qv5fpq2fm3ropmma2sglfc9349jspqb1iutl3f7en1ckv500
```

This command shares the "my-software-project" vault with the specified node.

## Receiving a Shared Vault

### Scanning for Available Vaults

Once a vault is shared, the recipient should scan for available vaults:

```bash
polykey vaults scan <nodeId>
```

- `<nodeId>`: The Node ID of the node that shared the vault with you.

#### Example

```bash
polykey vaults scan v4c11qv5fpq2fm3ropmma2sglfc9349jspqb1iutl3f7en1ckv500
```

This command lists the vaults shared by the specified node.

## Cloning the Shared Vault

After identifying the shared vaults, the recipient can clone the desired vault to their own local node:

```bash
polykey vaults clone <vaultName> <nodeId>
```

- `<vaultName>`: The name of the vault to be cloned.
- `<nodeId>`: The Node ID from which to clone the vault.

### Example

```bash
polykey vaults clone myvault v4c11qv5fpq2fm3ropmma2sglfc9349jspqb1iutl3f7en1ckv500
```

This command clones "myvault" from the specified node to the local system.

## Synchronizing Changes

If updates are made to the original vault, such as key rotations or new secrets added, the receiving node can synchronize these changes by pulling the latest version of the vault:

```bash
polykey vaults pull <vaultNameOrId> <targetNodeId>
```

- `<vaultNameOrId>`: The name or ID of the vault to update.
- `<targetNodeId>`: (Optional) The node ID from which to pull updates.

### Example

```bash
polykey vaults pull myvault v4c11qv5fpq2fm3ropmma2sglfc9349jspqb1iutl3f7en1ckv500
```

This command updates "myvault" with the latest changes from the specified node.

## Conclussion

Sharing and synchronizing vaults in Polykey enhances collaboration and security across the network. By following these guidelines, users can effectively manage sensitive data, ensuring all parties involved have secure and up-to-date access to shared resources.
