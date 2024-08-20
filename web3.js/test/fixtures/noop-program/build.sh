#!/usr/bin/env bash
set -ex

cd "$(dirname "$0")"

cargo build-bpf
cp ./target/deploy/wickandbergamot_bpf_rust_noop.so .
