# 🧙 Solidity Wizard

The [**Witnet Solidity SDK**](../../smart-contracts-developers-v2/wit-oracle/parameterized-templates.md) package bundles the _**Solidity Wizard**_ tool that will ease the path when trying to programmatically interact with the **Wit/Oracle blockchain** from your own smart contracts.&#x20;

By answering a series of questions, and based on your actual needs, the _**Solidity Wizard**_ will create a customized Solidity contract that inherently implements multiple helper methods for either posting data queries to the Wit/Oracle blockchain, estimating minimum required fees, or checking current status of previously posted queries.&#x20;

The _**Solidity Wizard**_ basically covers 4 different use cases:

* Fetch randomness from the Wit/Oracle blockchain.
* Fetch custom data from a set of public data sources on the Internet.
* Fetch custom data from a variable set of public data sources on the Internet.&#x20;
* Fetch, or force, price feed updates from a third-party [_WitPriceFeeds_](solidity-contracts/appliances/witnetpricefeeds.md) instance.

Now, depending on whether you wish to rely on the [_**WitOracle**_](solidity-contracts/core/witnetoracle.md) contract storage and logic for asynchronously retrieving data query results, or the get data query results directly reported into your smart contract  (at the cost of having to store successful results yourself, and deal with eventual resolution errors at the Wit/oracle blockchain level), the Solidity contract produced by the _**Solidity Wizard**_ would ultimately inherit from any of these mock-up contracts:

* [_UsingWitnet_](solidity-contracts/mockups/usingwitnet.md)
* [_UsingWitnetRandomness_](solidity-contracts/mockups/usingwitnetrandomness.md)
* [_UsingWitnetRequest_](solidity-contracts/mockups/usingwitnetrequest.md)
* [_UsingWitnetRequestTemplate_](solidity-contracts/mockups/usingwitnetrequesttemplate.md)
* [_WitnetRandomnessRequestConsumer_](solidity-contracts/mockups/witnetrandomnessrequestconsumer.md)
* [_WitnetRequestConsumer_](solidity-contracts/mockups/witnetrequestconsumer.md)
* [_WitnetRequestTemplateConsumer_](solidity-contracts/mockups/witnetrequesttemplateconsumer.md)

***

## Getting started

### Run the Solidity Wizard

First, install the [**Witnet Solidity SDK package**](../../smart-contracts-developers-v2/wit-oracle/parameterized-templates.md) into your project, if not done yet:

```
$ npm install --save-dev witnet-solidity
$ npx witnet init
```

To run the _Solidity Wizard_ from the CLI, just move to your project's root folder and type:

```
$ npx witnet wizard
```

After answering all the questions, a new mock-up contract will be added to the `contracts/` folder. You can run the **Solidity Wizard** and create as many custom contracts as you like.

### Build your own custom data requests

If willing to fetch data from a selection of data sources on the Internet, you will need to build and deploy your own custom [_WitnetRequest_](solidity-contracts/core/witnetrequest.md) _or_ [_WitnetRequestTemplate_](solidity-contracts/core/witnetrequesttemplate.md) artifacts beforehand.&#x20;

These artifacts contain all required information for the Wit/oracle blockchain to know where to extract and transform data from. They also describe how to aggregate data when extracted from multiple sources, and how to reduce values revealed by the multiple witnessing nodes on the Wit/oracle blockchain.&#x20;

Building, testing and deploying [_WitnetRequest_](solidity-contracts/core/witnetrequest.md) and [_WitnetRequestTemplate_](solidity-contracts/core/witnetrequesttemplate.md) artifacts can be easily done by using the [**Radon Scripting toolkit**](radon-scripting.md)[.](../../smart-contracts-developers-v2/wit-oracle/parameterized-templates.md)

### Querying data from the Wit/Oracle

On use cases relying on [_WitnetRequest_](solidity-contracts/core/witnetrequest.md) or [_WitnetRequestTemplate_](solidity-contracts/core/witnetrequesttemplate.md) artifacts, you will find one or more **`__witOraclePostQuery`**`(uint256 _queryEvmReward[,...])` internal methods to query new data updates from the Wit/Oracle blockchain.&#x20;

