# 4. Put everything together and fine-tune the Witnet request

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally decentralized Bitcoin price feed][intro]
    on Ethereum with Solidity and Witnet.*

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
  .setQuorum(4, 2, 5, 7)     // Set witness count
  .setFees(10, 1, 1, 1)      // Set economic incentives
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
.setQuorum(witnesses, backup_witnesses, extra_reveal_rounds, minimum_consensus)
```

The `witnesses` is the minimum number of Witnet nodes that will be
resolving each specific request.

In general, the higher the number of witnesses, the safer the request.
However, fees should be proportional to this number.

The actual number of nodes that will resolve each request is guaranteed
to be equal than the specified number. If for some reason the
network fails to assign the request to enough nodes, it will be
reassigned in every subsequent epoch to a different randomly-selected
set of nodes until the required number is reached.

The `backup_witnesses` is the number of Witnet nodes that will be used
as a backup in case some of the originally assigned nodes fail to
fulfill their commitments.

A higher `backup_witnesses` number implies more fees but also guarantees
that the request will be timely resolved. In the other hand, if you use
small `backup_witnesses` values, the risk is that your request will need
to be retried many times and therefore the result may be potentially
inaccurate (in case the queried data point changes very fast).

The `extra_reveal_rounds` number is how many extra epochs will Witnet
nodes be given for revealing their partial results. A number of rounds
greater than `0` strengthens the security of a Witnet request by
preventing miners from withholding reveal transactions—as the subsequent
miners can include any reveal transactions withheld by a former miner.
This parameter is actually an upper threshold, i.e. the request will get
tallied and finalized as soon as the number of reveals equals the number
of commitments. If not set, this parameter defaults to `1`. This
parameter has no impact on the price of the request.

The `minimum_consensus` percentage allows to define a threshold for
aborting resolution of a request if the witnessing nodes did not arrive
to broad consensus. That is, aggregator and tally functions will not be
applied if the ratio of valid values vs. errors is below this threshold.
*E.g. a `minimum_consensus` threshold of `70` requires a `70%` of the
witnesses to report a valid value, otherwise the result of the request
will be an error stating "insufficient consensus"*.

### Set the fees
```javascript
.setFees(reward, commit_fee, reveal_fee, tally_fee)
```

Witnet allows parametrization of many of the economic incentives that
affect the life cycle of your requests. Namely, those incentives are:

- `request_fee`: the amount of wit tokens that will be earned by the
  Witnet miner that publishes your request in a block.
- `reward`: the amount of wit tokens that every each of the Witnet nodes
  assigned to your request will earn if they honestly fulfill their
  commitments and reveals.
- `commit_fee`: the amount of wit tokens that will be earned by Witnet
  miners for each each valid commitment transaction they include in a
  block.
- `reveal_fee`: the amount of wit tokens that will be earned by Witnet
  miners for each valid reveal transaction they include in a block.
- `tally_fee`: the amount of wit tokens that will be earned by the
  Witnet miner that publishes in a block the tally of all the reveal
  transactions related to your request.

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

Witnet requests can be scheduled for resolution in a particular date and
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
   [ Witnet.Types.FILTERS.deviationStandard, 1.5 ]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

// Filters out any value that is more than 1.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
   [ Witnet.Types.FILTERS.deviationStandard, 1.0 ]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(bitstamp)       // Use source 1
  .addSource(coindesk)       // Use source 2
  .setAggregator(aggregator) // Set the aggregator function
  .setTally(tally)           // Set the tally function
  .setQuorum(4, 2, 5, 70)    // Set witness count
  .setFees(10, 1, 1, 1)      // Set economic incentives
  .schedule(0)               // Make this request immediately solvable

// Do not forget to export the request object
export { request as default }
```

Time to go ahead and [compile the request][next].

!!! question "Remember: You are not alone!"
    You are invited to join the [Witnet Community Discord][discord].
    Members of the Witnet community will be happy to answer your
    questions and doubts, as well as assisting you through this
    tutorial.

[discord]: https://discord.gg/X4uurfP
[intro]: /tutorials/bitcoin-price-feed/introduction
[POSIX]: https://en.wikipedia.org/wiki/Unix_time
[next]: /tutorials/bitcoin-price-feed/compiling
