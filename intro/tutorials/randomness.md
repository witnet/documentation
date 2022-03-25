# 🔀 Randomness

In October 2021, a new Random Number Generator (RNG) capability was added to the Witnet protocol, allowing for secure sourcing of random numbers and byte arrays into smart contracts.

This is specially useful for lotteries, gaming, and assigning randomized sets of traits to NFT collection items to make them unique.

### Using the Witnet Randomness Oracle in your Solidity smart contracts

On each of the [EVM compatible chains supported by Witnet](../../smart-contracts/apis-and-http-get-post-oracle/contracts-addresses.md) there is an instance of the `WitnetRandomness` contract that exposes the main randomness oracle functionality through a very simple interface.

The best way to interact with the `WitnetRandomness` contract is through the `IWitnetRandomness` interface, which is readily available in the [`witnet-solidity-bridge` npm package](https://www.npmjs.com/package/witnet-solidity-bridge).

This example shows how easy is to source random `uint32` values into your own contracts:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol";

contract MyContract {

    uint32 public randomness;
    uint256 public latestRandomizingBlock;
    IWitnetRandomness witnet;
    
    constructor () {
        witnet = IWitnetRandomness(
            address("<address of the WitnetRandomness contract>")
        );
    }
    
    receive() external payable {}

    function getRandomNumber() external payable {
        latestRandomizingBlock = block.number;
        uint _usedFunds = witnet.randomize{value: msg.value}();
        if (_usedFunds < msg.value) {
            payable(msg.sender).transfer(msg.value - _usedFunds);
        }
    }
    
    function fulfillRandomness() external {
        assert(latestRandomizingBlock > 0);
        randomness = witnet.random(type(uint32).max + 1, 0, latestRandomizingBlock);
    }    
}
```

{% hint style="info" %}
This example follows a very common workflow for many randomness use cases: first you need to take note of the current block number and ask the `WitnetRandomness` to reseed itself, then, at a later time, you will be retrieving a random number that is derived from the random seed that was generated as a response to your former request.
{% endhint %}

{% hint style="success" %}
This 2-step process preserves unpredictability of the random numbers that you get because it guarantees that the number is derived from a seed that was generated only after the request was sent.
{% endhint %}

### Learn More About The Witnet Randomness Oracle

You can find here the complete documentation and API reference for the Witnet randomness oracle, along many more examples and walkthroughs:

{% content-ref url="../../smart-contracts/witnet-randomness-oracle/" %}
[witnet-randomness-oracle](../../smart-contracts/witnet-randomness-oracle/)
{% endcontent-ref %}

{% content-ref url="../../smart-contracts/witnet-randomness-oracle/generating-randomness" %}
[generating-randomness](../../smart-contracts/witnet-randomness-oracle/generating-randomness.md)
{% endcontent-ref %}
