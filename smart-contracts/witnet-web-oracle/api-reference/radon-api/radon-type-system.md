# RADON Type System



## Pseudotypes

* `Any`
* `Inner`
* `Match`
* `Same`
* `Subscript`

<table data-full-width="false"><thead><tr><th width="116.33333333333331">OP Code</th><th width="174">Name</th><th width="378.6666666666667">Description</th></tr></thead><tbody><tr><td><code>0xFF</code></td><td>Fail</td><td>A catch-all used for matching.</td></tr><tr><td><code>0x00</code></td><td>Identity</td><td>Checks if the given argument matches the input RAD object both in type and value.</td></tr></tbody></table>

### Fail

A catch-all used for matching.

### Identity

Checks if the given argument matches the input RAD object both in type and value.

<table data-full-width="false"><thead><tr><th width="111.33333333333331">OP Code</th><th width="159">Type</th><th width="163">Method Name</th><th width="163">Method Params</th><th>Response</th></tr></thead><tbody><tr><td><code>0x10</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#count">count</a>()</td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x11</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#filter">filter</a>(Subscript)</td><td><code>Subscript</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x13</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getarray">getArray</a></td><td><code>index</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x14</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getboolean">getBoolean</a></td><td><code>index</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x15</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getbytes">getBytes</a></td><td><code>index</code></td><td><code>RADBytes</code></td></tr><tr><td><code>0x16</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getfloat">getFloat</a></td><td><code>index</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x17</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getinteger">getInteger</a></td><td><code>index</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x18</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getmap">getMap</a></td><td><code>index</code></td><td><code>RADMap</code></td></tr><tr><td><code>0x19</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#getstring">getString</a></td><td><code>index</code></td><td><code>RADString</code></td></tr><tr><td><code>0x1A</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#map">map</a></td><td><code>Subscript</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x1B</code></td><td><code>RADArray</code></td><td><a href="radon-type-system.md#reduce">reduce</a></td><td><code>Subscript</code></td><td>RADAnyType</td></tr><tr><td><code>0x22</code></td><td><code>RADBoolean</code></td><td><a href="radon-type-system.md#asstring">asString</a></td><td><code>none</code></td><td><code>RADString</code></td></tr><tr><td><code>0x22</code></td><td><code>RADBoolean</code></td><td><a href="radon-type-system.md#negate">negate</a></td><td><code>none</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x30</code></td><td><code>RADBytes</code></td><td><a href="radon-type-system.md#asstring-1">asString</a></td><td><code>none</code></td><td><code>RADString</code></td></tr><tr><td><code>0x31</code></td><td><code>RADBytes</code></td><td><a href="radon-type-system.md#hash">hash</a></td><td><code>none</code></td><td><code>RADString</code></td></tr><tr><td><code>0x40</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#absolute">absolute</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x41</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#asfloat">asFloat</a></td><td><code>none</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x42</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#asstring-2">asString</a></td><td><code>none</code></td><td><code>RADString</code></td></tr><tr><td><code>0x43</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#greaterthan">greaterThan</a></td><td><code>value</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x44</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#lessthan">lessThan</a></td><td><code>value</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x46</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#modulo">modulo</a></td><td><code>value</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x47</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#multiply">multiply</a></td><td><code>value</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x48</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#negate-1">negate</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x49</code></td><td><code>RADInteger</code></td><td><a href="radon-type-system.md#power">power</a></td><td><code>value</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x50</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#absolute-1">absolute</a></td><td><code>none</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x51</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#asstring-3">asString</a></td><td><code>none</code></td><td><code>RADString</code></td></tr><tr><td><code>0x52</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#ceiling">ceiling</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x53</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#greaterthan-1">greaterThan</a></td><td><code>value</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x54</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#floor">floor</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x55</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#lessthan-1">lessThan</a></td><td><code>value</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x56</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#modulo-1">modulo</a></td><td><code>value</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x57</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#multiply-1">multiply</a></td><td><code>value</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x58</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#negate-2">negate</a></td><td><code>none</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x59</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#power-1">power</a></td><td><code>value</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x5B</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#round">round</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x5D</code></td><td><code>RADFloat</code></td><td><a href="radon-type-system.md#truncate">truncate</a></td><td><code>value</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x61</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getarray-1">getArray</a></td><td><code>key</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x62</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getboolean-1">getBoolean</a></td><td><code>key</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x63</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getbytes-1">getBytes</a></td><td><code>key</code></td><td><code>RADBytes</code></td></tr><tr><td><code>0x64</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getfloat-1">getFloat</a></td><td><code>key</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x65</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getinteger-1">getInteger</a></td><td><code>key</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x66</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getmap-1">getMap</a></td><td><code>key</code></td><td><code>RADMap</code></td></tr><tr><td><code>0x67</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#getstring-1">getString</a></td><td><code>key</code></td><td><code>RADString</code></td></tr><tr><td><code>0x68</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#keys">keys</a></td><td><code>none</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x69</code></td><td><code>RADMap</code></td><td><a href="radon-type-system.md#valuesasarray">valuesAsArray</a></td><td><code>none</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x70</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#asboolean">asBoolean</a></td><td><code>none</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x72</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#asfloat-1">asFloat</a></td><td><code>none</code></td><td><code>RADFloat</code></td></tr><tr><td><code>0x73</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#asinteger">asInteger</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x74</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#length">length</a></td><td><code>none</code></td><td><code>RADInteger</code></td></tr><tr><td><code>0x75</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#match">match</a></td><td><code>value</code></td><td><code>RADBoolean</code></td></tr><tr><td><code>0x76</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#parsejsonarray">parseJSONArray</a></td><td><code>value</code></td><td><code>RADArray</code></td></tr><tr><td><code>0x77</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#parsejsonmap">parseJSONMap</a></td><td><code>value</code></td><td><code>RADMap</code></td></tr><tr><td><code>0x78</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#parsexmlmap">parseXMLMap</a></td><td><code>value</code></td><td><code>RADMap</code></td></tr><tr><td><code>0x79</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#tolowercase">toLowerCase</a></td><td><code>none</code></td><td><code>RADString</code></td></tr><tr><td><code>0x7A</code></td><td><code>RADString</code></td><td><a href="radon-type-system.md#touppercase">toUpperCase</a></td><td><code>none</code></td><td><code>RADString</code></td></tr></tbody></table>

