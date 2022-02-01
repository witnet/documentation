# API Reference

## WitnetRandomness contract
### IWitnetRandomness interface
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
| `witnetRandomnessRequest()` | Returns address to the [`WitnetRequestRandomness`](#iwitnetrequest-interface) contract that is being used for requesting new randomness to the Witnet oracle.

### Clonable base contract
Public functions inherited from the [`Clonable`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/patterns/Clonable.sol) abstract pattern:
| **Function** | **Description**
| :- | :-
| `cloned()` | Tells whether this contract is a clone of another (i.e. `self()`)
| `clone()` | Deploys and returns the address of a minimal proxy clone that replicates contract behaviour while using its own EVM storage.
| `cloneDeterministic(bytes32)` | Deploys and returns the address of a minimal proxy clone that replicates contract behaviour while using its own EVM storage. This function uses the CREATE2 opcode and a `_salt` to deterministically deploy the clone. Using the same `_salt` multiple times will revert, since no contract can be deployed more than once at the same address.
| `self()` | Returns the address of the underlying logic implementation contract.

### UsingWitnet base contract
Public function inherited from the [`UsingWitnet`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/UsingWitnet.sol) abstract contract:
| **Function** | **Description**
| :- | :-
| `witnet()` | Returns the immutable address of the [**Witnet Request Board**](../apis-and-http-get-post-oracle/witnet-request-board.md) that interacts with the Witnet oracle's sidechain, for both posting new data requests and receiving results from it.


## WitnetRequestRandomness contract

### IWitnetRequest interface
Functions defined within the [`IWitnetRequest`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetRequest.sol) interface:
| **Function** | **Description**
| :- | :-
| `bytecode()` | The Witnet Data Request reflecting the [**RADON script**](../apis-and-http-get-post-oracle/api-reference.md) that will be processed by the Witnet oracle on every single price update. The returned `bytes` array is encoded using Protocol Buffers.
| `hash()` | Returns the SHA256 hash of the `bytecode()`. 

### WitnetRequestMalleableBase base contract
Public and restricted functions inherited from the [`WitnetRequestMalleableBase`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/requests/WitnetRequestMalleableBase.sol) abstract contract:
| **Function** | **Description**
| :- | :-
| `setWitnessingCollateral(uint64)` | Sets amount of nanowits that a witness solving the request will be required to collateralize in the commitment transaction. Only callable by the [`owner()`](#ownable-base-contract), if any.
| `setWitnessingFees(uint64,uint64)` | Specifies how much you want to pay for rewarding each of the Witnet nodes: (a) amount of nanowits that every request-solving witness will be rewarded with; (b) amount of nanowits that will be earned by Witnet miners for each each valid commit/reveal transaction they include in a block. Only callable by the [`owner()`](#ownable-base-contract), if any.
| `setWitnessingQuorum(uint8,uint8)` | Sets how many Witnet nodes will be "hired" for resolving the request: (a) number of witnesses required to be involved for solving this Witnet Data Request; (b) threshold percentage for aborting resolution of a request if the witnessing nodes did not arrive to a broad consensus. Only callable by the [`owner()`](#ownable-base-contract), if any.
| `template()` | Returns bytecode of the immutable RAD (Retrieve-Attest-Delivery) script's bytecode. Encoded using Protocol Buffers. 
| `totalWitnessingCollateral()` | Returns total amount of nanowits that witnessing nodes will need to collateralize all together.
| `totalWitnessingFee()` | Returns total amount of nanowits that will have to be paid in total for this request to be solved.
| `witnessingParams()` | Returns witnessing parameters of current Witnet Data Request.

### Clonable base contract
Public functions inherited from the [`Clonable`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/patterns/Clonable.sol) abstract pattern:
| **Function** | **Description**
| :- | :-
| `cloned()` | Tells whether this contract is a clone of another (i.e. `self()`)
| `clone()` | Deploys and returns the address of a minimal proxy clone that replicates contract behaviour while using its own EVM storage.
| `cloneDeterministic(bytes32)` | Deploys and returns the address of a minimal proxy clone that replicates contract behaviour while using its own EVM storage. This function uses the CREATE2 opcode and a `_salt` to deterministically deploy the clone. Using the same `_salt` multiple times will revert, since no contract can be deployed more than once at the same address.
| `self()` | Returns the address of the underlying logic implementation contract.

### Ownable base contract
Public function inherited from the [`Ownable`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/patterns/Ownable.sol) abstract pattern:
| **Function** | **Description**
| :- | :-
| `owner()` | Tells who the current owner of this contract is. Owner may only modify the witnessing parameters of the contained Witnet Data Request, not the actual RAD (Retrieval-Attest-Deliver) script to be executed by Witnet nodes when solving the Data Request. Ownership can only be transferred by current owner. Ownership of this Data Request can only be gained by cloning the `WitnetRandomness` contract.


