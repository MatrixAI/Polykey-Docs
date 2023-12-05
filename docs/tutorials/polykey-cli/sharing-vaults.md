# Sharing Vaults

This tutorial assumes that you are working in the `Polykey` project's directory, and you have successfully built it using `npm run build`.

### Setting Up Nodes
For two agents to communicate with each other we need two agents to be running. For this example we're going to run two `Polykey` nodes on the same machine and have them communicate over the loop-back device.

First we want to start the first node. Since we are going to run two nodes on the same machine, we need to keep them separate. For this we need to override the `node-path` to a directory we want the `Polykey` node to be created in. for this example we're going to use a temp directory `tmp`.  We're also going to set a static port value for the proxy.

Run the following command

```
node dist/bin/polykey agent start --node-path tmp/nodeA --proxy-port 55551
```

If this is the first time creating the node you should be prompted for the password twice. After that some information about the node should be printed.

```
✔ Enter new password … ********
✔ Confirm new password … ********
pid     476567
nodeId  "vfjqk9v06k6p1tnuc4444irt0krasjmi1btmmf7ptaqg477em9390"
clientHost      "127.0.0.1"
clientPort      50617
agentHost       "127.0.0.1"
agentPort       35629
proxyHost       "0.0.0.0"
proxyPort       55551
forwardHost     "127.0.0.1"
forwardPort     38331
recoveryCode    "drill video walnut message stone exhibit render snack comic maze deposit decline bless unit crater correct stool remain legend problem egg lecture approve normal"
```

Note the `NodeId` here as `vvrijg034ie10dnn05mv0b2lfo1g7nhv6kb63c03lh7qcc4eqo79g`. This will differ for your node.

Now create a 2nd node using the same method, this time with the `node-path` of `tmp/nodeB` and port `55552`. You should see the same password prompt and status read-out. For our example the 2nd node has a `NodeId` of `vd2nmd13qqj718ivke8n8si6cgdsd6ufgche84moofr2fhh9vj2jg`.

### Connecting and Trusting Nodes

Normally when a `Polykey` node is started, the first thing it does is automatically contact a seed node to join the network. In the absence of seed nodes to act as an entry point for a network. We can tell a node how to find other nodes directly.

First we need to tell `NodeA` how to contact `NodeB`. For this we need to know the `NodeId`, `host` and `port` of `NodeB`. If we read the status output of `NodeB` when we started it up, we can see the following information.

```
nodeId  "vvrijg034ie10dnn05mv0b2lfo1g7nhv6kb63c03lh7qcc4eqo79g"
...
proxyHost       "0.0.0.0"
proxyPort       55551
```

Using this we give `NodeA` `NodeB`'s information using the following command.

```
node dist/bin/polykey nodes add --node-path tmp/nodeA vd2nmd13qqj718ivke8n8si6cgdsd6ufgche84moofr2fhh9vj2jg 127.0.0.1 55552
```

This will add the `NodeB`'s connection information into `NodeA`'s node graph. Now whenever we refer to `NodeB` via it's `NodeId` of `vd2nmd13qqj718ivke8n8si6cgdsd6ufgche84moofr2fhh9vj2jg`, `NodeA` will know where to connect to. Note that this step is only needed because both nodes do not share a network. If they did share a network then they could query nodes within the network to find each other.

To verify if this information is correct and a connection can be made, we can ping `NodeB` using the following command.

```
node dist/bin/polykey nodes ping --node-path tmp/nodeA vd2nmd13qqj718ivke8n8si6cgdsd6ufgche84moofr2fhh9vj2jg
```

If a connection can be made then you should get `Node is Active.` as the response. Otherwise, you will get `No response received`.

When a connection is made between two nodes then they learn about each other. So when `NodeA` pinged `NodeB`, `NodeB` learned how to connect to `NodeA`. You can verify this by pinging `NodeA` from `NodeB`.

```
node dist/bin/polykey nodes ping --node-path tmp/nodeB vfjqk9v06k6p1tnuc4444irt0krasjmi1btmmf7ptaqg477em9390

Node is Active.
```

Now if `NodeA` wants to do anything more complex than pinging `NodeB`, we need to make `NodeB` trust `NodeA`. We can do this with the trust command. This will allow `NodeB` to receive notifications from `NodeA`, otherwise `NodeB` will just ignore them.

```
node dist/bin/polykey identities trust --node-path tmp/nodeB vfjqk9v06k6p1tnuc4444irt0krasjmi1btmmf7ptaqg477em9390
```

We should also have `NodeA` trust `NodeB`.

```
node dist/bin/polykey identities trust --node-path tmp/nodeB vd2nmd13qqj718ivke8n8si6cgdsd6ufgche84moofr2fhh9vj2jg
```

### Sharing Vaults

#### Creating a Vault
A core feature of `Polykey` is sharing secrets between nodes. This is done by sharing the vaults that contain the secrets. In order to do this we need a vault to share. Start by creating a vault on `NodeB`. We can do this with the `vaults create` command, doing so will return a unique `VaultId` to identify that vault.

```
node dist/bin/polykey vaults create --node-path tmp/nodeB someVault

Vault zRMeFutQmJErPNR5rAE1LmN created successfully
```

Vaults and generally be referenced by its name, here it's `someVault`. Or it's `VaultId`, here as `zRMeFutQmJErPNR5rAE1LmN`. An empty vault Is not very useful so let's add some data to it.


```
echo "this is a secret" > tmp/someSecret

node dist/bin/polykey secrets create --node-path tmp/nodeB tmp/someSecret someVault:someSecret
```

We should be able to see the secret in the vault now.

```
node dist/bin/polykey secrets list --node-path tmp/nodeB someVault

someSecret
```

#### Sharing a Vault

The next step is allowing `NodeA` to clone a vault from `NodeB`. This is done with the `vaults share` command. This will give `NodeA` permission to clone and pull this vault and send a notification to `NodeA`.

```
node dist/bin/polykey vaults share --node-path tmp/nodeB someVault vfjqk9v06k6p1tnuc4444irt0krasjmi1btmmf7ptaqg477em9390
```

`NodeA` should be able to clone the vault now. This is done with the `vaults clone` command.

```
node dist/bin/polykey vaults clone --node-path tmp/nodeA someVault vd2nmd13qqj718ivke8n8si6cgdsd6ufgche84moofr2fhh9vj2jg
```

If this completed with no errors, we should be able to see the vault in `NodeA` now.

```
node dist/bin/polykey vaults list --node-path tmp/nodeA

someVault:              zEsnWCGvgBqSuuu8r2SscSQ
```

We can access the secret as well.

```
node dist/bin/polykey secrets list --node-path tmp/nodeA someVault

someSecret

node dist/bin/polykey secrets get --node-path tmp/nodeA someVault:someSecret

this is a secret
```

#### Pulling Vault Changes

Vaults can be updated. If we wanted these changes then we can pull the vault. If a vault was cloned from another node then it keeps track of where it came from. So pulling a vault is pretty simple.

First we need to add a new secret to `NodeB`'s vault.

```
node dist/bin/polykey secrets create --node-path tmp/nodeB tmp/newSecret someVault:newSecret

node dist/bin/polykey secrets list --node-path tmp/nodeB someVault

newSecret
someSecret
```

Now we can tell `NodeA` to pull the changes from `NodeB` with `Vaults pull`.

```
node dist/bin/polykey vaults pull --node-path tmp/nodeA someVault
```

And see the changes

```
node dist/bin/polykey secrets list --node-path tmp/nodeA someVault

newSecret
someSecret

node dist/bin/polykey secrets get --node-path tmp/nodeA someVault:newSecret

This is a new secret
```
