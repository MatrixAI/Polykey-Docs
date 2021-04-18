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

Because the worker script has to be a relative path to a file on disk in the built distribution. When using `js-polykey` with webpack, you have to be careful to process the worker script paths.

See: https://threads.js.org/getting-started#build-with-webpack

This is especially relevant to Polykey GUI which uses webpack and electron., and later with Polykey Mobile/NativeScript. Note that Polykey Browser Extension would not be bundling js-polykey at all, as it is expected to not run polykey agent inside the browser.

---

How to use the worker manager:

```ts
const workers = new WorkerManager;
await workers.start();

const r1 = await workers.call((w) => {
  const r = w.add(1, 2);
  console.log('INTERNAL RESULT 1', r);
  return r;
});

console.log('EXTERNAL RESULT 1', r1);

const r2 = await workers.call(async (w) => {
  const r = await w.add(1, 2);
  console.log('INTERNAL RESULT 2', r);
  return r;
});

console.log('EXTERNAL RESULT 2', r2);

await workers.stop();
```

Doing the above gives:

```
INFO:WorkerManager:Started worker pool with 8 workers
INTERNAL RESULT 1 ObservablePromise {
  _subscriber: [Function (anonymous)],
  initHasRun: false,
  fulfillmentCallbacks: [],
  rejectionCallbacks: [],
  firstValueSet: false,
  state: 'pending'
}
EXTERNAL RESULT 1 3
INTERNAL RESULT 2 3
EXTERNAL RESULT 2 3
```

See that it's possible to await the call internally, if you do, you get the unwrapped value. But if you don't it's fine, since externally you get the unwrapped value.

It does not matter if the worker function itself is async or not. The situation is the same.

The latter pattern is preferred, it does ensure that it makes more sense.

---

All parallel functions must be encoded statically in `src/workers/PolykeyWorker.ts`.

It is not possible to send class instances nor functions/callbacks to the worker functions.

This means for anything we want to parallelise, they must be static functions which can be imported in `src/workers/PolykeyWorker.ts`.

So for example, the `src/keys/KeyManager.ts` has a class methods. These methods may need to call the functions that may run in the worker. If this is the case, the underlying implementation of certain functions must be written statically and not as methods in the class. The methods of the class would be relying on class state.

So instead a common shared set of functions may then need to be put into the `keys` domain that can be imported by both `src/workers/PolykeyWorker.ts` and `src/keys/KeyManager.ts`, and the `KeyManager` instance can then test whether workers exist and deciding to dispatch either way.

We may put this in `src/keys/utils.ts`...

---

Also note that all inputs and outputs to the worker functions must be POJOs. They cannot be rich objects like class instances or functions. Becareful as some things that look like plain data are not. Like the `pki.rsa.KeyPair`.