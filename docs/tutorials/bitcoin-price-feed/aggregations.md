# 3. Define aggregation and tally functions

!!! note ""
    *This article is part of the
    [beginner tutorial on creating a totally decentralized Bitcoin price feed][intro]
    on Ethereum with Solidity and Witnet.*

## What is an aggregation function?

An aggregation function is a Witnet script that defines how to reduce
the result of multiple sources into a single data point. They are
similar to Javascript's `.reduce()` method or the
[`fold` higher-order function][fold] from many programming languages.

- **Every Witnet request needs to have one and only one aggregation
  function**.
- Aggregation functions always start with an `Array` containing the output
value of each of the source scripts.
- When a Witnet node is assigned a request it retrieves every source,
  applies the source companion scripts on the retrieved data, collect
  those into an `Array`, then apply the aggregation script on it.


## What is a tally function?

Tally functions are really similar to aggregation functions, but instead
of aggregating multiple sources, they aggregate the results reported by
multiple Witnet nodes.

## Let's average multiple sources

In this case, you will be using an aggregation function that returns the
average mean of the `Float` values coming from the two sources that you
defined before:

```javascript
// Computes the average mean of the two sources using a reducer
const aggregator = new Witnet.Aggregator([bitstamp, coindesk]) // Create a new aggregation
  .reduce(Witnet.Types.REDUCERS.averageMean)                   // Reduce the input `Array` using the average mean
```

That will be enough to reduce the `Array` containing the `Float`
responses of the two sources into a single `Float` that represents the
average mean. You can now continue with the tally function.

## Tally by average

For this tutorial, you will be using a tally function that is quite
equivalent as the aggregation function:

```javascript
// Computes the average mean of the values reported by multiple nodes using a reducer
const tally = new Witnet.Tally(aggregator)   // Create a new tally function
  .reduce(Witnet.Types.REDUCERS.averageMean) // Reduce the input `Array` using the average mean
```

## Quick recap

At this point, `requests/BitcoinPrice.js`  should look like this:

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
```

Now it is time to put everything together and
[fine-tune the request][next].

[intro]: /tutorials/bitcoin-price-feed/introduction
[fold]: https://en.wikipedia.org/wiki/Fold_(higher-order_function)
[next]: /tutorials/bitcoin-price-feed/fine-tuning
