# Witnet Price Feeds on Conflux Network

Witnet Foundation operates a series of public price feeds in cooperation with Conflux Network both for showcasing the
capabilities of the Witnet oracle,and as a public service for the broader Conflux community.

All Witnet price feeds comply with the [ERC-2362] interface: a standard interface for price feeds, cooperatively
envisioned by Witnet, Tellor, Band, Razor and other oracles.

Therefore, using any of these price feeds is as simple as:

```solidity
pragma solidity >=0.5.0 <0.9.0;

import "ado-contracts/contracts/interfaces/IERC2362.sol";

contract MyContract {

    function readFromPriceFeed() external view returns(int256) {
        IERC2362 priceFeed = IERC2362("<address of the price feed>");
        bytes32 assetID = bytes32(hex("<asset ID>"));
        int256 value = priceFeed.valueFor(assetID);

        return value;
    }

}
``` 

The available asset IDs for each of the public price feeds are also listed down below. A full list of asset IDs can
be found in [ADOIP-0010].

!!! tip "Floats and decimal digits"
    As Solidity does not currently support `float` types, all prices are provided as `int256`, with a specific number
    of decimal digits. For example, if the BTC/USD price is `31371.21`, the BTC/USD contract below will give`31371210`
    because it is using 3 decimal digits.

## CFX/USDT

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/ERC2362PriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CfxUsdtPrice.js)
* Asset ID: `65784185a07d3add5e7a99a6ddd4477e3c8caad717bac3ba3c3361d99a978c29`
* Decimal digits: 6

##### Conflux Mainnet - Tethys

This price feed is not live yet on Conflux mainnet, but will be deployed soon. Stay tuned!

##### Conflux Testnet

* Data explorer: [feeds.witnet.io/feeds/conflux-testnet_cfx-usdt_6](https://feeds.witnet.io/feeds/conflux-testnet_cfx-usdt_6)
* Contract address: [`cfxtest:ace8bsds7wn52khyk29nebzwfpvz5rppd28kcxetj8`](https://testnet.confluxscan.io/address/cfxtest:ace8bsds7wn52khyk29nebzwfpvz5rppd28kcxetj8)

## ETH/USD

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/ERC2362PriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/EthUsdPrice.js)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

##### Conflux Mainnet - Tethys

This price feed is not live yet on Conflux mainnet, but will be deployed soon. Stay tuned!

##### Conflux Testnet

* Data explorer: [feeds.witnet.io/feeds/conflux-testnet_eth-usd_3](https://feeds.witnet.io/feeds/conflux-testnet_eth-usd_3)
* Contract address: [`cfxtest:ach8fz1axbh6p000u6xmsxpcfcawumvuyau4ac8tu5`](https://testnet.confluxscan.io/address/cfxtest:ach8fz1axbh6p000u6xmsxpcfcawumvuyau4ac8tu5)


## BTC/USD

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/ERC2362PriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BtcUsdPrice.js)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`
* Decimal digits: 3

##### Conflux Mainnet - Tethys

This price feed is not live yet on Conflux mainnet, but will be deployed soon. Stay tuned!

##### Conflux Testnet

* Data explorer: [feeds.witnet.io/feeds/conflux-testnet_btc-usd_3](https://feeds.witnet.io/feeds/conflux-testnet_btc-usd_3)
* Contract address: [`cfxtest:acg28k0yppzj5gc0dc1gazy6wt34m6ak5j5t12htkn`](https://testnet.confluxscan.io/address/cfxtest:acg28k0yppzj5gc0dc1gazy6wt34m6ak5j5t12htkn)

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids
