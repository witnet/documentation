# Celo Price Feeds

### Celo Mainnet

**WitnetPriceRouter**: [`0x931673904eB6E69D775e35F522c0EA35575297Cb`](https://explorer.celo.org/address/0x931673904eB6E69D775e35F522c0EA35575297Cb/read-contract)

| **Caption** | **ID4** | **Heartbeat** | **Deviation** | **Cooldown** 
| :- | :- | :-: | :-: | :-: 
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/celo-mainnet_btc-usd_6) | `0x24beead4` | 24 hours | 3.5% | 1 hour
| [Price-CELO/EUR-6](https://feeds.witnet.io/feeds/celo-mainnet_celo-eur_6) | `0x21a79821` | 24 hours | 1.0% | 15'
| [Price-CELO/USD-6](https://feeds.witnet.io/feeds/celo-mainnet_celo-usd_6) | `0x9ed884be` | 24 hours | 1.0% | 15'
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/celo-mainnet_eth-usd_6) | `0x3d15f701` | 24 hours | 3.5% | 1 hour

### Celo Testnet (Alfajores)

**WinetPriceRouter**: [`0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE`](https://alfajores-blockscout.celo-testnet.org/address/0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE/read-contract) 

| **Caption** | **ID4** | **Heartbeat** | **Deviation** | **Cooldown** 
| :- | :- | :-: | :-: | :-: 
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/celo-alfajores_btc-usd_6) | `0x24beead4` | 1 hour | 1.0% | 5'
| [Price-CELO/EUR-6](https://feeds.witnet.io/feeds/celo-alfajores_celo-eur_6) | `0x21a79821` | 1 hour | 1.0% | 5'
| [Price-CELO/USD-6](https://feeds.witnet.io/feeds/celo-alfajores_celo-usd_6) | `0x9ed884be` | 1 hour | 1.0% | 5'
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/celo-alfajores_eth-usd_6) | `0x3d15f701` | 1 hour | 1.0% | 5'

{% hint style="success" %}
Clicking on any of the captions above will take you to the corresponding view in the [**Data Feeds Explorer** website](https://feeds.witnet.io), where not only the whole price timeline can be checked for the corresponding currency pair, but also the **Price Feed** contract currently serving the price updates, as well as the hashes of the Witnet transactions that solved every single update. 
{% endhint %}

{% content-ref url="../triggering-conditions.md" %}triggering-conditions.md{% endcontent-ref %}
{% content-ref url="../price-feeds-registry.md" %}price-feeds-registry.md{% endcontent-ref %}
