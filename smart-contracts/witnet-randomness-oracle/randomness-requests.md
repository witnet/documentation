# Low-level Randomness Requests

The straight way to fetch randomness from the Witnet oracle is by posting a low-level Randomness Data Request to the [Witnet Request Board](../apis-and-http-get-post-oracle/witnet-request-board.md).

However, you will then need to add logic within your smart contract as to await for an answer from the Witnet side-chain and handle corner-case revert situations at the Witnet level, before feeding your favourite _Pseudo Random Number Generator_ (PRNG) algorithm with the 32-byte random seed provided by the Witnet oracle.

Besides, you or your contract will have to pay the required fee every time a randomness request is posted to the [Witnet Request Board](../apis-and-http-get-post-oracle/witnet-request-board.md).

{% hint style="success" %}
If your contract [inherits from `UsingWitnet`](../web-oracle/usingwitnet-inheritance.md), the reward will be estimated automatically. However, you should make sure that everytime a data request is posted, enough funds (i.e. EVM native currency) are provided as to cover the posting fee required by the Witnet Request Board. 
{% endhint %}


## Best practices

Now, depending on the lifespan of your smart contract, you can actually compose your Randomness Data Request following two different approaches:

**1.** First, if your contract needs a source of randomness for just once in its lifetime, you may just hardcode the Data Request bytecode with a predefined set of _**witnessing parameters**_, as shown in [this code snippet](./code.examples.md#harcoded-randomness-request). 

  {% hint style="info" %}
  The _**witnessing parameters**_ of a Witnet Data Request determine aspects like how many Witnet nodes are required to participate in solving that data request, how much these nodes are incentivized if they are proven to behave honestly, and how much they will be penalized if they act either mallicously or just fail to accomplish with the Witnet protocol commitments. The minimium number of Witnet nodes that are required to reach a broad consensus can also be specified.
  {% endhint %}

  {% hint style="error" %}  
  Please, be aware that if _witnessing parameters_ are not set properly, your request could either take a little longer to be solved, or worse, get reverted by the Witnet side-chain. For instance, if *witnessing fees* were set too low, there would be a high chance to get an `"InsufficientCommits"` error message as a result to your data request.
  {% endhint %}

**2.** As a second approach, if you expect to repeatedly request for randomness during an undetermined period of time, you may opt for using a pre-deployed copy of the [`WitnetRequestRandomness` contract](./api-reference.md#WitnetRequestRandomness) that will enable you, or your smart contract, to eventually change the _witnessing parameters_ of your request, on-chain. 

  {% hint style="success" %}
  Deploying a `WitnetRandomnessRequest` contract from scratch requires more than 2.000.000 gas units (in a regular layer-1 EVM). You or your contract can reduce this cost to a tenth (🎉) by "cloning" an already existing `WitnetRandomnessRequest` instance. Ownership of the cloned contract will be immediately granted to the entity that initiated the clone transaction. Learn how this can be done by following [this example](./code-examples.md#clone-a-pre-deployed-randomness-request-contract.md). 
  {% endhint %}


## Security concerns

- The `WitnetRandomnessRequest` is an **`Ownable`** contract, which means that, while ownership is not renounced (i.e. `renounceOwnership()`), the owner will be able to modify the _witnessing parameters_ of the underlying Data Request bytecode. The RAD bytecode, accesible via the `template()` method, will always remain immutable, though. 

- In you needed to request additional randomness before a previous one gets solved, your contract will have to implement the logic and data model to solve this functionality, while avoiding potential front-running attacks at the EVM level. 

  {% hint style="" %}
  This multi-pending requests feature is solved by the `WitnetRandomness` contract. Know more about it in [next section](./randomness-contract.md).
  {% endhint %}
