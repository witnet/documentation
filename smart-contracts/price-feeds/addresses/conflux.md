---
description: >-
  Price feeds currently supported by the Witnet Foundation on the Conflux
  ecosystem
---

# Conflux Price Feeds

### Conflux Core (Hydra)

**WitnetPriceRouter**: [`0x806c8dFd322EE2d52b188CC472e0814F64304C32`](https://confluxscan.io/address/cfx:acag3dt7gj1sfzkndcgpj61aufh0jpcpgjcmvbnnrx?tab=contract-viewer)

| **Caption**                                                                   | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| ----------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/conflux-tethys\_btc-usd\_6)   | `0x24beead4` |    24 hours   |      1.0%     |      15'     |
| [Price-CFX/USDT-6](https://feeds.witnet.io/feeds/conflux-tethys\_cfx-usdt\_6) | `0x65784185` |     1 hour    |      1.0%     |      15'     |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/conflux-tethys\_eth-usd\_6)   | `0x3d15f701` |    24 hours   |      1.0%     |      15'     |

### Conflux eSpace (Hydra)

**WitnetPriceRouter**: [`0xD39D4d972C7E166856c4eb29E54D3548B4597F53`](https://evm.confluxscan.net/address/0xD39D4d972C7E166856c4eb29E54D3548B4597F53)

| **Caption**                                                                           | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| ------------------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/conflux-espace-mainnet\_btc-usd\_6)   | `0x24beead4` |     1 hour    |      1.0%     |      5'      |
| [Price-CFX/USDT-6](https://feeds.witnet.io/feeds/conflux-espace-mainnet\_cfx-usdt\_6) | `0x65784185` |     1 hour    |      1.0%     |      5'      |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/conflux-espace-mainnet\_eth-usd\_6)   | `0x3d15f701` |     1 hour    |      1.0%     |      5'      |
| Price-USDC/USD-6                                                                      | `0x4c80cf2e` |    24 hours   |      0.1%     |      15'     |
| [Price-USDT/USD-6](https://feeds.witnet.io/feeds/conflux-espace-mainnet\_usdt-usd\_6) | `0x538f5a25` |    24 hours   |      0.1%     |      15'     |

### Conflux Core (Testnet)

**WitnetPriceRouter**: [`0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25`](https://testnet.confluxscan.io/address/cfxtest:ach0dv7vv7y51b80cyr2y1nxh2pyn4xpeyst6h7jph?tab=contract-viewer)

| **Caption**                                                                    | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| ------------------------------------------------------------------------------ | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/conflux-testnet\_btc-usd\_6)   | `0x24beead4` |     1 hour    |      1.0%     |      5'      |
| [Price-CFX/USDT-6](https://feeds.witnet.io/feeds/conflux-testnet\_cfx-usdt\_6) | `0x65784185` |     1 hour    |      1.0%     |      5'      |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/conflux-testnet\_eth-usd\_6)   | `0x3d15f701` |     1 hour    |      1.0%     |      5'      |

### Conflux eSpace (Testnet)

**WitnetPriceRouter**: [`0x49C0BCce51a8B28f92d008394F06d5B259657F33`](https://evmtestnet.confluxscan.net/address/0x49C0BCce51a8B28f92d008394F06d5B259657F33)

| **Caption**                                                                           | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| ------------------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/conflux-espace-testnet\_btc-usd\_6)   | `0x24beead4` |     1 hour    |      1.0%     |      5'      |
| [Price-CFX/USDT-6](https://feeds.witnet.io/feeds/conflux-espace-testnet\_cfx-usdt\_6) | `0x65784185` |     1 hour    |      1.0%     |      5'      |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/conflux-espace-testnet\_eth-usd\_6)   | `0x3d15f701` |     1 hour    |      1.0%     |      5'      |
| [Price-USDC/USD-6](https://feeds.witnet.io/feeds/conflux-espace-testnet\_usdc-usd\_6) | `0x4c80cf2e` |    24 hours   |      0.1%     |      15'     |
| [Price-USDT/USD-6](https://feeds.witnet.io/feeds/conflux-espace-testnet\_usdt-usd\_6) | `0x538f5a25` |    24 hours   |      0.1%     |      15'     |

{% hint style="success" %}
Clicking on any of the captions above will take you to the corresponding view in the [**Data Feeds Explorer** website](https://feeds.witnet.io), where not only the whole price timeline can be checked for the corresponding currency pair, but also the **Price Feed** contract currently serving the price updates, as well as the hashes of the Witnet transactions that solved every single update.
{% endhint %}

{% content-ref url="../../witnet-data-feeds/price-feeds-registry.md" %}
[price-feeds-registry.md](../../witnet-data-feeds/price-feeds-registry.md)
{% endcontent-ref %}

{% content-ref url="../../witnet-data-feeds/triggering-conditions.md" %}
[triggering-conditions.md](../../witnet-data-feeds/triggering-conditions.md)
{% endcontent-ref %}
