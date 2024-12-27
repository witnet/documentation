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

# 📃 WitnetRequestFactory

Bound to the [_**WitnetOracle**_ ](witnetoracle.md)contract, this artifact enables smart contracts and offchain worfklows to programmatically build both [_WitnetRequest_](witnetrequest.md) and [_WitnetRequestTemplate_](witnetrequesttemplate.md) instances, based on a provided list of data sources, attestation filters and computational **Radon scripts** that transform and aggregate the data as extracted from those sources.&#x20;

{% hint style="info" %}
The address of this appliance can be obtained by calling to the `factory()` method on the public domain _**Wit/Oracle**_ artifact, as deployed by the **Witnet Foundation** on each [**supported chain**](../../../supported-chains.md).
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

### IWitnetOracleAppliance

<table><thead><tr><th width="329">Methods</th><th>Description</th></tr></thead><tbody><tr><td>= <code>class(): string</code></td><td>Returns the name of the contract that's actually implementing the ABI's <code>specs()</code> logic.</td></tr><tr><td>= <code>specs(): bytes4</code></td><td>Returns the immutable ERC-165 id of the expected functionality as for the <em>WitnetRequestFactory</em> ABI.</td></tr><tr><td>= <code>witnet(): WitnetOracle</code></td><td>Address of the <a href="witnetoracle.md"><em>WitnetOracle</em></a> contract that produced <em>WitnetRequest</em> and <em>WitnetRequestTemplate</em> instances will be compliant with. </td></tr></tbody></table>

### IWitnetRequestFactory

<table data-full-width="false"><thead><tr><th width="384">Methods</th><th>Description</th></tr></thead><tbody><tr><td>+! <code>buildWitnetRequest(</code><br>    <code>bytes32[] retrieveHashes,</code><br>    <code>Witnet.RadonReducer aggregate,</code><br>    <code>Witnet.RadonReducer tally</code><br><code>): address</code></td><td><p>Builds a <a href="witnetrequest.md"><em>WitnetRequest</em></a> instance that will provide the bytecode and RAD hash of some Witnet-compliant Radon Request, provably made out of some previously verified data sources (i.e. Radon Retrievals), aggregate and tally Radon Reducers.</p><p></p><p>Produced addresses are counter-factual to the given values.  </p><p></p><p>Reverts if:<br>- unverified retrievals are passed;<br>- any of the given retrievals is parameterized;<br>- retrievals return different data types;<br>- unsupported reducers are passed. </p></td></tr><tr><td>+! <code>buildWitnetRequestTemplate(</code><br>    <code>bytes32[] retrieveHashes,</code><br>    <code>Witnet.RadonReducer aggregate,</code><br>    <code>Witnet.RadonReducer tally</code><br><code>): address</code></td><td><p>Builds a <a href="witnetrequesttemplate.md"><em>WitnetRequestTemplate</em></a> instance made out of one or more parameterized data sources (i.e. Radon Retrievals), aggregate and tally Radon Reducers. </p><p></p><p>Produced addresses are counter-factual to the given values. </p><p></p><p>Reverts if:<br>- unverified retrievals are passed;<br>- none of given retrievals is parameterized;<br>- retrievals return different data types;<br>- unsupported reducers are passed.</p></td></tr><tr><td>+! <code>verifyRadonRetrieval(</code><br>    <code>Witnet.RadonRetrievalMethods,</code><br>    <code>string requestURL,</code><br>    <code>string requestBody,</code><br>    <code>string[2][] requestHeaders,</code><br>    <code>bytes requestRadonScript</code><br><code>): bytes32</code></td><td><p>Verifies and registers the specified Radon Retrieval (i.e. public data source) into the <a href="witnetradonregistry.md"><em>WitnetRadonRegistry</em></a> of the <em>WitnetOracle</em> attached to this factory. Returns a unique hash that identifies the verified Radon Retrieval.</p><p></p><p>All parameters but the retrieval method are parameterizable (i.e. by using embedded wildcard <code>\x\</code> substrings, with <code>x = 0..9</code>). <br><br>Reverts if:<br>- unsupported retrieval method is given;<br>- no url is provided on Http/* requests;<br>- non-empty strings given on Rng requests.</p></td></tr></tbody></table>

## Events

### IWitnetRadonRegistryEvents

<table data-full-width="false"><thead><tr><th width="229">Events</th><th width="198">Arguments</th><th>Description</th></tr></thead><tbody><tr><td><strong><code>NewRadonReducer</code></strong></td><td><code>bytes16 hash</code></td><td>Emitted every time a new <code>Witnet.RadonReducer</code> gets successfully verified and stored into the <a href="witnetradonregistry.md"><em>WitnetRadonRegistry</em></a><em>.</em></td></tr><tr><td><strong><code>NewRadonRetrieval</code></strong></td><td><code>bytes32 hash</code></td><td>Emitted every time a new <code>Witnet.RadonRetrieval</code> gets successfully verified and stored in the <a href="witnetradonregistry.md"><em>WitnetRadonRegistry</em></a><em>.</em></td></tr><tr><td><strong><code>NewRadonRequest</code></strong></td><td><code>bytes32 radHash</code></td><td>Emitted every time a new <code>Witnet.RadonRequest</code> gets successfully verified and stored in the <a href="witnetradonregistry.md"><em>WitnetRadonRegistry</em></a>.</td></tr></tbody></table>

### IWitnetRequestFactoryEvents

<table data-full-width="false"><thead><tr><th width="306">Events</th><th width="198">Arguments</th><th>Description</th></tr></thead><tbody><tr><td><strong><code>WitnetRequestBuilt</code></strong></td><td><code>address request</code></td><td>Emitted every time a new counter-factual <a href="witnetrequest.md"><em>WitnetRequest</em></a> gets verified and built.</td></tr><tr><td><strong><code>WitnetRequestTemplateBuilt</code></strong></td><td><code>address template</code></td><td>Emitted every time a new counter-factual <a href="witnetrequesttemplate.md"><em>WitnetRequestTemplate</em></a> gets verified and built.</td></tr></tbody></table>

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
