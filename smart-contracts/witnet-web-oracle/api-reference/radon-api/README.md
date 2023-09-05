# RADON API

RADON is a scripting language that retrieves, attests to, and delivers data within the Witnet Decentralized Oracle Network, facilitating the conversion of the request into a CBOR representation and subsequently into a protobuf bytes schema.

There are several components that are used to build a RADON Request.&#x20;

* [RADRequest](./#radrequest)
* [RADFilter](./#radfilter)
* [RADRetrieve](./#radretrieve)
* [RADKind](./#radkind)
* [RADTally](./#radtally)
* [RADFilter](./#radfilter-1)
* [RADAggregate](./#radaggregate)
* [Filters](./#radfilter-1)
* [Reducers](./#radreducer)

## RADRequest

Constructor Parameters:

* [`retrieve`](./#radretrieve)
* [`aggregate`](./#radaggregate)
* [`tally`](./#radtally)

Request Methods:

<table data-full-width="false"><thead><tr><th width="186">Method Name</th><th width="291">Method Params</th><th>Response</th></tr></thead><tbody><tr><td><a href="./#addsource">addSource</a></td><td><code>source</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#setaggregator">setAggregator</a></td><td><code>aggregator</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#settally">setTally</a></td><td><code>tally</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#setquorum">setQuorum</a></td><td><code>witnesses</code>,<br><code>min_consensus_percentage</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#setcollateral">setCollateral</a></td><td><code>collateral</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#setfees">setFees</a></td><td><code>reward</code>,<br><code>commit_and_reveal_fee</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#schedule">schedule</a></td><td><code>timestamp</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#settimestamp">setTimestamp</a></td><td><code>timestamp</code></td><td><code>RADRequest</code></td></tr><tr><td><a href="./#asjson">asJson</a></td><td>none</td><td><code>Map</code></td></tr></tbody></table>

### `addSource`

The `addSource` method pushes a source to the `retrieve` array and sets the data point type to the last type of the source.

### setAggregator

The `setAggregator` method sets a `aggregate field` ([`RADAggregate`](./#radaggregate)) for data aggregation.

### setTally

Method to set the tally for data aggregation.

rejects unsupported operators

sanitize malformed filters and reject unsupported filters&#x20;



### setQuorum

Method to set the quorum parameters

* `witnesses`: the number of witnesses
* `min_consensus_percentage`: the minimum consensus percentage

### setCollateral

* `collateral`: the collateral amount in nanoWIT which needs to be >= 1 WIT e.g. 1000000000 nanoWIT

### setFees

* `reward`: the witness reward
* `commit_and_reveal_fee`: the commit and reveal fee

### schedule

* timestamp

### setTimestamp

timestamp

### asJson

## RADRetrieve

* `kind`: The enum value representing the [RADKind](./#radkind).&#x20;
* `script`: the RADON script that specifies the retrieval from the source data.
* `url`: The URL of the retrieval.
* `body`: The body is an optional field used for the HTTP request.
* `headers`: The headers are an optional field used for the HTTP request.

## RADKind

Each `RADRetrieve` object is associated with a `RADKind`, represented by an enum with values ranging from 0 to 3. The possible enum values are "Unknown," "HTTP-GET," "RNG," and "HTTP-POST."

* `Unknown`: An unknown RAD Request type.
* `HTTP-GET`: A HTTP GET Request
* `RNG`: A request to generate a secure random number.
* `HTTP-POST`: A request to generate a secure random number.

<pre class="language-javascript" data-full-width="true"><code class="lang-javascript"><strong>// Retrieve data from a HTTP-GET Source
</strong>const httpGetSource = new Witnet.Source("https://...")
// Retrieve a secure random number
const randomSource = new Witnet.RandomSource()
//Retrieve data from a HTTP-POST Source
const httpPostSource = new Witnet.Source("https://...",
  ``
)
// Retrieve data from a GraphQL Source
const graphQLSource = new Witnet.GraphQLSource("https://api.thegraph.com/subgraphs/name/beamswap/beamswap-dex"
 `{
    pair(id:\"0x61b4cec9925b1397b64dece8f898047eed0f7a07\")
      { 
        token0Price 
      } 
  }`
)
</code></pre>

<table><thead><tr><th width="142.33333333333331">OP Code</th><th width="167">Name</th><th>Description</th></tr></thead><tbody><tr><td><code>0x00</code></td><td><code>Unknown</code></td><td>An unknown RAD Request type.</td></tr><tr><td><code>0x01</code></td><td><code>HTTP-GET</code></td><td>A HTTP GET Request</td></tr><tr><td><code>0x02</code></td><td><code>RNG</code></td><td>A request to generate a secure random number.</td></tr><tr><td><code>0x03</code></td><td><code>HTTP-POST</code></td><td>A request to generate a secure random number.</td></tr></tbody></table>

## RADTally

* `filters`: An array of RADFilters.
* `reducer`: A Single RADReducer.

A RADTally has an array of of type RADFilter and a single RadonReducer.

```javascript
// Filters out any value that is more than 2.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
    [Witnet.Types.FILTERS.deviationStandard, 2.5],
  ],
  reducer: Witnet.Types.REDUCERS.averageMean,
})
```

## RADFilter

Constructor Parameters:&#x20;

* `op`: The op parameter refers to a RADONFilter OP Code, the available codes are listed below.
* `args`:&#x20;

## RADAggregate

* `RADFilter`:&#x20;
* `RadonReducer`:&#x20;

A `RADAggregate` has an array of type `RADFilter` and a single `RadonReducer`.

```javascript
// Filters out any value that is more than 1.4 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [
    [Witnet.Types.FILTERS.deviationStandard, 1.4],
  ],
  reducer: Witnet.Types.REDUCERS.averageMean,
})
```

## RAD Filters

#### deviationStandard

Discards any result that is more than the provided input times the standard deviations times away from the average.

OP Code: `0x05`

#### mode

Discards any result that is the different from the mode.

OP Code: `0x08`

## RAD Reducers

### mode

Computes the mode of the values.

OP Code: `0x02`

### averageMean

Computes the average mean.

OP Code: `0x03`

### averageMedian

Computes the average median.

OP Code: `0x05`

### deviationStandard

&#x20;Computes the standard deviation.

OP Code: `0x07`

### hashConcatenate

Computes the hash and concatenates the values.

OP Code: `0x0B`
