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

|              | Decimals | Asset ID | Conflux.Testnet | Conflux.Mainnet |
| ------------ | :------: | :------- | :-------------- | :-------------- |
| **CFX/USDT** | 6 | `65784185a07d3add5e7a99a6ddd4477e3c8caad717bac3ba3c3361d99a978c29` | [`0x89e0b86eEC97Bc24F44e3eB206b22b235Db58C1E`](https://feeds.witnet.io/feeds/conflux-testnet_cfx-usdt_6) | Stay tuned!
| **BTC/USD**  | 6 | `637b7efb6b620736c247aaa282f3898914c0bef6c12faff0d3fe9d4bea783020` | [`0x8D8f26d4632A8d985618Ae60569C93f3a57009Da`](https://feeds.witnet.io/feeds/conflux-testnet_btc-usd_6) | Stay tuned!
| **ETH/USD**  | 6 | `dfaa6f747f0f012e8f2069d6ecacff25f5cdf0258702051747439949737fc0b5` | [`0x8fe2d6e0984fc65Ad68726A74d822881282A30A0`](https://feeds.witnet.io/feeds/conflux-testnet_eth-usd_6) | Stay tuned!

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids
