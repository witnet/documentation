# 2. Choose and add data sources for the price feed

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

## A quick intro on Witnet data sources

**Data sources are each of the endpoints from which you want Witnet to
retrieve the data**. Most times, these will be the URLs of public APIs.

There is no limit to the number of sources in a single Witnet
request—although the more sources, the higher the fees will be.

**Each source can have a companion script** that lists operations that
we want the witnesses to apply on the retrieved data. This enables you
to get the information of your interest extracted out of larger data
structures like JSON objects.

## Choose your sources carefully

Just like your friends—and your enemies—your **data sources need to be
chosen wisely**. The *[Garbage In, Garbage Out][GIGO]* principle really
applies here. Regardless of the many *checks-and-balances*,
well-designed incentives and security measures that the Witnet protocol
implements, if the data sources in your Witnet requests are not
reliable, either will your contracts be.

The more data sources and the more reliable they are, the more
trust-mitigated your Witnet requests will become. That is, your
contracts will be more resilient to downtime, failure or corruption of
each separate source.

## Introducing smart data sources

The scripting language used in Witnet requests is quite rich indeed: in
addition to selecting specific pieces of data, you can also transform
those so they are uniform and can be compared or aggregated together.
E.g. imagine a request that queries weather data. One source may use
Celsius and the other may use Fahrenheit, but you will tell Witnet to
transform one into another so they can be averaged.

In this tutorial, you will be defining two data sources—one for querying
[Bitstamp] and the other for [CoinDesk]:

```javascript tab="Source 1: Bitstamp"
// Retrieves USD price of a bitcoin from the BitStamp API
const bitstamp = new Witnet.Source("https://www.bitstamp.net/api/ticker/")
  .parseMapJSON()   // Parse a `Map` from the retrieved `String`
  .getFloat("last") // Get the `Float` value associated to the `last` key
```

```javascript tab="Source 2: CoinDesk"
// Retrieves USD price of a bitcoin from CoinDesk's "bitcoin price index" API
// The JSON here is a bit more complex, thus more operators are needed
const coindesk = new Witnet.Source("https://api.coindesk.com/v1/bpi/currentprice.json")
  .parseMapJSON()         // Parse a `Map` from the retrieved `String`
  .getMap("bpi")          // Get the `Map` value associated to the `bpi` key
  .getMap("USD")          // Get the `Map` value associated to the `USD` key
  .getFloat("rate_float") // Get the `Float` value associated to the `rate_float` key
```

These scripts are quite self-explanatory, but there are a few details
that are worth noticing:

- The operators and data types that can be used are defined by the
  [RADON domain-specific language][radon].
- Each operator is applied on the output of the previous operator, just
  as you would expect from Javascript method chaining or
  [the builder pattern][builder].
- Source scripts always start with a `String`[^1].
- Key-value data structures (roughly alike to Javascript *objects*,
  Python *dictionaries* or Solidity *mappings*) are called *maps*.
- Values in maps cannot be accessed directly by name as `.keyName` but
  rather accessed through a call to one of the `.getArray("keyName")`,
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
```

Notice the `import` instruction on top, which makes possible using all
the tools that the Witnet Javascript library provides:

```javascript
import * as Witnet from "witnet-requests"
```

Please make sure you save the `requests/BitcoinPrice.js` file.
  
## Next step: define aggregator and tally functions

You are done with the sources for now. Let's move forward into
[defining the aggregation and tally functions][next].

!!! question "Remember: You are not alone!"
    You are invited to join the [Witnet Community Discord][discord].
    Members of the Witnet community will be happy to answer your
    questions and doubts, as well as assisting you through this
    tutorial.

[discord]: https://discord.gg/X4uurfP
[intro]: /tutorials/bitcoin-price-feed/introduction
[next]: /tutorials/bitcoin-price-feed/aggregations
[radon]: /protocol/data-requests/overview/#rad-object-notation-radon
[builder]: https://en.wikipedia.org/wiki/Builder_pattern
[GIGO]: https://en.wikipedia.org/wiki/Garbage_in,_garbage_out
[Bitstamp]: https://www.bitstamp.net/api/ticker/
[CoinDesk]: https://www.bitstamp.net/api/ticker/

[^1]: In future versions, the Witnet protocol will make no assumptions
on what the data type of the server response will be for different data
sources. This will allow dealing with formats other than plain text,
such as multimedia files and any other kind of binaries. Therefore,
source scripts will start with `Bytes` as the input type and it will be
totally up to the requester to specify whether those bytes should be
interpreted as a `String`, `Integer` or whatnot.

[^2]: One of the key features in the future RADON 2.0 version will be
implicit type casting, which will dramatically cut off the size of
scripts.
