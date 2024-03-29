# ❓ What is Witnet?

### The Solution to the Oracle Problem <a href="#the-solution-a-decentralized-oracle-network" id="the-solution-a-decentralized-oracle-network"></a>

The Witnet protocol creates an overlay network that connects smart contracts to any online data source. Sport results, stock prices, weather forecasts, randomness sources or even other blockchains can be easily queried (preferably through APIs).

The protocol describes a distributed network of peer nodes— colloquially named _witnesses_- who earn Wit tokens as a reward for retrieving web data and reporting it directly to the smart contracts.

The bottom line is that a considerable number of randomly selected, anonymous peers retrieving information from one or more sources can converge into a single truth about the data they retrieved if they are incentivized to report the retrieved data honestly, they are punished or _slashed_ for any wrongdoing, and they apply a common consensus algorithm that resolves inconsistencies.

### Its Own Blockchain

This Decentralized Oracle Network (DON) maintains and distributes a block chain data structure that serves as a common ledger both for the operation of the protocol, and for the wit token (which incentives the network players to abide by the protocol and ensures they are liable for any misbehavior). Witnesses are also in charge of validating transactions in the network and bundling them into blocks that get appended to the blockchain periodically.

### The Witnessing Network

The process by which witnesses retrieve, attest and deliver data on behalf of the smart contracts is in some way similar to mining in other blockchains. However, fulfilling these tasks and collecting the rewards is not computationally expensive.

The protocol has been designed to ensure utmost decentralization and fairness, so each witness' weight within the network is not aligned to their computing power. Instead, the probability for every witness to be assigned tasks or mine new blocks is directly proportional to their past performance in terms of honesty: their reputation.

{% hint style="info" %}
Of course, the "miners" are not actual human beings sitting in front of a computer, manually fulfilling assignments. Instead, the "miners" are just computers running a software (witnet-rust) that automatically receive and execute a series of tasks.
{% endhint %}

### 100% Truth, 0% Trust <a href="#100-truth-0-trust" id="100-truth-0-trust"></a>

Data retrieved, attested and delivered using the Witnet protocol is reliable not because of a central authority, but because it comes from anonymous nodes, incentivized to remain honest and to compete for rewards.

In addition, integrity of this data is guaranteed by a consensus algorithm that detects fraudsters, who are immediately punished.

The algorithmic reputation protocol plays a central role in maintaining every participant active and honest by creating short, middle and long term incentives for them to abide by the protocol and not to tamper with the data they broker.

{% hint style="info" %}
Please note that Witnet's aim is not to spot fake data, but guaranteeing a 1:1 match between what is published online—regardless of its truthness—and the data that is eventually delivered to the smart contracts.
{% endhint %}
