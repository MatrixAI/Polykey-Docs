# Installation

Installing the CLI can be done in different ways depending on your operating environment.

:::warning

Polykey-CLI has only been tested on Linux and macOS. We are working on supporting other platforms. There's minor teething problems when it comes supporting other platforms. Help us by reporting issues.

:::

## Linux

Polykey-CLI code is compiled, bundled and wrapped into a single file executable. You just have to download the executable, give it executable permissions and run it. The executable is not statically linked. It requires a subset of the system libraries that Node.js requires.

- `libdl.so.2`
- `libstdc++.so.6`
- `libm.so.6`
- `libgcc_s.so.1`
- `libpthread.so.0`
- `libc.so.6`

### Manually

Builds for Linux is released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-linux-x64`, and rename it to `polykey`.

Make it executable:

```sh
chmod u+x ./polykey
```

### Add it to your `$PATH`.

#### For ZSH:

1. `cd` into directory where polykey exec is stored.
2. Edit the zsh config to add polykey to your path, to streamline the process, run the following command making sure to change the path to polykey if the polykey executable is not in the downloads folder.
3. For most users, this would be `~/downloads` on Debian based systems.

:::warning

Make sure your path to the polykey executable is correct.

:::

```SH
echo 'export PATH=~/downloads/polykey:$PATH' >> ~/.zshrc && source ~/.zshrc
```

You can now run it with `polykey`.

---

#### For Bash:

1. If you're using Bash, run the following command to add polykey to your path. Ensure to change the path if the executable is not in the downloads folder. For most users, this would be `~/downloads` on Debian-based systems.

:::warning

Make sure your path to the polykey executable is correct.

:::

```sh
echo 'export PATH=~/downloads/polykey:$PATH' >> ~/.bashrc && source ~/.bashrc
```

You can now run it with `polykey`.

---

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

:::info

ARM-64 builds don't work on MacOS as of **20-12-23.**
However, building polykey yourself on MacOS resolves in a working binary.

:::

Builds for MacOS are released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-darwin-x64`, and rename it to `polykey`.

:::tip

Make sure to cd into the right directory first.

:::

Make it executable:

```sh
chmod +x polykey
```

MacOS requires additional steps for the binary to be allowed to execute,
this is due to the fact that as of 20-12-23, the binaries we release are unsigned,
and MacOS permits running of unsigned binaries, however, to progress past this, follow these steps:

1. MacOS will prompt you with the following:

![install1](../../../images/mac-install1.png)

2. Head over to `Settings -> Privacy & Security` and scroll down till you see '"polykey" was blocked from use because it is not from an identified developer.'

![install2](../../../images/mac-install2.png)

3. Click on `Allow Anyway` and authenticate.

4. Try opening polykey with

```shell
sudo ./polykey
```

5. Following this, you will get another similar prompt

![install3](../../../images/mac-install3.png)

#### Click on Open and now Polykey-CLI should be running in your terminal window.

### Add it to your `$PATH`.

#### For ZSH:

1. `cd` into the directory where the "polykey" executable is stored.
2. Edit the Zsh config to add "polykey" to your path. To streamline the process, run the following command, making sure to change the path to "polykey" if the executable is not in the downloads folder. For most users, this would be `~/downloads` on Debian-based systems.

:::tip

Make sure your path to the "polykey" executable is correct.

:::

```sh
echo 'export PATH=~/downloads:$PATH' >> ~/.zshrc && source ~/.zshrc
```

You can now run it with `polykey`.

---

#### For Bash:

1. `cd` into the directory where the "polykey" executable is stored.
2. Edit the Bash config to add "polykey" to your path. To streamline the process, run the following command, making sure to change the path to "polykey" if the executable is not in the downloads folder. For most users, this would be `~/downloads` on Debian-based systems.

:::tip

Make sure your path to the "polykey" executable is correct.

:::

```sh
echo 'export PATH=~/downloads:$PATH' >> ~/.bashrc && source ~/.bashrc
```

You can now run it with `polykey`.

---

## Windows

:::danger

Polykey doesn't work on Windows at all as of **20-12-23**, regardless of binaries or building it yourself.

:::

Builds for Windows are released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-win32-x64`, and rename it to `polykey.exe`.

#### Add to PATH

1. Run the following when you are in the same directory as `polykey.exe`.

```shell
setx PATH "%PATH%;%CD%" /M
```

:::tip

Make sure you're in the correct directory where "polykey.exe" is placed.

:::

2. Now you can run polykey system-wide by using `polykey`.

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

### Docker for Mac

:::tip

You can install nix for MacOS and then follow the general docker instructions above.
Nix for mac can be installed by running

```sh
sh <(curl -L https://nixos.org/nix/install)
```

:::

1. Download the latest build of Polykey-CLI for docker from https://polykey.com/download.

2. Download Docker for MacOS depending on your instruction-set (arm vs x86) from https://docs.docker.com/desktop/install/mac-install/

3. Rename the Polykey dist from `x-docker-image-polykey-cli-x.x.x-alpha.x.tar.gz` to `docker-polykey.tar.gz`

4. Load the image in docker using the following:

```shell
docker load --input docker-polykey.tar.gz
```

5. Go to your docker application and configure the Polykey image

![img.png](../../../images/docker-mac-img1.png)

6. Run `mkdir /tmp/polykey` to create a directory for the polykey nodepath

7. Set the volume host path to `/tmp/polykey` and the container path to `/tmp/polykey/`

8. Run `docker images` to grab the Image ID of your installed image.

```shell
> docker images
REPOSITORY                  TAG                                IMAGE ID       CREATED       SIZE
polykey-cli-0.1.2-alpha.2   gygbx1qgpnhbvbcbaby3sfm19bamg7sx   0e1addd9855a   12 days ago   370MB
```

9. Now you can run Polykey as an agent with the following shell command

```shell
docker run -it 0e1addd9855a agent start --background -np /tmp/polykey
```

Making sure to replace `0e1addd9855a` with your corresponding image ID.

```shell
 docker run -it  0e1addd9855a agent start --background -np /tmp/polykey
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
✔ Enter new password … *
✔ Confirm new password … *
pid         	28
nodeId      	vflhiouqt255gq22drpf0s639kl9eds3ralu094c6rsnmonemp6pg
clientHost  	127.0.0.1
clientPort  	45509
agentHost   	::
agentPort   	37468
recoveryCode	net elephant gentle eight pulp oyster panther sing own autumn silly whip simple warfare daughter pepper detail bachelor awkward forget ignore cream silly raw

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
