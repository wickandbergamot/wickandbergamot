---
title: Rust API
---

Wickandbergamot's Rust crates are [published to crates.io][crates.io] and can be found
[on docs.rs with the "solana-" prefix][docs.rs].

[crates.io]: https://crates.io/search?q=solana-
[docs.rs]: https://docs.rs/releases/search?query=solana-

Some important crates:

- [`wickandbergamot-program`] &mdash; Imported by programs running on wickandbergamot, compiled
  to BPF. This crate contains many fundamental data types and is re-exported from
  [`wickandbergamot-sdk`], which cannot be imported from a Wickandbergamot program.

- [`wickandbergamot-sdk`] &mdash; The basic off-chain SDK, it re-exports
  [`wickandbergamot-program`] and adds more APIs on top of that. Most Wickandbergamot programs
  that do not run on-chain will import this.

- [`wickandbergamot-client`] &mdash; For interacting with a Wickandbergamot node via the
  [JSON RPC API](jsonrpc-api).

- [`wickandbergamot-cli-config`] &mdash; Loading and saving the Wickandbergamot CLI configuration
  file.

- [`wickandbergamot-clap-utils`] &mdash; Routines for setting up a CLI, using [`clap`],
  as used by the main Wickandbergamot CLI. Includes functions for loading all types of
  signers supported by the CLI.

[`wickandbergamot-program`]: https://docs.rs/wickandbergamot-program
[`wickandbergamot-sdk`]: https://docs.rs/wickandbergamot-sdk
[`wickandbergamot-client`]: https://docs.rs/wickandbergamot-client
[`wickandbergamot-cli-config`]: https://docs.rs/wickandbergamot-cli-config
[`wickandbergamot-clap-utils`]: https://docs.rs/wickandbergamot-clap-utils
[`clap`]: https://docs.rs/clap
