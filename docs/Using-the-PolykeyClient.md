# Using the PolykeyClient
TBD this page can cover the setup and use of the `PolykeyClient` to send messages to the `PolykeyAgent`.

### Notes
PolykeyClient makes use of GRPC to communicate with the PolykeyAgent.
When constructing a message sometimes you may need to include metadata. It is important that you import `MetaData` class through `Polykey` instead of directly from `@grpc/grpc-js`. This can be done with `import { Metadata } from '@matrixai/polykey/dist/client';`. Doing this removes the need for `@grpc/grpc-js` to be a dependency in the project and any resulting dependency conflicts that can result from this.