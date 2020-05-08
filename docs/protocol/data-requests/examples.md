# Examples

## What's the weather in Berlin?

The following retrieval, aggregation and tally scripts operate on the
result of [this query to the OpenWeatherMap API ][openweathermap] and
returns the current weather conditions in Berlin.

### Retrieval stage

```ts tab="Javascript"
new Witnet.Script()
  .parseJSON()     // Parse the string, which we now to be JSON-encoded
  .asMap()         // Treat that as a Javascript object
  .get("weather")  // Get the value associated to the `weather` key
  .asMap()         // Treat that as a Javascript object too
  .get("temp")     // Now get the value associated to the `weather` key
  .asFloat();      // Finally treat that as a floating point number
```

```ts tab="RADON-AST"
[
  STRING_PARSEJSON,
  BYTES_ASMAP,
  [ MAP_GET, "weather" ],
  BYTES_ASMAP,
  [ MAP_GET, "temp" ],
  BYTES_ASFLOAT
]
```

```ts tab="RADON-JSON"
[
  69,
  116,
  [ 97, "weather" ], 
  116,
  [ 97, "temp" ], 
  114
]
```

```ts tab="CBOR (Base16)"
8618451874821861477765617468657218748218614474656D701872
```

### Aggregation stage

```ts tab="Javascript"
new Witnet.Script([Witnet.TYPES.ARRAY, Witnet.TYPES.FLOAT])
  .filter(Witnet.Types.FILTERS.greaterThan, -30)
  .filter(Witnet.Types.FILTERS.lessThan, 50)
  .filter(Witnet.Types.FILTERS.deviationStandard)
  .reduce(Witnet.Types.REDUCERS.averageMean)
```

```ts tab="RADON-AST"
[
  [ ARRAY_FILTER, FILTER_GREATERTHAN, -30 ],
  [ ARRAY_FILTER, FILTER_LESSTHAN, 50 ],
  [ ARRAY_FILTER, FILTER_DEVIATIONSTANDARD, 2 ],
  [ ARRAY_REDUCE, REDUCER_AVERAGEMEAN ]
]
```

```ts tab="RADON-JSON"
[
  [ 83, 0, -30 ],
  [ 83, 1, 50 ],
  [ 83, 5 ],
  [ 87, 3 ]
]
```

```ts tab="CBOR (Base16)"
8483185300381D8318530118328218530582185703
```

1. Drop values less or equal than `-30`,
2. Drop values greater or equal than `50`,
3. Drop values deviating from the average more than `2`,
4. Calculate and return the arithmetic mean of the remaining values in 
   the `Array`.

### Tally stage

The following tally script is quite generic but should work for most
cases where we are trying to build consensus on `Integer` or `Float`
data points.

```ts tab="Javascript"
new Witnet.Script([Witnet.TYPES.ARRAY, Witnet.TYPES.FLOAT])
  .filter(Witnet.Types.FILTERS.deviationStandard, 2)
  .reduce(Witnet.Types.REDUCERS.averageMean)
```

```ts tab="RADON-AST"
[ 
  [ ARRAY_FILTER, FILTER_DEVIATIONSTANDARD, 2 ],
  [ ARRAY_REDUCE, REDUCER_AVERAGEMEAN ]
]
```

```ts tab="RADON-JSON"
[
  [ 83, 5, 2 ],
  [ 87, 3 ]
]
```

```ts tab="CBOR (Base16)"
82831853050282185703
```

1. Drop values deviating from the average more than twice the standard
   deviation of the remaining values in the `Array`,
2. Calculate and emit the arithmetic mean of the remaining values in the
   `Array`
   
## What's the USD price of a bitcoin?

The following retrieval, aggregation and tally scripts operate on the
result of [this query to the Coinbase price API][coinbase] that returns
the current price of a bitcoin in US dollars.

### Retrieval stage

```ts tab="Javascript"
new Witnet.Script([Witnet.TYPES.STRING])
  .parseJSON()
  .asMap()
  .get("bpi")
  .asMap()
  .get("usd")
  .asMap()
  .get("rate_float")
  .asFloat()

```

```ts tab="RADON-AST"
[
  STRING_PARSEJSON,
  BYTES_ASMAP,
  [ MAP_GET , "bpi" ],
  BYTES_ASMAP,
  [ MAP_GET, "USD" ],
  BYTES_ASMAP,
  [ MAP_GET, "rate_float" ],
  BYTES_ASFLOAT
]
```

```ts tab="RADON-JSON"
[
  69,
  116,
  [ 97, "bpi" ],
  116,
  [ 97, "usd" ],
  116,
  [ 97, "rate_float" ],
  114
]
```

```ts tab="CBOR (Base16)"
88184518748218616362706918748218616375736418748218616A726174655F666C6F61741872
```

1. Parse the input `String` as a JSON document (retrieval always starts
   with `String`),
2. Treat the structure as `Map`,
3. Take the value of the `"bpi"` key,
4. Treat the structure as `Map`.
5. Take the value of the `"USD"` key,
6. Treat the structure as `Map`.
7. Take the value of the `"rate_float"`,
8. Return the value as `Float`.

