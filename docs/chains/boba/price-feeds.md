# Witnet Price Feeds on BOBA Networks

Witnet Foundation operates a series of public price feeds in cooperation with BOBA Network both for showcasing the
capabilities of the Witnet oracle, and as a public service for the broader BOBA community.

All Witnet price feeds comply with the [ERC-2362] interface: a standard interface for price feeds, cooperatively
envisioned by Witnet, Tellor, Band, Razor and other oracles. All price feeds are deployed based on the same template[Solidity contract](https://github.com/witnet/witnet-price-feed-examples/blob/master/contracts/ERC2362PriceFeedBoba.sol).

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

|             | Decimals | Asset ID | BOBA.Rinkeby | BOBA.Mainnet |
| ----------- | :------: | :------- | :----------- | :----------- |
| **OMG/BTC** | 9 | `c4ec7fbc6384f83dad668488519c7195acafd67645ebcc7f76a8d747feaca2fb` | [``](https://feeds.witnet.io/feeds/boba-rinkeby_omg-btc_9) | Stay tuned!
| **OMG/ETH** | 9 | `e2960cc030131ae6ce0d14aea9ecfa937461aa22d2d55a36b44b27737a11bd75` | [``](https://feeds.witnet.io/feeds/boba-rinkeby_omg-eth_9) | Stay tuned!
| **OMG/USDT** | 6 | `fb2c779532e89f660244ccdd71749e8d75b3e53a8fc0d5531ef814f8b8300eef` | [``](https://feeds.witnet.io/feeds/boba-rinkeby_omg-usdt_6) | Stay tuned!
| **BTC/USD** | 6 | `24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946` | [``](https://feeds.witnet.io/feeds/boba-rinkeby_btc-usd_6) | Stay tuned!
| **ETH/USD** | 6 | `3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8` | [``](https://feeds.witnet.io/feeds/boba-rinkeby_eth-usd_6) | Stay tuned!

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids