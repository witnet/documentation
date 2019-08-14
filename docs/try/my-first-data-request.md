# Create a Data Request

Witnet data requests can be easily created with the `witnet-request`
Javascript library. If you know some Javascript, you have already done
the hardest part!

## Create a new Witnet-enabled Node project

When creating a new project from scratch, the quickest way to get
things working is using [Truffle][truffle] to import a Witnet-enabled
project template:
```console
truffle unbox witnet/witnet-ethereum-template
```

If you prefer not to use Truffle, you are OK to go with plain `npm` or
`yarn`:

```console tab="npm"
npm init my-first-witnet-project
cd my-first-witnet-project
npm install --save-dev witnet-request
```

```console tab="yarn"
yarn init my-first-witnet-project
cd my-first-witnet-project
yarn add --dev witnet-request
```

## Add `witnet-request` to your existing Node project

If you want to build support for Witnet into your existing project, you
can simply add the `witnet-request` contract as a dependency:

```console tab="npm"
npm install --save-dev witnet-request
```

```console tab="yarn"
yarn add --dev witnet-request
```

## Write your first Witnet request

In this example we will:

- Query **two different APIs** for the USD price of a bitcoin using **4
  witnessing nodes** from Witnet.
- Tell those nodes to **aggregate** the values from both APIs and report
  the result.
- Define how to **tally** the results reported by the different nodes
  into **a single data point** that can be consumed by a smart contract.

*Ok, time to get down to work*. First off, create a `BitcoinPrice.js`
file where you will write the request. You can place it anywhere, but it
is recommended to put all the request files inside your project in a
single directory called `requests`.

!!! tip
    If you are using the Truffle template, you already have a `requests`
    folder in your project. That is totally the right place to create the
    `BitcoinPrice.js` file.

### Import the library

Importing the `witnet-request` library into your `BitcoinPrice.js`
request is pretty straightforward:

```javascript
import * as Witnet from "witnet-request"
```

### Define the data sources

Data sources are each of the endpoints from which you want the
witnessing nodes to retrieve the data. Most times, these will be the
URLs of public APIs.

The number of sources in a single data request is unlimited⁠—although
the more sources, the higher the fees.

Each source can have a companion script that lists operations that we
want the witnesses to apply on the retrieved data. This enables you to
extract the information of your interest out of larger data structures
like JSON objects.

The scripting language in data request is quite rich indeed: in addition
to selecting specific pieces of data, you can also transform those so
they are uniform and can be compared or aggregated together. E.g.
imagine a weather forecast data request. One source may use Celsius and
the other may use Fahrenheit, but you will tell the witnesses to
transform one into another so they can be averaged.

In this tutorial, you will be defining two data sources:

```javascript tab="Source 1: Bitstamp"
// Retrieves USD price of a bitcoin from the BitStamp API
const bitstamp = new Witnet.Source("https://www.bitstamp.net/api/ticker/")
  .asString()  // Treat the response as a string of text
  .parseJSON() // Parse the string, which you now to be JSON-encoded
  .asMap()     // Treat that as a Javascript object
  .get("last") // Get the value associated to the `last` key
  .asFloat()   // Treat that as a floating point number
```

```javascript tab="Source 2: CoinDesk"
// Retrieves USD price of a bitcoin from CoinDesk's "bitcoin price index" API
// The JSON here is a bit more complex, thus more operators are needed
const coindesk = new Witnet.Source("https://api.coindesk.com/v1/bpi/currentprice.json")
  .asString()        // Treat the response as a string of text
  .parseJSON()       // Parse the string, which you now to be JSON-encoded
  .asMap()           // Treat that as a Javascript object
  .get("bpi")        // Get the value associated to the `last` key
  .asMap()           // Treat that as a Javascript object
  .get("USD")        // Get the value associated to the `last` key
  .asMap()           // Treat that as a Javascript object
  .get("rate_float") // Get the value associated to the `last` key
  .asFloat()         // Treat that as a floating point number
```

These scripts are quite self-explanatory, but there are a few details
that are worth noticing:

- The operators and data types that can be used are defined by the
  [RADON domain-specific language][radon].
- Each operator is applied on the output of the previous operator.
- Source scripts always start with a binary stream of bytes[^1], hence
  the need for the `.asString()` operator.
- Type conversions are explicit, i.e. you need to use `.asString()`,
  `.asMap()`, `.asFloat()`, etc.
- Key-value data structures (alike to Javascript objects) are called
  *maps*.
- Values in maps cannot be accessed directly by name as `.keyName` but
  rather accessed through a call to the `.get("keyName")` operator.
