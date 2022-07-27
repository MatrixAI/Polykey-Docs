{ pkgs ? import ./pkgs.nix {}, ci ? false }:

with pkgs;
let
  utils = callPackage ./utils.nix {};
in
  mkShell {
    nativeBuildInputs = [
      nodejs
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

      # Built executables and NPM executables
      export PATH="$(pwd)/dist/bin:$(npm bin):$PATH"

      npm install --ignore-scripts

      set +v
    '';
  }
