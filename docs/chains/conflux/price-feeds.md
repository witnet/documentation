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
| **BTC/USD**  | 6 | `24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946` | [`0x8594B74645644b6a5fdE15597D3ADc15C77284A1`](https://feeds.witnet.io/feeds/conflux-testnet_btc-usd_6) | [`0x84E250b43337512B04aa5449e3A15FB715b78E88`](https://feeds.witnet.io/feeds/conflux-mainnet_btc-usd_6)
| **CFX/USDT** | 6 | `65784185a07d3add5e7a99a6ddd4477e3c8caad717bac3ba3c3361d99a978c29` | [`0x81cc73426944cC15BE22a3d7c812282E66F2c689`](https://feeds.witnet.io/feeds/conflux-testnet_cfx-usdt_6) | [`0x86e9A67C92455afa725CC01b2036e47cd4dd9929`](https://feeds.witnet.io/feeds/conflux-mainnet_cfx-usdt_6
| **ETH/USD**  | 6 | `3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8` | [`0x80DfFcbD9Fa48553fbC98aa7c21D50Ae47753C89`](https://feeds.witnet.io/feeds/conflux-testnet_eth-usd_6) | [`0x8Fd10Ad4913DC1F0049B46BfeD9F061e100B7ED9`](https://feeds.witnet.io/feeds/conflux-mainnet_eth-usd_6) 

[ERC-2362]: https://github.com/adoracles/ado-contracts/blob/master/contracts/interfaces/IERC2362.sol
[ADOIP-0010]: https://github.com/adoracles/ADOIPs/blob/main/adoip-0010.md#registered-ids
