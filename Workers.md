Crypto operations can be CPU intensive.

It makes sense to have workers domain that does all the parallelism required.

This means we use https://www.npmjs.com/package/threads to run a global worker pool for Polykey.

This pool is only started during `await pk.start();`.

Once this pool is started, this pool must be shared across all the domains that need to use the pool.

There should only be 1 pool for a single PK agent.

This also means for any libraries we use like `node-forge`, which has its own implementation of workers, they should not be used, instead anything should be propagated to using our PK workers.

For alot of crypto operations, the mainly intensive operation turns out to be prime number related functionality...