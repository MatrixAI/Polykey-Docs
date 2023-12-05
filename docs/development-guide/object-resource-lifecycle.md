# Object Resource Lifecycle

The domains follow a pattern of asynchronous start and stop methods.

The start and stop methods must be directly symmetrical.

This means the order of actions in start must be mirrored exactly opposite in the stop method.

```
async start() {
  await x.start();
  await y.start();
}

async stop () {
  await y.stop();
  await x.stop();
}
```

This pattern ensures that things are stopped in the exact order they need to be.

And also ensures that the lifetimes are nested. So if X started first, then Y started second. Then Y stops first, and X stops second.

A nested lifetime structure is cleaner and easier to debug.
