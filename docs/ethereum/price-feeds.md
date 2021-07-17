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

## Mainnet

### BTC/USD
* Address: [0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9](https://etherscan.io/address/0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9)
* Source code: [Check out on Etherscan](https://etherscan.io/address/0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9#code)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`
* Decimal digits: 3

### ETH/USD
* Address: [0x1ebD93231a7fE551E1d6405404Df34909eff4c2C](https://etherscan.io/address/0x1ebD93231a7fE551E1d6405404Df34909eff4c2C)
* Source code: [Check out on Etherscan](https://etherscan.io/address/0x1ebD93231a7fE551E1d6405404Df34909eff4c2C#code)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

## Rinkeby

### BTC/USD
* Address: [0x58995FaD03158fB9cd64397347bA97714EF8fC12](https://rinkeby.etherscan.io/address/0x58995FaD03158fB9cd64397347bA97714EF8fC12)
* Source code: [Check out on Etherscan](https://rinkeby.etherscan.io/address/0x58995FaD03158fB9cd64397347bA97714EF8fC12#code)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`  
* Decimal digits: 3

### ETH/USD
* Address: [0xAe9821fbA4Bd76fd6D39859bd7c3d4A90b2ceE40](https://rinkeby.etherscan.io/address/0xAe9821fbA4Bd76fd6D39859bd7c3d4A90b2ceE40)
* Source code: [Check out on Etherscan](https://rinkeby.etherscan.io/address/0xAe9821fbA4Bd76fd6D39859bd7c3d4A90b2ceE40#code)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

## Goerli

### BTC/USD
* Address: [0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E](https://goerli.etherscan.io/address/0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E)
* Source code: [Check out on Etherscan](https://goerli.etherscan.io/address/0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E#code)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`
* Decimal digits: 3

### ETH/USD
* Address: [0xAa0AA725aEb1d382F909a8dE3041e9eaD6507501](https://goerli.etherscan.io/address/0xAa0AA725aEb1d382F909a8dE3041e9eaD6507501)
* Source code: [Check out on Etherscan](https://goerli.etherscan.io/address/0xAa0AA725aEb1d382F909a8dE3041e9eaD6507501#code)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

## Kovan

### BTC/USD
* Address: [0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E](https://kovan.etherscan.io/address/0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E)
* Source code: [Check out on Etherscan](https://kovan.etherscan.io/address/0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E#code)
* Asset ID: `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020`
* Decimal digits: 3

### ETH/USD
* Address: [0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8](https://kovan.etherscan.io/address/0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8)
* Source code: [Check out on Etherscan](https://kovan.etherscan.io/address/0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8#code)
* Asset ID: `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5`
* Decimal digits: 3

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids