# 2. Choose and add data sources for the price feed

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

## A quick intro on Witnet data sources

**Data sources are each of the endpoints from which you want Witnet to
retrieve the data**. Most of the time, these will be the URLs of public APIs.

There is no limit to the number of sources in a single Witnet
request — although the more sources, the higher the fees will be.

**Each source can have a companion script** that lists the operations
we want the witnesses to apply on the retrieved data. This enables you
to get the information of your interest extracted out of larger data
structures like JSON objects.

## Choose your sources carefully

Just like your friends—and your enemies—your **data sources need to be
chosen wisely**. The *[Garbage In, Garbage Out][GIGO]* principle
applies here. Regardless of the many *checks-and-balances*,
well-designed incentives and security measures that the Witnet protocol
implements, if the data sources in your Witnet requests are not
reliable, your contracts won't be either.

The more **reliable** data sources you list, the more
trust-mitigated your Witnet requests will become. In other words, your
contracts will be more resilient to downtime, failure or corruption of
each separate source.

## Introducing smart data sources

The scripting language used in Witnet requests is very flexible: in
addition to selecting specific pieces of data, you can also transform
them so they are uniform and can be compared or aggregated together.
For example, imagine a request that queries weather data. One source may use
Celsius and the other may use Fahrenheit. You can tell Witnet to
transform them both to Celsius so they can be averaged.

In this tutorial, you will be defining two data sources — one querying
[Binance] and the other for [Kraken]:

=== "Source 1: Binance"
	```javascript
    // Retrieves USD price of a bitcoin from the Binance API
    const binance = new Witnet.Source("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      .parseJSONMap()         // Parse a `Map` from the retrieved `String`
      .getFloat("price")      // Get the `Float` value associated to the `last` key
    ```
=== "Source 2: Kraken"
	```javascript
    // Retrieves USD price of a bitcoin from the Kraken API
    // The JSON here is a bit more complex, thus more operators are needed
    const kraken = new Witnet.Source("https://api.kraken.com/0/public/Ticker?pair=BTCUSD")
      .parseJSONMap()         // Parse a `Map` from the retrieved `String`
      .getMap("result")       // Get the `Map` value associated to the `result` key
      .getMap("XXBTZUSD")     // Get the `Map` value associated to the `XXBTZUSD` key
      .getArray("a")          // Get the `Array` value associated to the `a` key
      .getFloat(0)            // Get the `Float` value at index `0`
    ```

A few things worth noticing:

- The operators and data types that can be used are defined by the
  [RADON domain-specific language][radon].
- Each operator is applied on the output of the previous operator, just
  as you would expect from Javascript method chaining or
  [the builder pattern][builder].
- Source scripts always start with a `String`[^1].
- Key-value data structures (roughly similar to Javascript *objects*,
  Python *dictionaries* or Solidity *mappings*) are called *maps*.
- Values in maps cannot be accessed directly by name as `.keyName` but
  instead through a call to one of the `.getArray("keyName")`,
  `.getBoolean("keyName")`, `.getInteger("keyName")`, `.getFloat("keyName")`,
  `.getInteger("keyName")`, `.getMap("keyName")` or `.getString("keyName")` operators.
- The final return type of a script is that of its last operator.
- For any combination of known input type and RADON script, the output
  type can be easily guessed upon compilation.
- **All source scripts MUST return exactly the same type** (`Float` in
  this case).
  
## Where do I put the sources?

Let's create a new `requests/BitcoinPrice.js` file and copy the two example
sources above into it:

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
```

Notice the `import` instruction at the top, which makes it possible to use all
the tools that the Witnet Javascript library provides:

```javascript
import * as Witnet from "witnet-requests"
```

Please make sure you save the `requests/BitcoinPrice.js` file.
  
## Next step: define aggregator and tally functions

You are done with the sources for now. Let's move forward into
[defining the aggregation and tally functions][next].

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[intro]: /tutorials/bitcoin-price-feed/introduction
[next]: /tutorials/bitcoin-price-feed/aggregations
[radon]: /protocol/data-requests/overview/#rad-object-notation-radon
[builder]: https://en.wikipedia.org/wiki/Builder_pattern
[GIGO]: https://en.wikipedia.org/wiki/Garbage_in,_garbage_out
[Binance]:"https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
[Kraken]: https://api.kraken.com/0/public/Ticker?pair=BTCUSD

[^1]: In future versions, the Witnet protocol will make no assumptions
on what the data type of the server response will be for different data
sources. This will allow for formats other than plain text,
such as multimedia files and any kind of binaries. Therefore,
source scripts will start with `Bytes` as the input type; it will be
totally up to the requester to specify whether those bytes should be
interpreted as a `String`, `Integer` etc.

[^2]: One of the key features in RADON 2.0 will be
implicit type casting, which will dramatically reduce the size of
scripts.
