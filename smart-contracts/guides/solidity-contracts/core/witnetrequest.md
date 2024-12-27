---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 📃 WitnetRequest

Built out of non-parameterized data sources (i.e. Radon Retrievals) from the [_**WitnetRequestFactory**_](witnetrequestfactory.md), or from parameterized [_**WitnetRequestTemplate**_](witnetrequesttemplate.md) instances, _**WitnetRequest**_ instances contain the RAD hash and bytecode of some Witnet-compliant data requests, as well as introspective metadata about its public data sources, off-chain computations, data filtering and reducing methods.&#x20;

{% hint style="success" %}
**Did you know?**

_**WitnetRequest**_ addresses are counter-factual to the actual data sources, aggregate and tally filters and reducers they have been built with.&#x20;

Meaning that if you try to build a _WitnetRequest_ out of the same Radon Retrievals and Reducers as someone else did in the past, you will get exactly the same address. The underlying minimal-proxy contract would get constructed only once, of course. Building an already built _WitnetRequest_ works, and requires less gas than building it for the first time.&#x20;
{% endhint %}

## Interfaces

{% hint style="info" %}
^   Pure methods that neither write nor read from storage.

\=   View methods that read from immutable code storage.

::    View methods that read from storage.

\+   Methods that may potentially alter storage.

$   Payable methods that may potentially alter storage.

\[]!  Methods that may revert under certain conditions.&#x20;
{% endhint %}

### IWitnetRequestFactoryAppliance

<table><thead><tr><th width="371">Methods</th><th>Description</th></tr></thead><tbody><tr><td>= <code>class(): string</code></td><td>Returns the name of the contract that's actually implementing the ABI's <code>specs()</code> logic.</td></tr><tr><td>= <code>factory(): WitnetRequestFactory</code></td><td>Address of the <a href="witnetrequestfactory.md"><em>WitnetRequestFactory</em></a> contract from which either this contract was directly created, or from which the <a href="witnetrequestfactory.md"><em>WitnetRequestTemplate</em></a> that built this contract was created.</td></tr><tr><td>= <code>specs(): bytes4</code></td><td>Returns the immutable ERC-165 id of the expected functionality as for the <em><strong>WitnetRequest</strong></em> ABI.</td></tr><tr><td>= <code>witnet(): WitnetOracle</code></td><td>Address of the <a href="witnetoracle.md"><em>WitnetOracle</em></a> contract that this instance is compliant with.</td></tr></tbody></table>

### IWitnetRequest

<table><thead><tr><th width="398">Methods</th><th>Description</th></tr></thead><tbody><tr><td>:: <code>bytecode():bytes</code></td><td>Returns the Witnet-compliant RAD bytecode for the data request (i.e. Radon Request) contained within this <em>WitnetRequest</em>.</td></tr><tr><td>:: <code>radHash():bytes32</code></td><td>Returns the Witnet-compliant RAD hash of the data request (i.e. Radon Request) contained within this <em>WitnetRequest</em>. </td></tr><tr><td>:: <code>getArgs():string[][]</code></td><td>If built out of a <a href="witnetrequesttemplate.md"><em>WitnetRequestTemplate</em></a>, returns the array or string values passed as parameters when this <em>WitnetRequest</em> got built.</td></tr><tr><td>:: <code>getResultDataType():RadonDataTypes</code></td><td>Returns the expected data type produced by successful resolutions of the Witnet-compliant data request contained within this <em>WitnetRequest</em>.</td></tr><tr><td>:: <code>getAggregateReducer():RadonReducer</code></td><td>Returns the filters and reducing function to be applied by witnessing nodes on the Witnet blockchain when aggregating data extracted from the public data sources (i.e. Radon Retrievals) as specified within this <em>WitnetRequest</em>.</td></tr><tr><td>:! <code>getRetrievalByIndex(uint256):RRet.</code></td><td>Returns metadata concerning the data source specified by the given index.</td></tr><tr><td>:: <code>getRetrievals():RadonRetrieval[]</code></td><td>Returns the array of one or more data sources (i.e. Radon Retrievals) that compose this <em>WitnetRequest.</em></td></tr><tr><td>:: <code>getTallyReducer():RadonReducer</code></td><td>Returns the slashing filters and reducing function to be applied to the values revealed by the witnessing nodes on the Witnet blockchain that contribute to solve the data request as specified within this <em>WitnetRequest</em>.</td></tr><tr><td>:: <code>template():WitnetRequestTemplate</code></td><td>If built out of a template, returns the address of the <a href="witnetrequesttemplate.md"><em>WitnetRequestTemplate</em></a> from which this <em>WitnetRequest</em> instance got built.</td></tr><tr><td>:: <code>version():string</code></td><td>If built out of an upgradable factory, or template, returns the SemVer tag of the actual implementation version at the time when this <em>WitnetRequest</em> got built.</td></tr></tbody></table>

