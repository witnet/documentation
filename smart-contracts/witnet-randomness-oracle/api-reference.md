# API Reference

## WitnetRandomness contract
### IWitnetRandonness interface
Functions defined within the [`IWitnetRandomness`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/IWitnetRandomness.sol) interface:
| **Function** | **Description**
| :- | :-
| `estimateRandomizeFee(uint256)` | Returns amount of wei required to be paid as a fee when requesting randomization with a transaction gas price as the one given.
| `getRandomizeData(uint256)` | Retrieves data of a randomization request that got successfully posted to the WRB within a given block. Returns zero values if no randomness request was actually posted within a given block.
| `getRandomnessAfter(uint256)` | Retrieves the randomness generated upon solving a request that was posted within a given block, if any, or to the _first_ request posted after that block, otherwise. Should the intended request happen to be finalized with errors on the Witnet oracle network side, this function will recursively try to return randomness from the next non-faulty randomization request found in storage, if any. Fails if: (a) no `randomize()` was not called in either the given block, or afterwards; (b) a request posted in/after given block does exist, but no result has been provided yet; or (c), all requests in/after the given block were solved with errors.
| `getRandomnessNextBlock(uint256)` | Tells what is the number of the next block in which a randomization request was posted after the given one. 
| `getRandomnessPrevBlock(uint256)` | Gets previous block in which a randomness request was posted before the given one.
| `isRandomized(uint256)` | Returns `true` only when the randomness request that got posted within given block was already reported back from the Witnet oracle, either successfully or with an error of any kind.
| `latestRandomizeBlock()` | Returns latest block in which a randomness request got sucessfully posted to the WRB.
| `random(uint32,uint256,uint256)` | Generates a pseudo-random number uniformly distributed within the range `[0 .. _range)`, by using the given `_nonce` value and the randomness returned by `getRandomnessAfter(_block)`. Fails under the same conditions as `getRandomnessAfter(uint256)` does.
| `random(uint32,uint256,bytes32)` | Generates a pseudo-random number uniformly distributed within the range `[0 .. _range)`, by using the given `_nonce` value and the given `_seed` as a source of entropy.
| `randomize() payable` |  Requests the Witnet oracle to generate an EVM-agnostic and trustless source of randomness. Only one randomness request per block will be actually posted to the WRB. Should there already be a posted request within current block, it will try to upgrade Witnet fee of current's block randomness request according to current gas price. In both cases, all unused funds shall be transfered back to the tx sender.
| `upgradeRandomizeFee(uint256) payable` | Increases Witnet fee related to a pending-to-be-solved randomness request, as much as it may be required in proportion to how much bigger the current `tx.gasprice` is with respect the highest gas price that was paid in either previous fee upgrades, or when the given randomness request was posted. All unused funds shall be transferred back to the `msg.sender`.

### UsingWitnet base contract
Public function inherited from the [`UsingWitnet`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/UsingWitnet.sol) abstract contract:
| **Function** | **Description**
| :- | :-
| `witnet()` | Returns the immutable address of the [**Witnet Request Board**](../apis-and-http-get-post-oracle/witnet-request-board.md) that interacts with the Witnet oracle's sidechain, for both posting new data requests and receiving results from it.
