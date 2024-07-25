import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set-Up Polykey on your Machine

:::note
The Polykey Command Line Interface (CLI) is the primary user interface for the Polykey system. It is designed to be human-operable and easily scriptable for integration into other tools. It targets developers and system administrators who need an advanced tool for efficient secrets management.
:::

## Choose Your Installation Method for the Polykey-CLI

<Tabs>

 <TabItem value="npm" label="NPM CLI Installation Method" default>

### Install using Node Package Manager

The Polykey CLI is available as an [`npm` package](https://www.npmjs.com/package/polykey-cli). This method facilitates easy installation across different operating systems using Node.js and npm.

:::info

#### System Requirements

Before installing, ensure your system meets the following criteria:

- **Node.js**: Install the latest stable version from [nodejs.org](https://nodejs.org).
- **npm (Node Package Manager)**: Ensure it is up to date by running `npm install -g npm` in your terminal.
- **Environment Variables**: Add the `npm` binary path to your system’s `$PATH` to execute Polykey CLI commands from any terminal window.

:::

#### Install Command

To install the Polykey CLI globally on your system, use the following command:

```sh
npm install -g polykey-cli
```

:::note
This installs the Polykey CLI globally, allowing you to use `pk` or `polykey` commands from any directory.
:::

  </TabItem>

<TabItem value="manual" label="Manual CLI Installation Method">

### Install Manually

Choose your operating system below to view specific installation instructions.

<Tabs>

  <TabItem value="linux" label="Linux">

#### Linux Installation

Polykey-CLI code is compiled, bundled and wrapped into a single file executable. You just have to download the executable, give it executable permissions and run it. The executable is not statically linked. It requires a subset of the system libraries that Node.js requires.

- `libdl.so.2`
- `libstdc++.so.6`
- `libm.so.6`
- `libgcc_s.so.1`
- `libpthread.so.0`
- `libc.so.6`

##### Manually

Builds for Linux is released on GitHub: https://github.com/MatrixAI/Polykey-CLI/releases.

Download the executable named `...-polykey-cli-V.V.V-linux-x64`, and rename it to `polykey`.

Make it executable:

```sh
chmod u+x ./polykey
```

#### Add it to your `$PATH`.

##### For ZSH:

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

##### For Bash:

1. If you're using Bash, run the following command to add polykey to your path. Ensure to change the path if the executable is not in the downloads folder. For most users, this would be `~/downloads` on Debian-based systems.

:::warning

Make sure your path to the polykey executable is correct.

:::

```sh
echo 'export PATH=~/downloads/polykey:$PATH' >> ~/.bashrc && source ~/.bashrc
```

You can now run it with `polykey`.

---

#### NixOS

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

#### Other

We will be working on other distribution methods.

  </TabItem>
  <TabItem value="macos" label="MacOs">

#### MacOS

:::info

ARM-64 builds are not currently supported on MacOS as of **26-03-24.**
However, building Polykey yourself on MacOS resolves in a working binary. Follow this guide below to manually build and install Polykey on macOS.

:::

#### Manually

1. Download the Polykey CLI for macOS from the [GitHub releases page](https://github.com/MatrixAI/Polykey-CLI/releases). Look for the file named `polykey-cli-V.V.V-darwin-universal`, where `V.V.V` is the version number. For Mac, you want to download the file with the `darwin-universal` file extension.

2. Rename the downloaded file to `polykey` for easier access. In your terminal, make sure to navigate to the directory where the file is located (usually the Downloads directory) and run the following command:

```sh
 mv polykey-cli-V.V.V-darwin-universal polykey
```

:::tip

- Navigate into the directory where the file is saved to execute commands.
- Replace `V.V.V.` with the actual version number of the file you downloaded.

:::

3. Make the Executable Runnable: Before you can run the Polykey CLI, you need to make it executable. Use the `chmod +x` command to add executable permissions to the file. Replace `polykey` with the actual name of your file if it's different:

```sh
chmod +x polykey
```

---

#### MacOS Security Bypass

MacOS requires additional steps for the binary to be allowed to execute,
this is due to the fact that as of 20-12-23, the binaries we release are unsigned,
and MacOS permits running of unsigned binaries, however, to progress past this, there are a couple options:

 <Tabs>
      <TabItem value="method1" label="Method #1 - Admin CLI ">

##### Method #1 - quickest method

The xattr command will remove the quarantine attribute from the polykey executable, allowing you to run it without triggering macOS security warnings. Remember to ensure that the file path matches the location of your polykey file.

```sh
sudo xattr -r -d com.apple.quarantine ~/Downloads/polykey
```

If you have completed this sucesfully, you may ignore Method #2 and move to the next section on how to add polykey to your `$PATH`.

## <!-- I need to add a link to skip ahead  -->

---

</TabItem>
<TabItem value="method2" label="Method #2 - Apple Setting GUI">

##### Method #2 - Using the Apple Systems Settings GUI

First type the following command to try running the Polykey CLI but will instead trigger a pop-up.

```sh
./polykey --version
```

1. MacOS will then prompt you with the following:

:::important
Do not close this prompt. If you do, the 'Allow Anyway' option will not appear in the next step.
:::

![install1](/images/mac-install1.png)

2. While keeping the prompt open, head over to `Settings -> Privacy & Security` and scroll down till you see '"polykey" was blocked from use because it is not from an identified developer.'

![install2](/images/mac-install2.png)

3. Click on `Allow Anyway` and authenticate.

4. Try opening polykey with

```shell
sudo ./polykey
```

:::tip
When prompted in the terminal, type your administrator password and hit enter.
:::

5. Following this, you will get another similar prompt

![install3](/images/mac-install3.png)

##### Click on Open and now Polykey-CLI should be running in your terminal window.

:::tip
You can also verify the version of polykey that was installed with:

```sh
./polykey --version
```

:::

---

</TabItem>
</Tabs>

#### Add Polykey to your `$PATH`.

To enable running the Polykey CLI from any directory in the terminal on macOS, you'll need to update your shell configuration file.

<Tabs>
      <TabItem value="zsh" label="ZSH (default shell on recent macOS versions)">

##### For ZSH (default shell on recent macOS versions):

1. Navigate (cd) into the directory where the "polykey" executable is stored.

2. Edit the Zsh configuration file to add "polykey" to your $PATH. Use the following command, ensuring to replace ~/Downloads with the correct path to the "polykey" executable if it's not in the downloads folder. For most users, this path would be ~/Downloads on Debian-based systems.

:::tip

Make sure your path to the "polykey" executable is correct.

:::

```sh
echo 'export PATH=~/Downloads:$PATH' >> ~/.zshrc && source ~/.zshrc
```

</TabItem>
 <TabItem value="bash" label="Bash">

##### For Bash:

1. `cd` into the directory where the "polykey" executable is stored.
2. Edit the Bash config to add "polykey" to your path. To streamline the process, run the following command, making sure to change the path to "polykey" if the executable is not in the downloads folder. For most users, this would be `~/downloads` on Debian-based systems.

:::tip

Make sure your path to the "polykey" executable is correct. Replace `downloads` with the path to the working directory

:::

```sh
echo 'export PATH=~/downloads:$PATH' >> ~/.bashrc && source ~/.bashrc
```

</TabItem>
</Tabs>

:::tip

You can check if the PATH environment variable for Polykey has been updated correctly by running:

```sh
polykey --version
```

If this command returns the current version, then you have successfully added Polykey to your PATH, and you can now run polykey from anywhere in your terminal.

:::

  </TabItem>
  <TabItem value="windows" label="Windows">

:::warning

Polykey for windows should be working but we have yet to create documentation on the installation process for this.

:::

  </TabItem>

  </Tabs>

  </TabItem>

   <TabItem value="Docker" label="Install PK CLI on Docker" >

## Installing PK CLI on Docker

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

![img.png](/images/docker-mac-img1.png)

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

   </TabItem>

</Tabs>

---

## Bootstrapping Your First Node

:::note
Bootstrapping is the process for setting up a new Polykey node. This involves generating a key pair, creating the encrypted-at-rest node state, and connecting to the [mainnet](https://mainnet.polykey.com/) or a custom specified network domain.
:::

### 1. Start the Polykey Agent

To start the Polykey agent in the background, run the following command:

```pkcli
polykey agent start --background
```

<details>
<summary> Options for Starting the Polykey Agent</summary>

:::info

#### Starting the polykey agent in the Foreground vs. the Background

In this guide, we recommend starting the Polykey agent with the `--background` option because it allows the agent to run without occupying a terminal window, enabling you to use the shell for other commands.

However, for monitoring network activity and debugging, running the Polykey agent in the foreground can be beneficial. To do this, execute the command without the `--background` option:

```pkcli
polykey agent start
```

This will display real-time network connections and is particularly useful for observing the interactions between your node and seed nodes within the network. It also facilitates capturing error logs or unusual activity, which can be crucial for reporting issues. For verbose output, include the `--verbose` option:

```pkcli
polykey agent start --verbose
```

#### Default Node Bootstrapping and the `--node-path` Option

When you start the Polykey agent for the first time without specifying a node path, it automatically initializes using the default node path. This is convenient for quickly setting up a node:

```pkcli
polykey agent start
```

If you wish to manage multiple nodes or specify a custom path for your node's data, you can use the `--node-path` option. This is necessary for targeting operations at a node located outside the default path. For example, to start an agent for a node in a custom directory, you would use:

```pkcli
polykey bootstrap --node-path /custom/node/path
```

Then to start the Polykey agent for operating on the custom node, you would run:

```pkcli
polykey agent start --node-path /custom/node/path
```

The same applies to any other Polykey commands that you wish to target the custom node.

:::

</details>

### 2. Create & Confirm Your Password

:::note

When prompted, create a **new password** for your default node. Confirm the password to generate a node with a unique **nodeId** and **recoveryCode**.

:::warning
You will need to enter this password every time you start the Polykey agent for your default node. Ensure you remember it to access your node.
:::

![pk-agent-start-bkg-bootstrap.png](/images/pk-agent-start-bkg-bootstrap.png)

### 3. Verify the status of your PK agent

To check the status of your Polykey agent, run:

```pkcli
polykey agent status
```

:::info

This command provides detailed information about your node's current state, including its **nodeId**, connectivity status, and any running processes.

![pk-agent-status.png](/images/pk-agent-status.png)

:::note

If you have reached this step, you have successfully bootstrapped your first node on Polykey!

:::

### 4. Explore Polykey using the CLI's Helper

To explore the available primary commands and get more detailed help, use:

```pkcli
polykey --help
```

![pk-help.png](/images/pk-help.png)

:::tip Use the CLI Helper Effectively

- To list all sub-commands available for a primary command, type:

```pkcli
polykey [primary command] --help
```

- For detailed information on a specific sub-command, type:

```pkcli
polykey [primary command] [sub-command] --help
```

These commands provide you with helpful guidance on using different functionalities within Polykey.

:::

### 5. Stopping the Polykey Agent

To stop the Polykey agent, use:

```pkcli
polykey agent stop
```

### Troubleshooting

:::info

If you encounter issues with starting or stopping the Polykey agent, try the following:

- **Ensure the agent is not already running:** Use polykey agent status to check the current status.

- **Force quit the agent:** If the agent does not terminate properly, use the Activity Monitor or equivalent process management tool on your operating system.