## Structs

### Witnet.RadonFilter

Struct defining the data filtering to be applied at either the Aggregate or Tally stages within the resolution of a data request within the Witnet blockchain.

<table><thead><tr><th width="135">Field</th><th width="288">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>opcode</code></td><td><code>Witnet.RadonFilterOpcodes</code></td><td>Filtering function.</td></tr><tr><td><code>cborArgs</code></td><td><code>bytes</code></td><td>CBOR-encoded array of filter parameters. Empty if no parameters are to be specified.</td></tr></tbody></table>

### Witnet.RadonReducer

Struct defining the array of filters, if any, and reduce function to be applied at either the Aggregate or Tally stages within the resolution of a data request within the Witnet blockchain.

<table><thead><tr><th width="129">Field</th><th width="291">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>opcode</code></td><td><code>Witnet.RadonReducerOpcodes</code></td><td>Reducing function.</td></tr><tr><td><code>filters</code></td><td><code>Witnet.RadonFilter[]</code></td><td>Zero, one or more filters to be orderly applied to input dataset before actually executing the reduce function. </td></tr></tbody></table>

### Witnet.RadonRequest

Struct containing the Retrieve-Attestation-Delivery parts of a Witnet-compliant Data Request Object.

<table><thead><tr><th width="150">Field</th><th width="291">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>retrieve</code></td><td><code>Witnet.RadonRetrieval[]</code></td><td>One or more public data sources (i.e. Radon Retrievals) out from where data will be retrieved by all witnessing nodes in the Witnet-blockchain attending the resolution of this data request.</td></tr><tr><td><code>aggregate</code></td><td><code>Witnet.RadonReducer</code></td><td>Filtering and reduce operations that will executed by every single witnessing node as to aggregate the data extracted from the request's data sources. </td></tr><tr><td><code>tally</code></td><td><code>Witnet.RadonReducer</code></td><td>Filtering and reduce operations that will be applied to the aggregated data revealed by each witnessing node. Witnessing nodes revealing data that gets ultimately filtered out, will get slashed.</td></tr></tbody></table>

### Witnet.RadonRetrieval

Struct containing all parameters that fully describe the Radon Retrievals that can form part of Witnet-compliant Data Request Objects.

<table><thead><tr><th width="169">Field</th><th width="313">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>argsCount</code></td><td><code>uint8</code></td><td>Number of indexed parameters to be provided whenever this Radon Retrieval is to be included into a Radon Request. </td></tr><tr><td><code>method</code></td><td><code>Witnet.RadonRetrievalMethods</code></td><td>Immutable method to be used for retrieving data. </td></tr><tr><td><code>dataType</code></td><td><code>Witnet.RadonDataTypes</code></td><td>Deterministic data type that successful executions will return.</td></tr><tr><td><code>url</code></td><td><code>string</code></td><td>Request URL. Mandatory on <code>HttpGet</code>, <code>HttpPost</code> and <code>HttpHead</code> retrieving methods.</td></tr><tr><td><code>body</code></td><td><code>string</code></td><td>Request body. Optional on <code>HttpGet</code> and <code>HttpPost</code> retrieving methods.</td></tr><tr><td><code>headers</code></td><td><code>string[2][]</code></td><td>Request key/value headers. Optional on <code>HttpGet</code> and <code>HttpPost</code> retrieving methods.</td></tr><tr><td><code>radonScript</code></td><td><code>bytes</code></td><td>Optional CBOR-encoded Radon Script that will transform whatever value is returned from the source. Not supported on RNG retrievals.</td></tr></tbody></table>

