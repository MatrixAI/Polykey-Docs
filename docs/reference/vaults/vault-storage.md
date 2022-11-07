# Vault Storage

A `Vault` is an encrypted filesystem, used to store and manage secrets.

Each `Vault` contains a shared, singleton reference to the EFS, and apply their reads and writes to a specific directory on the EFS (matching the vault's ID).

```
┌──────────────────────────────────────────────┐
│                                              │
│                 VaultManager                 │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │                  VaultMap                │ │
│ │           (VaultId -> VaultData)         │ │
│ └─────────────────────┬────────────────────┘ │
│                       │                      │
│        ┌──────────────┼──────────────┐       │
│        │              │              │       │
│ ┌──────▼─────┐ ┌──────▼─────┐ ┌──────▼─────┐ │
│ │ Vault Foo  │ │ Vault Bar  │ │ Vault Baz  │ │
│ │ /123sdf984 │ │ /34891zxf! │ │ /a!?@#8911 │ │
│ └──────┬─────┘ └──────┬─────┘ └──────┬─────┘ │
│        │              │              │       │
│        │              │              │       │
│  ┌─────▼──────────────▼──────────────▼─────┐ │
│  │               EncryptedFS               │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘

```

However, the root of the vaults filesystem is contained inside a contents folder specific for that vault, meaning that a vault cannot access file outside of its containing directory. The `git` metadata is stored inside the vault directory, but outside of the `contents` directory so as to not interfere with any secrets.

```
/vaults
  /aiwr84y3f83f
    /.git
    /contents
      secret-1
      secret-2
````
