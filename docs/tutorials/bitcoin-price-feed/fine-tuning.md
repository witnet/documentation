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
  .setQuorum(4, 2)           // Set witness count
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
.setQuorum(witnesses_count, backup_witnesses_count)
```

The `witnesses_count` is the minimum number of Witnet nodes that will be
resolving each specific request.

In general, the higher the count, the safer the request. However, fees
should be proportional to this number.

The actual number of nodes that will resolve each request is guaranteed
to be equal or greater than the specified count. If for some reason the
network fails to assign the request to enough nodes, it will be
reassigned in every subsequent epoch to a different randomly-selected
set of nodes until the count is reached.

The `backup_witnesses_count` is the number of Witnet nodes that will be
used as a backup in case some of the originally assigned nodes fail to
fulfill their commitments.

A higher `backup_witnesses_count` implies more fees but also guarantees
that the request will be timely resolved. In the other hand, if you use
small `backup_witnesses_count` values, the risk is that your request
will need to be retried many times and therefore the result may be
potentially inaccurate (in case the queried data point changes very
fast).

### Set the fees
```javascript
.setFees(reward, commit_fee, reveal_fee, tally_fee)
```

Witnet allows parametrization of many of the economic incentives that
affect the life cycle of your requests. Namely, those incentives are:

- `reward`: the amount of wit tokens that every each of the Witnet nodes
  assigned to your request will earn if they honestly fulfill their
  commitments and reveals.
- `commit_fee`: the amount of wit tokens that will be earned by the
  first Witnet miner that puts in a block as many commitment
  transactions as the `witnesses_count`.
- `reveal_fee`: the amount of wit tokens that will be earned by the
  first Witnet miner that puts in a block as many reveal transactions as
  the `witnesses_count`.
- `tally_fee`: the amount of wit tokens that will be earned by the first
  Witnet miner that publishes in a block the tally of all the reveal
  transactions related to your request.

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
  .parseJSON() // Parse the string, which you now to be JSON-encoded
  .asMap()     // Treat that as a Javascript object
  .get("last") // Get the value associated to the `last` key
  .asFloat()   // Treat that as a floating point number

// Retrieves USD price of a bitcoin from CoinDesk's "bitcoin price index" API
// The JSON here is a bit more complex, thus more operators are needed
const coindesk = new Witnet.Source("https://api.coindesk.com/v1/bpi/currentprice.json")
  .parseJSON()       // Parse the string, which you now to be JSON-encoded
  .asMap()           // Treat that as a Javascript object
  .get("bpi")        // Get the value associated to the `bpi` key
  .asMap()           // Treat that as a Javascript object
  .get("USD")        // Get the value associated to the `USD` key
  .asMap()           // Treat that as a Javascript object
  .get("rate_float") // Get the value associated to the `rate_float` key
  .asFloat()         // Treat that as a floating point number

// Computes the average mean of the two sources using a reducer
const aggregator = new Witnet.Aggregator([bitstamp, coindesk]) // Create a new aggregation
  .reduce(Witnet.Types.REDUCERS.averageMean)                   // Reduce the input `Array` using the average mean

// Computes the average mean of the values reported by multiple nodes using a reducer
const tally = new Witnet.Tally(aggregator)   // Create a new tally function
  .reduce(Witnet.Types.REDUCERS.averageMean) // Reduce the input `Array` using the average mean

// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(bitstamp)       // Use source 1
  .addSource(coindesk)       // Use source 2
  .setAggregator(aggregator) // Set the aggregation script
  .setTally(tally)           // Set the tally script
  .setQuorum(4, 2)           // Set witness count
  .setFees(10, 1, 1, 1)      // Set economic incentives
  .schedule(0)               // Make this request immediately solvable

// Do not forget to export the request object
export { request as default }
```

Time to go ahead and [compile the request][next].

[intro]: /tutorials/bitcoin-price-feed/introduction
[POSIX]: https://en.wikipedia.org/wiki/Unix_time
[next]: /tutorials/bitcoin-price-feed/compiling
