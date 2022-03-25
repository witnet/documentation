# Code Examples

### Example 1: Bare Minimal
On each of the [EVM compatible chains supported by Witnet](./contract-addresses.md) there is an instance of the `WitnetRandomness` contract that exposes the main randomness oracle functionality through a very simple interface.

The best way to interact with the `WitnetRandomness` contract is through the `IWitnetRandomness` interface, which is readily available in the [`witnet-solidity-bridge` npm package](https://www.npmjs.com/package/witnet-solidity-bridge).

This very basic example shows how easy is to source random `uint32` values into your own contracts:

```solidity

// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol";

contract MyContract {

    uint32 public randomness;
    uint256 public latestRandomizingBlock;
    IWitnetRandomness immutable public witnet;
    
    /// @param _witnetRandomness Address of the WitnetRandomness contract.
    constructor (IWitnetRandomness _witnetRandomness) {
        assert(address(_witnetRandomness) != address(0));
        witnet = _witnetRandomness;
    }
    
    receive () external payable {}

    function requestRandomNumber() external payable {
        latestRandomizingBlock = block.number;
        uint _usedFunds = witnet.randomize{ value: msg.value }();
        if (_usedFunds < msg.value) {
            payable(msg.sender).transfer(msg.value - _usedFunds);
        }
    }
    
    function fetchRandomNumber() external {
        assert(latestRandomizingBlock > 0);
        randomness = witnet.random(type(uint32).max, 0, latestRandomizingBlock);
    }
}
```

#### Two-step Generation of Randomness

This example follows a very common workflow for many randomness use cases: first you need to take note of the current block number and ask the `WitnetRandomness` to reseed itself, then, at a later time, you will be retrieving a random number that is derived from the random seed that was generated as a response to your former request.

This 2-step process preserves unpredictability of the random numbers that you get because it guarantees that the number is derived from a seed that was generated only after the request was sent.

#### Range of the Random Numbers

This example is generating random numbers in the range `[0, 4294967296)`, but you can narrow that range down at will through the first argument of the `witnet.random` function:

```solidity
fromZeroToNine = witnet.random(10, 0, latestRandomizingBlock);
```

As `witnet.random` always assumes that the range starts with `0`, you can use an addition to offset the range. For example, to make it `[1, 12]`:

```solidity
month = 1 + witnet.random(12, 0, latestRandomizingBlock);
```

And for `[-100, 100]`:

```solidity
temperature = -100 + witnet.random(201, 0, latestRandomizingBlock);
```

{% hint style="info" %}
Take into account that this example implements an asynchronous workflow — calling `fetchRandomNumber()` right after `requestRandomNumber()` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete.
{% endhint %}

### Example 2: Roll a die!

This example is doing something slightly more interesting: it simulates a dice game in which you need to pick a certain number, and then, after rolling the die, you will see if you guessed correctly what the lucky number would be:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol";

contract DieContract {

    uint32 sides;
    struct Guess {
        uint32 guessedNumber;
        uint256 blockHeight;
    }
    mapping (address => Guess) public guesses;
    IWitnetRandomness immutable public witnet;
    
    event Right(string message);
    event Wrong(string message);

    /// @param _witnetRandomness Address of the WitnetRandomness contract.
    constructor (IWitnetRandomness _witnetRandomness, uint32 _sides) {
        assert(address(_witnetRandomness) != address(0));
        witnet = _witnetRandomness;
        sides = _sides;
    }
    
    receive () external payable {}

    function guessNumber(uint32 _number) external payable {
        assert(_number > 0);
        assert(_number <= sides);
        assert(guesses[msg.sender].guessedNumber == 0);

        guesses[msg.sender].guessedNumber = _number;
        guesses[msg.sender].blockNumber = block.number;
        
        uint _usedFunds = witnet.randomize{ value: msg.value }();
        if (_usedFunds < msg.value) {
            payable(msg.sender).transfer(msg.value - _usedFunds);
        }
    }

    function roll() external {
        assert(guesses[msg.sender].guessedNumber != 0);
        
        uint32 luckyNumber = 1 + witnet.random(
            sides,
            0,
            guesses[msg.sender].blockNumber
        );
        
        if (luckyNumber == guesses[msg.sender].guessedNumber) {
            emit Right("Congratulations! You guessed the right number!");
        } else {
            emit Wrong("Sorry! You didn't guess the right number!");
        }
        
        guesses[msg.sender].guessedNumber = 0;
    }    
}
```

As this example allows multiple users to play the dice game at the same time, a `mapping (address => Guess)` is used to separately track everyone's choice of numbers and the block in which they placed their guess. In this way, you can make sure that every roll of the die is only affecting guesses that were placed at least 1 block in advance, and that further rolls of the die will not affect the outcome of past guesses.

{% hint style="info" %}
Take into account that this example implements an asynchronous workflow — calling `fulfillRandomness()` right after `getRandomNumber()` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete.
{% endhint %}

### Example 3: Random Bytes

In addition to random numbers, the Witnet randomness oracle can also generate random sequences of bytes. Namely, these have the `bytes32` type in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol";

contract MyContract {

    bytes32 public randomness;
    uint256 public latestRandomizingBlock;
    IWitnetRandomness immutable public witnet;
    
    /// @param _witnetRandomness Address of the WitnetRandomness contract.
    constructor (IWitnetRandomness _witnetRandomness) {
        assert(address(_witnetRandomness) != address(0));
        witnet = _witnetRandomness;
    }
    
    receive () external payable {}

    function requestRandomness() external payable {
        latestRandomizingBlock = block.number;
        uint _usedFunds = witnet.randomize{ value: msg.value }();
        if (_usedFunds < msg.value) {
            payable(msg.sender).transfer(msg.value - _usedFunds);
        }
    }
    
    function fetchRandomness() external {
        assert(latestRandomizingBlock > 0);
        randomness = witnet.getRandomnessAfter(latestRandomizingBlock);
    }
    
}
```

As you can see, this example is very similar to the [Example 1](generating-randomness-in-your-smart-contracts.md#example-1-bare-minimal) above. The `requestRandomness()` function works the same as `requestRandomNumber()` above, but `fetchRandomness()` however uses the lower-level `witnet.getRandomnessAfter()` function to read the underlying random bytes instead of trying to derive a random integer from those:

```solidity
randomness = witnet.getRandomnessAfter(latestRandomizingBlock);
```

Generating random bytes is specially interesting for many NFT use cases in which you need to assign attributes and traits at random to each of the item in a colllection. By sourcing 32 random bytes at once, you can use each of the bytes to affect the different traits that you want to assign.

{% hint style="info" %}
Take into account that this example implements an asynchronous workflow — calling `fetchRandomness()` right after `requestRandomness()` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete.
{% endhint %}
