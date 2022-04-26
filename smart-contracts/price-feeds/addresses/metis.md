---
description: Price feeds currently supported by the Witnet Foundation on Metis networks
---

# Metis Price Feeds

### **Metis Mainnet** (Andromeda)

**WitnetPriceRouter**: [`0xD39D4d972C7E166856c4eb29E54D3548B4597F53`](https://andromeda-explorer.metis.io/address/0xD39D4d972C7E166856c4eb29E54D3548B4597F53/read-contract)

| **Caption**                                                                      | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| -------------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-METIS/USDT-6](https://feeds.witnet.io/feeds/metis-mainnet\_metis-usdt\_6) | `0x4ba45817` |    24 hours   |      2.0%     |      15'     |

### **Metis Testnet** (Stardust)

**WitnetPriceRouter**: [`0x5134EAF08bcf8cE1922991150AAad1774e93751f`](https://stardust-explorer.metis.io/address/0x5134EAF08bcf8cE1922991150AAad1774e93751f/read-contract)

| **Caption**                                                                      | **ID4**      | **Heartbeat** | **Deviation** | **Cooldown** |
| -------------------------------------------------------------------------------- | ------------ | :-----------: | :-----------: | :----------: |
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/metis-testnet\_btc-usd\_6)       | `0x24beead4` |    24 hours   |      1.0%     |      15'     |
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/metis-testnet\_eth-usd\_6)       | `0x3d15f701` |    24 hours   |      1.0%     |      15'     |
| [Price-METIS/USDT-6](https://feeds.witnet.io/feeds/metis-testnet\_metis-usdt\_6) | `0x4ba45817` |    24 hours   |      1.0%     |      15'     |

{% hint style="success" %}
Clicking on any of the captions above will take you to the corresponding view in the [**Data Feeds Explorer** website](https://feeds.witnet.io), where not only the whole price timeline can be checked for the corresponding currency pair, but also the **Price Feed** contract currently serving the price updates, as well as the hashes of the Witnet transactions that solved every single update.
{% endhint %}

{% content-ref url="../../witnet-data-feeds/price-feeds-registry.md" %}
[price-feeds-registry.md](../../witnet-data-feeds/price-feeds-registry.md)
{% endcontent-ref %}

{% content-ref url="../../witnet-data-feeds/triggering-conditions.md" %}
[triggering-conditions.md](../../witnet-data-feeds/triggering-conditions.md)
{% endcontent-ref %}