{% hint style="info" %}
If relying on a [_**WitnetRequestTemplate**_](solidity-contracts/core/witnetrequesttemplate.md)_,_ your smart contract will have to provide concrete parameters as to consolidate the actual data request to be queried.&#x20;

You can call to **`__witOracleVerifyRadonRequest`**`(string[][])`, if willing to consolidate data requests that are expected to be queried multiple times in the future.&#x20;

Otherwise, if expecting to use different parameters every time a new data update is to be queried, you can use the **`__witOraclePostQuery`**`(string[][],uint256[,...])` methods instead.
{% endhint %}

Depending on the use case, you can also interact directly with either the [_**WitPriceFeeds**_](solidity-contracts/appliances/witnetpricefeeds.md) or [_**WitRandomness**_](solidity-contracts/appliances/witnetrandomness.md) contracts.

On all use cases, some EVM reward will have to be specified when querying data to the Wit/Oracle blockchain. The reward is specified by the `_queryEvmReward` value that's to be passed when calling any of the internal **`__witOraclePost*`** methods.&#x20;

### Managing data reliability on the Wit/Oracle

One of the key features of the Wit/Oracle solution is that data security (in terms of truthfulness to the data sources being used) can be managed by means of a series of **SLA data security parameters**, letting consuming smart contracts to control:

* The number of witnessing nodes that will be randomly selected to extract data from the real world.
* How much collateral (in Wit/coins) will those witnessing nodes have to stake before they prove they remain truthful to the data sources.
* What the maximum size of query results is expected to be.&#x20;

Of course, the higher values for this SLA parameters, the higher the cost will be for the consuming smart contracts. So depending on the nature of your dapp (mainly, the amount of wealth that would ultimately be transferred depending on data extracted from the Wit/Oracle), it would be wise to find the most appropriate balance between cost and data security.&#x20;

Contracts produced by the _**Solidity Wizard**_ are settled with these default values:

```solidity
__witOracleDefaultQuerySLA = Witnet.RadonSLA({
            witNumWitnesses: 10,            // defaults to 10 witnesses
            witUnitaryReward: 2 * 10 ** 8,  // defaults to 0.2 witcoins
            maxTallyResultSize: 32          // defaults to 32 bytes
        });
```

{% hint style="info" %}
All witnessing nodes in the Wit/Oracle blockchain will be obliged to stake 100x times the amount of the unitary reward that they would get if proven to be truthful to the query's data sources.
{% endhint %}

You may of course override these values in the constructor of your Wizard-devised smart contract, or by using the **`__witOraclePost`**`*(..., Witnet.RadonSLA[,...])` internal methods at your disposal.

{% hint style="warning" %}
Setting extremely high SLA data security parameters may potentially provoke data queries to fail with a `Witnet.RadonErrorCodes.InsufficientCommits` error.
{% endhint %}

### Estimating Wit/Oracle reward fees

Estimating a proper reward value is as simple as calling to the **`__witOracleEstimateBaseFee`**`(uint256 _evmGasPrice)` internal method, which just requires to specify the EVM's network gas price at the time some new data gets queried to the Wit/oracle.&#x20;

{% hint style="warning" %}
Paying too low rewards when posting data queries will provoke transactions to revert.
{% endhint %}

{% hint style="success" %}
Data query rewards are paid out from your smart contract balance in EVM native currency.&#x20;
{% endhint %}

### Tracking status of previously posted queries

Two internal methods can be used for this:

* **`__witOracleCheckQueryResultAvailability`**`(uint256 _queryId)` tells whether some final result has been provided for the given query.
* **`__witOracleCheckQueryResponseStatus`**`(uint256 _queryId)` returns the current status telling whether: the query is still awaiting to be solved, some result has been reported but is not yet final, a successful and finalized result is already available, the query couldn't get solved due to some error, or the query result was already delivered to the contract (only on `*Consumer` mock-ups contracts).

### Decoding data query results

Decoding can be easily done in Solidity. You will find different helper methods depending on whether you opted for reading query results from the [_WitnetOracle_](solidity-contracts/core/witnetoracle.md) storage, or getting query results directly delivered to your smart contract. Please, have a look to [**Decoding results guide**](broken-reference) as to learn how to decode query successful results, and query resolution errors as well.&#x20;

