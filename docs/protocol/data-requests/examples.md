# Examples

## What's the weather in Berlin?

The following retrieval, aggregation and tally scripts operate on the
result of [this query to the OpenWeatherMap API ][openweathermap] that
returns the current weather conditions in Berlin.

### Retrieval stage

```ts tab="Javascript"
const openWeatherMaps = new Source("https://openweathermap.org/data/2.5/weather?id=2950159&appid=b6907d289e10d714a6e88b30761fae22")
    .asString()      // Treat the response as a string of text (retrieval always starts with `Bytes`)
    .parseJSON()     // Parse the string, which we now to be JSON-encoded
    .asMap()         // Treat that as a Javascript object
    .get("weather")  // Get the value associated to the `weather` key
    .asMap()         // Treat that as a Javascript object too
    .get("temp")     // Now get the value associated to the `weather` key
    .asFloat();      // Finally treat that as a floating point number
```

```ts tab="RADON-AST"
[
    BYTES_ASSTRING,
    STRING_PARSEJSON,
    MIXED_ASMAP,
    [ MAP_GET, "weather" ],
    MIXED_ASMAP,
    [ MAP_GET, "temp" ],
    MIXED_ASFLOAT
]
```

```ts tab="RADON-JSON"
[ 117, 69, 116, [ 97, 'weather' ], 116, [ 97, 'temp' ], 114 ]
```

```ts tab="CBOR (Base16)"
87187518451874821861677765617468657218748218616474656D701872
```

```ts tab="CBOR (Base64)"
hxh1GEUYdIIYYWd3ZWF0aGVyGHSCGGFkdGVtcBhy
```

```ts tab="CBOR (Base65536)"
䲇䱵䱅𠡴阘𔕧陥鵴𓁥𓈘䲂饡驴𒅭𓀘
```

### Aggregation stage

```ts
9553935200E29352013293520302925603
```
```ts
[
    ARRAY_FLATTEN,                          // 0x53,
    [ ARRAY_FILTER, FILTER_GT, -30 ],       // [ 0x52, 0x00, -30 ], 
    [ ARRAY_FILTER, FILTER_LT, 50 ],        // [ 0x52, 0x01, 50 ],
    [ ARRAY_FILTER, FILTER_DEV_ABS, 2 ],    // [ 0x52, 0x03, 2 ], 
    [ ARRAY_REDUCE, REDUCER_AVG_MEAN ]      // [ 0x56, 0x03 ] 
]
```

1. Drop every negative `Result` (`Err` items) from the input `Array`,
2. Drop values less or equal than `-30`,
3. Drop values greater or equal than `50`,
4. Drop values deviating from the average more than `2`,
5. Calculate and emit the arithmetic mean of the remaining values in the
   `Array`.

### Tally stage

The following tally script is quite generic but should work for most
cases in which we are trying to build consensus on `Integer` or `Float`
data points.

```ts
935393520502925603
```
```ts
[ 
    ARRAY_FLATTEN,                      // 0x53,
    [ ARRAY_FILTERFILTER_DEV_STD, 2 ],  // [ 0x52, 0x05, 2 ], 
    [ ARRAY_REDUCE, REDUCER_AVG_MEAN ]  // [ 0x56, 0x03 ] 
]
```

1. Drop every negative `Result` (`Err` items) from the input `Array`,
2. Drop values deviating from the average more than twice the standard
   deviation of the remaining values in the `Array`,
3. Calculate and emit the arithmetic mean of the remaining values in the
   `Array`.

## What's the USD price of a bitcoin?

The following retrieval, aggregation and tally scripts operate on the
result of [this query to the Coinbase price API][coinbase] that returns
the current price of a bitcoin in US dollars.

### Retrieval stage
```ts
9843749261A3627069749261A3555344749261AA726174655F666C6F617472
```
```ts
[
  OP_STRING_PARSEJSON,          // 0x43,
  OP_MIXED_TOMAP,               // 0x74.
  [ OP_MAP_GET , "bpi" ],       // [ 0x61, "bpi" ].
  OP_MIXED_TOMAP,               // 0x74.
  [ OP_MAP_GET, "USD" ],        // [ 0x61, "USD" ].
  OP_MIXED_TOMAP,               // 0x74.
  [ OP_MAP_GET, "rate_float" ], // [ 0x61, "rate_float" ].
  OP_MIXED_TOFLOAT              // 0x72
]
```

