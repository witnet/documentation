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

## BTC/USD

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/BtcUsdPriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BitcoinPrice.js)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`
* Decimal digits: 3

##### Conflux Mainnet - Tethys

This price feed is not live yet on Conflux mainnet, but will be deployed soon. Stay tuned!

##### Conflux Testnet

* Contract address: [cfxtest:acexkt9t0dm7tzhv9t1znbnc83ehtb703u9pyvd0cd](https://testnet.confluxscan.io/address/cfxtest:acexkt9t0dm7tzhv9t1znbnc83ehtb703u9pyvd0cd)

## ETH/USD

* Source code:
    * [Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/EthUsdPriceFeed.sol)
    * [Witnet data request](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/EthPrice.js)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

##### Conflux Mainnet - Tethys

This price feed is not live yet on Conflux mainnet, but will be deployed soon. Stay tuned!

##### Conflux Testnet

* Contract address: [cfxtest:achf22mnyxrkt4bd4xb9b1fufwdw3bhg2pe445me8s](https://testnet.confluxscan.io/address/cfxtest:achf22mnyxrkt4bd4xb9b1fufwdw3bhg2pe445me8s)


[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids