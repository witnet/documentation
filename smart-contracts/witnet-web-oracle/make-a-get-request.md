---
description: >-
  The Witnet Web Oracle enables smart contracts to fetch data from web APIs
  without introducing single point of failures — data integrity is guaranteed
  through multi-layered decentralization.
---

# HTTP GET Requests in Solidity

One of the core functionalities of the Witnet oracle is to enable smart contracts to perform HTTP requests to APIs (both GET and [POST](make-a-post-request.md)).

This is best suited for pieces of data that are available on multiple APIs, because many of them can be queried at once and aggregated together, thus getting an increased level of decentralization and fault tolerance.

### Performing HTTP GET requests from your Solidity smart contracts <a href="#performing-http-get-queries-right-from-your-solidity-smart-contracts" id="performing-http-get-queries-right-from-your-solidity-smart-contracts"></a>

Witnet oracle queries are explicit. That means that the queries themselves specify what are the data sources to be used, how to filter outliers, and how to aggregate aggregate the results from multiple APIs into a final point (e.g. computing the average).

The most convenient way to write the queries is to use the [`witnet-requests`](https://www.npmjs.com/package/witnet-requests) library. This JavaScript library makes it extremely simple to define your data sources, fine-tune and debug your oracle queries, and compile those into contracts that you can simply import and instantiate from your Solidity project.

#### 1. Install Witnet dependencies

Installing the Witnet dependencies into your existing Truffle or Harhat project is this simple:

{% tabs %}
{% tab title="npm" %}
`npm install witnet-solidity-bridge --save-prod`

`npm install witnet-requests --save-dev`
{% endtab %}

{% tab title="yarn" %}
`yarn add witnet-solidity-bridge`

`yarn add witnet-requests --dev`
{% endtab %}
{% endtabs %}

#### 2. Create a folder to store your oracle queries

Most developers normally put their oracle queries into a directory named `witnet` inside their project.

#### 3. Create your first oracle query

As an example, you can create the oracle query for a simple ETH/USD price feed.

Start by creating a file in your `witnet` directory, and name it `EthPrice.js`. Then you can edit the file and import the `witnet-requests` library like this:

```javascript
import * as Witnet from "witnet-requests"
```

#### 4. Define a first API data source (Binance)

You are now ready to start defining the data sources that you want to consume in your query. This is how you define a data source:

```javascript
const binance = new Witnet.Source("https://api.binance.US/api/v3/trades?symbol=ETHUSD")
  .parseJSONMap()
  .getFloat("price")
  .multiply(10 ** 6)
  .round()
```

Once this query gets picked up by the Witnet oracle, this part will be instructing it to visit the Binance API, parse the result as a JSON object, get the `price` field as a floating point number, multiply it by 10,000,00, and round the result to the closest integer number.

{% hint style="info" %}
The "multiply and round" trick is often used to overcome Solidity's lack of floating point numbers. For example, if you use `10 ** 6` as your multiplier, the result that you will get in Solidity will be implicitly using 6 decimal digits.
{% endhint %}

#### 5. Define a second and third API data sources (Coinbase and Kraken)

Adding a second API data source (e.g. Coinbase) only requires adding a new `Witnet.Source` block below the previous one:

```javascript
const coinbase = new Witnet.Source("https://api.coinbase.com/v2/exchange-rates?currency=ETH")
  .parseJSONMap()
  .getMap("data")
  .getMap("rates")
  .getFloat("USD")
  .multiply(10 ** 6)
  .round()
```

As a third API, we can also add Kraken:

```javascript
const kraken = new Witnet.Source("https://api.kraken.com/0/public/Ticker?pair=ETHUSD")
  .parseJSONMap()
  .getMap("result")
  .getMap("XETHZUSD")
  .getArray("a")
  .getFloat(0)
  .multiply(10 ** 6)
  .round()
```

{% hint style="info" %}
The [witnet-price-feeds repository on GitHub](https://github.com/witnet/witnet-price-feeds/tree/master/witnet/prices) contains dozens of pre-built oracle queries that can give you a clear idea on how to deal with the APIs of many different exchanges.
{% endhint %}

#### 6. Specify how to aggregate the different data sources

One killer feature of the Witnet protocol is that it enables to build decentralization at the data source level by enabling you as a data requester to decide how the different data sources will be aggregated together.

When aggregating multiple data source, there are always two steps:

* **Filter**: specify how to validate if a data point is good. E.g. in the event that there is a flash crash in the price reported by any of the exchanges above, we want to remove that outlier so it does not affect the final result.
* **Reducer**: specify how to aggregate together the results coming from multiple data sources. E.g. once we have got rid of any outliers, we want to calculate the average mean of the remaining data points.

Although aggregators provide a lot of flexibility, most users often default to using this one that tends to work very well for price feed use cases, as it first removes any data point that is too far off the average more than 1.5 times the standard deviation of the set, and then simply compute the average mean of the data points that passed the filter:

```javascript
const aggregator = Witnet.Aggregator.deviationAndMean(1.5)
```

{% hint style="info" %}
Different data types may require different filters or aggregators. For example, in the case of discrete data types (the weather condition as a string, or the result of a soccer match as a tuple of integer numbers) it makes more sense to use the `mode` filter and the `mode` reducer.
{% endhint %}

#### 7. Specify aggregation of data reporters (tally)

Witnet is a crowd-attestation oracle. That is, your queries get independently executed on multiple nodes in the Witnet network, and then those nodes will secretly vote on the result. If they agree with a majority, they get a fraction of the reward. Otherwise, they lose an amount of staked coins.

As a consequence, the oracle queries need to be explicit about how the data reported by multiple nodes need to be aggregated together.

This second layer of aggregation (often called _tally_) mitigates trust in the data reporters, and create strong incentives for the nodes to report data honestly, without trying to manipulate it out of the risk of losing their stake. This mechanism is rooted in the concept of [Schelling point games](https://en.wikipedia.org/wiki/Focal\_point\_\(game\_theory\)).

Tally functions are defined in a very similar way to aggregators. This is the most common tally for price feed oracle queries:

```javascript
const tally = Witnet.Tally.deviationAndMean(2.5)
```

#### 8. Put it all together and fine-tune the incentives

Once you have specified our data sources, the aggregation and the tally, you are ready to put everything together, fine-tune some parameters, and export the query.

This how you attach everything we have defined so far into a single Witnet oracle query:

```javascript
const query = new Witnet.Query()
  .addSource(binance)
  .addSource(coinbase)
  .addSource(kraken)
  .setAggregator(aggregator) // Set the aggregator function
  .setTally(tally) // Set the tally function
  .setQuorum(10, 51) // Set witness count and minimum consensus percentage
  .setFees(5 * 10 ** 9, 10 ** 9) // Witnessing nodes will be rewarded 5 $WIT each
  .setCollateral(50 * 10 ** 9) // Require each witness node to stake 50 $WIT

// Do not forget to export the query object
export { query as default }
```

Everything in the code block above should be quite self-descriptive. These are the only few bits that may require a little more explanation:

* `setQuorum(10, 51)`: states that we want 10 nodes from the Witnet network to be randomly and secretly selected for resolving this request; and that we prefer the query to abort if less than 51% of them (6 out of 10) agree on the result.
* `setFees(5 * 10 ** 9, 10 ** 9)`: states how much to pay to the witnessing nodes for resolving the query (5 Wit for each node) and how much to pay miners for including the internal transactions of the query into blocks (1 Wit for each transaction).
* `setCollateral(50 * 10 ** 9)`: requires the witnessing nodes to stake 50 Wit each in order to participate in the resolution of this oracle query.

Last but not least, do not forget to export the query with an `export { query as default }` statement at the end of the file!

{% hint style="info" %}
Fees and rewards are denominated in nanoWit (the base monetary unit of the protocol), hence the use of `10 ** 9` to enter values in Wit.
{% endhint %}

#### 9. Compile the Witnet query into a Solidity contract

You are now ready to compile your first Witnet oracle query. It is as simple as running this command from your project's directory:

```
npx rad2sol --write-contracts
```

This command will automatically analyze the JavaScript file that you wrote, compile it into Witnet bytecode, wrap it into a small Solidity contract, and put it inside your `./contracts/requests` directory, ready for importing from your own Solidity contracts.

If you find any compilation errors, please pay attention to the error messages, and double check that you are exporting the query correctly, that you did not mistyped the name of any variables, and that the `./contracts/requests` directory exists.

#### 10. Run the query locally to preview the result

Before continuing with the Solidity part, it is always a good idea to run the oracle query to validate the data sources and aggregations, and to preview what would be the result of the query if it got executed right now.

The witnet-requests library itself provides a command to try oracle queries locally by spawning a ephemeral instance of the Witnet runtime on the spot:

```
npx witnet-toolkit try-query --from-solidity
```

This command should output a pretty printed execution report. Simply double check that the result of each data source makes sense, and the final result in the tally stage is also coherent.

#### 11. Import the Witnet query into your contract

Most probably, you are already quite familiar with Solidity contracts, so without further ado, here is an example of how to import a Witnet query from a Solidity contract:

```solidity
// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you compiled before
import "./requests/EthPrice.sol";
```

#### 12. Configure inheritance

Then you need to make your contract inherit from `UsingWitnet`:

```solidity
contract PriceFeed is UsingWitnet {
```

This inheritance from `UsingWitnet` requires your constructor to pass the address of the `WitnetRequestBoard` contract specific to your network (e.g. it may be a different address on Ethereum than on Polygon):

```solidity
constructor () UsingWitnet(WitnetRequestBoard(0x9E4fae1c7ac543a81E4E2a5486a0dDaad8194bdA)) {
```

For convenience and easiness of deploying into different networks without changing the code or recompiling, you can make your constructor receive the `WitnetRequestBoard` address as an argument, and then provide the address in your migration scripts when deploying:

```solidity
constructor (WitnetRequestBoard _wrb) UsingWitnet(_wrb) {
```

Aside from that, the only change that you need to make in your contract is to define the query as a property of your contract, and to instantiate it from the constructor:

```solidity
contract PriceFeed is UsingWitnet {
    Request public query;
    uint256 requestId;
    uint64 latestPrice; 
   
    constructor (WitnetRequestBoard _wrb) UsingWitnet(_wrb) {
       query = new EthPriceRequest();
    }
}
```

As you can read above, you will need a couple more properties:

* `requestId` will store the identifier of the latest instance of your query.
* `latestPrice` will keep the latest successful result of your query.

#### 13. Launch your query

You are now ready to submit the query to the Witnet oracle. Simply call the `_witnetPostRequest` method from a `payable` function in your contract:

```solidity
    function requestUpdate() public payable {
        requestId = _witnetPostRequest(query);
    }
```

Calling `_witnetPostRequest` will get the bytecode of your query posted to the `WitnetRequestBoard`, a special contract that enables passing your queries and their results between smart contracts and the Witnet oracle.

{% hint style="info" %}
The need for this function to be `payable` comes from the fact that `_witnetPostRequest` requires the caller to provide enough transaction value to make up for the gast cost of the reporters. Whatever function you wrap `_witnetPostRequest` in, it will inherit this same requirement.
{% endhint %}

#### 14. Read the result of your query

The Witnet oracle takes a maximum of 10 minutes to resolve a request and get the result reported back to the `WitnetRequestBoard` contract, from which your contract can directly read:

```solidity
function completeUpdate() public witnetRequestResolved(requestId) {
    Witnet.Result memory result = _witnetReadResult(requestId);
    
    if (witnet.isOk(result)) {
        lastPrice = witnet.asUint64(result);
    } else {
        // You can decide here what to do if the query failed
    }
}
```

As you can see, reading the result is pretty straightforward. First you read a `Witnet.Result` object, and then you need to decode the right Solidity data type (in this case, using `.asUint64()` to read the result as a `uint64`).

The `witnetRequestResolved(requestId)` modifier prevents from calling your function before your query is resolved on the Witnet side. The `witnet.isOk(result)` function helps to tell if the query was resolved successfully or, on the contrary, there was some error.

#### 15. Deploy your contract

Deployment instructions are very specific to your Solidity toolkit (Truffle, Hardhat, etc.).

Simply take into account that your contract will need to get the address of `WitnetRequestBoard` passed as an argument. This page lists the address of this contract in the different chains that Witnet supports:

{% content-ref url="contracts-addresses.md" %}
[contracts-addresses.md](contracts-addresses.md)
{% endcontent-ref %}

In case that you are using Truffle, `rad2sol` can automatically generate migrations for the Witnet libraries, as well as for your own contracts, if you use it like this:

```
npx rad2sol --write-contracts --write-witnet-migrations --write-user-migrations
```

These migrations will already contain the right addresses for all supported networks. If you look at the `migrations` folder, you should find these two files:

* `1_witnet_core.js`: deploys all the Witnet-related contracts if you are deploying on a local or private network; or dynamically links them if you are on a public network.
* `2_user_contracts.js`: contains autogenerated migration scripts for your consumer contracts.

If your consumer contract has additional constructor arguments, the compiler will create default values for them.

Before running any migration, please make sure you double-check the default arguments that the compiler inserts for you, as they may not make any sense for your specific use case.

#### 16. Wrapping up

Congratulations, you are set!

If you want to learn more, here is a GitHub repository containing a more advanced version of the example price feed that you just created:

{% embed url="https://github.com/witnet/witnet-pricefeed-tutorial" %}
