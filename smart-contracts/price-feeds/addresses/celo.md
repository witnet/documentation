---
description: Price feeds currently supported by the Witnet Foundation on the Celo ecosystem
cover: ../../../.gitbook/assets/Celo.png
coverY: 0
---

# Celo Price Feeds

### Celo Mainnet

**WitnetPriceRouter**: [`0x931673904eB6E69D775e35F522c0EA35575297Cb`](https://explorer.celo.org/address/0x931673904eB6E69D775e35F522c0EA35575297Cb/read-contract)

| **Caption**                                                                     | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| ------------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/celo-mainnet\_btc-usd\_6)       | `0x24beead4` |    24 hours   |      3.5%     |    1 hour    |
| [Price-CELO/EUR-6](https://feeds.witnet.io/feeds/celo-mainnet\_celo-eur\_6)     | `0x21a79821` |    24 hours   |      1.0%     |    1 hour    |
| [Price-CELO/USD-6](https://feeds.witnet.io/feeds/celo-mainnet\_celo-usd\_6)     | `0x9ed884be` |    24 hours   |      1.0%     |    1 hour    |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/celo-mainnet\_eth-usd\_6)       | `0x3d15f701` |    24 hours   |      3.5%     |    1 hour    |
| [Price-IMMO/MCUSD-6](https://feeds.witnet.io/feeds/celo-mainnet\_immo-mcusd\_6) | `0x1aa645a8` |    24 hours   |      1.0%     |    1 hour    |

### Celo Testnet (Alfajores)

**WitnetPriceRouter**: [`0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE`](https://alfajores-blockscout.celo-testnet.org/address/0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE/read-contract)

| **Caption**                                                                       | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| --------------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/celo-alfajores\_btc-usd\_6)       | `0x24beead4` |     1 hour    |      1.0%     |      5'      |
| [Price-CELO/EUR-6](https://feeds.witnet.io/feeds/celo-alfajores\_celo-eur\_6)     | `0x21a79821` |     1 hour    |      1.0%     |      5'      |
| [Price-CELO/USD-6](https://feeds.witnet.io/feeds/celo-alfajores\_celo-usd\_6)     | `0x9ed884be` |     1 hour    |      1.0%     |      5'      |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/celo-alfajores\_eth-usd\_6)       | `0x3d15f701` |     1 hour    |      1.0%     |      5'      |
| [Price-IMMO/MCUSD-6](https://feeds.witnet.io/feeds/celo-alfajores\_immo-mcusd\_6) | `0x1aa645a8` |     1 hour    |      1.0%     |      5'      |

{% hint style="success" %}
Clicking on any of the captions above will take you to the corresponding view in the [**Data Feeds Explorer** website](https://feeds.witnet.io), where not only the whole price timeline can be checked for the corresponding currency pair, but also the **Price Feed** contract currently serving the price updates, as well as the hashes of the Witnet transactions that solved every single update.
{% endhint %}

{% content-ref url="../../witnet-data-feeds/price-feeds-registry.md" %}
[price-feeds-registry.md](../../witnet-data-feeds/price-feeds-registry.md)
{% endcontent-ref %}

{% content-ref url="../../witnet-data-feeds/triggering-conditions.md" %}
[triggering-conditions.md](../../witnet-data-feeds/triggering-conditions.md)
{% endcontent-ref %}
