# Generating Randomness in your Smart Contracts

### Example 1: Bare Minimal
On each of the [EVM compatible chains supported by Witnet](./contract-addresses.md) there is an instance of the `WitnetRNG` contract that exposes the main randomness oracle functionality through a very simple interface.

The best way to interact with the `WitnetRNG` contract is through the `IWitnetRNG` interface, which is readily available in the [`witnet-solidity-bridge` npm package](https://www.npmjs.com/package/witnet-solidity-bridge).

This very basic example shows how easy is to source random `uint32` values into your own contracts:

{% embed url="https://gist.github.com/aesedepece/5bfd2096c78d8f86f130fc8afcbb2fe5" %}

#### Two-step Generation of Randomness

This example follows a very common workflow for many randomness use cases: first you need to take note of the current block number and ask the `WitnetRNG` to reseed itself, then, at a later time, you will be retrieving a random number that is derived from the random seed that was generated as a response to your former request.

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
Take into account that this example implements an asynchronous workflow — calling `fulfillRandomness()` right after `getRandomNumber()` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete.
{% endhint %}

### Example 2: Roll a die!

This example is doing something slightly more interesting: it simulates a dice game in which you need to pick a certain number, and then, after rolling the die, you will see if you guessed correctly what the lucky number would be:

{% embed url="https://gist.github.com/aesedepece/5daa8730faff65ef55b91f1ecfca616b" %}

As this example allows multiple users to play the dice game at the same time, a `mapping (address => Guess)` is used to separately track everyone's choice of numbers and the block in which they placed their guess. In this way, you can make sure that every roll of the die is only affecting guesses that were placed at least 1 block in advance, and that further rolls of the die will not affect the outcome of past guesses.

{% hint style="info" %}
Take into account that this example implements an asynchronous workflow — calling `fulfillRandomness()` right after `getRandomNumber()` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete.
{% endhint %}

### Example 3: Random Bytes

In addition to random numbers, the Witnet randomness oracle can also generate random sequences of bytes. Namely, these have the `bytes32` type in Solidity:

{% embed url="https://gist.github.com/aesedepece/a60449aaf6e7c6d65b7e717966061a17" %}

As you can see, this example is very similar to the [Example 1](generating-randomness-in-your-smart-contracts.md#example-1-bare-minimal) above. The `getRandomNumber()` function works the same, but `fulfillRandomness()` however uses the lower-level `witnet.randomnessAfter()` function to read the underlying random bytes instead of trying to derive a random integer from those:

```solidity
randomness = witnet.randomnessAfter(latestRandomizingBlock);
```

Generating random bytes is specially interesting for many NFT use cases in which you need to assign attributes and traits at random to each of the item in a colllection. By sourcing 32 random bytes at once, you can use each of the bytes to affect the different traits that you want to assign.

{% hint style="info" %}
Take into account that this example implements an asynchronous workflow — calling `fulfillRandomness()` right after `getRandomNumber()` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete.
{% endhint %}
