{ pkgs ? import ./pkgs.nix {}, ci ? false }:

with pkgs;
mkShell {
  nativeBuildInputs = [
    nodejs
    shellcheck
    gitAndTools.gh
    patchelf
  ];
  shellHook = ''
    echo "Entering $(npm pkg get name)"
    set -o allexport
    . ./.env
    set +o allexport
    set -v
    ${
      lib.optionalString ci
      ''
      set -o errexit
      set -o nounset
      set -o pipefail
      shopt -s inherit_errexit
      ''
    }
    mkdir --parents "$(pwd)/tmp"

    # Built executables and NPM executables
    export PATH="$(pwd)/dist/bin:$(npm root)/.bin:$PATH"

    npm install --ignore-scripts

    # Patches the `workerd` used by `wrangler`
    if [ -f 'node_modules/@cloudflare/workerd-linux-64/bin/workerd' ]; then
      patchelf \
        --set-interpreter $(cat $NIX_CC/nix-support/dynamic-linker) \
        node_modules/@cloudflare/workerd-linux-64/bin/workerd
    fi

    set +v
  '';
}
