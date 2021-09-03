# Witnet Public Price Feeds

Witnet Foundation operates a series of public price feeds both for showcasing the capabilities of the Witnet oracle,
and as a public service for the broader Ethereum community.

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

## ETH/USD

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/EthUsdPriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/EthPrice.js)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

##### Mainnet
* Data explorer: [feeds.witnet.io/feeds/ethereum-mainnet_eth-usd_3](https://feeds.witnet.io/feeds/ethereum-mainnet_eth-usd_3)
* Contract address: [0x1ebD93231a7fE551E1d6405404Df34909eff4c2C](https://etherscan.io/address/0x1ebD93231a7fE551E1d6405404Df34909eff4c2C)

##### Rinkeby
* Data explorer: [feeds.witnet.io/feeds/ethereum-rinkeby_eth-usd_3](https://feeds.witnet.io/feeds/ethereum-rinkeby_eth-usd_3)
* Contract address: [0x1320C130Fc5361ced969Ca737d692a30e1142a13](https://rinkeby.etherscan.io/address/0x1320C130Fc5361ced969Ca737d692a30e1142a13)

##### Goerli
* Data explorer: [feeds.witnet.io/feeds/ethereum-goerli_eth-usd_3](https://feeds.witnet.io/feeds/ethereum-goerli_eth-usd_3)
* Contract address: [0x031699240f710B47e92Df7766C06ee6C22A75df1](https://goerli.etherscan.io/address/0x031699240f710B47e92Df7766C06ee6C22A75df1)

##### Kovan
* Contract address: [0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8](https://kovan.etherscan.io/address/0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8)

## BTC/USD

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/BtcUsdPriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BitcoinPrice.js)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`
* Decimal digits: 3

##### Mainnet
* Data explorer: [feeds.witnet.io/feeds/ethereum-mainnet_btc-usd_3](https://feeds.witnet.io/feeds/ethereum-mainnet_btc-usd_3)
* Contract address: [0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9](https://etherscan.io/address/0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9)

##### Rinkeby
* Data explorer: [feeds.witnet.io/feeds/ethereum-rinkeby_btc-usd_3](https://feeds.witnet.io/feeds/ethereum-rinkeby_btc-usd_3)
* Contract address: [0xa7C971149AdfdFB237A0F78D7d317B916FFCE093](https://rinkeby.etherscan.io/address/0xa7C971149AdfdFB237A0F78D7d317B916FFCE093)

##### Goerli
* Data explorer: [feeds.witnet.io/feeds/ethereum-goerli_btc-usd_3](https://feeds.witnet.io/feeds/ethereum-goerli_btc-usd_3)
* Contract address: [0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c](https://goerli.etherscan.io/address/0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c)

##### Kovan
* Contract address: [0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E](https://kovan.etherscan.io/address/0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E)

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids
