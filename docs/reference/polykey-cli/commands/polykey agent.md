# `polykey agent`

## `start`

Starts the Polykey Agent:

Usage:

```sh
polykey agent start --background
✔ Enter new password … ******
✔ Confirm new password … ******
pid    1585746
nodeId    "v60g23b4b9g5tq2npc3kpikpalqqdpuvocegdd8bsdj28a1hsp0g0"
clientHost    "::1"
clientPort    35809
agentHost    "::"
agentPort    38197
recoveryCode    "dynamic two gadget nature diet grass priority library reveal idle guess creek impact nasty impulse accuse surface walk history admit legend various joy mail"
```

## `stop`

Stops the active Polykey Client:

Usage:

```sh
polykey agent stop
```

## `unlock`

Requests a new token and starts a new session.

Usage;

```sh
polykey agent unlock
```

## `lock`

Locks the Polykey client and clears the current session token.

Usage:

```sh
polykey agent lock
```

## `lockall`

Locks all Polykey clients and clear the current session token.

Usage:

```sh
polykey agent lockall
```
