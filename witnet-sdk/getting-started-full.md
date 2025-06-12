---
hidden: true
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 🚀 Getting Started (full)

The **Witnet SDK** offers a comprehensive range of NPM packages tailored to various Web3 environments and programming languages, ensuring you have the right tools for your specific use case.

| Witnet SDK packages                                                       |                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@witnet/sdk](getting-started-full.md#witnet-sdk-js)                      | **Javascript** and **Typescript** developers willing to interact with the Witnet blockchain.                                                                                                                                                                               |
| @witnet/sdk-dart                                                          | **Dart** developers willing to interact with the Witnet blockchain.                                                                                                                                                                                                        |
| @witnet/sdk-python                                                        | **Python** developers willing to interact with the Witnet blockchain. Requires running a wallet back-end server binary (included), as to attend JSON-RPC requests from your scripts or apps. _Embeds @witnet/sdk-js._                                                      |
| @witnet/sdk-rust                                                          | **Rust** developers willing to interact with the Witnet blockchain.                                                                                                                                                                                                        |
| @witnet/sdk-solana                                                        | Developers willing to report notarized oracle queries from the Witnet blockchain into smart contracts in **Solana**. _Embeds @witnet/sdk-js._                                                                                                                              |
| [@witnet/sdk-solidity](getting-started-full.md#witnet-sdk-solidity)       | Developers willing to report notarized oracle queries from the Witnet blockchain into smart contracts in **EVM-compatible** chains, get smart contracts to build verifiable oracle queries on-chain, or pull them off from the Witnet blockchain. _Embeds @witnet/sdk-js._ |
| [@witnet/sdk-price-feeds](getting-started-full.md#witnet-sdk-price-feeds) | Devops and devs willing to leverage, query or autonomously report **notarized price feed updates**, subsidized or not by the Witnet Foundation. _Embeds: @witnet/sdk-js, @witnet/sdk-solidity and @witnet/sdk-solana._                                                     |
| @witnet/sdk-tanssi                                                        | Developers willing to report notarized oracle queries from the Witnet blockchain into smart contracts in EVM-compatible **Tanssi app-chains**. _Embeds @witnet/sdk-js and @witnet/sdk-solidity._                                                                           |

{% hint style="success" %}
You don't need to run a Witnet node, stake $WIT coins, or pay subscription fees to use any of these packages, whatsoever. The **Witnet SDK** is totally open sourced and distributed under MIT license.
{% endhint %}

{% hint style="info" %}
In certain back-end environments, though, you might prefer to run your own Witnet nodes as to avoid relying on third-party Wit/RPC providers.&#x20;

Witnet is a totally [permissionless](../intro/about/architecture.md#witnet-is-a-permissionless-blockchain-oracle) and Proof-of-Stake blockchain, and the [requirements ](../node-operators/requirements.md)for running a node are surprisingly low. You don't even need to stake $WIT into your nodes if just willing to use them for transmitting transactions or fetching data from the blockchain. Becoming a Witnet validator can sustain the cost of running nodes, nonetheless. Learn how to setup, stake and run a Witnet node [here](../node-operators/docker-quick-start-guide.md).
{% endhint %}

***

## Package @witnet/sdk

### Installation

{% tabs %}
{% tab title="PNPM" %}
```
$ pnpm install --save-dev @witnet/sdk-js@beta
```
{% endtab %}

{% tab title="NPM" %}
```
npm install --save-dev @witnet/sdk-js@beta
```
{% endtab %}

{% tab title="YARN" %}
```
yarn add @witnet/sdk-js@beta
```
{% endtab %}
{% endtabs %}

#### Importing the SDK

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { assets, utils, Witnet } = require('@witnet/sdk-js') 
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { assets, utils, Witnet } from '@witnet/sdk-js' }
```
{% endtab %}
{% endtabs %}

#### Embedded binaries

This package embeds an executable that allows you to interact with the Witnet blockchain and even manage your own $WIT coins and Radon assets (i.e. customized oracle queries and web data sources), from the command line. It also allows dry-running oracle data queries, locally.

{% tabs %}
{% tab title="npx witnet" %}
```
$ npx witnet --version
```
{% endtab %}
{% endtabs %}

### Setting up the environment

Two environment variables are required to interact with the Witnet blockchain.

#### WITNET\_SDK\_PROVIDER

URL of the Wit/RPC endpoint that will provide both information about the Witnet network, and the transmission of transactions signed in Javascript.

This URL can correspond to that of any validator or archive nodes in the Witnet network (as long as the corresponding http/rpc port is reachable), or any of the public-domain endpoints provided by the **Witnet Foundation**:

<table><thead><tr><th width="146.77789306640625">Pubiic Networks</th><th width="262.5556640625">Wit/RPC Providers</th><th width="105.77764892578125">Network id</th><th>Description</th></tr></thead><tbody><tr><td><strong>Witnet Mainnet</strong></td><td><code>https://rpc.witnet.io</code></td><td><code>0x9FED</code></td><td>Where Wit/oracle queries get notarized for real, and results forever stored into the Witnet blockchain. Transactions get paid in real <strong>$WIT coins</strong>.</td></tr><tr><td><strong>Witnet Testnet</strong></td><td><code>https://rpc-testnet.witnet.io</code></td><td><code>0x2845</code></td><td>Only for testing purposes. Transactions get paid in $TWIT coins with no market value.</td></tr></tbody></table>

{% hint style="warning" %}
If no otherwise specified, and no WITNET\_RPC\_PROVIDER is set in the environment, classes from the Javascript library will rely on **https://rpc.witnet.io** as default Wit/RPC provider.
{% endhint %}

{% hint style="info" %}
If using the **Witnet Public Testnet** for testing out transactions or notarization of oracle queries, please join the [Witnet Discord channel](https://discord.com/invite/witnet) and ask for getting airdropped with some $TWIT testing coins for free.
{% endhint %}

#### WITNET\_SDK\_MASTER\_KEY

In order to derive Witnet accounts, compose and sign transactions in Javascript, a valid private key in XPRV format must be provided, either [exported from a Witnet node](../node-operators/next-steps.md#back-up-your-private-master-key), or from the [myWitWallet ](https://mywitwallet.com/)or the [Sheikah ](https://sheikah.app/)wallet applications.

{% hint style="info" %}
Master keys exported from **myWitWallet** get encrypted with a password.&#x20;

Encrypted master keys requires the password to be specified in Javascript, or typed every time the CLI binary is asked to sign a transaction. If deemed necessary, decrypt master keys by following these steps:

* Run `$ npx witnet wallet decipher`.
* Copy the XPRV string exported from myWitWallet and paste it into the console.&#x20;
* Enter the password used when exporting the master key.&#x20;
{% endhint %}

### Smoke tests

<table><thead><tr><th width="316.66656494140625">Checklist</th><th>Commands</th></tr></thead><tbody><tr><td>Verify the actual Witnet provider and network you're connecting to.</td><td><code>$ npx witnet network provider</code></td></tr><tr><td>The Wit/RPC provider should be operational and synced.</td><td><code>$ npx witnet network syncStatus</code></td></tr><tr><td>You should be able to operate with the same Witnet address as the ones available on whatever app, or node, where the master key was imported from.</td><td><code>$ npx witnet wallet accounts</code></td></tr></tbody></table>

***

## Package @witnet/sdk-solidity

### Installation

### Setting up the environment

### Smoke tests

***

## Package @witnet/sdk-price-feeds

### Installation

### Leveraging the price feeds repository

### Setting up the environment

### Smoke tests

