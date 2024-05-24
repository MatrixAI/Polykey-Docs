# Bootstrap Keypair

## Introduction

Bootstrapping is the initial process where a new Polykey node is set up and connected to the network. This involves initializing your node's configuration, setting up a secure password, and connecting to the network securely.

## Setting Up Your Node

### Creating a Password

When you first start Polykey, you will be prompted to create a password. This password secures your local encryption keys and other sensitive data managed by Polykey.

:::note
Remember to keep your password in a secure location as you will need it each time you start the Polykey agent.
:::

### Starting the Polykey Agent

You can start the Polykey agent in the foreground of your terminal by running:

```bash
polykey agent start
```

Running the agent in the foreground allows you to monitor its output directly in the terminal. Ensure this terminal session remains active to keep the agent running. You can execute Polykey commands from any other terminal session while this runs.

### Starting Polykey in the Background

Alternatively, in the demo video and other scenarios where you do not wish to occupy your terminal, you can start the agent in the background:

```bash
polykey agent start --background
```

### Stopping the Polykey Agent

You can stop the Polykey agent by pressing **Control+C** in the terminal where it's running in the foreground, or by running:

```bash
polykey agent stop
```

#### Troubleshooting

If the Polykey agent does not terminate properly, you can force quit the process through the Activity Monitor on your machine. If you encounter this or any other issue, please consider making a [bug report](https://github.com/MatrixAI/Polykey-CLI/issues/new/choose) to help improve Polykey.

## Verifying Network Status

To check the status of your Polykey node, use the following command:

```bash
polykey agent status
```

This command provides detailed information about your node's current state, including its connectivity and activity within the network.

### Example Output

```bash
status           	LIVE
pid              	96992
nodeId           	vgijtpv0h8m1eajeir77g73muq88n5kj0413t6fjdqsv9kt8dq4pg
clientHost       	::1
clientPort       	54975
agentHost        	::
agentPort        	60358
upTime           	8
startTime        	1716509093
connectionsActive	3
nodesTotal       	11
version          	1.2.3-alpha.4-1-1
sourceVersion    	1.2.3-alpha.4
stateVersion     	1
networkVersion   	1

```

## Monitoring Network Connections

To view the nodes currently connected to the network, including the seed nodes, run:

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

Bootstrapping your node is the first step to using Polykey effectively. It prepares your node for managing and sharing secrets securely within the network. By following these guidelines, you ensure that your node is well-configured, secure, and ready for advanced operations in the Polykey ecosystem.

Stay tuned for upcoming sections where we will discuss managing multiple nodes, assigning different file paths to each node, and other advanced configurations.
