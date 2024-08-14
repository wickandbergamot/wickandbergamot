---
title: "Local Development Quickstart"
description: "This quickstart guide will demonstrate how to quickly install and setup your local Wickandbergamot development environment."
keywords:
  - rust
  - cargo
  - toml
  - program
  - tutorial
  - intro to wickandbergamot development
  - blockchain developer
  - blockchain tutorial
  - web3 developer
---

This quickstart guide will demonstrate how to quickly install and setup your local development environment, getting you ready to start developing and deploying Wickandbergamot programs to the blockchain.

## What you will learn

- How to install the Wickandbergamot CLI locally
- How to setup a localhost Wickandbergamot cluster/validator
- How to create a Wickandbergamot wallet for developing
- How to airdrop WICKANDBERGAMOT tokens for your wallet

## Install the Wickandbergamot CLI

To interact with the Wickandbergamot clusters from your terminal, install the [Wickandbergamot CLI tool suite](./../cli/install-wickandbergamot-cli-tools) on your local system:

```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

## Setup a localhost blockchain cluster

The Wickandbergamot CLI comes with the [test validator](./../developing/test-validator.md) built in. This command line tool will allow you to run a full blockchain cluster on your machine.

```bash
wickandbergamot-test-validator
```

> **PRO TIP:**
> Run the Wickandbergamot test validator in a new/separate terminal window that will remain open. The command line program must remain running for your localhost cluster to remain online and ready for action.

Configure your Wickandbergamot CLI to use your localhost validator for all your future terminal commands:

```bash
wickandbergamot config set --url localhost
```

At any time, you can view your current Wickandbergamot CLI configuration settings:

```bash
wickandbergamot config get
```

## Create a file system wallet

To deploy a program with Wickandbergamot CLI, you will need a Wickandbergamot wallet with WICKANDBERGAMOT tokens to pay for the cost of transactions.

Let's create a simple file system wallet for testing:

```bash
wickandbergamot-keygen new
```

By default, the `wickandbergamot-keygen` command will create a new file system wallet located at `~/.config/solana/id.json`. You can manually specify the output file location using the `--outfile /path` option.

> **NOTE:**
> If you already have a file system wallet saved at the default location, this command will **NOT** override it (unless you explicitly force override using the `--force` flag).

#### Set your new wallet as default

With your new file system wallet created, you must tell the Wickandbergamot CLI to use this wallet to deploy and take ownership of your on chain program:

```bash
wickandbergamot config set -k ~/.config/solana/id.json
```

## Airdrop WICKANDBERGAMOT tokens to your wallet

Once your new wallet is set as the default, you can request a free airdrop of WICKANDBERGAMOT tokens to it:

```bash
wickandbergamot airdrop 2
```

> **NOTE:**
> The `wickandbergamot airdrop` command has a limit of how many WICKANDBERGAMOT tokens can be requested _per airdrop_ for each cluster (localhost, testnet, or devent). If your airdrop transaction fails, lower your airdrop request quantity and try again.

You can check your current wallet's WICKANDBERGAMOT balance any time:

```bash
wickandbergamot balance
```

## Next steps

See the links below to learn more about writing Rust based Wickandbergamot programs:

- [Create and deploy a Wickandbergamot Rust program](./rust.md)
- [Overview of writing Wickandbergamot programs](../developing/on-chain-programs/overview)
