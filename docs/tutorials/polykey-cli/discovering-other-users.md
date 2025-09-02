# Discovering Users' Nodes and Managing Access Permissions

In the Polykey network, discovering other users' nodes and managing access
permissions is crucial for secure and efficient collaboration. This guide will
walk you through the process of finding other users' nodes using their claimed
digital identities and setting permissions to manage how these nodes interact
with your secrets and vaults.

## Introduction to Node Discovery and Permission Management

Discovering nodes in Polykey involves locating other users within the network
who have linked their identities, such as GitHub usernames, to their nodes. Once
these nodes are discovered, you can manage access permissions to control how
these nodes interact with your shared resources.

This functionality enhances the security of your network by ensuring that only
trusted nodes can access sensitive information.

## Discovering Nodes

To begin discovering nodes associated with known identities, you can use the
`polykey identities discover` command. This command adds a node or identity to
your discovery, facilitating further interactions like sharing vaults or
secrets.

### Command Usage

```bash
polykey identities discover <gestaltId>
```

- `<gestaltId>`: This can be either a Node ID or a `Provider ID:Identity ID`
  combination that specifies the digital identity linked to the node you wish to
  discover.

#### Example

```bash
polykey identities discover github.com:maverick
```

:::note Note This command adds the node associated with the GitHub username
"maverick" to your discovery queue, allowing you to initiate interactions with
this user.

:::

## Troubleshooting Discovery and Connection Issues

When attempting to discover other users' nodes and manage permissions within
Polykey, there are specific requirements and common issues you may encounter.
Understanding and addressing these can ensure smoother operations within the
network.

### Requirements for Successful Discovery

1. **Active Polykey Agents:** Both users involved in the discovery must have
   their Polykey agents actively running. This ensures that both nodes are
   reachable and responsive within the network.

2. **Network Connection:** Both nodes need to be connected to the Polykey
   network. Currently, both users must be online simultaneously for the
   discovery process to succeed.

### Common Issues and Solutions

1. **Gestalt Creation:** Ensure that the user you are trying to discover has
   already created their gestalt. A gestalt is necessary for the identity to be
   discoverable in the network. Without it, the discovery process will fail.

2. **Symmetric NAT or Restrictive Networks:** Connection issues can arise if one
   or both users are behind symmetric NATs or other restrictive network setups.
   These environments can block the necessary network communications for
   successful node discovery.

   - **Solution:** Attempt the discovery process from a network with less
     restrictive settings, such as home Wi-Fi or a less secure public network,
     to see if the issue persists.

:::

### Future Enhancements

Polykey is actively working to enhance the discovery process by implementing
features that would allow one-sided connectivity. This means that in the future,
users may not need to be online simultaneously. One user could initiate a
discovery, akin to sending a friend request, and the other could respond at
their convenience, simplifying the process and reducing the dependency on
simultaneous network presence.

This section helps users understand the prerequisites for successful node
discovery and provides solutions to common issues that might impede the process.
By following these guidelines, users can more effectively manage their
interactions within the Polykey network. :::

## GestaltId and Permissions Explained

### GestaltId

The `gestaltId` is a unique identifier that directly links to a node or an
identity within the Polykey network. It can take the following forms:

- **Node ID:** Directly references a node within the Polykey network.

- **Provider ID:** Utilizes an identity provider (like GitHub) combined with a
  specific user identity (like a username).

#### Example Format

- Node ID: `v60g23b4b9g5tq2npc3kpikpalqqdpuvocegdd8bsdj28a1hsp0g0`
- Provider ID: `github.com:maverick`

### Permissions

Permissions in Polykey determine what actions a node or an identity can perform
within the network. Here’s a general list of potential permissions that can be
managed:

- **Scan:** Allows the node to scan for vaults
- **Notify:** Allows sending notifications about changes or updates.
- **Claim** Allows a different gstalt to claim the node

#### Example Command to Set Permissions

```bash
polykey identities allow github.com:maverick read write
```

## Managing Permissions

Once a node is discovered, you can manage permissions to control access to your
vaults and secrets. Polykey allows you to set or unset permissions for each
discovered node or identity.

### Setting Permissions

To grant specific permissions to a node, use the `polykey identities allow`
command:

```bash
polykey identities allow <gestaltId> <permissions>
```

- `<gestaltId>:` The Node ID or `Provider ID:Identity ID` of the node.
- `<permissions>:` The type of permission you want to allow, such as `read`,
  `write`, or `execute`.

#### Example

```bash
polykey identities allow github.com:maverick read
```

This command grants read permissions to the node associated with the GitHub user
"maverick."

### Revoking Permissions

If you need to revoke permissions from a node, you can use the
`polykey identities disallow` command:

```bash
polykey identities disallow github.com:maverick read
```

#### Example

```bash
polykey identities disallow github.com:maverick read
```

This command revokes read permissions from the node associated with "maverick."

## Additional Management Features

Polykey also supports inviting nodes to your network, listing all discovered
nodes and their permissions, and setting trust levels for more granular control.

### Inviting a Node

To invite another node to join your network and potentially share secrets:

```bash
polykey identities invite <nodeId>
```

### Listing Nodes and Permissions

To view all nodes and their permissions within your network:

```bash
polykey identities list
```

### Trusting and Untrusting Nodes

You can explicitly trust or untrust individual nodes or entire gestalts to
refine how notifications and access controls are handled:

```bash
polykey identities trust <gestaltId>
polykey identities untrust <gestaltId>
```

## Conclusion

Managing node interactions and user discovery in Polykey is vital for
maintaining a secure and efficient network. By carefully managing who can access
your nodes and how they can interact with your resources, you enhance the
overall security and functionality of your network.

This guide has provided the steps and commands necessary to effectively discover
nodes and manage permissions within Polykey.

This addition ensures users understand the significance and usage of `gestaltId`
and permissions within the context of discovering and managing nodes in Polykey,
providing clear and actionable information for efficient network management.
