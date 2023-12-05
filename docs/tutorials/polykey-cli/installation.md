# Installation

Installing the CLI can be done in different ways depending on your operating environment.

:::warning

Polykey-CLI has only been tested on Linux. We are working on supporting other platforms. There's minor teething problems when it comes supporting other platforms. Help us by reporting issues.

:::

## Linux

Polykey-CLI code is compiled, bundled and wrapped into a single file executable. You just have to download the executable, give it executable permissions and run it. The executable is not statically linked. It requires a subset of the system libraries that Node.js requires.

* `libdl.so.2`
* `libstdc++.so.6`
* `libm.so.6`
* `libgcc_s.so.1`
* `libpthread.so.0`
* `libc.so.6`

### Manually

Builds for Linux is released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-linux-x64`, and rename it to `polykey`.

Make it executable:

```sh
chmod u+x ./polykey
```

Add it to your `$PATH`.

You can now run it with `polykey`.

In your terminal you can also alias `alias pk='polykey'` for more convenient commands.

### NixOS

We have not yet published a Nixpkgs expression for Polykey. When we do, you will be able to just install `polykey-cli` from Nixpkgs.

However it is easy enough to install it from source.

Clone the repository:

```sh
git clone https://github.com/MatrixAI/Polykey-CLI.git
```

Enter the `nix-shell`:

```sh
nix-shell
```

Build the application and install it into the user profile:

```sh
nix-env -f ./release.nix --install --attr application --argstr npmDepsHash "$(prefetch-npm-deps ./package-lock.json)"
```

### Other

We will be working on other distribution methods.

## MacOS

Polykey-CLI code is compiled, bundled and wrapped into a single file executable. However modern MacOS has made it significantly difficult to run arbitrary executables on their operating system. Additionally MacOS can be in both Intel or ARM64 CPU architectures. As of now, Polykey distributes Mach-O executables for both architectures. However the user will need to allow the executable to run on their system.

The following links may help:

* https://openecoacoustics.org/resources/help-centre/software/unsigned/
* https://github.molgen.mpg.de/pages/bs/macOSnotes/mac/mac_procs_unsigned.html
* https://github.com/MatrixAI/TypeScript-Demo-Lib/pull/38#issuecomment-1131228064

We have plans to distribute automatically signed binaries in the future which will make it easier to just download and run. However CLI programs will never distributed through the Mac App store. Mac users may prefer Polykey-Desktop which will be distributed through the Mac App Store.

Builds for MacOS is released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-macos-x64`, and rename it to `polykey`.

You can now run it with `polykey`.

In your terminal you can also alias `alias pk='polykey'` for more convenient commands.

## Windows

Polykey-CLI code is compiled, bundled and wrapped into a single file executable.

Builds for Linux is released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-linux-x64`, and rename it to `polykey`.

You can now run it with `polykey`.

In your terminal you can also alias `alias pk='polykey'` for more convenient commands.

## Docker

The Docker image can be used so that Polykey can be deployed into the cloud. It is also possible to use the CLI via the docker container, but it isn't as convenient. The intention is to run the Polykey agent in the cloud.

Docker images is released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the image named `...-docker-image-polykey-cli-V.V.V.tar.gz` and rename it to `docker-image-polykey-cli.tar.gz`.

Load it into Docker:

```sh
loaded="$(docker load --input "$(nix-build ./release.nix --attr docker --argstr npmDepsHash "$(prefetch-npm-deps ./package-lock.json)")")"
image="$(cut -d' ' -f3 <<< "$loaded")"
docker run -it "$image"
```

## Node Package Manager

The CLI is published as [`npm` package](https://www.npmjs.com/package/polykey-cli).

Install it with:

```sh
npm install -g polykey-cli
```

This will install the Polykey-CLI into `$(npm config get prefix)`.

If the `npm` bin path is added to the `$PATH` environment variable, then you will be able to execute `pk` or `polykey`.

## Source

The official source repository is on GitHub. There is an additional mirror on GitLab.

```shell
git clone https://github.com/MatrixAI/Polykey-CLI.git
```

Use `npm install` to setup the project.

:::tip

If you have `nix-shell` available, enter into `nix-shell` and it will automatically setup the development environment.

:::
