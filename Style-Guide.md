## Variables

Don't use `_var` to indicate a new `var`. This by convention used for private variables. Instead use `var_` to indicate a new variant of the same variable. In Haskell we use `var'` to be similar to mathematical convention "var-prime".

# TypeScript

# Imports in Domains

```
     ┌──────────────────┐
     │                  │
     │                  │
Errors────►Types ──┐    │
  │         │      │    │
  │         │      │    │
  ▼         │      │    │
Utils ◄─────┘      │    │
  │                ▼    │
  └─────────► Classes ◄─┘
```