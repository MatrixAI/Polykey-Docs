{
  inputs = {
    nixpkgs-matrix = {
      type = "indirect";
      id = "nixpkgs-matrix";
    };
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs-matrix, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs-matrix.legacyPackages.${system};

        shell = { ci ? false }:
          with pkgs;
          mkShell {
            nativeBuildInputs = [ nodejs shellcheck patchelf gitAndTools.gh ];
            shellHook = ''
              echo "Entering $(npm pkg get name)"
              set -o allexport
              . <(pk secrets env Polykey-Docs:.)
              set +o allexport
              set -v
              ${lib.optionalString ci ''
                set -o errexit
                set -o nounset
                set -o pipefail
                shopt -s inherit_errexit
              ''}
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
      in {
        devShells = {
          default = shell { ci = false; };
          ci = shell { ci = true; };
        };
      });
}
