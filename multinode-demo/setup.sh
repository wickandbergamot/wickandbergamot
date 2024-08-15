#!/usr/bin/env bash

here=$(dirname "$0")
# shellcheck source=multinode-demo/common.sh
source "$here"/common.sh

set -e

rm -rf "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator
mkdir -p "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator

# Create genesis ledger
if [[ -r $FAUCET_KEYPAIR ]]; then
  cp -f "$FAUCET_KEYPAIR" "$WICKANDBERGAMOT_CONFIG_DIR"/faucet.json
else
  $solana_keygen new --no-passphrase -fso "$WICKANDBERGAMOT_CONFIG_DIR"/faucet.json
fi

if [[ -f $BOOTSTRAP_VALIDATOR_IDENTITY_KEYPAIR ]]; then
  cp -f "$BOOTSTRAP_VALIDATOR_IDENTITY_KEYPAIR" "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/identity.json
else
  $solana_keygen new --no-passphrase -so "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/identity.json
fi
if [[ -f $BOOTSTRAP_VALIDATOR_STAKE_KEYPAIR ]]; then
  cp -f "$BOOTSTRAP_VALIDATOR_STAKE_KEYPAIR" "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/stake-account.json
else
  $solana_keygen new --no-passphrase -so "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/stake-account.json
fi
if [[ -f $BOOTSTRAP_VALIDATOR_VOTE_KEYPAIR ]]; then
  cp -f "$BOOTSTRAP_VALIDATOR_VOTE_KEYPAIR" "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/vote-account.json
else
  $solana_keygen new --no-passphrase -so "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/vote-account.json
fi

args=(
  "$@"
  --max-genesis-archive-unpacked-size 1073741824
  --enable-warmup-epochs
  --bootstrap-validator "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/identity.json
                        "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/vote-account.json
                        "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator/stake-account.json
)

"$WICKANDBERGAMOT_ROOT"/fetch-spl.sh
if [[ -r spl-genesis-args.sh ]]; then
  SPL_GENESIS_ARGS=$(cat "$WICKANDBERGAMOT_ROOT"/spl-genesis-args.sh)
  #shellcheck disable=SC2207
  #shellcheck disable=SC2206
  args+=($SPL_GENESIS_ARGS)
fi

default_arg --ledger "$WICKANDBERGAMOT_CONFIG_DIR"/bootstrap-validator
default_arg --faucet-pubkey "$WICKANDBERGAMOT_CONFIG_DIR"/faucet.json
default_arg --faucet-lamports 500000000000000000
default_arg --hashes-per-tick auto
default_arg --cluster-type development

$wickandbergamot_genesis "${args[@]}"
