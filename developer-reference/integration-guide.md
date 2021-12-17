---
description: >-
  This guide is aimed at developers willing to integrate their software with
  Witnet and the Wit token in such a way that they can manage addresses,
  balances, and create and verify transactions.
---

# Integration Guide

### Running Witnet-Rust

The Witnet Foundation-supported reference implementation of the Witnet protocol is [Witnet-Rust](https://github.com/witnet/witnet-rust).

Witnet-Rust can be easily run:

* [as a Docker container](../node-operators/docker-quick-start-guide.md)
* [as a docker-compose service](../node-operators/advanced-setups/run-witnet-as-a-docker-compose-service.md)
* [as a systemd service](../node-operators/advanced-setups/run-witnet-as-a-systemd-service.md)
* [compiling from source code](compile-witnet-rust-from-source-code.md)

### Witnet-Rust Components

Witnet-Rust contains two different components that provide different degrees of wallet functionality:

* `node`, which implements a Witnet full node with an internal single-account, single-address wallet and a [JSON-RPC API over TCP](node-api-reference.md).
* `wallet`, which implements a [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) compliant, multi-account, multi-address [Hierarchical Deterministic](https://www.investopedia.com/terms/h/hd-wallet-hierarchical-deterministic-wallet.asp) wallet, and a [JSON-RPC API over WebSockets](wallet-api-reference.md).

### Witnet-Rust `node` component

The Witnet-Rust `node` component is standalone — you can run it on its own and it will provide full-node functionality: syncing up the Witnet block chain, validate transactions and blocks in real time, and (optionally) propose blocks.

```
Integration architecture:
[YOUR APP] → [WITNET-RUST NODE] → [WITNET NETWORK]
```

Once a `node` instance is fully synced, its [JSON-RPC over TCP API](node-api-reference.md) offers a minimal single-account, single-address wallet.

Running a Witnet-Rust node with the [JSON-RPC API](node-api-reference.md) exposed on local port `21338` can easily be achieved with this Docker one-liner:

```
docker run -d \
    --name witnet_node \
    --volume ~/.witnet:/.witnet \
    --publish 21337:21337 \
    --publish 21338:21338 \
    --restart always \
    witnet/witnet-rust
```

Here is a quick guide on how to interact with a node using the JSON-RPC interface and any TCP client:

{% embed url="https://medium.com/witnet/interacting-with-witnet-node-without-cli-7028e8f6cff7" %}

The full list of supported JSON-RPC methods is available in the [Node API Reference](node-api-reference.md):

{% content-ref url="node-api-reference.md" %}
[node-api-reference.md](node-api-reference.md)
{% endcontent-ref %}

There is also a [command line client (CLI)](../node-operators/cli-reference.md) that exposes all the node functionality and uses the JSON-RPC API under the hood:

{% content-ref url="../node-operators/cli-reference.md" %}
[cli-reference.md](../node-operators/cli-reference.md)
{% endcontent-ref %}

### Witnet-Rust `wallet` component

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

The [JSON-RPC API](wallet-api-reference.md) of the `wallet` component is different than the one from the `node` not because it has much more advanced wallet functionality, and uses a WebSockets transport instead of plain TCP (this is to enable web wallets and similar apps).

A full reference of the [Wallet API](wallet-api-reference.md) can be found here:

{% content-ref url="wallet-api-reference.md" %}
[wallet-api-reference.md](wallet-api-reference.md)
{% endcontent-ref %}

