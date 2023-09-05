# WitnetRequestBoard

{% hint style="info" %}
This section is under construction. If you need more information, you can ask in [Discord](https://discord.gg/X4uurfP) or [Telegram](https://t.me/witnetio).
{% endhint %}



### [`IWitnetRequestBoardEvents`](witnet-request-board.md#iwitnetrequestboardevents-1)

* [`PostedRequest`](witnet-request-board.md#postedrequest)`(queryId, from)`
* [`PostedResult`](witnet-request-board.md#postedresult)`(queryId, from)`
* [`DeletedQuery`](witnet-request-board.md#deletedquery)`(queryId, from)`

### [`IWitnetRequestBoardReporter`](witnet-request-board.md#iwitnetrequestboardreporter-1)

* [`reportResult`](witnet-request-board.md#reportresult)`(_queryId, _drTxHash, _result)`
* [`reportResult`](witnet-request-board.md#reportresult-1)`(_queryId, _timestamp, _drTxHash, _result)`
* [`reportResultBatch`](witnet-request-board.md#reportresultbatch)`(_batchResults, _verbose)`

### [`IWitnetRequestBoardRequestor` ](witnet-request-board.md#iwitnetrequestboardrequestor-1)

* [`deleteQuery`](witnet-request-board.md#deletequery)`(_queryId)`
* [`postRequest`](witnet-request-board.md#postrequest-1)`(_addr)`
* [`upgradeReward`](witnet-request-board.md#upgradereward)`(_queryId)`

### [`IWitnetRequestBoardView`](witnet-request-board.md#iwitnetrequestboardview-1)

* [`estimateReward`](witnet-request-board.md#estimatereward)`(_gasPrice)`
* [`getNextQueryId`](witnet-request-board.md#getnextqueryid)`()`
* [`getQueryData`](witnet-request-board.md#getquerydata)`(_queryId)`
* [`getQueryStatus`](witnet-request-board.md#getquerystatus)`(_queryId)`
* [`readRequest`](witnet-request-board.md#readrequest)`(_queryId)`
* [`readRequestBytecode`](witnet-request-board.md#readrequestbytecode)`(_queryId)`
* [`readRequestGasPrice`](witnet-request-board.md#readrequestgasprice)`(_queryId)`
* [`readRequestReward`](witnet-request-board.md#readrequestreward)`(_queryId)`
* [`readResponse`](witnet-request-board.md#readresponse)`(_queryId)`
* [`readResponseDrTxHash`](witnet-request-board.md#readresponsedrtxhash)`(_queryId)`
* [`readResponseReporter`](witnet-request-board.md#readresponsereporter)`(_queryId)`
* [`readResponseResult`](witnet-request-board.md#readresponseresult)`(_queryId)`
* [`readResponseTimestamp`](witnet-request-board.md#readresponsetimestamp)`(_queryId)`

### [`IWitnetRequestParser`](witnet-request-board.md#iwitnetrequestparser-1)

* [`resultFromCborBytes`](witnet-request-board.md#resultfromcborbytes)`(_cborBytes)`
* [`resultFromCborValue`](witnet-request-board.md#resultfromcborvalue)`(_cborValue)`
* [`isOk`](witnet-request-board.md#isok)`(_result)`
* [`isError`](witnet-request-board.md#iserror)`(_result)`
* [`asBytes`](witnet-request-board.md#asbytes)`(_result)`
* [`asBytes32`](witnet-request-board.md#asbytes32)`(_result)`
* [`asErrorCode`](witnet-request-board.md#aserrorcode)`(_result)`
* [`asErrorMessage`](witnet-request-board.md#aserrormessage)`(_result)`
* [`asRawError`](witnet-request-board.md#asrawerror)`(_result)`
* [`asBool`](witnet-request-board.md#asbool)`(_result)`
* [`asFixed16`](witnet-request-board.md#asfixed16)`(_result)`
* [`asFixed16Array`](witnet-request-board.md#asfixed16array)`(_result)`
* [`asInt128`](witnet-request-board.md#asint128)`(_result)`
* [`asInt128Array`](witnet-request-board.md#asint128array)`(_result)`
* [`asString`](witnet-request-board.md#asstring)`(_result)`
* [`asStringArray`](witnet-request-board.md#asstringarray)`(_result)`
* [`asUint64`](witnet-request-board.md#asuint64)`(_result)`
* [`asUint64Array`](witnet-request-board.md#asuint64array)`(_result)`





## `IWitnetRequestBoardEvents`



### DeletedQuery

```solidity
event DeletedQuery(uint256 queryId, address from);
```

Emitted when all data related to given query is deleted from the WRB.

Method Paramaters:

* `queryId uint256`: the query id assigned to this new posting.
* `from address`: the address from which the Witnet Data Request was posted.



### PostedRequest

Emitted when a Witnet Data Request is posted to the WRB.

```solidity
event PostedRequest(uint256 queryId, address from);
```

Method Paramaters:

* `queryId`: the id of the query the result refers to.
* `from`: the address from which the result was reported.



### PostedResult

```solidity
event PostedResult(uint256 queryId, address from);
```

Emitted when a Witnet-solved result is reported to the WRB.

Method Paramaters:

* `queryId`: the id of the query the result refers to.
* `from`: the address from which the result was reported.





## `IWitnetRequestBoardReporter`

#### **The Witnet Request Board Reporter interface.**

### reportResult

```solidity
function reportResult(
        uint256 _queryId,
        bytes32 _drTxHash,
        bytes calldata _result
    ) external;
```

Reports the Witnet-provided result to a previously posted request.

Method Paramaters:

* `uint256 _queryId`: The unique identifier of the data request.
* `bytes32 _drTxHash`: The hash of the corresponding data request transaction in Witnet.
* `bytes calldata _result`: The result itself as bytes.

Fails if:

* called from unauthorized address
* the `_queryId` is not in 'Posted' status
* provided `_drTxHash` is zero
* length of provided `_result` is zero



### reportResult

```solidity
function reportResult(
        uint256 _queryId,
        uint256 _timestamp,
        bytes32 _drTxHash,
        bytes calldata _result
    ) external;
```

Reports the Witnet-provided result to a previously posted request.

Method Paramaters:

* `_queryId`: The unique identifier of the data request.
* `_timestamp`: The timestamp of the solving tally transaction in Witnet.
* `_drTxHash`: The hash of the corresponding data request transaction in Witnet.
* `_result`: The result itself as bytes.



### reportResultBatch

```solidity
function reportResultBatch(
        BatchResult[] calldata _batchResults,
        bool _verbose
    ) external;
```

Reports Witnet-provided results to multiple requests within a single EVM tx. Must emit a PostedResult event for every succesfully reported result.

Method Paramaters:

* `BatchResult[] calldata _batchResults`: Array of BatchResult structs, every one containing:&#x20;
  * unique query identifier
  * timestamp of the solving tally txs in Witnet. If zero is provided, EVM-timestamp will be used instead
  * hash of the corresponding data request tx at the Witnet side-chain level
  * data request result in raw bytes.
* `bool _verbose`: If true, must emit a BatchReportError event for every failing report, if any.



## `IWitnetRequestBoardRequestor`

The Witnet Requestor Interface defines how to interact with the Witnet Request Board in order to:

* request the execution of Witnet Radon scripts (data request);&#x20;
* &#x20;upgrade the resolution reward of any previously posted request, in case gas price raises in mainnet;&#x20;
* read the result of any previously posted request, eventually reported by the Witnet DON.&#x20;
* remove from storage all data related to past and solved data requests, and results.



### deleteQuery

```solidity
function deleteQuery(uint256 _queryId) external returns (Witnet.Response memory);
```

Retrieves copy of all Witnet-provided data related to a previously posted request, removing the whole query from the WRB storage. Fails if the `_queryId` is not in 'Reported' status, or called from an address different to the one that actually posted the given request.

Method Paramaters:

* `_queryId uint256`: the unique identifier of a previously posted Witnet data request.



### postRequest

```solidity
function postRequest(IWitnetRequest _addr) 
    external payable returns (uint256 _queryId);
```

Requests the execution of the given Witnet Data Request in expectation that it will be relayed and solved by the Witnet DON.&#x20;

{% hint style="info" %}
A reward amount is escrowed by the Witnet Request Board that will be transferred to the reporter who relays back the Witnet-provided result to this request.
{% endhint %}

Method Paramaters:

* `_addr`: the actual `IWitnetRequest` contract address which provided the Witnet Data Request bytecode.

Returns:

* `uint256 _queryId`: the unique identifier of the data request.

Fails if:

* provided reward is too low
* provided script is zero address.
* provided script bytecode is empty.



### postRequest

```solidity
function postRequest(IWitnetRequest _addr)
    external payable returns (uint256 _queryId);
```

Method Paramaters:



Returns:

* `uint256 _queryId`: The unique query identifier.



### upgradeReward

```solidity
function upgradeReward(uint256 _queryId) external payable;
```

Increments the reward of a Witnet data request by adding more value to it. The new data request reward will be increased by `msg.value`.&#x20;

{% hint style="info" %}
Updates request `gasPrice` in case this method is called with a higher gas price value than the one used in previous calls to `postRequest` or `upgradeReward`.
{% endhint %}

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Fails if:&#x20;

* the `_queryId` is not in 'Posted' status.
* the request `gasPrice` is increased
* the new reward value gets below new recalculated threshold





## `IWitnetRequestBoardView`

&#x20;

### estimateReward

```solidity
function estimateReward(uint256 _gasPrice) external view returns (uint256);
```

Estimates the minimal amount of reward needed to post a Witnet data request into the WRB, for a given gas price.

Method Paramaters:

* `uint256 _gasPrice`: The gas price for which we need to calculate the rewards.



### getNextQueryId

```solidity
function getNextQueryId() external view returns (uint256);
```

Returns next query id to be generated by the Witnet Request Board.

Returns:

* `uint256 _queryId`

&#x20;

### getQueryData

```solidity
function getQueryData(uint256 _queryId) external view returns (Witnet.Query memory);
```

Gets the whole Query data contents, if any, no matter its current status.

Method Paramaters:

* `uint256 _queryId`: The unique identifier of a previously posted query.

Returns:

* `Witnet.Query memory _queryData`

&#x20;

### getQueryStatus

```solidity
function getQueryStatus(uint256 _queryId) external view returns (Witnet.QueryStatus);
```

Gets current status of given query.

Method Paramaters:

* `uint256 _queryId`: The unique identifier of a previously posted query.

Returns:

* `Witnet.QueryStatus _status`

&#x20;

### readRequest

```solidity
function readRequest(uint256 _queryId) external view returns (Witnet.Request memory);
```

Retrieves the whole Request record posted to the Witnet Request Board.

Method Paramaters:

* `uint256 _queryId`: The unique identifier of a previously posted query.

Returns:

* `WitnetRequest memory _requestRecord`

&#x20;

### readRequestBytecode

```solidity
function readRequestBytecode(uint256 _queryId) external view returns (bytes memory);
```

Retrieves the serialized bytecode of a previously posted Witnet Data Request.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `bytes memory _byteCode`

&#x20;

### readRequestGasPrice

```solidity
 function readRequestGasPrice(uint256 _queryId) external view returns (uint256);
```

Retrieves the gas price that any assigned reporter will have to pay when reporting result to a previously posted Witnet data request.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `uint256 _gasPrice`

&#x20;

### readRequestReward

```solidity
function readRequestReward(uint256 _queryId) external view returns (uint256);
```

Retrieves the reward currently set for the referred query.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `uint256 reward`

Fails if:

* the `_queryId` is not valid or, if it has already been reported, or deleted.



### readResponse

```solidity
function readResponse(uint256 _queryId) 
    external view returns (Witnet.Response memory);
```

Retrieves the whole `Witnet.Response` record referred to a previously posted Witnet Data Request.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `Witnet.Response memory _response`

&#x20;

### readResponseDrTxHash

```solidity
function readResponseDrTxHash(uint256 _queryId) external view returns (bytes32);
```

Retrieves the hash of the Witnet transaction hash that actually solved the referred query.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `bytes32 _witnetTransactionHash`

&#x20;

### readResponseReporter

```solidity
function readResponseReporter(uint256 _queryId) external view returns (address);
```

Retrieves the address that reported the result to a previously-posted request.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `address _reporter`

Fails if:

* the `_queryId` is not in 'Reported' status.



### readResponseResult

```solidity
function readResponseResult(uint256 _queryId)
    external view returns (Witnet.Result memory);
```

Retrieves the Witnet-provided CBOR-bytes result of a previously posted request.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `Witnet.Result memory _result`

Fails if:

* the `_queryId` is not in 'Reported' status.



### readResponseTimestamp

```solidity
function readResponseTimestamp(uint256 _queryId) external view returns (uint256);
```

Retrieves the timestamp in which the result to the referred query was solved by the Witnet DON.

Method Paramaters:

* `uint256 _queryId`: The unique query identifier.

Returns:

* `uint256 _timestamp`

Fails if:

* the `_queryId` is not in 'Reported' status.



## `IWitnetRequestParser`

The Witnet interface for decoding Witnet-provided request to Data Requests. This interface exposes functions to check for the success/failure of a Witnet-provided result, as well as to parse and convert result into Solidity types suitable to the application level.

### `resultFromCborBytes`

```solidity
function resultFromCborBytes(bytes memory _cborBytes)
    external pure returns (Witnet.Result memory);
```

Decode raw CBOR bytes into a Witnet.Result instance.

Method Paramaters:

* `bytes memory _cborBytes`: Raw bytes representing a CBOR-encoded value.

Returns:

* `Witnet.Result memory`: A `Witnet.Result` instance.



### `resultFromCborValue`

```solidity
function resultFromCborValue(Witnet.CBOR memory _cborValue) 
    external pure returns (Witnet.Result memory);
```

Method Paramaters:

* `Witnet.CBOR memory _cborValue`: An instance of `Witnet.CBOR`.

Returns:

* `Witnet.Result memory`: A `Witnet.Result` instance.



### `isOk`

```solidity
 function isOk(Witnet.Result memory _result) external pure returns (bool);
```

Tells if a `Witnet.Result` is successful.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `true` if successful, `false` if errored.



### `isError`

```solidity
 function isError(Witnet.Result memory _result) external pure returns (bool);
```

Tell if a `Witnet.Result` is errored.



### `asBytes`

```solidity
function asBytes(Witnet.Result memory _result)
    external pure returns (bytes memory);
```

Decode a bytes value from a Witnet.Result as a `bytes` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `bytes`: The `bytes` decoded from the `Witnet.Result`.



### `asBytes32`

```solidity
 function asBytes32(Witnet.Result memory _result) external pure returns (bytes32);
```

Decode a bytes value from a `Witnet.Result` as a `bytes32` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `bytes32`: The `bytes32` decoded from the `Witnet.Result`.



### `asErrorCode`

```solidity
function asErrorCode(Witnet.Result memory _result) 
    external pure returns (Witnet.ErrorCodes);
```

Decode an error code from a Witnet.Result as a member of `Witnet.ErrorCodes`.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `Witnet.ErrorCodes`: The `CBORValue.Error memory` decoded from the Witnet.Result.



### `asErrorMessage`

```solidity
function asErrorMessage(Witnet.Result memory _result) 
    external pure returns (Witnet.ErrorCodes, string memory);
```

Generate a suitable error message for a member of `Witnet.ErrorCodes` and its corresponding arguments.

{% hint style="warning" %}
Note that client contracts should wrap this function into a try-catch foreseing potential errors generated in this function.
{% endhint %}

Method Paramaters:

* `Witnet.Result memory _result`: An instance of Witnet.Result.

Returns:

* `uint8 Witnet.ResultErrorCodes`: A tuple containing the `CBORValue.Error memory` decoded from the `Witnet.Result`,&#x20;
* `string`: A loggable error message.



### `asRawError`

```solidity
function asRawError(Witnet.Result memory _result)
    external pure returns(uint64[] memory);
```

Decode a raw error from a `Witnet.Result` as a `uint64[]`.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asBool`

```solidity
function asBool(Witnet.Result memory _result) external pure returns (bool);
```

Decode a boolean value from a Witnet.Result as an `bool` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asFixed16`

```solidity
 function asFixed16(Witnet.Result memory _result) external pure returns (int32);
```

Decode a fixed16 (half-precision) numeric value from a Witnet.Result as an `int32` value.

{% hint style="info" %}
Due to the lack of support for floating or fixed point arithmetic in the EVM, this method offsets all values. by 5 decimal orders so as to get a fixed precision of 5 decimal positions, which should be OK for most `fixed16.` use cases. In other words, the output of this method is 10,000 times the actual value, encoded into an `int32`.
{% endhint %}

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asFixed16Array`

```solidity
function asFixed16Array(Witnet.Result memory _result)
    external pure returns (int32[] memory);
```

Decode an array of fixed16 values from a Witnet.Result as an `int128[]` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asInt128`

```solidity
 function asInt128(Witnet.Result memory _result) external pure returns (int128);
```

Decode a integer numeric value from a Witnet.Result as an `int128` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asInt128Array`

```solidity
function asInt128Array(Witnet.Result memory _result)
    external pure returns (int128[] memory);
```

Decode an array of integer numeric values from a Witnet.Result as an `int128[]` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asString`

Decode a string value from a Witnet.Result as a `string` value.

```solidity
function asString(Witnet.Result memory _result)
    external pure returns (string memory);
```

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### `asStringArray`

Decode an array of string values from a Witnet.Result as a `string[]` value.

```solidity
function asStringArray(Witnet.Result memory _result)
    external pure returns (string[] memory);
```

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`:&#x20;



### asUint64

Decode a natural numeric value from a Witnet.Result as a `uint64` value.

```solidity
function asUint64(Witnet.Result memory _result)
    external pure returns(uint64);
```

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64`: The `uint64` decoded from the `Witnet.Result`.



### `asUint64Array`

```solidity
function asUint64Array(Witnet.Result memory _result)
    external pure returns (uint64[] memory);
```

Decode an array of natural numeric values from a Witnet.Result as a `uint64[]` value.

Method Paramaters:

* `Witnet.Result memory _result`: An instance of `Witnet.Result`.

Returns:

* `uint64[]`: The `uint64[]` decoded from the `Witnet.Result`.

