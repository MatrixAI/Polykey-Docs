## Variables

Don't use `_var` to indicate a new `var`. This by convention used for private variables. Instead use `var_` to indicate a new variant of the same variable. In Haskell we use `var'` to be similar to mathematical convention "var-prime".

## Naming Conventions

### Classes

#### Class Extension

Prefer appending the extended class name to the parent class name.

```ts
class Connection {

}

class ConnectionForward extends Connection {

}

class ConnectionReverse extends Connection {

}
```

### Encapsulated Variance

You can prepend a name to indicate different variations of the same behaviour:

```ts
class ForwardProxy {

}

class ReverseProxy {

}
```