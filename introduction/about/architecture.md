# ⚙ Architecture

{% hint style="info" %}
This article explores the characteristics and intricacies of Witnet from a purely internal perspective. This can be useful to understand the processes supporting the security and data integrity properties of the protocol.

However, it is important to note that in practice all this complexity is totally hidden away from the average smart contract developer. Using the Witnet oracle from Ethereum or any other smart contracts platform feels exactly like interacting with a native contract on that network.
{% endhint %}

### Witnet Is A Permissionless Blockchain Oracle

The Witnet oracle was conceived as a verifiable and accurate mechanism to solve data queries in a totally decentralized, trustless manner. To achieve this, numerous randomly selected, anonymous peers retrieve information from multiple data sources to then aggregate it and reduce it into a single "truth" that is agreed upon by a majority of them.

Unlike other blockchain oracles that rely on a trusted set of node operators that need to undergo KYC, Witnet is a totally permissionless network. Anyone is allowed to run a node and participate both in block proposing and validation, and in solving data requests (aka _witnessing_).

In a nutshell: the data retrieved, attested and delivered using the Witnet protocol is reliable because it is cryptographically committed by multiple anonymous, randomly selected nodes, who are incentivized to remain honest and to compete for rewards, and whose stake in the protocol will be slashed in case of misreporting.

### Witnet Operates on Its Own Single Purpose Blockchain

The Witnet protocol runs on a single purpose blockchain with a token called Wit. The nodes on the network are called _witnesses_, and they can earn Wit tokens by means of witnessing (solving data requests) and proposing blocks.

In this multi-chain scenario we are entering, everyone should be free to chose from the many Layer-1 and Layer-2 networks that proliferate these days depending on their own priorities and trade-offs. By keeping Witnet in its own blockchain and then connecting it to multiple smart contract enabled networks through the use of bridges, Witnet can easily serve high-value contracts in all those networks, and secure their operation through a single pool of witnessing nodes that are highly incentivized and algorithmically held liable (slashed) for any wrongdoing.

Having its own blockchain also guarantees that the fate of the Witnet oracle is not tied to that of any other blockchain, making Witnet much more independent and totally agnostic from specific smart contract platforms.

{% hint style="success" %}
Even though Witnet runs on its own blockchain, it is connected to the most popular smart contract enabled blockchains, and from the perspective of the average smart contract developer, using Witnet feels totally like using a native contract on each of those chains.

In addition, many oracle use cases (like [price feeds](../quick-tutorials/data-feeds-tutorial.md) or [random number generation](../quick-tutorials/randomness.md)) are also served through simpler interfaces that do not require the user to create and deploy any data requests.
{% endhint %}

### Capabilities of Data Requests

The queries sent to the Witnet oracle are called _data requests_. These are explicit about where to source data from, and how to aggregate and reduce that information down to a single data point that can be reliably fed into a smart contract.

Namely, data requests allow to:

* Source data from any number of data sources (the more, the better, to provide increased redundancy and trust-mitigation at the data source level).
* Specify how to process and destructure the information coming from each data source (e.g. the JSON response of a REST API) to pick only the relevant data points and making them uniform across multiple sources.
* Specify how to handle inconsistencies between the defined data sources, and how to aggregate them together into a single data point (e.g. discard faulty responses, filter out any outliers, and then return the average mean of the remaining healthy data points).
* Create the incentive for up to 100+ secretly and randomly selected witnessing nodes from the Witnet network to perform the retrieval of the information from the data sources as specified, and to cryptographically commit to their locally computed result.
* Specify how to deterministically filter, aggregate, and reduce the reports from the multiple witnessing nodes into a final data point that will be fed into your smart contract.

The Witnet protocol was designed to be agnostic over the nature of the sourced data, and currently supports the following types of data sources:

* [HTTP GET,](../quick-tutorials/apis-and-http-get-post.md) which easily allows to read from most [REST APIs](../quick-tutorials/apis-and-http-get-post.md) today.
* [HTTP POST](../quick-tutorials/apis-and-http-get-post.md), which provides a convenient way to query more sophisticated [REST and GraphQL APIs](../quick-tutorials/apis-and-http-get-post.md).
* [RNG](../quick-tutorials/randomness.md), which allows to generate [random numbers and byte arrays](../quick-tutorials/randomness.md).

