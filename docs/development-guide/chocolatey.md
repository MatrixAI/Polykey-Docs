# Chocolatey

Chocolatey is a windows package manager.

Some important things to understand:

* https://docs.chocolatey.org/en-us/getting-started#what-are-chocolatey-packages - understand how meta packages work, and the struggle with archive packages and native installer packages
* https://docs.chocolatey.org/en-us/getting-started#how-does-chocolatey-work - how does it install, upgrade and uninstall

When installing tools like `curl` and others, sometimes you get an executable shimmed to `$($env:ChocolateyInstall)\bin`. This should be placed into your windows `PATH`, so that your powershell can call those executables. But this doesn't always occur. For more details see: https://docs.chocolatey.org/en-us/features/shim.

In the case where packages are not shimmed, and you don't have the executable. It's possible that the executable is installed onto the tools location. Use https://docs.chocolatey.org/en-us/create/functions/get-toolslocation to find the tools location, most likely `C:\tools`. The software is installed in their own directory, and you have to manually shim them or add those directory paths into the `PATH` manually. Beware of this if installing a package and wondering how to access it from the terminal.

We are using chocolatey on our windows runners for CI/CD.
