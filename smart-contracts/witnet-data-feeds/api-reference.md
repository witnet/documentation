# API Reference

## WitnetPriceRouter contract

### IWitnetPriceRouter interface

Unrestricted functions defined within the [`IWitnetPriceRouter`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetPriceRouter.sol) interface:

| **Function**                    | **Description**                                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `currencyPairId(string)`        | Pure helper function returning the `keccak256` hash (aka ID) of the provided string caption.               |
| `getPriceFeed(bytes32)`         | Returns the ERC165-compliant price feed contract currently serving updates on the given currency pair.     |
| `getPriceFeedCaption(address)`  | Returns human-readable caption of the currency pair being served by the given price feed contract address. |
| `lookupERC2362ID(bytes32)`      | Returns a human-readable caption of the given currency pair identifier, if known.                          |
| `supportedCurrencyPairs()`      | Returns a list of known currency pairs IDs.                                                                |
| `supportsCurrencyPair(bytes32)` | Returns `true` if the given pair is currently being served by a compliant price feed contract.             |
| `supportsPriceFeed(address)`    | Returns `true` if the given price feed contract is currently serving updates to any known currency pair.   |

### IERC2362 interface

| **Function**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `valueFor(bytes32)` | Returns the ERC2362-compliant tuple containing last valid price and timestamp for the given currency pair, as well as the status of the latest update request that got posted to the Witnet oracle: `200`, if the latest update request was succesfully solved with no errors; `400`, if the latest update request was solved with errors; or `404`, if the latest update request was not solved yet. |

## WitnetPriceFeed contract

### IWitnetPriceFeed interface

Functions defined within the [`IWitnetPriceFeed`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetPriceFeed.sol) interface:

| **Function**                 | **Description**                                                                                                                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `estimateUpdateFee(uint256)` | Estimates minimum fee amount in native currency to be paid when requesting a new price update. Actual fee depends on the gas price when calling `requestUpdate()`.                                                                                                                          |
| `lastPrice()`                | Returns result of the last valid price update request successfully solved by the Witnet oracle.                                                                                                                                                                                             |
| `lastTimestamp()`            | Returns the EVM-timestamp when last valid price was reported back from the Witnet oracle.                                                                                                                                                                                                   |
| `lastValue()`                | Returns a tuple containing last valid price and timestamp, the Witnet transaction hash that triggered the last valid update, as well as the status code of the latest update request that got posted to the Witnet oracle.                                                                  |
| `latestQueryId()`            | Returns identifier of the latest update request posted to the Witnet oracle.                                                                                                                                                                                                                |
| `latestUpdateDrTxHash()`     | Returns hash of the Witnet transaction that triggered the latest update request, or `0x0` while it remains unsolved.                                                                                                                                                                        |
| `latestUpdateErrorMessage()` | Returns an explanatory error message, if any, of the latest update request posted to the Witnet oracle, or an empty string if it was not yet solved, or was solved with no errors.                                                                                                          |
| `latestUpdateStatus()`       | Returns the status code of the latest update request posted to the Witnet oracle: `200`, if the latest update request was succesfully solved with no errors; `400`, if the latest update request was solved with errors; or `404`, if the latest update request was not solved yet.         |
| `pendingUpdate()`            | Returns `true` if the latest update request posted to the Witnet oracle has not been solved yet.                                                                                                                                                                                            |
| `requestUpdate() payable`    | Posts a new price udpate request to the Witnet oracle. Requires payment of a fee that depends on the value of `tx.gasprice`. If the previous update request was not solved yet, calling this method again allows you to upgrade the update fee, if called with a higher `tx.gasprice`value. |
| `supportsInterface(bytes4)`  | Tells whether this contract implements the interface defined by its `interfaceId`. See [EIP-165](https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified).                                                                                                                     |

### IWitnetRequest interface

Functions defined within the [`IWitnetRequest`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetRequest.sol) interface:

| **Function** | **Description**                                                                                                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bytecode()` | The Witnet Data Request reflecting the [**RADON script**](../apis-and-http-get-post-oracle/api-reference.md) that will be processed by the Witnet oracle on every single price update. The returned `bytes` array is encoded using Protocol Buffers. |
| `hash()`     | Returns the SHA256 hash of the `bytecode()`.                                                                                                                                                                                                         |

### UsingWitnet base contract

Public function inherited from the [`UsingWitnet`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/UsingWitnet.sol) abstract contract:

| **Function** | **Description**                                                                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `witnet()`   | Returns the immutable address of the [**Witnet Request Board**](../apis-and-http-get-post-oracle/witnet-request-board.md) that interacts with the Witnet oracle's sidechain, for both posting new data requests and receiving results from it. |
