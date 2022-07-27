# Overview
The CLI for Polykey is the first real `consumer` of `Polykey`'s `gRPC` functionality. It uses the `PolykeyClient` class which wraps a `gRPC client` along with a few other things.

When the `PolykeyClient` starts, it attempts to connect to a running `PolykeyAgent`'s gRPC server. If a connection cannot be established, the user is informed of it.

When the user calls a CLI command, e.g.
```bash
>$ pk vaults ls
```

A few things happen.
1. A `PolykeyClient` object gets created and is started, (attemping to connect to the `PolykeyAgent`)
2. PolykeyClient sends a `gRPC` request to the `PolykeyAgent` which responds with the appropriate information, or performs the appropriate action
3. Any relevant information is displayed to the user
4. The `PolykeyClient` gets closed.

# Configuration from lockfile

There exists a file in the filesystem, in the [polykey path](https://github.com/MatrixAI/Polykey/wiki#polykey-directory) that contains information about a `PolykeyAgent` if it is running.
It will be guaranteed to contain the following:
* `PID`: Process ID
* `GRPCHOST`: The host address of the grpc server that is running
* `GRPCPORT`: The port of the grpc server that is running

This file gets deleted when the PolykeyAgent is stopped.

The CLI will read from this file when it creates the `PolykeyClient` and use it to determine whether or not a `PolykeyAgent` is running, and how to connect to it. 