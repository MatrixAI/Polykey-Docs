{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";

    nixpkgs.follows = "nixpkgs-matrix/nixpkgs";
    nixpkgs-matrix.url = "github:matrixai/nixpkgs-matrix";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        shell = { ci ? false }: with pkgs; mkShell {
          nativeBuildInputs = [
            nodejs
            shellcheck
            patchelf
            gitAndTools.gh
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
            export PATH="$(pwd)/dist/bin:$(npm root)/.bin:$PATH"
            npm install --ignore-scripts
            if [ -f 'node_modules/@cloudflare/workerd-linux-64/bin/workerd' ]; then
              patchelf \
                --set-interpreter $(cat $NIX_CC/nix-support/dynamic-linker) \
                node_modules/@cloudflare/workerd-linux-64/bin/workerd
            fi
            set +v
          '';
        };
      in
      {
        devShells = {
          default = shell { ci = false; };
          ci = shell { ci = true; };
        };
      });
}