### Aggregation stage

The following tally script is quite generic but should work for most
cases where we are trying to build consensus on `Integer` or `Float`
data points.

```ts tab="Javascript"
new Witnet.Script([Witnet.TYPES.ARRAY, Witnet.TYPES.FLOAT])
  .filter(Witnet.Types.FILTERS.deviationStandard, 2)
  .reduce(Witnet.Types.REDUCERS.averageMean)
```

```ts tab="RADON-AST"
[ 
  [ ARRAY_FILTER, FILTER_DEVIATIONSTANDARD, 2 ],
  [ ARRAY_REDUCE, REDUCER_AVERAGEMEAN ]
]
```

```ts tab="RADON-JSON"
[
  [ 83, 5, 2 ],
  [ 87, 3 ]
]
```

```ts tab="CBOR (Base16)"
82831853050282185703
```

1. Drop values deviating from the average more than twice the standard
   deviation of the remaining values in the `Array`,
2. Calculate and emit the arithmetic mean of the remaining values in the
   `Array`
   
### Tally stage

For the tally stage we can safely use the same generic script as for the
aggregation stage.

## Heads or tails?

The following retrieval, aggregation and tally scripts operate on the
result of
[this query to the Australian National University Quantum Random Numbers Server][random]
that returns true random numbers in the `[0, 255]` range generated in
real-time by measuring the quantum fluctuations of the vacuum in a
laboratory.

The tally stage computes the average of the values reported by multiple
witness nodes, which will produce a point in the `[0, 255]` range that
is normally distributed around the half-range, i.e. it will fall in any
of the `[0, 127]` or `[128, 255]` sub-ranges with a 50% probability.

Finally, it checks which side of the half-range the point
actually fell, and maps that onto a `String` with value `heads` or
`tails`.

### Retrieval stage

```ts tab="Javascript"
new Witnet.Script([Witnet.TYPES.STRING])
  .parseJSON()
  .asMap()
  .get("data")
  .asArray()
  .get(0)
  .asInteger()
```

```ts tab="RADON-AST"
[
  STRING_PARSEJSON,
  BYTES_TOMAP,
  [ MAP_GET, "data" ],
  BYTES_TOARRAY,
  [ ARRAY_GET, 0 ],
  BYTES_ASARRAY
]
```

```ts tab="RADON-JSON"
[
  69,
  116,
  [ 97, "data" ],
  112,
  [ 85, 0 ],
  115
]
```

```ts tab="CBOR (Base16)"
861845187482186144646174611870821855001873
```

1. Parse the input `String` as a JSON document (retrieval always starts
   with `String`),
2. Treat the structure as `Map<String, Mixed>`,
3. Take the value of the `"data"` key as `Mixed`,
4. Treat the structure as `Array<Mixed>`.
5. Take the value at index `0` as `Mixed`,
6. Emit the value as `Float`.

### Tally stage

```ts tab="Javascript"
new Witnet.Script([Witnet.TYPES.ARRAY, Witnet.TYPES.INTEGER])
  .filter(Witnet.Types.FILTERS.greaterOrEqualThan, 0)
  .filter(Witnet.Types.FILTERS.lessOrEqualThan, 255)
  .reduce(Witnet.Types.REDUCERS.averageMean)
  .round()
  .greaterThan(127)
  .match({true: "tails"}, "heads")
```

```ts tab="RADON-AST"
[
  [ ARRAY_FILTER, FILTER_GREATEROREQUALTHAN, 0 ],
  [ ARRAY_FILTER, FILTER_LESSOREQUALTHAN, 255 ],
  [ ARRAY_REDUCE, REDUCER_AVERAGEMEAN ],
  FLOAT_ROUND,
  [ INTEGER_GREATERTHAN, 127 ],
  [ INTEGER_MATCH, { true: "tails" }, "heads" ]
]
```

```ts tab="RADON-JSON"
[
  [ 83, 129, 0 ],
  [ 83, 128, 255 ],
  [ 87, 3 ],
  60,
  [ 36, 127 ],
  [ 16, { true: 'tails' }, 'heads' ]
]
```

```ts tab="CBOR (Base16)"
86831853188100831853188018FF82185703183C821824187F8310A1F5457461696C73456865616473
```

1. Remove any items with value under `0` from `Array`,
2. Remove any items with value over `255` from the remaining `Array`,
3. Calculate the arithmetic mean of the remaining `Array`,
4. Round the resulting `Float` to its closest `Integer` value,
5. Check if the resulting `Integer` is greater than `127`, and continue
   with a `Boolean` of value `true` or `false` accordingly,
6. Map the `Boolean` to `String` by converting `false` into `"heads"`
   and `true` into `"tails"`.


[openweathermap]: https://openweathermap.org/data/2.5/weather?id=2950159&appid=b6907d289e10d714a6e88b30761fae22
[coinbase]: https://api.coindesk.com/v1/bpi/currentprice.json
[random]: http://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8