{% hint style="success" %}
Witnet uses an RFC-8949 based binary format named RADON to encode and decode data requests.

However, when used from Solidity and other smart contract languages, Witnet provides a Javascript-like DSL that makes the experience of composing a data request specially convenient and intuitive.
{% endhint %}

### The Data Request Life Cycle

Once a data request is published into a Witnet block, it will undergo the following stages:

* Commitment: in this stage, each node in the Witnet network will independently and secretly compute their elegibility to participate in solving the data request. If a node finds itself to be eligible, it will retrieve and aggregate the data sources as specified by the request, and will publish a cryptographic commitment to the resulting value (i.e., alike to a closed envelope that contains a commitment to a specific piece of data). In doing so, the witnessing also need to collateralize (stake) a certain amount of Witnet tokens.
* Reveal: once the witnesses have published their commitments, they will need to reveal the actual data they committed to.
* Tally: once all the commitments have been followed up by a reveal, miners apply the multi-witness aggregation as specified in the request, publish the final _tallied_ result and execute all corresponding payments of rewards as well as slashing any misreporters.
* Completed: once a _Tally_ transaction has been published and confirmed into the Witnet network, the eventually resulting data point is considered final and will be ready for the requester to read and use.

_Commit_, _Reveal_, and _Tally_ are performed on-chain through special types of transactions in the Witnet protocol that are allocated each a reserved amount of block space, ensuring that data requests are resolved timely even when there is a big number of value transfer transactions (VTTs) happening in the network.

{% hint style="success" %}
When publishing a data request from Ethereum or any other smart contracts platform, the data request and its eventual result will be relayed to the Witnet blockchain by a set of _bridge nodes_ that is different from the witnessing nodes of the Witnet network.
{% endhint %}

### Algorithmic Reputation System

In addition to the strong cryptoeconomic incentives built around the rewards and the slashing, the Witnet protocol provides an algorithmic reputation system that automatically assigns more probability of getting data requests assigned to the nodes that perform best (based on how often they are in consensus with other witnesses).

Every time a witnessing node participates successfully in solving a data request, it receives a certain amount of reputation points. If on the contrary, a witnessing node fails to reveal their commitment, or the reveal is an outlier, it loses 50% of their reputation score (plus an amount of collateralized Wit tokens).

Eligibility to solve data requests is linear to reputation. At any given point in time, the probability for a witnessing node to be eligible to solve a data request is proportional to their own reputation. In this way, a node that has a reputation score of 10 points is 2x more likely to become eligible than some other node with 5 points.

Reputation points cannot be transferred and cannot be hoarded: they expire a certain period after they are obtained. If a node operator wants to keep their nodes engaged in the protocol and earning rewards through witnessing, they really need to make sure that the node is witnessing correctly at all times. This mechanism strengthens the incentives for the witnessing nodes to behave honestly (not tampering with the data requests) on a longer term.

### Transaction Finality

In the Witnet protocol, finality is guaranteed by superblocks. Every 10 blocks (specifically, those blocks whose epoch number / block height is a multiple of 10), the protocol samples a committee of 100 nodes from the Active Reputation Set, i.e. nodes with a proven record of reliability.

A super-majority of 2/3rds of this committee is required to digitally sign a message that gets derived from the hash of the last 10 blocks in the chain. In this way, the network can build strong consensus on the chain state, without having to gather signatures for each individual block.

The existence of one valid superblock after the block in which a transaction was published is enough to consider the transaction final and irreversible. This means that the confirmation time for a transaction will normally vary from 7.5 to 15 minutes.

When the 2/3rds committee consensus requirement is not met, the latest 10 blocks are discarded, and all nodes in the network rewind their local chain state back to the latest point of successful consensus. This mechanism is somehow similar to reorganizations in other blockchains.

Although not a best practice, some users may consider however that transactions are final as soon as they are included into a block, which normally takes less than 1 minute. This is based on the fact that superblock consensus failures are very rare nowadays (the last episode took place on October 12th, 2021).

Here is a more extensive read on Witnet transaction finality, superblock voting, and other related topics:

{% embed url="https://medium.com/witnet/witnet-tech-pill-1-transaction-and-block-finality-34472558ddb5" %}
