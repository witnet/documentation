# Witnet-rust integration quick guide

This is intended for developers looking forward to integrate their software with Witnet and the WIT token in such a way
that they can manage addresses, balances, and create and verify transactions. Foreseeably, this is the case for
wallets, exchanges, atomic swaps, mixers, etc.

## Running Witnet-Rust

The Witnet Foundation-supported reference implementation of the Witnet protocol is [Witnet-Rust](https://github.com/witnet/witnet-rust).

Witnet-Rust can be easily run:

- [as a Docker container](/try/run-a-node/)
- [as a Docker-compose service](/node-operators/docker-compose-service/)
- [as a SystemD service](/node-operators/systemd-service/)
- [compiling from source code](/developer/from-source/)

## Witnet-Rust components

Witnet-Rust contains two different components that provide different degrees of wallet functionality:

- `node`, which implements a Witnet full node with an internal single-account, single-address wallet and a JSON-RPC API over a TCP.
- `wallet`, which implements a [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) compliant, multi-account, multi-address [Hierarchical Deterministic](https://www.investopedia.com/terms/h/hd-wallet-hierarchical-deterministic-wallet.asp) wallet, and a JSON-RPC API over WebSockets.

## Witnet-Rust `node` component

The Witnet-Rust `node` component is standalone — you can run it on its own and it will provide full-node functionality: syncing up the Witnet block chain, validate transactions and blocks in real time, and (optionally) propose blocks.

```
Integration architecture:
[YOUR APP] → [WITNET-RUST NODE] → [WITNET NETWORK]
```

Once a `node` instance is fully synced, its JSON-RPC over TCP API offers a minimal single-account, single-address wallet.

Running a Witnet-Rust node with the JSON-RPC API exposed on local port `21338` can easily be achieved with this Docker
one-liner:

```console
docker run -d \
    --name witnet_node \
    --volume ~/.witnet:/.witnet \
    --publish 21337:21337 \
    --publish 21338:21338 \
    --restart always \
    witnet/witnet-rust
```

Here is a [quick guide on how to interact with a node using the JSON-RPC interface](https://medium.com/witnet/interacting-with-witnet-node-without-cli-7028e8f6cff7) using any TCP client.

There is also a [command line client (CLI)](/node-operators/cli/) that exposes all the node functionality and uses the JSON-RPC API under the hood.

## Witnet-Rust `wallet` component

The Witnet-Rust `wallet` component is NOT standalone. It requires a connection to an instance of the `node` component that will act as its "backend":

```
Integration architecture:
[YOUR APP] → [WITNET-RUST WALLET] → [WITNET-RUST NODE] → [WITNET NETWORK]
```

Witnet Foundation operates a publicly available `node` instance that acts as the backend for the `wallet` component contained within the [Sheikah Witnet wallet desktop app](https://sheikah.app), which follows exactly the same architecture:

```
Sheikah Wallet app architecture:
[SHEIKAH UI*] → [WITNET-RUST WALLET*] → [WITNET-RUST NODE] → [WITNET NETWORK]

* The Sheikah UI and the Witnet-Rust wallet are run in the user's computer.
```

For users looking for the maximum degree of privacy, it is recommended that they run their own instance of the `node` component, because otherwise they may be disclosing their addresses and balances to 3rd parties, as the queries between the `wallet` and `node` components need to be sent over the Internet.

The JSON-RPC API of the `wallet` component is different than the one from the `node` not because it has much more advanced wallet functionality, and uses a WebSockets transport instead of plain TCP (this is to enable web wallets and similar apps). 

A full reference of the [Wallet API can be found here](/developer/wallet-api/).