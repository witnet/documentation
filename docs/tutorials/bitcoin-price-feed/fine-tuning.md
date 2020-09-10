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
  .addSource(bitstamp)       // Use source 1
  .addSource(coindesk)       // Use source 2
  .setAggregator(aggregator) // Set the aggregation script
  .setTally(tally)           // Set the tally script
  .setQuorum(4, 55)           // Set witness count
  .setFees(1, 1)      // Set economic incentives
  .schedule(0)               // Make this request immediately solvable

// Do not forget to export the request object
export { request as default }
```

The `.setQuorum`, `.setFees` and `.schedule` methods are explained
below.

## Fine-tune fees, quorum and schedule

Witnet requests are highly parameterizable. You can fine-tune almost 
every single aspect of their life cycle:

- `.setQuorum()` sets how many Witnet nodes will be "hired" for
  resolving the request.
- `.setFees()` specifies how much you want to pay for rewarding each of
  the Witnet nodes implicated in resolving the request.
- `.schedule()` schedules the request to be resolved in a particular
  date and time in the future.
  
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

The `backup_witnesses` is the number of Witnet nodes that will be used
as a backup in case some of the originally assigned nodes fail to
fulfill their commitments.

A higher `backup_witnesses` value corresponds with higher fees but also guarantees
that the request will be resolved in a timely fashion. On the other hand,
a small `backup_witnesses` value comes with the risk that your request will need
to be retried many times and therefore the result may be potentially
inaccurate (especially if the queried data point changes rapidly).

#### Optional arguments for `.setQuorum`

The `.setQuorum` method accepts three more optional arguments:

```javascript
.setQuorum(
  witnesses,
  backup_witnesses,
  extra_commit_rounds,
  extra_reveal_rounds,
  minimum_consensus
)
```  

The `extra_commit_rounds` number specifies how many extra epochs Witnet
nodes will be given for committing their partial results. A number
greater than `0` strengthens the chances of a Witnet request being
resolved to a value instead of timing out. This parameter is actually an
upper threshold, i.e. the request will progress into a reveal stage as
soon as the number of commitments equals the number of required witnesses.
If not set, this parameter defaults to `1`. This parameter has no impact
on the price of the request.

The `extra_reveal_rounds` number specifies how many extra epochs Witnet
nodes will be given to reveal their partial results. A number
greater than `0` strengthens the security of a Witnet request by
preventing miners from withholding reveal transactions—as the subsequent
miners can include any reveal transactions withheld by a former miner.
This parameter is actually an upper threshold, i.e. the request will be
tallied and finalized as soon as the number of reveals equals the number
of commitments. If not set, this parameter defaults to `1`. This
parameter has no impact on the price of the request.

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
.setFees(reward, commit_fee, reveal_fee, tally_fee)
```

Witnet allows parametrization of many of the economic incentives that
affect the life cycle of your requests. These incentives include:

- `request_fee`: the amount of wit tokens that will be earned by the
  Witnet miner that publishes your request in a block.
- `reward`: the amount of wit tokens that each of the Witnet nodes
  assigned to your request will earn if they honestly fulfill their
  commitments and reveals.
- `commit_fee`: the amount of wit tokens that will be earned by Witnet
  miners for each each valid commitment transaction they include in a
  block.
- `reveal_fee`: the amount of wit tokens that will be earned by Witnet
  miners for each valid reveal transaction they include in a block.
- `tally_fee`: the amount of wit tokens that will be earned by the
  Witnet miner that publishes the tally of all the reveal
  transactions related to your request in a block.

!!! question "How can I compute the total cost of a request?"
    The total cost of a Witnet request equals:
    
    ```
    request_fee + witnesses * (reward + commit_fee + reveal_fee) + tally_fee
    ```
    
    There are two special cases in which some fees are automatically 
    refunded to the requester upon an eventual tally:
    
    - For every valid reveal that later does not pass the filters in the
      tally stage (aka *outliers*), you get `reward` back.
    - For every missing reveal after the `extra_reveal_rounds` threshold
      is reached, you get `reward + reveal_fee` back.

### Set the schedule
```javascript
.schedule(timestamp)
```

Witnet requests can be scheduled for resolution on a particular date and
time in the future.

Timestamps need to be provided as [POSIX timestamps][POSIX], i.e.
seconds elapsed from 00:00:00 UTC on 1 January 1970 until the desired
date.

### Double check
Time to double check everything is fine. Your `BitcoinPrice.js` file should
look more or less like this:

```javascript
import * as Witnet from "witnet-requests"

// Retrieves USD price of a bitcoin from the BitStamp API
const bitstamp = new Witnet.Source("https://www.bitstamp.net/api/ticker/")
  .parseMapJSON()   // Parse a `Map` from the retrieved `String`
  .getFloat("last") // Get the `Float` value associated to the `last` key
  
// Retrieves USD price of a bitcoin from CoinDesk's "bitcoin price index" API
// The JSON here is a bit more complex, thus more operators are needed
const coindesk = new Witnet.Source("https://api.coindesk.com/v1/bpi/currentprice.json")
  .parseMapJSON()         // Parse a `Map` from the retrieved `String`
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
   [Witnet.Types.FILTERS.deviationStandard, 1.0]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(bitstamp)       // Use source 1
  .addSource(coindesk)       // Use source 2
  .setAggregator(aggregator) // Set the aggregator function
  .setTally(tally)           // Set the tally function
  .setQuorum(4, 2,)          // Set witness count
  .setFees(10, 1, 1, 1)      // Set economic incentives
  .schedule(0)               // Make this request immediately solvable

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
