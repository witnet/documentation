# Data Feeds

The easiest way to use an oracle to source external data into a smart contract is through a [Data Feed](../../smart-contracts/witnet-data-feeds/). More and more projects building on multiple blockchains are relying every day on the WItnet data feeds to get price references and other valuable data into their smart contracts.

Witnet price feeds are timely updated with fresh data as aggregated from multiple reliable data sources and attested by the Witnet decentralized oracle network, which offers high data integrity guarantees thanks to its unique cryptoeconomic design.

### Using Witnet Data Feeds, in a nutshell

Using Witnet data feeds to source prices and other data is extremely simple. This example obtains the latest [BTC/USD](https://feeds.witnet.io/feeds/ethereum-rinkeby\_btc-usd\_6) price using the Ethereum Rinkeby testnet:

{% embed url="https://gist.github.com/aesedepece/d5c27c0ae2312937472274738bcd96f1" %}

The `IWitnetPriceFeed` interface can be found in the `witnet-solidity-bridge` [npm package](https://www.npmjs.com/package/witnet-solidity-bridge), among many other Witnet related interfaces, contracts and utilities.

### What Data Feeds Are Currently Available?

A complete list of publicly available Witnet data feeds on Witnet's many supported blockchains can be found in the Witnet Data Feeds website:

{% embed url="https://feeds.witnet.io" %}

The [Data Feeds Contract Addresses](../../smart-contracts/witnet-data-feeds/contract-addresses/) section also contains a list of all the data feeds that Witnet provides on the different supported blockchains:

{% content-ref url="../../smart-contracts/witnet-data-feeds/contract-addresses/" %}
[contract-addresses](../../smart-contracts/witnet-data-feeds/contract-addresses/)
{% endcontent-ref %}

### Learn More About Witnet Data Feeds

For more information on Witnet data feeds, please read the section dedicated to [Data Feeds](../../smart-contracts/witnet-data-feeds/). This contains a lot more information on alternative ways to consume the data feeds, how they operate, and what are their contract addresses.
