# Installation

## Polykey Core

The Polykey core contains the service, domain business logic and persistence
layers of Polykey.

It is written in TypeScript and C++.

The codebase is intended to be cross-platform, however it is currently only
tested on Linux.

As a contributor, this would be your entrypoint to Polykey.

:::caution

At this point in time, the Polykey core library also contains all of the CLI
code. This means in order to use Polykey, you must use the Polykey core library.
We intend to extract out the CLI code, and move it into
[Polykey CLI](https://github.com/MatrixAI/Polykey-CLI). Once this is done, users
will not directly interact with the
[Polykey Core](https://github.com/MatrixAI/Polykey). Instead the core will just
be a dependency of the other projects.

:::

### Requirements

- 64-bit Linux Operating System
- Node v16.15 or above and Node Package Manager
- Optionally `nix-shell` to setup development environment

### Source Repository

The official source repository is on GitHub. There is an additional mirror on
GitLab.

```shell
git clone https://github.com/MatrixAI/Polykey.git
```

Use `npm install` to setup the project.

:::tip

If you have `nix-shell` available, enter into `nix-shell` and it will
automatically setup the develoment environment.

:::

### Node Package Manager

The core library is published as
[`npm` package](https://www.npmjs.com/package/polykey).

#### Global Package

Install it with:

```shell
npm install --location=global polykey
```

This will install the Polykey core library into `$(npm config get prefix)`.

There will be 2 executables made available inside
`$(npm bin --location=global)`.

For example on Ubuntu:

```shell-session
$ tree "$(npm bin --location=global)"
/usr/local/bin/
├── pk -> ../lib/node_modules/polykey/dist/bin/polykey.js
└── polykey -> ../lib/node_modules/polykey/dist/bin/polykey.js
```

If the `npm` bin path is added to the `$PATH` environment variable, then you
will be able to execute `pk` or `polykey`.

#### Local Package

Local installation is intended for downstream projects, where Polykey is
embedded as a JavaScript library.

```shell
npm install polykey
```

Use the `npx polykey` or `npx pk` execute the local executables that are placed
in:

```shell-session
$ tree ./node_modules/.bin
./node_modules/.bin/
├── pk -> ../polykey/dist/bin/polykey.js
└── polykey -> ../polykey/dist/bin/polykey.js
```

### Bundled Executables

The core library is also released as a bundled executable. This is intended for
users who do not have Node.js installed.

Go to https://github.com/MatrixAI/Polykey/releases and download the relevant
asset.

We currently bundle for these platforms:

- linux-x64 - this should work for any Linux distribution that follows the
  Filesystem Hierarchy Standard.
- win-x64
- macos-x64
- macos-arm64

:::caution

Not all platfoms are supported currently. We have only tested on linux-x64.