- The final return type of a script is that of its last operator. 
- All source scripts should return exactly the same type (`Float` in
  this case).

### Define the aggregator script

*Good*. Now it is time for defining how you want the witnesses to reduce
the results of the different sources into the single data point that
they will report.

Every data request needs exactly one aggregator script, which can be
written using the same syntax, types and operators as source scripts and
just any other kind of Witnet scripts.

Here goes your aggregator script:

```javascript
const aggregator = new Witnet.Aggregator([coindesk, bitstamp])
  .flatten()
  .filter(Witnet.Filters.deviationStandard, 2)
  .reduce(Witnet.Reducers.averageMean)
```

This may look simpler than the source scripts, but there are some
details that deserve some special attention:

- When creating aggregator scripts you need to specify the sources on
  which it will be applied (`[bitstamp, coindesk]` in the example) so
  the compiler knows the input type and can check for uniformity.
- All aggregator scripts start with an `Array` containing as many items
  as sources, where those items can be `Result::Ok(value)` or
  `Result::Err(errorMessage)`:
  ```rust
  [ Result::Ok(10284), Result::Ok(10291) ]             // Both sources succeeded
  [ Result::Ok(10284), Result::Err("404: Not Found") ] // The second source failed
  ```
- The `.flatten()` operator removes all `Result::Err(errorMessage)`
  items, i.e. it gets rid of any source that failed to respond,
  responded with an error code or whose companion script failed to
  execute.
- You can filter the remaining source responses using any of the
  available filters. The one you are using here is specially powerful,
  as it removes any data point that falls twice as far from the average
  as the standard deviation of the entire `Array`. *Clever, huh?*
- Finally, you are telling the witnesses to calculate the arithmetic 
  mean of the remaining data points and report the result so that the
  request can move on to the final stage of the request: the tally.


### Define the tally script

This far you have created a couple of data sources and then an
aggregator script that reduces them down to a single data point.

But the fun does not end here. You actually want several nodes to
perform the retrieval and aggregation separately. Guess how can you
specify how to reduce their respective results into the single data
point that your smart contract will be expecting? *Ok, you saw it
coming*: with another script.

Tally scripts are very much alike to aggregator scripts, being the main
difference that they operate on the results coming from different nodes
instead of different data sources.

Once again, tally scripts are written using the same syntax and types as
source and aggregator scripts, however, a few operators are disabled for
security reasons[^2].

!!!tip
    One another point you should have in mind is that any witness node
    whose reported result is discarded by the filters in the tally
    script will receive no rewards. In other words, only those nodes
    whose results pass all the filters will be taken into account during
    rewards distribution.

Here goes your tally script:

```javascript
const tally = new Tally(aggregator)
  .flatten()
  .filter(Witnet.Filters.deviationStandard, 1.5)
  .reduce(Witnet.Filters.averageMean)
```

As you can see, tally scripts tend to be quite similar to aggregator
scripts. In this case, the only two differences are:

- The aggregator script needs to be passed to the `Tally` constructor it
  knows what is the input type.
- The harshness of the deviation filter has been fine tuned (from `2` to
  `1.5`) to produce a higher-quality result as more outliers will be
  left out of the final value—and out of the rewards distribution too.

### Put everything together

You have already created every single piece that make up a data request.
*You are almost there!*

Now it is time to put them all together and set some final parameters:

```javascript
const request = new Request() // Create a new request
  .addSource(bitstamp)        // Adds Bitstamp as a source
  .addSource(coindesk)        // Adds CoinDesk as a source
  .setAggregator(aggregator)  // Set aggregation function
  .setTally(tally)            // Set tally function
  .setWitnessCount(4, 2)      // Require between 4 and 6 witnessing nodes
  .schedule(1669852800)       // Schedule for a specific date in the future

export { request as default } // IMPORTANT: export the request as an ES6 module
```

## Next steps



[truffle]: https://www.trufflesuite.com/
[radon]: /protocol/data-requests/overview/#rad-object-notation-radon

[^1]: The Witnet protocol makes no assumptions on what the data type of
the response will be for different data sources. This allows dealing
with formats other than plain text, such as multimedia files and any
other kind of binaries. Thus, source scripts always start with `Bytes`
as the input type and it is totally up to the requester to specify
whether those bytes should be interpreted as a `String`, `Integer` or
whatnot.

[^2]: Using operators like `Array::get()`, `Array::sort()` and
`Array::take()` as well as the `minimum` and `maximum` reducer functions
in a consensus script makes the result of the request too easily
influenced by each individual witness node and can therefore introduce
spurious incentives to tamper with request so as to maximize their own
profit at the expense of data integrity.
