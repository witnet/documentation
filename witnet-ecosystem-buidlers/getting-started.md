# 🚀 Getting Started

The extensive selection of SDKs, packages, and libraries is specifically designed for various Web3 environments and programming languages, ensuring the appropriate tools are available for your particular application:

<table><thead><tr><th width="185">SDK package</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://www.npmjs.com/package/@witnet/sdk">@witnet/sdk</a></td><td>Node Package Module containing a Js/Ts library, bots and CLI binaries.</td><td><strong>Javascript</strong> and <strong>Typescript</strong> developers willing to interact with the Witnet blockchain. </td></tr><tr><td><a href="https://www.npmjs.com/package/@witnet/solidity">@witnet/solidity</a></td><td>Node.js Package Module containing a Js/Ts library, bots and CLI binaries.</td><td>Developers willing to report notarized oracle queries from the Witnet blockchain into smart contracts in <strong>EVM-compatible</strong> chains, get smart contracts to build verifiable oracle queries on-chain, or pull them off from the Witnet blockchain. <em>Embeds @witnet/sdk.</em></td></tr><tr><td><a href="https://www.npmjs.com/package/@witnet/price-feeds">@witnet/price-feeds</a></td><td>Node.js Package Module exporting Witnet-compliant Radon requests for polling, notarizing and reporting price feed updates into smart contracts.</td><td>Devops and devs willing to leverage, query or autonomously report <strong>notarized price feed updates</strong>, subsidized or not by the Witnet Foundation. <em>Embeds: @witnet/sdk and @witnet/solidity.</em></td></tr><tr><td><a href="https://pub.dev/packages/witnet">witnet.dart</a></td><td>Dart package containing a library, as well as some CLI helper commands. </td><td>A library in <strong>Dart</strong> to interface with the Witnet Protocol, enabling Dart applications to build, sign, and send value transfers and data requests - communicate with a Witnet nodes, Witnet Wallet servers and/or the Witnet Explorer backend.</td></tr><tr><td><a href="https://github.com/witnet/witnet-rust">witnet-rust</a></td><td>Github release package including Rust-compiled binaries for multiple OS platforms. These binaries can run either a full node, archive nodes, Wallet servers and a CLI.</td><td>The package implements many components in <strong>Rust</strong>, like a fully validating node, a separte wallet server for managing Witnet keys and transactions, aside from multiple Rust libraries. </td></tr></tbody></table>

{% hint style="success" %}
No need to run a Witnet node, stake WIT coins, or pay subscription fees to use any of these packages. They're open-source and distributed under the MIT license.
{% endhint %}

{% hint style="info" %}
_In certain back-end environments, though, you might prefer to run your own Witnet nodes as to avoid relying on third-party Wit/RPC providers._&#x20;

_Witnet is a totally_ [_permissionless_](../intro/about/architecture.md#witnet-is-a-permissionless-blockchain-oracle) _and Proof-of-Stake blockchain, and the_ [_requirements_ ](../node-operators/requirements.md)_for running a node are surprisingly low. You don't even need to stake WIT into your nodes if just willing to use them for transmitting transactions or fetching data from the blockchain. Becoming a Witnet validator could easily sustain the cost of running nodes, nonetheless. Learn how to setup, stake and run a Witnet node_ [_here_](../node-operators/docker-quick-start-guide.md)_._
{% endhint %}

***

## Interacting with the Witnet blockchain

### Native support

Applications in **Javascript**, **Dart** and **Rust** can autonomously create, sign and broadcast well-formed transactions to the Witnet network, as specific native libraries exists for these programming languages. Usage examples for these languages can be found in the How-to Guides in this section:

{% content-ref url="how-to-guides/" %}
[how-to-guides](how-to-guides/)
{% endcontent-ref %}

### Multi-layered support

Interacting with the Witnet blockchain is still possible from **other programming languages,** although a different and multi-layer architecture is required for such purpose, leveraging some of the server binaries distributed within any [witnet-rust release](https://github.com/witnet/witnet-rust/releases).

#### Witnet-rust binary

&#x20;The Rust-compiled Witnet binary can be easily run:

* [as a Docker container](../node-operators/docker-quick-start-guide.md)
* [as a docker-compose service](../node-operators/reference-material/advanced-setups/docker-compose.md)
* [as a systemd service](../node-operators/reference-material/advanced-setups/systemd.md)
* [compiling from source code](../node-operators/reference-material/compile-from-source-code.md)

The Rust-compiled Witnet binary contains two different components that provide different degrees of wallet functionality:

| `witnet node`   | Implements a Witnet full node with an internal single-account, single-address wallet and a [JSON-RPC API over TCP](../node-operators/reference-material/api-references/node-api.md).                                                                                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `witnet wallet` | Implements a [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) compliant, multi-account, multi-address [Hierarchical Deterministic](https://www.investopedia.com/terms/h/hd-wallet-hierarchical-deterministic-wallet.asp) wallet, and a [JSON-RPC API over WebSockets](../node-operators/reference-material/api-references/wallet-api.md). |

#### Interacting via a Witnet full- or archival- node

The Witnet-Rust `node` component is standalone — you can run it on its own and it will provide full-node functionality: syncing up the Witnet block chain, validate transactions and blocks in real time, and (optionally) propose blocks.

```
Integration architecture:
[YOUR APP] → [WITNET-RUST NODE] → [WITNET NETWORK]
```

Once a `node` instance is fully synced, its [JSON-RPC over TCP API](broken-reference) offers a minimal single-account, single-address wallet. Running a Witnet-Rust node with the JSON-RPC API exposed on local port `21338` can easily be achieved with this Docker one-liner:

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

The full list of supported JSON-RPC methods is available in the [Node API Reference](broken-reference):

{% content-ref url="../node-operators/reference-material/api-references/node-api.md" %}
[node-api.md](../node-operators/reference-material/api-references/node-api.md)
{% endcontent-ref %}

#### Interacting via a Witnet wallet server

The Witnet-Rust `wallet` component is NOT standalone. It requires a connection to an instance of the `node` component that will act as its "backend":

```
Integration architecture:
[YOUR APP] → [WITNET-RUST WALLET] → [WITNET-RUST NODE] → [WITNET NETWORK]
```

Witnet Foundation operates a cluster of publicly available `node` instances that act as the backend for the `wallet` component contained within the [Sheikah Witnet wallet desktop app](https://sheikah.app), which follows exactly the same architecture:

```
Sheikah Wallet app architecture:
[SHEIKAH UI*] → [WITNET-RUST WALLET*] → [WITNET-RUST NODE] → [WITNET NETWORK]

* The Sheikah UI and the Witnet-Rust wallet are run in the user's computer.
```

For users looking for the maximum degree of privacy, it is recommended that they run their own instance of the `node` component, because otherwise they may be disclosing their addresses and balances to 3rd parties, as the queries between the `wallet` and `node` components need to be sent over the Internet.

The [JSON-RPC API](../node-operators/reference-material/api-references/wallet-api.md) of the `wallet` component is different than the one from the `node` not because it has much more advanced wallet functionality, and uses a WebSockets transport instead of plain TCP (this is to enable web wallets and similar apps).

A full reference of the [Wallet API](../node-operators/reference-material/api-references/wallet-api.md) can be found here:

{% content-ref url="../node-operators/reference-material/api-references/wallet-api.md" %}
[wallet-api.md](../node-operators/reference-material/api-references/wallet-api.md)
{% endcontent-ref %}
