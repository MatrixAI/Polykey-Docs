# Bootstrapping

## Introduction

Bootstrapping is the process where the Polykey agent sets itself up as a new
Polykey node. This involves creating the encrypted-at-rest node state, and
connecting to the [mainnet](https://mainnet.polykey.com/) or a custom specified
network domain.

## Setting Up Your Node

### Creating the Root Key

When you first start the Polykey agent, it automatically generates a random root
key.

This root key is an asymmetric key pair consisting of a public key representing
your identity and used for verifying signatures, and a private key which is used
for signing.

Afterwards, encryption keys are derived from this root key, which is used for
encryption and decryption of all node state and secret data managed by Polykey.

You will be prompted to provide a root password. This password encrypts the root
key.

:::note Note

Remember to keep your password in a secure location as you will need it each
time you start the Polykey agent.

:::

:::important

Bootstrapping also returns a **recovery code**. This code is required to recover
a node with the same ID, so it is critical that you store it safely and
securely. If lost, node identity recovery will not be possible.

:::

### Starting the Polykey Agent

You can start the Polykey agent in the foreground of your terminal by running:

```bash
polykey agent start --verbose
```

Running the agent in the foreground allows you to monitor its output directly in
the terminal. Ensure this terminal session remains active to keep the agent
running. You can execute Polykey commands from any other terminal session while
this runs.

### Starting Polykey in the Background

Alternatively, in the demo video and other scenarios where you do not wish to
occupy your terminal, you can start the agent in the background:

```bash
polykey agent start --verbose --background
```

### Stopping the Polykey Agent

You can stop the Polykey agent by pressing **Control+C** in the terminal where
it's running in the foreground, or by running:

```bash
polykey agent stop
```

#### Troubleshooting

If the Polykey agent does not terminate properly, you can force quit the process
through the Activity Monitor on your machine. If you encounter this or any other
issue, please consider making a
[bug report](https://github.com/MatrixAI/Polykey-CLI/issues/new/choose) to help
improve Polykey. Please make sure to check for existing issues before creating a
new one.

## Check Agent Status

To check the status of your Polykey node, use the following command:

```bash
polykey agent status
```

This command provides detailed information about your node's current state,
including its connectivity and activity within the network.

### Example Output

```bash
sstatus           	LIVE
pid              	20004
nodeId           	vgijtpv0h8m1eajeir77g73muq88n5kj0413t6fjdqsv9kt8dq4pg
clientHost       	127.0.0.1
clientPort       	51980
agentHost        	::
agentPort        	58078
upTime           	120
startTime        	1742186927
connectionsActive	0
nodesTotal       	2
version          	1.21.4-1-1
sourceVersion    	1.21.4
stateVersion     	1
networkVersion   	1
```

## Check Network Status

When your agent has started, it should show as a node on the network. By default
the network is [mainnet](https://mainnet.polykey.com/). Check out the network
dashboard to see your placement on the world map.

## Monitoring Network Connections

To view the nodes currently connected to the network, including the seed nodes,
run:

```bash
polykey nodes connections
```

This will list all active connections, including details about each node.

### Example Output

```bash
host          	hostname	nodeIdEncoded                                        	port	timeout	usageCount
3.145.86.40   	N/A     	v6p14qcvvftnnscuavsehu37t22vfvnhse054pbkb3ehemmjsrdh0	1314	46873  	0
13.239.117.143	N/A     	vncm2mkk41vgp2fmplqiu1je7b2l3v6fhgltlqf5f3f85923ve0j0	1314	116186 	0
1.145.55.96   	N/A     	vg6gldhfdstju8frtbguav2p2svmev85dvpdb34gffmiagpgjf2pg	1200	102086 	0
```

## Checking Node Activity

To determine if a specific node is active, use the ping command:

```bash
polykey nodes ping <nodeID>
```

This will tell you whether the node is active within the network.

### Example Output

```bash
polykey nodes ping v6p14qcvvftnnscuavsehu37t22vfvnhse054pbkb3ehemmjsrdh0
Node is Active
```

## Conclusion

Bootstrapping your node is the first step to using Polykey effectively. It
prepares your node for managing and sharing secrets securely within the network.
By following these guidelines, you ensure that your node is well-configured,
secure, and ready for advanced operations in the Polykey ecosystem.

Stay tuned for upcoming sections where we will discuss managing multiple nodes,
assigning different file paths to each node, and other advanced configurations.