## RADArray

### `RADArray.count()`

The method `count`  counts the number of elements in the input Array. There are no parameters.&#x20;

### `RADArray.filter(Subscript)`

The `filter` method discards the items in the input array that do not match the given filter subscript.

**Example:**

{% code fullWidth="false" %}
```javascript
// Example Source data 
// {"data": [{"id": "one"},{"id": "two"},{"id": "three"}]}

// Retrieve a sublist from an array by applying a filter to each entry. 
Witnet.Source("https://...")
  .parseJSONMap()
  .getArray("data")
  .filter(
    new Witnet.Script([ Witnet.TYPES.MAP ])
      .getString("id")
      .match({ "one": true }, false )
  )
// Returns [{"id": "one"}]
```
{% endcode %}

### `RADArray.getArray(RADInteger)`

The `getArray` method returns a `RADArray` object for the given index.

### `RADArray.getBoolean(RADInteger)`

The `getBoolean` method returns a `RADBoolean` object for the given index.

### `RADArray.getBytes(RADInteger)`

The `getBytes` method returns a `RADBytes` object for the given index.

### `RADArray.getFloat(RADInteger)`

The `getFloat` method returns a `RADFloat` object for the given index.&#x20;

### `RADArray.getInteger(RADInteger)`

The `getInteger` method returns a `RADInteger` object for the given index.&#x20;

### `RADArray.getMap(RADInteger)`

The `getMap` method returns a `RADMap` structure for the given index.&#x20;

### `RADArray.getString(RADInteger)`

The `getString` method returns a `RADBoolean` object for the given index.&#x20;

### `RADArray.map(Subscript)`

The `map` method applies the given subscript on all the elements in the input Array.

### `RADArray.reduce(Subscript)`

The `reduce` method reduces all the items in the input Array into a single item by applying a reducer function.

## RADBoolean

### `RADBoolean.asString()`

The `asString` method represents the input Boolean value as a string.&#x20;

e.g. "True" or "False"

### `RADBoolean.negate()`

The `negate` method reverses the input Boolean.

&#x20;It returns "True" if the value is "False", and returns "False" if the value is "True".

## RADBytes

### `RADBytes.asString()`

The `asString` method returns the input Bytes as a hexadecimal String.

### `RADBytes.hash()`

The `hash` method computes the SHA256 hash in the input Bytes.

## RADInteger

### `RADInteger.absolute()`

The `absolute` method Calculates the absolute value of the input Integer.

