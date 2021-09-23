# 3. Define the aggregator and tally functions

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

## What is an aggregator?

Aggregators define how to reduce or merge the result of multiple sources
into a single data point. They are similar to JavaScript's `.reduce()`
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
  the aggregator on it, first running the filters and later the
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
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})
```

That will be enough to reduce the `Array` containing the `Float`
responses of the two sources into a single `Float` that represents the
average mean of non-outliers values. You can now continue with the tally
function.

## Tally by average

For this tutorial, we will be using a tally function that is quite
similar to the aggregation function:

```javascript
// Filters out any value that is more than 1.5 times the standard
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})
```

## Quick recap

At this point, `requests/BitcoinPrice.js`  should look like this:

```javascript
import * as Witnet from "witnet-requests"

// Retrieves USD price of a bitcoin from the Binance API
const binance = new Witnet.Source("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
  .parseJSONMap()         // Parse a `Map` from the retrieved `String`
  .getFloat("price")      // Get the `Float` value associated to the `last` key

// Retrieves USD price of a bitcoin from the Kraken API
// The JSON here is a bit more complex, thus more operators are needed
const kraken = new Witnet.Source("https://api.kraken.com/0/public/Ticker?pair=BTCUSD")
  .parseJSONMap()         // Parse a `Map` from the retrieved `String`
  .getMap("result")       // Get the `Map` value associated to the `result` key
  .getMap("XXBTZUSD")     // Get the `Map` value associated to the `XXBTZUSD` key
  .getArray("a")          // Get the `Array` value associated to the `a` key
  .getFloat(0)            // Get the `Float` value at index `0`

// Filters out any value that is more than 1.5 times the standard
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

// Filters out any value that is more than 1.5 times the standard
// deviation away from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})
```

Now it is time to put everything together and
[fine-tune the request][next].

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[intro]: /tutorials/bitcoin-price-feed/introduction
[fold]: https://en.wikipedia.org/wiki/Fold_(higher-order_function)
[next]: /tutorials/bitcoin-price-feed/fine-tuning
