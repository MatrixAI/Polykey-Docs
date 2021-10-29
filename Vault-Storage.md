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