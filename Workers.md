Crypto operations can be CPU intensive.

It makes sense to have workers domain that does all the parallelism required.

This means we use https://www.npmjs.com/package/threads to run a global worker pool for Polykey.

This pool is only started during `await pk.start();`.

Once this pool is started, this pool must be shared across all the domains that need to use the pool.

There should only be 1 pool for a single PK agent.

This also means for any libraries we use like `node-forge`, which has its own implementation of workers, they should not be used, instead anything should be propagated to using our PK workers.

For alot of crypto operations, the mainly intensive operation turns out to be prime number related functionality...

Should the worker pool be part of the async start and stop? Or should it be part of constructor injection?

Given that it has a lifetime, it seems it should be part of async start and stop.

This does mean it becomes part of setter injection, and each other domain that checks whether it has access to the pool or not in order to perform the functionality.

Using worker pools requires access to a "worker script". This worker script then exposes functions that you can run on the worker. We need to see how this would work in the case when electron uses webpack to bundle this up. We need to ensure the path lookup still works. So any "fs" paths should be careful here, just as how we had to deal with the bootstrap.polykey.io certificate paths.