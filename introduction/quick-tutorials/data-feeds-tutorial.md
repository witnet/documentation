# 📈 Data Feeds

The easiest way to use an oracle to source external data into a smart contract is through a [Price Feed](../../smart-contracts/witnet-data-feeds/). More and more projects building on multiple blockchains are relying every day on the WItnet data feeds to get price references and other valuable data into their smart contracts.

Witnet price feeds are timely updated with fresh data as aggregated from multiple reliable data sources and attested by the Witnet decentralized oracle network, which offers high data integrity guarantees thanks to its unique cryptoeconomic design.

### Using Witnet Price Feeds, in a nutshell

Using Witnet data feeds to source prices and other data is extremely simple. This example obtains the latest [BTC/USD-6](https://feeds.witnet.io/feeds/ethereum-rinkeby\_btc-usd\_6) price using the Ethereum Rinkeby testnet:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";

contract MyContract {

    IWitnetPriceRouter public immutable witnetPriceRouter;
    
    /*
     * Network: Ethereum Rinkeby
     * WitnetPriceRouter: 0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9
     **/
    constructor() {
        witnetPriceRouter = IWitnetPriceRouter(0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9);
    }

    /// Returns the BTC / USD price (6 decimals), ultimately provided by the Witnet oracle, and
    /// the timestamps at which the price was reported back from the Witnet oracle's sidechain 
    /// to Ethereum Rinkeby. 
    function getBtcUsdPrice() external view returns (int256 _lastPrice, uint256 _lastTimestamp) {
        (_lastPrice, _lastTimestamp,) = witnetPriceRouter.valueFor(bytes32(0x24beead4));
    }
}
```

The `IWitnetPriceRouter` and `IWitnetPriceFeed` interfaces can be found in the [`witnet-solidity-bridge` npm package](https://www.npmjs.com/package/witnet-solidity-bridge), among many other Witnet related interfaces, contracts and utilities.

### What Price Feeds Are Currently Available?

A complete list of publicly available Witnet data feeds on Witnet's many supported blockchains can be found in the Witnet Data Feeds website:

{% embed url="https://feeds.witnet.io" %}

The [Price Feeds Contract Addresses](/smart-contracts/witnet-data-feeds/contract-addresses/) section also contains a list of all the data feeds that Witnet provides on the different supported blockchains:

{% content-ref url="../../smart-contracts/witnet-data-feeds/contract-addresses/" %}
[contract-addresses](../../smart-contracts/witnet-data-feeds/contract-addresses/)
{% endcontent-ref %}

### Learn More About Witnet Price Feeds

For more information on Witnet price feeds, please read the section dedicated to [Witnet Price Feeds](../../smart-contracts/witnet-data-feeds/). This contains a lot more information on alternative ways to consume the data feeds, how they operate, and what their contract addresses are.
