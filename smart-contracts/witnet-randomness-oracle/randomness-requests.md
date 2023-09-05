# Low-level Requests

The straight way to fetch randomness from the Witnet oracle is by posting a low-level randomness data request to the [**WitnetRequestBoard**](../witnet-web-oracle/api-reference/api-solidity/solidity-contracts/witnet-request-board.md).

However, you will then need to add logic within your smart contract as to await for an answer from the Witnet side-chain and handle corner-case revert situations at the Witnet level, before feeding your favourite _Pseudo Random Number Generator_ (PRNG) algorithm with the 32-byte random seed provided by the Witnet oracle.

Besides, you or your contract will have to pay the required fee every time a randomness request is posted to the [WitnetRequestBoard](../witnet-web-oracle/api-reference/api-solidity/solidity-contracts/witnet-request-board.md).

{% hint style="success" %}
If your contract inherits from the [**UsingWitnet** abstract contract](../witnet-web-oracle/usingwitnet-inheritance.md), the reward will be estimated automatically. However, you should make sure that everytime a data request is posted, enough funds (i.e. EVM native currency) are provided as to cover the posting fee required by the **WitnetRequestBoard**.
{% endhint %}

## Best practices

Now, depending on the lifespan of your smart contract, you can actually compose your randomness data request following two different approaches:

**1.** First, if your contract needs a source of randomness for just once in its lifetime, you may just hardcode the Witnet data request bytecode with a predefined set of _witnessing parameters_, as shown in [this code example](code-examples.md#example-4-post-a-low-level-hardcoded-randomness-request).

{% hint style="info" %}
The _**witnessing parameters**_ of a Witnet data request determine aspects like how many Witnet nodes are required to participate in solving that data request, how much these nodes are incentivized if they are proven to behave honestly, and how much they will be pf
{% endhint %}

{% hint style="warning" %}
If the _**witnessing parameters**_ are not wisely set, your request could either take too long to resolve, or get eventually reverted by the Witnet side-chain. For instance, if the _witnessing fees_ were set too low, there would be a high chance of getting an `"InsufficientCommits"` error message as a result to your data request.
{% endhint %}

**2.** As a second approach, if you expect to repeatedly request for randomness an undetermined number of times, you may opt for using a pre-deployed copy of the [**`WitnetRequestRandomness` contract**](api-reference.md#witnetrequestrandomness-contract) that will enable you, or your smart contract, to eventually change the _witnessing parameters_ of your request.

{% hint style="success" %}
Deploying a new instance of `WitnetRequestRandomness` requires more than 2,000,000 gas units. This cost, however, can be reduced to a tenth (🎉) by cloning a previously deployed instance. Ownership of the cloned copy will be immediately granted to the entity that called on the `clone()` method.

Learn how this can be done by following [this example](code-examples.md#example-5-clone-a-pre-deployed-witnetrequestrandomness-contract).
{% endhint %}

{% hint style="info" %}
There is no need to clone a randomness request contract before posting for new randomnness. Just once is required, and only in case you need to gain ownership of the request contract.&#x20;
{% endhint %}

## Security concerns

{% hint style="warning" %}
`WitnetRequestRandomness` is an `Ownable` contract, which means that, while ownership is not renounced (i.e. `renounceOwnership()`), the owner will be able to modify the _witnessing parameters_ of the underlying Witnet data request bytecode.
{% endhint %}

{% hint style="info" %}
The **RAD bytecode**, accesible via the `template()` method, will always remain immutable, though.
{% endhint %}

{% hint style="warning" %}
In you need to request additional randomness before a previous one gets solved, your contract has to implement the logic and data model to solve this functionality, while avoiding potential front-running attacks at the EVM level. This multi-pending requests feature is already solved by the **WitnetRandomness contract**.&#x20;
{% endhint %}