### `RADInteger.asFloat()`

The `asFloat` method Returns the input Integer as a Float.

### `RADInteger.asString()`

The `asString` method Returns the input Integer as a String.

### `RADInteger.greaterThan(RADInteger)`

The `greaterThan` method Checks if the input Integer is greater than the given argument.&#x20;

### `RADInteger.lessThan(RADInteger)`

The `lessThan` method checks if the input Integer is less than the given argument.

### `RADInteger.modulo(RADInteger)`

The `modulo`  method calculates the integer division of the input Integer

### `RADInteger.multiply(RADInteger)`

The `multiply` method multiplies the input Integer by the given factor.

### `RADInteger.negate()`

The `negate` method calculates the negative of the input Integer.

### `RADInteger.power(RADInteger)`

The `power` method calculates the input raise to the power of the given exponent.

## RADFloat

### `RADFloat.absolute()`

The `absolute` method computes the absolute value of the input Float.

### `RADFloat.asString()`

The `asString` method returns the input Float as a String.

### `RADFloat.ceiling()`

The `ceiling` method computes the lowest Integer value greater than or equal to the input Float.

### `RADFloat.greaterThan()`

The `greaterThan` method compares if the input Float is greater than the provided input.

### `RADFloat.floor()`

The `floor` method computes the greatest Integer less than or equal to the input Float.

### `RADFloat.lessThan()`

The `lessThan` method compares if the input Float is less than the provided argument.

### `RADFloat.modulo()`

The `modulo` method computes the division of the input Float.

### `RADFloat.multiply(RADFloat)`

The `multiply` method multiplies the input Float by the given factor.

### `RADFloat.negate()`

The `negate` method computes the negative of the input Float.

### `RADFloat.power()`

The `power` method computes the input Float raised to the power of the provided exponent.

### `RADFloat.round()`

The `round` method rounds the Integer part from the input Float.

### `RADFloat.truncate()`

The `truncate` method takes the Integer part from the input Float.

## RADMap

### `RADMap.getArray(RADString)`

The `getArray` method returns an Array structure.

### `RADMap.getBoolean(RADString)`

The `getBoolean` method returns a Boolean.

### `RADMap.getBytes(RADString)`

The `getBytes` method returns an array of Bytes.

### `RADMap.getFloat(RADString)`

The `getFloat` method returns a Float.

### `RADMap.getInteger(RADString)`

The `getInteger` method returns an Integer

### `RADMap.getMap(RADString)`

The `getMap` method returns a Map structure.

### `RADMap.getString(RADString)`

The `getString` method returns a String.

### `RADMap.keys()`

The `keys` method obtains a list with the key names of the input Map.

### `RADMap.valuesAsArray()`

The `valuesAsArray` method obtains a list with the values of the input Map.

## RADString

### `RADString.asBoolean()`

The `asBoolean` method parses the input String as a Boolean value.

There are no method parameters and it returns a `RADBoolean`.

### `RADString.asFloat()`

The `asFloat` method parses the input String as a Float value.

There are no method parameters.

### `RADString.asInteger()`

The `asInteger` method parses the input String as an Integer value.

There are no method parameters.

### `RADString.length()`

The `length` method counts the number of characters of the input String.

There are no method parameters.

### `RADString.match(RADString)`

The `match` method matches the input String with the given subscript and returns a Boolean value.

#### Method Params:&#x20;

`String value`

### `RADString.parseJSONArray(RADString)`

The `parseJSONArray` method interprets the input String as a JSON-encoded Array.

Method Params:&#x20;

`String value`  The input value must be a valid JSON Array or it will return an [JsonParse](radon-errors.md#jsonparse) error.

### `RADString.parseJSONMap(RADString)`

The `parseJSONMap` method interprets the input String as a JSON-encoded Map.

Method Params:&#x20;

`String value`  The input value must be a valid JSON-encoded Map or it will return a [JsonParse](radon-errors.md#jsonparse) error.

### `RADString.parseXMLMap(RADString)`

The `parseXMLMap` method interprets the input String as an XML-encoded Map.

Method Params:&#x20;

`String value`  The input value must be a valid XML-encoded Map or it will return a [JsonParse](radon-errors.md#jsonparse) error.

### `RADString.toLowerCase()`

The `toLowerCase` method converts the input String to lowercase.

### `RADString.toUpperCase()`

The `toUpperCase` method converts the input String to uppercase.

