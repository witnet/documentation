# Randomness

In October 2021, a new Random Number Generator (RNG) capability was added to the Witnet protocol, allowing for secure sourcing of random numbers and byte arrays into smart contracts.

This is specially useful for lotteries, gaming, and assigning randomized sets of traits to NFT collection items to make them unique.

### Using the Witnet Randomness Oracle, in a nutshell

On each of the [EVM compatible chains supported by Witnet](../../smart-contracts/apis-and-http-get-post-oracle/contracts-addresses.md) there is an instance of the `WitnetRNG` contract that exposes the main randomness oracle functionality through a very simple interface.

The best way to interact with the `WitnetRNG` contract is through the `IWitnetRNG` interface, which is readily available in the [`witnet-solidity-bridge` npm package](https://www.npmjs.com/package/witnet-solidity-bridge).

This example shows how easy is to source random `uint32` values into your own contracts:

{% embed url="https://gist.github.com/aesedepece/5bfd2096c78d8f86f130fc8afcbb2fe5" %}

{% hint style="success" %}
This example follows a very common workflow for many randomness use cases: first you need to take note of the current block number and ask the `WitnetRNG` to reseed itself, then, at a later time, you will be retrieving a random number that is derived from the random seed that was generated as a response to your former request.

This 2-step process preserves unpredictability of the random numbers that you get because it guarantees that the number is derived from a seed that was generated only after the request was sent.
{% endhint %}

### Learn More About The Witnet Randomness Oracle

You can find here the complete documentation and API reference for the Witnet randomness oracle, along many more examples and walkthroughs:

{% content-ref url="../../smart-contracts/witnet-randomness-oracle/" %}
[witnet-randomness-oracle](../../smart-contracts/witnet-randomness-oracle/)
{% endcontent-ref %}

