# 3. Define the aggregator and tally functions

!!! note "" *This article is part of the
[beginner tutorial on creating a totally decentralized Bitcoin price feed][intro]
on Ethereum with Solidity and Witnet.*

## What is an aggregator?

Aggregators define how to reduce or merge the result of multiple sources
into a single data point. They are similar to Javascript's `.reduce()`
method or the [`fold` higher-order function][fold] from many programming
languages.

In addition, aggregation functions give the chance to filter out any
outliers by using one or more statistical primitives.

- **Every Witnet request needs to have exactly one aggregator
  function**.
- Aggregators contain **zero, one or more filters**.
- Aggregators contain **exactly one reducer**.
- When a Witnet node gets a request assigned for resolution, it
  retrieves every source, applies the source companion scripts on the
  retrieved data, collects the results into an `Array`, and then apply
  the aggregator on it, first running the filters and eventually the
  reducer.


## What is a tally function?

Tallies are really similar to aggregators, but instead of merging
multiple sources, they merge the results reported by multiple Witnet
nodes.

## Let's average multiple sources

In this case, you will be using an aggregator that filters out any
outliers coming from the two sources that you defined before, and
returns the average mean of the `Float` values that pass the filter:

```javascript
// Filters out any value that is more than 1.5 times the standard
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [
   [ Witnet.Types.FILTERS.deviationStandard, 1.5 ]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})
```

That will be enough to reduce the `Array` containing the `Float`
responses of the two sources into a single `Float` that represents the
average mean of non-outliers values. You can now continue with the tally
function.

## Tally by average

For this tutorial, you will be using a tally function that is quite
equivalent to the aggregation function:

```javascript
// Filters out any value that is more than 1.5 times the standard
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
   [ Witnet.Types.FILTERS.deviationStandard, 1.0 ]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})
```

Note however that in this case the deviation filter is using a narrower
threshold (`1.0` instead of `1.5`). This is to make sure that malicious
data points will not affect the final result, and that the witnesses
that produced such outliers will be punished for their misbehavior.

## Quick recap

At this point, `requests/BitcoinPrice.js`  should look like this:

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
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [
   [ Witnet.Types.FILTERS.deviationStandard, 1.5 ]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

// Filters out any value that is more than 1.5 times the standard
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
   [ Witnet.Types.FILTERS.deviationStandard, 1.0 ]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})
```

Now it is time to put everything together and
[fine-tune the request][next].

!!! question "Remember: You are not alone!"
    You are invited to join the [Witnet Community Discord][discord].
    Members of the Witnet community will be happy to answer your
    questions and doubts, as well as assisting you through this
    tutorial.

[discord]: https://discord.gg/X4uurfP
[intro]: /tutorials/bitcoin-price-feed/introduction
[fold]: https://en.wikipedia.org/wiki/Fold_(higher-order_function)
[next]: /tutorials/bitcoin-price-feed/fine-tuning