2. Treat the structure as `Map<String, Mixed>`,
3. Take the value of the `"bpi"` key as `Mixed`,
4. Treat the structure as `Map<String, Mixed>`.
5. Take the value of the `"USD"` key as `Mixed`,
6. Treat the structure as `Map<String, Mixed>`.
7. Take the value of the `"rate_float"` key as `Mixed`,
8. Emit the value as `Float`.

### Aggregation stage

The following tally script is quite generic but should work for most
cases in which we are trying to build consensus on `Integer` or `Float`
data points.

```ts
935393520502925603
```
```ts
[ 
    ARRAY_FLATTEN,                      // 0x53,
    [ ARRAY_FILTERFILTER_DEV_STD, 2 ],  // [ 0x52, 0x05, 2 ], 
    [ ARRAY_REDUCE, REDUCER_AVG_MEAN ]  // [ 0x56, 0x03 ] 
]
```

1. Drop every negative `Result` (`Err` items) from the input `Array`,
2. Drop values deviating from the average more than twice the standard
   deviation of the remaining values in the `Array`,
3. Calculate and emit the arithmetic mean of the remaining values in the
   `Array`.
   
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

Finally, it checks in which side of the half-range did the point
actually fall and maps that into a `String` with value `heads` or
`tails`.

### Retrieval stage
```ts
9543749261A46461746170925400
```
```ts
[
  OP_STRING_PARSEJSON,      // 0x43,
  OP_MIXED_TOMAP,           // 0x74,
  [ OP_MAP_GET, "data" ],   // [ 0x61, "data" ],
  OP_MIXED_TOARRAY,         // 0x70,
  [ OP_ARRAY_GET, 0 ]       // [ 0x54, 0 ]
]
```

1. Parse the input `String` as a JSON document (retrieval always starts
   with `String`),
2. Treat the structure as `Map<String, Mixed>`,
3. Take the value of the `"data"` key as `Mixed`,
4. Treat the structure as `Array<Mixed>`.
5. Take the value at index `0` as `Mixed`,
6. Emit the value as `Float`.

### Aggregation stage
```ts
9653925292CC8100925292CC810092560392327F92109292C2A5686561647392C3A57461696C73
```
```ts
[
    OP_ARRAY_FLATTEN,                               // 0x53,
    [ OP_ARRAY_FILTER, [ FILTER_NOT_LT, 0 ] ],      // [ 0x52, [ 0x81, 0 ] ],
    [ OP_ARRAY_FILTER, [ FILTER_NOT_GT, 255 ] ],    // [ 0x52, [ 0x81, 0 ] ],
    [ OP_ARRAY_REDUCE, REDUCER_AVERAGE_MEAN ],      // [ 0x56, 0x03 ],
    [ OP_FLOAT_GREATER, 127 ],                      // [ 0x32, 127 ],
    [ OP_BOOLEAN_MATCH, [                           // [ 0x10, [
        [ false, "heads" ],                         //     [ false, "heads" ],
        [ true, "tails" ]                           //     [ true, "tails" ]
    ] ]                                             // ]
]
```

1. Drop every negative `Result` (`Err` items) from the input `Array`,
2. Remove any items with value under `0` from the remaining `Array`,
3. Remove any items with value over `255` from the remaining `Array`,
4. Calculate the arithmetic mean of the remaining `Array`,
5. Check if the resulting `Float` is greater than `127`, and continue
   with a `Boolean` of value `true` or `false` accordingly,
6. Map the `Boolean` to `String` by converting `false` into `"heads"`
   and `true` into `"tails"`.



[openweathermap]: https://openweathermap.org/data/2.5/weather?id=2950159&appid=b6907d289e10d714a6e88b30761fae22
[coinbase]: https://api.coindesk.com/v1/bpi/currentprice.json
[random]: http://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8