## Enums

### Witnet.RadonDataTypes

Primitive data types that can be contained in successful results to Witnet data requests.

<table><thead><tr><th width="110">Hex</th><th width="146">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x00</code></td><td>Any</td><td>CBOR-encoded value of undetermined type.</td></tr><tr><td><code>0x01</code></td><td><code>Array</code></td><td>An array of CBOR values.</td></tr><tr><td><code>0x02</code></td><td><code>Bool</code></td><td>A CBOR-encoded boolean value.</td></tr><tr><td><code>0x03</code></td><td><code>Bytes</code></td><td>A CBOR-encoded bytes buffer.</td></tr><tr><td><code>0x04</code></td><td><code>Integer</code></td><td>A CBOR-encoded integer value.</td></tr><tr><td><code>0x05</code></td><td><code>Float</code></td><td>A CBOR-encoded float value.</td></tr><tr><td><code>0x06</code></td><td><code>Map</code></td><td>A key/value map of CBOR values.</td></tr><tr><td><code>0x07</code></td><td><code>String</code></td><td>A CBOR-encoded string value.</td></tr></tbody></table>

### Witnet.RadonFilterOpcodes

Dataset filtering methods currently supported on the Witnet blockchain.

<table><thead><tr><th width="110">Hex</th><th width="205">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x05</code></td><td><code>StandardDeviation</code></td><td>Filters out all input items that deviates from the average more than a threshold. Requires a CBOR-encoded float as single but mandatory filter parameter. Works only with arrays of numbers (integers or floats) as input datasets.</td></tr><tr><td><code>0x08</code></td><td><code>Mode</code></td><td>Filters out all input items that diverge from the mode.</td></tr></tbody></table>

### Witnet.RadonReducerOpcodes

Reducing functions currently supported on the Witnet blockchain.

<table><thead><tr><th width="110">Hex</th><th width="215">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x02</code></td><td><code>Mode</code></td><td>Returns the mode value from the input dataset.</td></tr><tr><td><code>0x03</code></td><td><code>AverageMean</code></td><td>Returns the average mean from the input dataset. Works only with arrays of numbers as input datasets.</td></tr><tr><td><code>0x05</code></td><td><code>AverageMedian</code></td><td>Returns the median from the input dataset. Works only with arrays of numbers as input datasets.</td></tr><tr><td><code>0x07</code></td><td><code>StandardDeviation</code></td><td>Returns the standard deviation calculated out from the input dataset. Works only with arrays of numbers as input datasets.</td></tr><tr><td><code>0x0B</code></td><td><code>ConcatenateAndHash</code></td><td>Returns the SHA-256 hash of the concatenation of the input buffers. Works only with arrays of buffers as input datasets. Used mainly on RNG requests for mixing randomness produced by independent and randomly selected witnessing nodes. </td></tr></tbody></table>

### Witnet.RadonRetrievalMethods

Possible data request methods that can be specified on a Radon Retrieval.

<table><thead><tr><th width="110">Hex</th><th width="146">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x01</code></td><td><code>HttpGet</code></td><td>Data shall be retrieved from HTTP-GET requests.</td></tr><tr><td><code>0x02</code></td><td><code>RNG</code></td><td>Random seeds shall be independently produced by the witnessing nodes themselves.</td></tr><tr><td><code>0x03</code></td><td><code>HttpPost</code></td><td>Data shall be retrieved from HTTP-POST requests.</td></tr><tr><td><code>0x04</code></td><td><code>HttpHead</code></td><td>Data shall be retrieved from HTTP-HEAD requests.</td></tr></tbody></table>
