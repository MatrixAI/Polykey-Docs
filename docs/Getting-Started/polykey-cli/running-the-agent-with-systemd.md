# Polykey Agent: Service and Programs Module Documentation

This guide introduces and explains the newly added `services` and `programs`
modules for managing the Polykey Agent using `systemd`. These modules were
introduced as part of a broader effort to improve automation, reliability, and
user experience across both user-level and system-wide contexts.

---

## Background

The Polykey Agent is a long-lived background process that facilitates secure
secret management and distributed key infrastructure. Traditionally, users had
to manually start the agent from the terminal. To streamline this, two modules
were introduced:

- `programs`: Configures **user-level services** for personal development and
  desktop use.
- `services`: Configures **system-level services** for shared machines and
  server environments.

These modules utilize `systemd`, a service manager used in most Linux
distributions.

---

## What is `systemd`?

`systemd` is the default init and service manager in most Linux distros. It
allows you to:

- Start, stop, and restart background services.
- Automatically launch services at boot or login.
- View logs and monitor service health.

`systemd` uses unit files (like `.service`) to define how services behave.

---

## Key Concepts

### User vs System Services

| Mode       | Controlled By | Suitable For                    | Config Path               |
| ---------- | ------------- | ------------------------------- | ------------------------- |
| **User**   | Regular user  | Local development, personal use | `~/.config/systemd/user/` |
| **System** | Root/admin    | Shared systems, production use  | `/etc/systemd/system/`    |

The new modules are designed to target both these contexts.

---

## Programs Module (User Services)

The `programs` module sets up a user-level `systemd` service that:

- Starts the agent on login.
- Runs the agent under the current user.
- Stores logs in the user's journal.

### Setup Instructions (User Mode)

1. Ensure the Polykey binary is installed and accessible via `$PATH`.
2. Copy the service file to:

   ```sh
   mkdir -p ~/.config/systemd/user
   cp polykey-agent.service ~/.config/systemd/user/
   ```

3. Enable and start the service:

   ```sh
   systemctl --user daemon-reload
   systemctl --user enable polykey-agent
   systemctl --user start polykey-agent
   ```

4. Verify it's running:

   ```sh
   systemctl --user status polykey-agent
   journalctl --user -u polykey-agent
   ```

---

## Services Module (System Services)

The `services` module sets up a root-owned service that:

- Runs globally for all users.
- Is launched at boot.
- Is managed from `/etc/systemd/system/`.

### Setup Instructions (System Mode)

1. Copy the service file to:

   ```sh
   sudo cp polykey-agent.service /etc/systemd/system/
   ```

2. Enable and start the service:

   ```sh
   sudo systemctl daemon-reload
   sudo systemctl enable polykey-agent
   sudo systemctl start polykey-agent
   ```

3. Check status:

   ```sh
   sudo systemctl status polykey-agent
   sudo journalctl -u polykey-agent
   ```

---

## Configuration Details

The service files can be customized:

- `ExecStart` can point to any valid Polykey binary.
- `Environment` variables like `NODE_ENV`, `POLYKEY_DATA_PATH` can be passed in.
- Restart policies and timeouts can be modified.

To override a system service without editing the base file:

```sh
sudo systemctl edit polykey-agent
```

---

## Handling Secrets & Recovery Codes

The new modules support secure handling of recovery codes and agent secrets:

- Set environment variables or use configuration files in the home directory.
- Avoid running agents as root unless necessary.
- For system mode, ensure secrets are stored in restricted root-only paths.

---

## Troubleshooting

- **"Service not found"**:

  - Run `daemon-reload` after copying or editing unit files.

- **"Permission denied"**:

  - Ensure system-level services are started with `sudo`.

- **Service not starting**:

  - Run `journalctl -u polykey-agent` for logs.

- **User services not auto-starting**:

  - Check that `linger` is enabled for the user:

    ```sh
    sudo loginctl enable-linger $USER
    ```

---

## Use Cases

- **Developers**: Enable `programs` to automatically start the agent at login.
- **Sysadmins**: Deploy `services` module for always-on availability of the
  agent across all users.
- **Security-sensitive installations**: Customize environment securely and
  inspect logs via `journalctl`.

---

## Next Steps

- Finalize documentation with visual diagrams (systemd flow, unit layering).
- Incorporate examples of overriding default behavior.
- Validate this guide on different distros (e.g. Ubuntu, Fedora, Arch).

---

## Related References

- [systemd documentation](https://www.freedesktop.org/wiki/Software/systemd/)
- [Polykey PR #138](https://github.com/MatrixAI/Polykey-CLI/pull/138)
- [CLI Installation Guide](./installation.md)
