# 4. Put everything together and fine-tune the Witnet request

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

## Put everything together

Time to put everything together and create the `Witnet.Request` object
that you will need to export:

```javascript
// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(bitstamp)          // Use source 1
  .addSource(coindesk)          // Use source 2
  .setAggregator(aggregator)    // Set the aggregation script
  .setTally(tally)              // Set the tally script
  .setQuorum(25)                // Set how many witnesses to use
  .setFees(1000000, 1000000)    // Set economic incentives (e.g. witness reward: 1 mWit, commit/reveal fee: 1 mWit)
  .setCollateral(10000000000)   // Set collateral (e.g. 10 Wit)

// Do not forget to export the request object
export { request as default }
```


The `.setQuorum` and `.setFees` methods are explained
below.

## Fine-tune fees, quorum and collateral

Witnet requests are highly parameterizable. You can fine-tune almost 
every single aspect of their life cycle:

- `.setQuorum()` sets how many Witnet nodes will be "hired" for
  resolving the request.
- `.setFees()` specifies how much you want to pay for rewarding each of
  the Witnet nodes implicated in resolving the request.
- `.setCollateral()` establishes how much collateral do witnessing nodes
  need to stake in order to participate in resolving this request.
  
### Set the quorum

```javascript
.setQuorum(witnesses, backup_witnesses)
```

The `witnesses` is the minimum number of Witnet nodes that will be
resolving each specific request.

In general, the higher the number of witnesses, the safer the request.
However, a higher number of witnesses generally means higher fees.

The actual number of nodes that will resolve each request is guaranteed
to be equal to the specified number. If for some reason the
network fails to assign the request to enough nodes, it will be
reassigned in every subsequent epoch to a different randomly-selected
set of nodes until the required number is reached.

#### Optional arguments for `.setQuorum`

The `.setQuorum` method accepts three more optional arguments:

```javascript
.setQuorum(
  witnesses,
  minimum_consensus
)
```

The `minimum_consensus` percentage allows users to define a threshold for
aborting resolution of a request if the witnessing nodes did not arrive
at broad consensus. That is, aggregator and tally functions will not be
applied if the ratio of valid values vs. errors is below this threshold.
*E.g. a `minimum_consensus` threshold of `70` requires `70%` of the
witnesses to report a valid value, otherwise the request
will result in an error, stating "insufficient consensus"*. If not set, this
parameter defaults to `51`.

### Set the fees
```javascript
.setFees(reward, commit_and_reveal_fee)
```

Witnet allows parametrization of many of the economic incentives that
affect the life cycle of your requests. These incentives include:


- `reward`: the amount of wit tokens that each of the Witnet nodes
  assigned to your request will earn if they honestly fulfill their
  commitments and reveals.
- `commit_and_reveal_fee`: the amount of wit tokens that will be earned by Witnet
  miners for each each valid commitment/reveal transaction they include in a
  block.

All fees are expressed in nanoWits (10^-9 wits).

!!! question "How can I compute the total cost of a request?"
    The total cost of a Witnet request equals:
    
    ```
    request_fee + witnesses * (reward + 2*commit_and_reveal_fee)
    ```
    
    There are two special cases in which some fees are automatically 
    refunded to the requester upon an eventual tally:
    
    - For every valid reveal that later does not pass the filters in the
      tally stage (aka *outliers*), you get `reward` back.
    - For every missing reveal after the `extra_reveal_rounds` threshold
      is reached, you get `reward + reveal_fee` back.

### Establish the collateral

When participating in resolving data requests (committing and revealing),
witnessing nodes need to stake a certain amount of Wit tokens.

It is up to you as a requester to decide what is the right amount for your
use case. The more value in your contracts, the higher the collateral should
be. However, take into account that if you require a high collateral amount
(>250 wits), there is a chance for the request to be delayed or cancelled if
there are not enough witnessing nodes willing to stake that amount.

Collateral is specified on a "per witness" basis, that is, if your request
uses 25 witnesses and requires each of them to collateralize 10 wits, your
request will be secured by 25 * 10 = 250 wits.

The minimum collateral is 1 wit (1000000000 nanoWits).

### Double check
Time to double check everything is fine. Your `BitcoinPrice.js` file should
look more or less like this:

```javascript
import * as Witnet from "witnet-requests"

// Retrieves USD price of a bitcoin from the BitStamp API
const bitstamp = new Witnet.Source("https://www.bitstamp.net/api/ticker/")
  .parseJSONMap()   // Parse a `Map` from the retrieved `String`
  .getFloat("last") // Get the `Float` value associated to the `last` key
  
// Retrieves USD price of a bitcoin from CoinDesk's "bitcoin price index" API
// The JSON here is a bit more complex, thus more operators are needed
const coindesk = new Witnet.Source("https://api.coindesk.com/v1/bpi/currentprice.json")
  .parseJSONMap()         // Parse a `Map` from the retrieved `String`
  .getMap("bpi")          // Get the `Map` value associated to the `bpi` key
  .getMap("USD")          // Get the `Map` value associated to the `USD` key
  .getFloat("rate_float") // Get the `Float` value associated to the `rate_float` key

// Filters out any value that is more than 1.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

// Filters out any value that is more than 1.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

const request = new Witnet.Request()
  .addSource(bitstamp)          // Use source 1
  .addSource(coindesk)          // Use source 2
  .setAggregator(aggregator)    // Set the aggregation script
  .setTally(tally)              // Set the tally script
  .setQuorum(25)                // Set witnesses count
  .setFees(1000000, 1000000)    // Set economic incentives (e.g. witness reward: 1 mWit, commit/reveal fee: 1 mWit)
  .setCollateral(10000000000)   // Set collateral (e.g. 10 Wit)

// Do not forget to export the request object
export { request as default }
```

Time to go ahead and [compile the request][next].

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[intro]: /tutorials/bitcoin-price-feed/introduction
[POSIX]: https://en.wikipedia.org/wiki/Unix_time
[next]: /tutorials/bitcoin-price-feed/compiling
