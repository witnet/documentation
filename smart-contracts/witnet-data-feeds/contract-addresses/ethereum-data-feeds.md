# Ethereum Price Feeds

## Price Router contract address
{% tabs %}
{% tab title="Ethereum Mainnet" %}
[`0x83A757eAe821Ad7B520D9A74952337138A80b2AF`](https://etherscan.io/address/0x83a757eae821ad7b520d9a74952337138a80b2af#readContract)
{% endtab %}

{% tab title="Ethereum Goerli" %}
[`0x1cF3Aa9DBF4880d797945726B94B9d29164211BE`](https://goerli.etherscan.io/address/0x1cF3Aa9DBF4880d797945726B94B9d29164211BE#readContract)
{% endtab %}

{% tab title="Ethereum Rinkeby" %}
[`0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9`](https://rinkeby.etherscan.io/address/0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9#readContract) 
{% endtab %}
{% endtabs %}

{% content-ref url="../api-reference.md" %}api-reference.md{% endcontent-ref %}

## Supported Price Feeds 
{% tabs %}
{% tab title="Ethereum Mainnet" %}
| **Currency pair** | **ID4** | |
| :---------------- | :-----: | :- 
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/ethereum-mainnet_btc-usd_6) | `24beead4` | 
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/ethereum-mainnet_eth-usd_6) | `3d15f701` | 
{% endtab %}
{% tab title="Ethereum Goerli" %}
| **Currency pair** | **ID4** | **Hearbeat** - **Deviation** |
| :---------------- | :-----: | :----------: 
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/ethereum-goerli_btc-usd_6) | `24beead4` | 1h - 1.0%
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/ethereum-goerli_eth-usd_6) | `3d15f701` | 1h - 1.0%
{% endtab %}
{% tab title="Ethereum Rinkeby" %}
| **Currency pair** | **ID4** | **Heartbeat** - **Deviation** |
| :---------------- | :-----: | :-: 
| [Price-BTC/USD-6](https://feeds.witnet.io/feeds/ethereum-rinkeby_btc-usd_6) | `24beead4` | 1h - 1.0%
| [Price-ETH/USD-6](https://feeds.witnet.io/feeds/ethereum-rinkeby_eth-usd_6) | `3d15f701` | 1h - 1.0%
{% endtab %}
{% endtabs %}

{% content-ref url="../triggering-conditions.md" %}triggering-conditions.md{% endcontent-ref %}

{% hint style="success" %}
Clicking on any of the captions above will take you to the corresponding view in the [**Data Feeds Explorer** website](https://feeds.witnet.io), where not only the whole price timeline can be checked for the corresponding currency pair, but also the current **Price Feed** contract currently serving the price updates, as well the hashes of the Witnet transactions that solved every single update. Further details on the Witnet transactions can be tracked down with the provided links to the [**Witnet Explorer** website](https://witnet.network/).
{% endhint %}

{% embed url="https://feeds.witnet.io" %}
{% embed url="https://witnet.network" %}
