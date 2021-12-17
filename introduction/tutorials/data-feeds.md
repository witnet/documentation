# Data feeds

The easiest way to use an oracle to source external data into a smart contract is through a [Data Feed](../../smart-contracts/witnet-data-feeds/). More and more projects building on multiple blockchains are relying every day on the WItnet data feeds to get price references and other valuable data into their smart contracts.

Witnet price feeds are timely updated with fresh data as aggregated from multiple reliable data sources and attested by the Witnet decentralized oracle network, which offers high data integrity guarantees thanks to its unique cryptoeconomic design.

### Using Witnet Data Feeds, in a nutshell

Using Witnet data feeds to source prices and other data is extremely simple. This example obtains the latest [BTC/USD](https://feeds.witnet.io/feeds/ethereum-rinkeby\_btc-usd\_6) price using the Ethereum Rinkeby testnet:

{% embed url="https://gist.github.com/aesedepece/d5c27c0ae2312937472274738bcd96f1" %}

The `IWitnetPriceFeed` interface can be found in the `witnet-solidity-bridge` [npm package](https://www.npmjs.com/package/witnet-solidity-bridge), among many other Witnet related interfaces, contracts and utilities.

A complete list of Witnet powered public data feeds can be found in the Witnet Data Feeds website:

{% embed url="https://feeds.witnet.io" %}
