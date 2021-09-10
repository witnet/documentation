# Witnet Public Price Feeds

Witnet Foundation operates a series of public price feeds both for showcasing the capabilities of the Witnet oracle,
and as a public service for the broader Ethereum community.

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

## Data Explorer links

|              | Decimals | Asset ID | Mainnet | Goerli  | Rinkeby
| ------------ | :------: | :------- | :------ | :------ | :------
| **BTC/USD**  | 6 | `24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946` | [Stay tuned!](https://feeds.witnet.io/feeds/ethereum-mainnet_btc-usd_6) | [`0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c`](https://feeds.witnet.io/feeds/ethereum-goerli_btc-usd_6) | [`0xa7C971149AdfdFB237A0F78D7d317B916FFCE093`](https://feeds.witnet.io/feeds/ethereum-rinkeby_btc-usd_6)
| **ETH/USD**  | 6 | `3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8` | [Stay tuned!](https://feeds.witnet.io/feeds/ethereum-mainnet_eth-usd_6) | [`0x031699240f710B47e92Df7766C06ee6C22A75df1`](https://feeds.witnet.io/feeds/ethereum-goerli_eth-usd_6) | [`0x1320C130Fc5361ced969Ca737d692a30e1142a13`](https://feeds.witnet.io/feeds/ethereum-rinkeby_eth-usd_6)

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids
