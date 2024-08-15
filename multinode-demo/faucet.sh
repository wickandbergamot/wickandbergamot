#!/usr/bin/env bash
#
# Starts an instance of wickandbergamot-faucet
#
here=$(dirname "$0")

# shellcheck source=multinode-demo/common.sh
source "$here"/common.sh

[[ -f "$WICKANDBERGAMOT_CONFIG_DIR"/faucet.json ]] || {
  echo "$WICKANDBERGAMOT_CONFIG_DIR/faucet.json not found, create it by running:"
  echo
  echo "  ${here}/setup.sh"
  exit 1
}

set -x
# shellcheck disable=SC2086 # Don't want to double quote $WICKANDBERGAMOT_faucet
exec $wickandbergamot_faucet --keypair "$WICKANDBERGAMOT_CONFIG_DIR"/faucet.json "$@"