### Tesing contracts produced by the Solidity Wizard

Contracts produced by the _**Solidity Wizard**_, as well as the resolution of custom data queries, can be easily deployed and tested on all the [**supported testnet chains**](../supported-chains.md#evm-compatible-testnets) where the Wit/oracle blockchain is bridged.

{% hint style="success" %}
The **Witnet Foundation** subsidizes data query resolutions on all supported testnets.&#x20;
{% endhint %}

You may need to know the actual addresses of some pre-deployed _WitnetRequest_ or _WitnetRequestTemplate_ custom artifacts of yours, or perhaps the official addresses of either the _WitnetPriceFeeds_ or the _WitnetRandomness_ appliances, on the testnet chain where you need to test your smart contract.&#x20;

For example, if working on Optimism Sepolia, just type the following on the CLI to list Wit/Oracle-related addresses:

```
$ npx witnet avail
$ npx witnet avail --chains optimism 
$ npx witnet avail --chains optimism:sepolia 
```

***

## FAQs

### Why do rewards depend on the EVM's network gas price?

Basically, query rewards encourage Wit/Oracle bridging nodes to:

* Broadcast data request transactions to the Wit/Oracle blockchain.
* Reward the witnessing nodes that get randomly selected on the Wit/Oracle blockchain for solving every single query, and that ultimately prove to be truthful to the required data sources.
* Report and store query results back into the EVM storage.&#x20;

It is the inherent cost of this last step the one that determines most of the minimal reward required for a data query to get accepted, and the one that ultimately depends on the EVM network's gas price at the time some query result is to be reported into the EVM storage.&#x20;

### Why should `__baseFeeOverheadPercentage` be greater than zero?

Two reasons, mainly:

1. As the EVM network's gas price can potentially increase from the moment that some data is queried, and the moment that the query is solved on the Wit/oracle blockchain and its result ready to be reported back to the EVM storage.&#x20;
2. So the extra EVM reward above the base fee allows bridges to cover the cost in Wit/coins of broadcasting data request transaction and rewarding honest witnessing nodes solving data queries on the Wit/oracle blockchain.&#x20;

In other words,

{% hint style="warning" %}
&#x20;Too low `__baseFeeOverheadPercentage` may provoke resolutions of data queries to take longer than expected.
{% endhint %}

> _In most cases, 20-30% fee overhead should suffice to avoid short-term gas price spikes on the EVM network. Only on some layer 2's where the effective gas price may end up being quite volatile, or if requiring extremely secure data resolutions to the Wit/Oracle blockchain, you may need to settle the base fee overhead percentage to greater values._

### Why can data queries fail on the Wit/Oracle blockchain?

Indeed, resolution of data queries in the Wit/Oracle blockchain can eventually fail, for multiple and different reasons. It’s quite an unlikely thing to happen, specially when data sources, filters, reducers, and rewards were conveniently devised, but still possible. There are basically two main errors category:

* Those that can be considered “**critical and permanent**”, produced because there’s some malformation on either the data request itself, or the retrieved data doesn’t actually comply with the some expected schema, or perhaps one or more _inconsistent data sources_ are being referred. In these cases, no matter how much incentives, or how many times you retry the data request, you shall always get an error result.
* Those that can be considered “**temporary or circumstantial**”, meaning that the data request can eventually get solved if queried again. For instance, if a majority of the data sources were simultaneously unavailable for a short period of time, or perhaps the SLA data security parameters were too strict and not enough witnessing nodes accepted the challenge of solving the requested data.

{% hint style="success" %}
The global nature of every possible Wit/Oracle result error can be determined by using the `Witnet.isRetriable(_errorCode)`internal method.
{% endhint %}

### What if not enough callback gas is settled on _Wit\*Consumer_ contracts?

Query results won't get delivered to the consumer contract, but instead a warning event will be emitted on the [_WitnetOracle_](solidity-contracts/core/witnetoracle.md#events) contract instead when attempted. Consumer contracts will be capable of detecting failed deliveries by checking the query's response status, but the query result will be lost as storing such data is the sole responsibility of _`Wit*Consumer`_ contracts.
