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

# 📃 WitnetRadonRegistry

This contract contains a registry of validated data sources and data requests built up so far by any _dapp_ interacting with the [_**WitnetOracle**_](witnetoracle.md) singleton contract within a certain EVM chain, up to the present time. A unique identifier is generated for every Radon Retrieval (i.e. data sources) or Radon Request (i.e. retrieve-attestation-delivery part of Witnet-compliant data request objects) that gets successfully validated into this contract.&#x20;

{% hint style="info" %}
The address of this contract can be obtained by calling to the `registry()` method on the public domain _**Wit/Oracle**_ artifact, as deployed by the **Witnet Foundation** on each [**supported chain**](../../../supported-chains.md).
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

### IWitnetAppliance

<table><thead><tr><th width="329">Methods</th><th>Description</th></tr></thead><tbody><tr><td>= <code>class():string</code></td><td>Returns the name of the actual contract implementing the underlying logic.</td></tr><tr><td>= <code>specs():bytes4</code></td><td>Returns the immutable ERC-165 id that represents the expected functionality as for the <em>WitnetRadonRegistry</em> ABI.</td></tr></tbody></table>

### IWitnetRadonRegistry

<table><thead><tr><th width="435">Methods</th><th>Description</th></tr></thead><tbody><tr><td>:: <code>bytecodeOf(bytes32)</code></td><td>Returns the Witnet-compliant RAD bytecode for some Radon Request identified by its unique RAD hash. </td></tr><tr><td>:: <code>bytecodeOf(bytes32,Witnet.RadonSLA)</code></td><td>Returns the Witnet-compliant DRO bytecode for some data request object made out of the given Radon Request and Radon SLA security parameters. </td></tr><tr><td>:: <code>bytecodeOf(bytes,Witnet.RadonSLA)</code></td><td>Returns the Witnet-compliant DRO bytecode for some data request object made out of the given RAD bytecode and Radon SLA security parameters. </td></tr><tr><td>:: <code>hashOf(bytes)</code></td><td>Returns the hash of the given Witnet-compliant bytecode. Returned value can be used to trace back in the Witnet blockchain all past resolutions of the given data request payload.</td></tr><tr><td>:! <code>lookupRadonRequest(bytes32)</code></td><td>Returns the whole <code>Witnet.RadonRequest</code> metadata struct for the given RAD hash value.</td></tr><tr><td>:! <code>lookupRadonRequestAggregate(bytes32)</code></td><td>Returns the Aggregate reducer that is applied to the data extracted from the data sources (i.e. Radon Retrievals) whenever the given Radon Request gets solved on the Witnet blockchain. Reverts if unknown.</td></tr><tr><td>:! <code>lookupRadonRequestDataType(bytes32)</code></td><td>Returns the deterministic data type returned by successful resolutions of the given Radon Request. Reverts if unknown.</td></tr><tr><td>:! <code>lookupRadonRequestRetrievals(bytes32)</code></td><td>Returns an array (one or more items) containing the introspective metadata of the given Radon Request's data sources (i.e. Radon Retrievals). Reverts if unknown.</td></tr><tr><td>:! <code>lookupRadonRequestTally(bytes32)</code></td><td>Returns the Tally reducer that is applied to aggregated values revealed by the witnessing nodes on the Witnet blockchain. Reverts if unknown.</td></tr><tr><td>:! <code>lookupRadonRetrieval(bytes32)</code></td><td>Returns introspective metadata of some previously verified Radon Retrieval (i.e. public data source). Reverts if unknown.</td></tr><tr><td>:! <code>lookupRadonRetrievalArgsCount(bytes32)</code></td><td>Returns the number of indexed parameters required to be fulfilled when eventually using the given Radon Retrieval. Reverts if unknown.</td></tr><tr><td>:! <code>lookupRadonRetrievalDataType(bytes32)</code></td><td>Returns the type of the data that would be retrieved by the given Radon Retrieval (i.e. public data source). Reverts if unknown.</td></tr><tr><td><p>+! <code>verifyRadonReducer(</code></p><p>    <code>Witnet.RadonReducer reducer</code></p><p><code>)</code></p></td><td>Verifies and registers the given sequence of dataset filters and reducing function to be potentially used as either Aggregate or Tally reducers within the resolution workflow of Radon Requests in the Wit/oracle blockchain. Returns a unique hash that identifies the given Radon Reducer in the registry. Reverts if unsupported reducing or filtering methods are specified.</td></tr><tr><td>+! <code>verifyRadonRequest(</code><br>    <code>bytes32[] retrievals,</code><br>    <code>Witnet.RadonReducer aggregate,</code><br>    <code>Witnet.RadonReducer tally</code><br><code>)</code></td><td>Verifies and registers the specified Radon Request out of the given data sources (i.e. retrievals) and the aggregate and tally Radon Reducers. Returns a unique RAD hash that identifies the verified Radon Request.<br><br>Reverts if:<br>- unverified retrievals are passed;<br>- retrievals return different data types;<br>- any of passed retrievals is parameterized;<br>- unsupported reducers are passed.</td></tr><tr><td>+! <code>verifyRadonRequest(</code><br>    <code>bytes32[]  retrievals,</code><br>    <code>string[][] retrievalsArgs,</code><br>    <code>Witnet.RadonReducer aggregate,</code><br>    <code>Witnet.RadonReducer tally</code><br><code>)</code></td><td>Verifies and registers the specified Radon Request out of the given data sources (i.e. retrievals), data sources parameters (if required), and the aggregate and tally Radon Reducers. Returns a unique RAD hash that identifies the verified Radon Request.<br><br>Reverts if:<br>- unverified retrievals are passed;<br>- retrievals return different data types;<br>- ranks of passed args don't match with those required by each given retrieval;<br>- unsupported reducers are passed.</td></tr><tr><td>+! <code>verifyRadonRetrieval(</code><br>    <code>Witnet.RadonRetrievalMethods,</code><br>    <code>string requestURL,</code><br>    <code>string requestBody,</code><br>    <code>string[2][] requestHeaders,</code><br>    <code>bytes requestRadonScript</code><br><code>)</code></td><td>Verifies and registers the specified Radon Retrieval (i.e. public data source) into this registry contract. Returns a unique retrieval hash that identifies the verified Radon Retrieval.<br><br>All parameters but the retrieval method are parameterizable by using embedded wildcard <code>\x\</code> substrings (with <code>x='0'..'9'</code>).<br><br>Reverts if:<br>- unsupported retrieval method is given;<br>- no URL is provided Http/* requests;<br>- non-empty strings given on RNG reqs.</td></tr></tbody></table>

## Events

### IWitnetRadonRegistryEvents

<table data-full-width="false"><thead><tr><th width="221">Events</th><th width="185">Arguments</th><th>Description</th></tr></thead><tbody><tr><td><strong><code>NewRadonReducer</code></strong></td><td><code>bytes16 hash</code></td><td>Emitted every time a new <code>Witnet.RadonReducer</code> gets successfully verified and stored into the <em>WitnetRadonRegistry</em>.</td></tr><tr><td><strong><code>NewRadonRetrieval</code></strong></td><td><code>bytes32 hash</code></td><td>Emitted every time a new <code>Witnet.RadonRetrieval</code> gets successfully verified and stored into the <em>WitnetRadonRegistry.</em></td></tr><tr><td><strong><code>NewRadonRequest</code></strong></td><td><code>bytes32 radHash</code></td><td>Emitted every time a new <code>Witnet.RadonRequest</code> gets successfully verified and stored into the <em>WitnetRadonRegistry</em>.</td></tr></tbody></table>

## Structs

### Witnet.RadonFilter

Struct defining the data filtering to be applied at either the Aggregate or Tally stages within the resolution of a data request within the Witnet blockchain.

<table><thead><tr><th width="135">Field</th><th width="288">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>opcode</code></td><td><code>Witnet.RadonFilterOpcodes</code></td><td>Filtering function.</td></tr><tr><td><code>cborArgs</code></td><td><code>bytes</code></td><td>CBOR-encoded array of filter parameters. Empty if no parameters are to be specified.</td></tr></tbody></table>

### Witnet.RadonReducer

Struct defining the array of filters, if any, and reduce function to be applied at either the Aggregate or Tally stages within the resolution of a data request within the Witnet blockchain.

<table><thead><tr><th width="129">Field</th><th width="291">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>opcode</code></td><td><code>Witnet.RadonReducerOpcodes</code></td><td>Reducing function.</td></tr><tr><td><code>filters</code></td><td><code>Witnet.RadonFilter[]</code></td><td>Zero, one or more filters to be orderly applied to input dataset before actually executing the reduce function. </td></tr></tbody></table>

### Witnet.RadonRequest

Struct containing the Retrieve-Attestation-Delivery parts of a Witnet-compliant Data Request Object.

<table><thead><tr><th width="150">Field</th><th width="291">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>retrieve</code></td><td><code>Witnet.RadonRetrieval[]</code></td><td>One or more public data sources (i.e. Radon Retrievals) out from where data will be retrieved by all witnessing nodes in the Witnet-blockchain attending the resolution of this data request.</td></tr><tr><td><code>aggregate</code></td><td><code>Witnet.RadonReducer</code></td><td>Filtering and reduce operations that will executed by every single witnessing node as to aggregate the data extracted from the sources. </td></tr><tr><td><code>tally</code></td><td><code>Witnet.RadonReducer</code></td><td>Filtering and reduce operations that will be applied to the aggregated data revealed by each witnessing node. Witnessing nodes revealing results that get ultimately filtered out, will get slashed.</td></tr></tbody></table>

### Witnet.RadonRetrieval

Struct containing all parameters that fully describe the Radon Retrievals that can form part of Witnet-compliant Data Request Objects.

<table><thead><tr><th width="169">Field</th><th width="313">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>argsCount</code></td><td><code>uint8</code></td><td>Number of indexed parameters to be provided whenever this Radon Retrieval is to be included into a Radon Request. </td></tr><tr><td><code>method</code></td><td><code>Witnet.RadonRetrievalMethods</code></td><td>Immutable method to be used for retrieving data. </td></tr><tr><td><code>dataType</code></td><td><code>Witnet.RadonDataTypes</code></td><td>Deterministic data type that successful executions will return.</td></tr><tr><td><code>url</code></td><td><code>string</code></td><td>Request URL. Mandatory on <code>HttpGet</code>, <code>HttpPost</code> and <code>HttpHead</code> retrieving methods.</td></tr><tr><td><code>body</code></td><td><code>string</code></td><td>Request body. Optional on <code>HttpGet</code> and <code>HttpPost</code> retrieving methods.</td></tr><tr><td><code>headers</code></td><td><code>string[2][]</code></td><td>Request key/value headers. Optional on <code>HttpGet</code> and <code>HttpPost</code> retrieving methods.</td></tr><tr><td><code>radonScript</code></td><td><code>bytes</code></td><td>Optional CBOR-encoded Radon Script that will transform whatever value is returned from the source. Not supported on RNG retrievals.</td></tr></tbody></table>

## Enums

### Witnet.RadonFilterOpcodes

Dataset filtering methods currently supported on the Witnet blockchain.

<table><thead><tr><th width="110">Hex</th><th width="205">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x05</code></td><td><code>StandardDeviation</code></td><td>Filters out all input items that deviates from the average more than a threshold. Requires a CBOR-encoded float as single but mandatory filter parameter. Works only with arrays of numbers (integers or floats) as input datasets.</td></tr><tr><td><code>0x08</code></td><td><code>Mode</code></td><td>Filters out all input items that diverge from the mode.</td></tr></tbody></table>

### Witnet.RadonReducerOpcodes

Reducing functions currently supported on the Witnet blockchain.

<table><thead><tr><th width="110">Hex</th><th width="215">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x02</code></td><td><code>Mode</code></td><td>Returns the mode value from the input dataset.</td></tr><tr><td><code>0x03</code></td><td><code>AverageMean</code></td><td>Returns the average mean from the input dataset. Works only with arrays of numbers as input datasets.</td></tr><tr><td><code>0x05</code></td><td><code>AverageMedian</code></td><td>Returns the median from the input dataset. Works only with arrays of numbers as input datasets.</td></tr><tr><td><code>0x07</code></td><td><code>StandardDeviation</code></td><td>Returns the standard deviation calculated out from the input dataset. Works only with arrays of numbers as input datasets.</td></tr><tr><td><code>0x0B</code></td><td><code>ConcatenateAndHash</code></td><td>Returns the SHA-256 hash of the concatenation of the input buffers. Works only with arrays of buffers as input datasets. Used mainly on RNG requests for mixing randomness produced by independent and randomly selected witnessing nodes. </td></tr></tbody></table>

### Witnet.RadonRetrievalMethods

Possible data request methods that can be specified on a Radon Retrieval.

<table><thead><tr><th width="110">Hex</th><th width="146">Caption</th><th>Description</th></tr></thead><tbody><tr><td><code>0x01</code></td><td><code>HttpGet</code></td><td>Data shall be retrieved from HTTP-GET requests.</td></tr><tr><td><code>0x02</code></td><td><code>RNG</code></td><td>Random seeds shall be independently produced by the witnessing nodes themselves.</td></tr><tr><td><code>0x03</code></td><td><code>HttpPost</code></td><td>Data shall be retrieved from HTTP-POST requests.</td></tr><tr><td><code>0x04</code></td><td><code>HttpHead</code></td><td>Data shall be retrieved from HTTP-HEAD requests.</td></tr></tbody></table>
