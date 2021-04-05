# Overview
The CLI for js-polykey is the first real `consumer` of `js-polykey`'s `gRPC` functionality. It uses the `PolykeyClient` class which wraps a `gRPC client` along with a few other things.

When the `PolykeyClient` starts, it attempts to connect to a running `PolykeyAgent`'s gRPC server. If a connection cannot be extablished, the user is informed of it.

When the user calls a CLI command, e.g.
```bash
>$ pk vaults ls
```

A few things happen.
1. A `PolykeyClient` object gets created and is started, (attemping to connect to the `PolykeyAgent`)
2. PolykeyClient sends a `gRPC` request to the `PolykeyAgent` which responds with the appropriate information, or performs the appopriate a ction
3. Any relevant information is displayed to the user
4. The `PolykeyClient` gets closed.
