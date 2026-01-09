# 📈 Using Witnet Price Feeds

The **Wit/Oracle Framework** is a set of smart contracts deployed by the Witnet Foundation on a wide selection of EVM chains and L2s. This framework enables bidirectional interconnection between smart contracts and the **Witnet public blockchain** to retrieve, aggregate and deliver real-world data from one or multiple public sources on the Internet, the IPFS network or even other blockchains.

> Witnet securely collects data using cryptographic, crowd-attestation and Proof-of-Stake consensus mechanisms. Every oracle data query and its outcome, whether successful or not, is permanently and publicly recorded on the Witnet blockchain.

The Wit/Oracle Framework provides secure, reliable, and permissionless access to both **third-party** **subsidized** and **self-service price feeds** through a **PUSH**-like mechanism. Additionally, it includes the necessary tools and methods for reporting on-demand updates with a **PULL**-like approach.

::: tip
**Why is it different to other oracle solutions?**

Contracts consuming Witnet price feeds can dynamically evaluate the quality and trustworthiness of each on-chain update, taking into account factors such as:

* the number or even the actual FQDNs[^1] of the public sources providing price updates,
* the number of witnessing nodes required to notarize price updates in Witnet,
* or, the freshness of the last update reported on-chain.

Extra security measures can also be settled on **self-service price feeds**:

* implementing multiple oracle fallback strategies,
* computing the EMA[^2] on most sensible price feeds,
* gating excessive price deviation thresholds,
* or, delaying the on-chain finality of price feed updates.
:::

***

### Reading Witnet price feeds

Reading the latest update of a Witnet price feed is extremely simple. All you need to know is the address of some **`WitPriceFeeds`** routing contract, and how the price feed is named within such contract.

This example obtains the latest BTC/USD-6 price update, subsidized by the Witnet Foundation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import {
    UsingWitPriceFeeds,
    IWitPriceFeeds
} from "@witnet/solidity/contracts/UsingWitPriceFeeds.sol";

contract MyContract1
    is
        UsingWitPriceFeeds
{
    bytes4 internal const _BTC_USD = 0x276f7be0;
    /// bytes4(keccak256(abi.encode("Crypto.BTC/USD-6")))

    constructor ()
        UsingWitPriceFeeds(
            // The WitPriceFeeds instance subsidized by the Witnet Foundation:
            IWitPriceFeeds(0x3210564CFC8855cAD45D6d963118058fe2B80123)
        )
    {
        require(
            __witPriceFeeds.supportsCaption("Crypto.BTC/USD-6"),
            "btc/usd not supported"
        );
    }

    /// @notice Returns the BTC/USD price, together with some extra info:
    ///   - the hash of the data request transaction that notarized the update in Witnet
    ///   - the timestamp at which the price was captured by Witnet
    ///   - the base-10 exponent to be applied when presenting the actual price
    ///   - the amount that the price has changed since the previous on-chain update.
    /// @devs Reverts if the price has been stale for longer than some expected heartbeat.
    function getBtcUsdPrice()
        external view
        returns (Price memory _lastUpdate)
    {
        _lastUpdate = __witPriceFeeds.getPrice(_BTC_USD);
    }

    /// @notice Returns the BTC/USD price, together with some extra tracking information.
    /// @devs Reverts if the price is older than the specified amount of `_seconds`.
    function getBtcUsdPriceNotOlderThan(uint24 _seconds)
        external view
        returns (Price memory _lastUpdate)
    {
        _lastUpdate = __witPriceFeeds.getPriceNotOlderThan(_BTC_USD, _seconds);
    }

    /// ...
}
```

### Verifying data trustworthiness

Consumers can validate multiple quality metrics for each supported price feed.

This example verifies whether the BTC/USD price feed is backed up by at least two independent oracle solutions or is sourced from at least three public data providers. In the latter scenario, it confirms that a minimum of 5 witnessing nodes are randomly selected in Witnet to agree on the result for each price update.

```solidity
/// ...
function _verifyBtcUsdQoS() internal view returns (bool) {
    PriceFeedQoS memory _qos = __witPriceFeeds.lookupPriceFeedQualityMetrics(_BTC_USD);
    return (
        _qos.numFallbackOracles >= 1 || (
            _qos.witnessingCommitteeSize >= 5
                && _qos.numTrackableDataSources >= 3
        )
    );
}
```

### Listing supported price feeds

Consumers can dynamically check the list of supported price feeds within a `WitPriceFeeds` instance, along with additional details such as trackable data sources (if any), potential oracle fallback strategies, price updating conditions and possible dependencies on other price feeds:

::: tabs
== Solidity
```solidity
/// ...
function lookupPriceFeeds()
    public view
    returns (PriceFeedInfo[] memory _priceFeeds)
{
    _priceFeeds = __witPriceFeeds.lookupPriceFeeds();
    // ...
}
```
== Typescript
```ts
import { WitOracle, type PriceFeedInfo } from "@witnet/solidity"

const EVM_TARGET_ADDRESS = "0x3210564CFC8855cAD45D6d963118058fe2B80123"

async function main() {
    // Instantiate the Wit/Oracle core wrapper within the connected EVM network:
    const witOracle = await WitOracle.fromJsonRpcProvider("http://127.0.0.1:8545")

    // Instantiate the target WitPriceFeeds contract, making sure it's bound
    // to the legacy Wit/Oracle Framework within the connected EVM network:
    const witPriceFeeds = await witOracle.getWitPriceFeedsAt(EVM_TARGET_ADDRESS)

    // Fetch the list of currently supported price feeds on the targeted address:
    let priceFeeds: Array<PriceFeedInfo> = await witPriceFeeds.lookupPriceFeeds()
    priceFeeds.forEach(({
        id4,
        symbol,
        exponent,
        mapper,
        oracle,
        updateConditions,
        lastUpdate
    }) => {
        // ...
    });
    // ...
}

main()
```
== CLI
```bash
$ npx witeth priceFeeds [--target <addr>]
```
:::

::: info
To see the list of price feeds currently subsidized by the Witnet Foundation, please [visit this link](https://feeds.witnet.io/).
:::

***

### Learn more about Witnet Price Feeds

For more information on how to interact with `WitPriceFeeds` contracts, please go to:

<InternalLinkButton
  text="Witnet data feeds"
  to="/smart-contracts/witnet-data-feeds/"
/>

::: tip
👆 This section explains alternative ways to use price feeds with Witnet, including how to switch from other oracle solutions, report on-demand price updates, create and manage a custom routing contract, and explore alternative data sources for your feeds.
:::
