# Witnet Price Feeds on Conflux networks

Witnet Foundation operates a series of public price feeds in cooperation with Conflux Network both for showcasing the
capabilities of the Witnet oracle, and as a public service for the broader Conflux community.

All Witnet price feeds comply with the [ERC-2362] interface: a standard interface for price feeds, cooperatively
envisioned by Witnet, Tellor, Band, Razor and other oracles. All price feeds are deployed based on the same template[Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/ERC2362PriceFeed.sol).

Therefore, using any of these already deployed price feeds is as simple as:

```solidity
pragma solidity >=0.5.0 <0.9.0;

/// @dev EIP-2362 Interface for pull oracles
/// https://github.com/adoracles/EIPs/blob/erc-2362/EIPS/eip-2362.md
interface IERC2362 {
	/// @dev Exposed function pertaining to EIP standards
	/// @param _id bytes32 ID of the query
	/// @return int,uint,uint returns the value, timestamp, and status code of query
	function valueFor(bytes32 _id) external view returns (int256, uint256, uint256);
}

contract MyContract {
    function readFromPriceFeed() external view returns (int256 _value) {
        IERC2362 priceFeed = IERC2362(<address of the price feed>);
        bytes32 assetID = bytes32(hex"<asset ID>");
        (_value,, ) = priceFeed.valueFor(assetID);
    }
}
``` 

The available asset IDs for each of the public price feeds are also listed down below. A full list of asset IDs can
be found in [ADOIP-0010].

!!! tip "Floats and decimal digits"
    As Solidity does not currently support `float` types, all prices are provided as `int256`, with a specific number
    of decimal digits. For example, if the BTC/USD price is `31371.21456`, the BTC/USD contract below will give`31371214560` because it is using 6 decimal digits.

## Data Explorer links (and raw addresses)

|              | Decimals | Asset ID | Celo.Alfajores  | Celo.Mainnet |
| ------------ | :------: | :------- | :-------------- | :----------- |
| **BTC/USD**  | 6 | `24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946` | [`0x4F8Ac2D45475A1894Cb85E3A21173d5e83041083`](https://feeds.witnet.io/feeds/celo-alfajores_btc-usd_6) | [`0xa1A950054d1F778B0758EBe89914410d01A37248`](https://feeds.witnet.io/feeds/celo-mainnet_btc-usd_6)
| **ETH/USD**  | 6 | `3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8` | [`0xD182e334e3c7140F8a520d326E333CA5f1FB7dDa`](https://feeds.witnet.io/feeds/celo-alfajores_eth-usd_6) | [`0x3ebE9D7BF6cc4A4132c7fC75225f0D1c476d6ACb`](https://feeds.witnet.io/feeds/celo-mainnet_eth-usd_6)
| **CELO/EUR**  | 6 | `21a798210f2f9a59348801ac3dd2d6ba14edec757bd7bc1894181af90a7fd3a2` | [`0x9627CB0314368BC70587912119a4F03Ba0b179B5`](https://feeds.witnet.io/feeds/celo-alfajores_celo-eur_6) | [`0xdDBf8eBC2C5435bf2251611466b45bf625a6E1DB`](https://feeds.witnet.io/feeds/celo-mainnet_celo-eur_6)
| **CELO/USD**  | 6 | `9ed884be27401b98a6c3e9d830d4288c949712e57a58235927b1a00dcd487073` | [`0xA4dBe748BA8E3220eAC07cB4c951909fc089c3dD`](https://feeds.witnet.io/feeds/celo-alfajores_celo-usd_6) | [`0x45EE6664E3be238C3ebC0462e0750e103ff6F24E`](https://feeds.witnet.io/feeds/celo-mainnet_celo-usd_6)

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids
