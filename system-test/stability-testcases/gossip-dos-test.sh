#!/usr/bin/env bash

set -e
cd "$(dirname "$0")"
WICKANDBERGAMOT_ROOT="$(cd ../..; pwd)"

logDir="$PWD"/logs
rm -rf "$logDir"
mkdir "$logDir"

solanaInstallDataDir=$PWD/releases
solanaInstallGlobalOpts=(
  --data-dir "$solanaInstallDataDir"
  --config "$solanaInstallDataDir"/config.yml
  --no-modify-path
)

# Install all the wickandbergamot versions
bootstrapInstall() {
  declare v=$1
  if [[ ! -h $solanaInstallDataDir/active_release ]]; then
    sh "$WICKANDBERGAMOT_ROOT"/install/wickandbergamot-install-init.sh "$v" "${solanaInstallGlobalOpts[@]}"
  fi
  export PATH="$solanaInstallDataDir/active_release/bin/:$PATH"
}

bootstrapInstall "edge"
wickandbergamot-install-init --version
wickandbergamot-install-init edge
wickandbergamot-gossip --version
wickandbergamot-dos --version

killall wickandbergamot-gossip || true
wickandbergamot-gossip spy --gossip-port 10015 > "$logDir"/gossip.log 2>&1 &
solanaGossipPid=$!
echo "wickandbergamot-gossip pid: $solanaGossipPid"
sleep 5
wickandbergamot-dos --mode gossip --data-type random --data-size 1232 &
dosPid=$!
echo "wickandbergamot-dos pid: $dosPid"

pass=true

SECONDS=
while ((SECONDS < 600)); do
  if ! kill -0 $solanaGossipPid; then
    echo "wickandbergamot-gossip is no longer running after $SECONDS seconds"
    pass=false
    break
  fi
  if ! kill -0 $dosPid; then
    echo "wickandbergamot-dos is no longer running after $SECONDS seconds"
    pass=false
    break
  fi
  sleep 1
done

kill $solanaGossipPid || true
kill $dosPid || true
wait || true

$pass && echo Pass
