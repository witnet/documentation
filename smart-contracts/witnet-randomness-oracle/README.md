# 🎲 Witnet Randomness Oracle

### Why Randomness Oracles?

There are a number of smart contracts use cases that require some degree of randomness, unpredictability or uniqueness.

For example, a smart contract that automatically generates items inside an NFT collection will need a source of randomness to assign different traits in such a way that each of the items in the collection are unique and cannot be predicted before minting.

Another use case are be lotteries, gaming and any other case in which the outcome of the contract shall depend on an unpredictable element of luck.

However, because of their deterministic nature, smart contracts are not capable of generating randomness on their own. Any mechanism trying to build randomness purely onchain is prone to manipulation, abuse and front-running by miners.

### Witnet Randomness — Powered by Crowd-Witnessing

The Witnet randomness oracle is founded on the same principle of crowd-witnessing that powers the Witnet protocol in general.

A number of witnessing nodes from the Witnet network are secretly and randomly elected to individually generate a random sequence of bytes that they will cryptographically commit to.

At a later time, the random sequences are revealed and deterministically aggregated through ordering, concatenation and hashing. The resulting sequence of bytes will be tamper-proof and preserve all the properties of randomness, uniformity, unpredictability and lack of maleability as long as at least 1 of the witnesses provides an actually random sequence of bytes that was unknown to the rest of witnesses at the time of committing.

### Generate Random Numbers and Byte Arrays in your Smart Contracts

The following sections contain a number of useful resources, examples and walkthroughs on how to use the Witnet randomness oracle to generate random numbers and byte arrays in your own smart contracts:

{% content-ref url="generating-randomness.md" %}
[generating-randomness.md](generating-randomness.md)
{% endcontent-ref %}

{% content-ref url="randomness-request.md" %}
[randomness-requests.md](randomness-requests.md)
{% endcontent-ref %}

{% content-ref url="randomness-contract.md" %}
[randomness-contract.md](randomness-contract.md)
{% endcontent-ref %}

{% content-ref url="code-examples.md" %}
[code-examples.md](code-examples.md)
{% endcontent-ref %}

{% content-ref url="api-reference.md" %}
[api-reference.md](api-reference.md)
{% endcontent-ref %}

{% content-ref url="contract-addresses.md" %}
[contract-addresses.md](contract-addresses.md)
{% endcontent-ref %}
