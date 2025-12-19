# 🌐 Using Witnet Custom Feeds

One of the core capabilities of the [**Wit/Oracle Framework**](#user-content-fn-1)[^1] is to enable smart contracts to securely retrieve and transform data extracted from Graph-QL servers, **REST** API endpoints, **JSON-RPC** providers, or in general any content accessible via HTTP/**GET**, HTTP/**POST** or even HTTP/**HEAD** requests.&#x20;

> Witnet securely collects data using cryptographic, crowd-attestation and Proof-of-Stake consensus mechanisms. Every oracle data query and its outcome, whether successful or not, is permanently and publicly recorded on the Witnet blockchain.

**Wit/Oracle queries** from smart  contracts rely on formally verified [**Radon Requests**](#user-content-fn-2)[^2]**.** These Witnet-compliant requests define the public sources for retrieving data and outline the methods for transforming, filtering, and aggregating the data collected from each source.&#x20;

Multiple **data provisioning models** are possible depending on who initiates the oracle query and who executes the EVM transaction processing the result:

| Data Provisioning Model | Data Requester        | Description                                                                                                                                                                                                                                                                    |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Active PULL**         | Smart contract        | Some blocks after the data is queried, the consuming contract calls the **`WitOracle`** legacy contract to read and process the query result, if available. Query outcomes are publicly stored in the `WitOracle` contract and can be erased only by those who requested them. |
| **Passive PULL**        | Smart contract        | The consuming contract is called immediately once the outcome of the data query is returned by the Wit/Oracle bridging framework. The consuming contract is in charge of preserving valuable data on-chain.                                                                    |
| **Passive PUSH**        | Off-chain environment | The data requester conducts a free dry run of some data query (i.e. Radon Request), to decide if it's worth paying for a Data Request Transaction in Witnet and posting the result on-chain afterward.                                                                         |

{% hint style="success" %}
**Why is it different to other oracle solutions?**

Few EVM oracle solutions allow **Custom Feeds**, often missing crucial features such as:

* **Adaptability:** You can set parameters for data feeds and determine values on-chain before querying.
* **Time to Market:** Create, deploy, and report your own custom feeds independently. No application forms, subscriptions, or third-party involvement required.
* **Tokenomics:** You don't need third-party ERC-20 tokens when pulling data from your smart contracts. Fees are paid in native gas tokens and fluctuate solely based on network congestion status, rather than arbitrary or corporate interests.
* **Transparency:** Data requests must be verified on-chain before querying. Contracts can check data source counts, FQDNs, expected result types, and filtering or aggregation methods before data delivery.
* **Traceability:** All oracle queries are recorded permanently on the Witnet blockchain. Each reported result on-chain keeps a cryptographic trail, enabling the tracking of sources and the time of data collection.
* **Trustworthiness:** Data can be gathered from various trusted sources simultaneously, enhancing decentralization and fault tolerance. Query results could only be altered if an individual controls more than two-thirds of the staked supply in Witnet.&#x20;
* **Censorship-Resistance:** The requester specifies the size of the committee to resolve an oracle query, with members randomly selected in Witnet for each resolution. Data delivery could only be blocked if an individual controls more than one-third of the staked supply in Witnet.
{% endhint %}

***

### Create and Validate a New Custom Feed

This examples creates a **Cross-Chain Custom Feed** that retrieves supply information about Witnet:

{% tabs %}
{% tab title="Solidity" %}
<pre class="language-solidity" data-title="MyActivePullFeed.sol" data-line-numbers data-expandable="true"><code class="lang-solidity">// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 &#x3C;0.9.0;

import {
    Witnet,
    UsingWitOracle,
    WitOracleRadonRequestFactory
} from "@witnet/solidity/contracts/UsingWitOracle.sol";

contract MyActivePullFeed
    is
<strong>        UsingWitOracle
</strong>{
    using Witnet for Witnet.DataResult;
    using Witnet for Witnet.Timestamp;
     
    event WitnetTotalSupply(uint64 value, Witnet.Timestamp timestamp);

    /// Uniquely identifies the Radon Request used in Witnet for
    /// feeding our Custom Data Feed:
    Witnet.RadonHash public immutable radonHash;

    uint256 public totalSupply;
    Witnet.Timestamp public totalSupplyTimestamp;

    uint256 internal __lastWitOracleQueryId;
    
    constructor ()
        // Using the legit Wit/Oracle Framework
        UsingWitOracle(0x77703aE126B971c9946d562F41Dd47071dA00777)
    {
        // Create and validate a Witnet-compliant Radon Request 
        // that will be used for feeding our Custom Data Feed:
        radonHash = WitOracleRadonRequestFactory(0x000FF9f888B1415Da64cc985f775380a94b40000)
            .buildRadonRequest(
                // The data source:
                Witnet.DataSource({
                    url: "https://rpc-testnet.witnet.io",
                    request: Witnet.DataSourceRequest({
                        method: Witnet.RadonRetrievalMethods.HttpPost,
                        headers: Witnet.intoDynArray([ 
                            [ "Content-Type", "application/json;charset=UTF-8" ]
                        ]),
                        body: '{"jsonrpc":"2.0","method":"getSupplyInfo","id":1}',
                        script: 
                            hex"83187782186666726573756c741869" 
                            // [RadonString] parseJSONMap()
                            // [RadonMap]    getMap("result")
                            // [RadonArray]  values()
                    })
                }),
                // The crowd-attestation tally reducer:
                Witnet.RadonReducer({
                    // no tally filters required:
                    filters: new Witnet.RadonFilter[](0),
                    // take the mode of all witnesses:
                    method: Witnet.RadonReducerMethods.Mode
                })
            );
    }

    /// @notice Returns the bytecode of the Witnet-compliant Radon Request 
    /// used for feeding our Custom Data Feed.
    function radonBytecode() public view returns (bytes memory) {
        return __witOracle.registry().lookupRadonRequestBytecode(radonHash);
    }
    /// ...
}
</code></pre>
{% endtab %}

{% tab title="CommonJS" %}
{% code title="witnet/assets/requests.cjs" lineNumbers="true" expandable="true" %}
```javascript
const { Witnet } = require("@witnet/sdk");
const { RadonRequest, RadonScript } = Witnet.Radon;
const { filters, reducers, retrievals, types } = Witnet.Radon;

module.exports = {
	WitOracleRequestWitnetSupplyInfo: new RadonRequest({
		sources: [
			retrievals.HttpPost({
				url: "https://rpc-testnet.witnet.io",
				headers: { "Content-Type": "application/json;charset=UTF-8" },
				body: JSON.stringify({
					jsonrpc: "2.0",
					method: "getSupplyInfo",
					id: 1,
				}).replaceAll("\\\\", "\\"),
				script: RadonScript(types.RadonString)
					.parseJSONMap()
					.getMap("result")
					.values(),
			}),
		],
		witnessReducer: reducers.Mode(),
	}),
};
```
{% endcode %}
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witeth assets WitOracleRequestWitnetSupplyInfo --deploy
```
{% endtab %}
{% endtabs %}

### Querying Resolution for a Custom Feed

{% tabs %}
{% tab title="Solidity" %}
<pre class="language-solidity" data-title="MyActivePullFeed.sol"><code class="lang-solidity">/// ...
function __pullDataUpdate() internal returns (uint256 _witOracleQueryId) {
<strong>    _witOracleQueryId = __witOracle.queryData{
</strong>        value: _estimateWitOracleFee()
    }(
        radonHash,
        __witOracleDefaultQueryParams
    );
    __lastWitOracleQueryId = _witOracleQueryId;
}
</code></pre>
{% endtab %}

{% tab title="Typescript" %}
{% code title="src/query.ts" lineNumbers="true" %}
```typescript
import { utils, Witnet } from "@witnet/sdk"
const { requests } = require("../witnet/assets/index.cjs");

export async function query() {
    const wallet = await Witnet.Wallet.fromEnv();
    const request = utils.requireRadonRequest(
        "WitOracleRequestWitnetSupplyInfo", 
        requests
    );
    if (request) {
        await Witnet.DataRequests.from(wallet, request)
            .sendTransaction({
                fees: Witnet.TransactionPriority.High,
                witnesses: 7
            })
            .then(receipt => {
                console.info(receipt)
            })
    }
}
```
{% endcode %}
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witsdk wallet notarize WitOracleRequestWitnetSupplyInfo 
```
{% endtab %}
{% endtabs %}

### Pushing Resolutions of a Custom Feed

{% hint style="info" %}
In Witnet, oracle query results need to be pushed on-chain only when using the **Passive-Push** data consumption model. If data is pulled from a smart contract, the Wit/Oracle bridging infrastructure handles reporting the query outcome on-chain.
{% endhint %}

{% tabs %}
{% tab title="Typescript" %}
{% code title="src/report.ts" lineNumbers="true" expandable="true" %}
```typescript
import { utils, Witnet } from "@witnet/sdk"
import { WitOracle } from "@witnet/solidity"

const { requests } = require("../witnet/assets/index.cjs");

const EVM_NETWORK_PROVIDER = "http://127.0.0.1:8545"; // eth/rpc gateway capable of signing transacions
const EVM_SIGNER_ADDRESS = "0x..."; // the signer address that will pay for reporting valuable data on-chain
const EVM_TARGET_ADDRESS = "0x..."; // the address of the IWitOracleConsumer contract
const EVM_MAX_GAS_LIMIT  = 500_000;  // max gas units willing to spend when pushing data reports

export async function report() {

    // Create wrapper to consumer contract
    const witOracle = await WitOracle.fromJsonRpcUrl(
        EVM_NETWORK_PROVIDER,
        EVM_SIGNER_ADDRESS,
    );
    const consumer = await witOracle.getWitOracleConsumerAt(EVM_TARGET_ADDRESS)

    // Load Radon Request asset from local workspace:
    const request = utils.requireRadonRequest("WitnetSupplyInfo", requests)

    if (request) {
        // Connect to Wit/Kermit provider 
        const kermit = await Witnet.KermitClient.fromEnv()
        const provider = await Witnet.JsonRpcProvider.fromEnv()

        // Ask the Wit/Kermit to search the ten latest resolutions of the custom Radon Request:
        const resolutions = await provider.searchDataRequests(
            request?.radHash, { 
                limit: 10,
                mode: "ethereal", 
                reverse: true 
            }
        );

        // Look for the most recently finalized resolution:
        const found = resolutions
            .map(resolution => resolution as Witnet.GetDataRequestEtherealReport)
            .find(resolution => resolution?.result && resolution.result.finalized);
        
        // Push it on-chain if found:
        if (found?.hash )  {
            const report = await kermit.getDataPushReport(found.hash, consumer.network)
            await consumer
                .pushDataReport(report, { gasLimit: EVM_MAX_GAS_LIMIT })
                .then(receipt => console.info(receipt))
        }
    }
}
```
{% endcode %}
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witeth report --push WIT_DR_TX_HASH --into EVM_CONSUMER_ADDR
```
{% endtab %}
{% endtabs %}

### Process Data Query Results

<details>

<summary>Active-Pull Consumer</summary>

<pre class="language-solidity" data-title="MyActivePullFeed.sol" data-expandable="true"><code class="lang-solidity">// ...
function updateWitnetTotalSupply()
    virtual external
<strong>    witOracleQuerySolved(__lastWitOracleQueryId)
</strong>{
<strong>    Witnet.DataResult memory _lastResult = __witOracle.getQueryResult(
</strong><strong>        __lastWitOracleQueryId
</strong><strong>    );
</strong>    require(_lastResult.status == Witnet.ResultStatus.NoErrors, "try again");
    if (totalSupplyTimestamp.gt(_lastResult.timestamp)) {
        uint64[] memory _values = _lastResult.fetchUint64Array();
        /**
         * [
         *   0 -> blocks_minted: u64
         *   1 -> blocks_minted_reward: u64
         *   2 -> current_staked_supply: u64
         *   3 -> current_time: u64
         *   4 -> epoch: u64
         *   5 -> initial_supply: u64,
         * ]
         */
        uint64 _totalSupply = _values[1] + _values[5] + _values[6];
        totalSupply = _totalSupply;
        totalSupplyTimestamp = _lastResult.timestamp;
        emit WitnetTotalSupply(_totalSupply, _lastResult.timestamp);
    }
}
</code></pre>

</details>

<details>

<summary>Passive-Pull Consumer</summary>

<pre class="language-solidity" data-title="MyPassivePullFeed.sol" data-line-numbers data-expandable="true"><code class="lang-solidity">// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 &#x3C;0.9.0;

import {
    Witnet,
    UsingWitOracle,
    IWitOracleQueriableConsumer,
    WitOracleRadonRequestFactory
} from "@witnet/solidity/contracts/UsingWitOracle.sol";

contract MyPassivePullFeed
    is
<strong>        UsingWitOracle, 
</strong><strong>        IWitOracleQueriableConsumer
</strong>{
    using Witnet for Witnet.DataResult;
    using Witnet for Witnet.Timestamp;
    
    uint24 internal constant _MAX_CALLBACK_GAS_LIMIT = 100_000;
    
    /// ... 
    /// ...
    
    function __pullDataUpdate() internal returns (uint256 _witOracleQueryId) {
<strong>        _witOracleQueryId = __witOracle.queryDataWithCallback{
</strong>            value: _estimateWitOracleFee()
        }(
            radonHash,
            __witOracleDefaultQueryParams,
            Witnet.QueryCallback({
                consumer: address(this),
                gasLimit: _MAX_CALLBACK_GAS_LIMIT
            })
        );
        __lastWitOracleQueryId = _witOracleQueryId;
    }
    
    /// =======================================================================
    /// ---IWitOracleQueriableConsumer methods --------------------------------
    
    /// @notice Determines if Wit/Oracle query results can be reported from the given address.
    function reportableFrom(address _from) override public view returns (bool) {
        return address(_from) == address(__witOracle);
    }
    
    /// @notice Method called from the WitOracle as soon as the specified `queryId` gets reported from the Witnet blockchain.
    /// @param queryId The unique identifier of the Witnet query being reported.
    /// @param queryResult Abi-encoded Witnet.DataResult containing the CBOR-encoded query's result, and metadata.
<strong>    function reportWitOracleQueryResult(
</strong>            uint256 queryId,
<strong>            bytes calldata queryDataResult
</strong>        )
        override external 
<strong>        onlyFromWitnet
</strong>    {
        if (queryId == __lastWitOracleQueryId) {
            Witnet.DataResult memory _lastResult = abi.decode(
                queryDataResult, 
                (Witnet.DataResult)
            );
            if (
                _lastResult.status == Witnet.ResultStatus.NoErrors
                    &#x26;&#x26; totalSupplyTimestamp.gt(_lastResult.timestamp)
            ) {
                uint64[] memory _values = _lastResult.fetchUint64Array();
                uint64 _totalSupply = _values[1] + _values[5];
                totalSupply = _totalSupply;
                totalSupplyTimestamp = _lastResult.timestamp;
                emit WitnetTotalSupply(_totalSupply, _lastResult.timestamp);
            }
        }
    }
}
</code></pre>

</details>

<details>

<summary>Passive-Push Consumer</summary>

<pre class="language-solidity" data-title="MyPassivePushFeed.sol" data-line-numbers data-expandable="true"><code class="lang-solidity">// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 &#x3C;0.9.0;

import {
    Witnet,
    UsingWitOracle,
    IWitOracleConsumer,
    WitOracleRadonRequestFactory
} from "@witnet/solidity/contracts/UsingWitOracle.sol";

contract MyPassivePushFeed
    is
<strong>        UsingWitOracle, 
</strong><strong>        IWitOracleConsumer
</strong>{
    using Witnet for Witnet.DataResult;
    using Witnet for Witnet.RadonHash;
    using Witnet for Witnet.Timestamp;
    
    uint16 internal constant _WITNET_MIN_COMMITTEE_SIZE = 5;

    event WitnetTotalSupply(uint64 value, Witnet.Timestamp timestamp);

    /// Uniquely identifies the Radon Request used in Witnet for
    /// feeding our Custom Data Feed:
    Witnet.RadonHash public immutable radonHash;

    uint256 public totalSupply;
    Witnet.Timestamp public totalSupplyTimestamp;

    constructor ()
        // Using the legit Wit/Oracle Framework
        UsingWitOracle(0x77703aE126B971c9946d562F41Dd47071dA00777)
    {
        /// ... 
    }

    /// @notice Returns the bytecode of the Witnet-compliant Radon Request 
    /// used for feeding our Custom Data Feed.
    function radonBytecode() public view returns (bytes memory) {
        return __witOracle.registry().lookupRadonRequestBytecode(radonHash);
    }

    /// ===================================================================================
    /// ---IWitOracleConsumer methods -----------------------------------------------------

    /// @notice Process the outcome of some oracle query allegedly solved in Witnet,
    /// that ought to be verified by the Wit/Oracle contract pointed out by `witOracle()`. 
    /// The Wit/Oracle contract will emit a full `IWitOracle.WitOracleReport` event,
    /// only if the `report` is proven to be valid and authentic.
    /// @dev Reverts if the report is proven to be corrupted. 
<strong>    function pushDataReport(
</strong>            Witnet.DataPushReport calldata report, 
            bytes calldata proof
        ) 
        override external
    {
        // Validate the parameters of the oracle query resolution being reported:
        require(
            report.queryParams.witCommitteeSize >= _WITNET_MIN_COMMITTEE_SIZE,
            "insufficient witnesses"
        );
        require(
            report.queryRadHash.eq(radonHash),
            "invalid radon request"
        );

        // Ask the Wit/Oracle Framework to validate and parte the posted query's result:
<strong>        Witnet.DataResult memory _dataResult = __witOracle.pushDataReport(report, proof);
</strong>
        // Process the outcome of the reported oracle query:
        if (
            _dataResult.status == Witnet.ResultStatus.NoErrors
                &#x26;&#x26; totalSupplyTimestamp.gt(_dataResult.timestamp)
        ) {
            uint64[] memory _values = _dataResult.fetchUint64Array();
            uint64 _totalSupply = _values[1] + _values[5];
            totalSupply = _totalSupply;
            totalSupplyTimestamp = _dataResult.timestamp;
            emit WitnetTotalSupply(_totalSupply, _dataResult.timestamp);
        }
    }

    /// @notice Returns the address of the Wit/Oracle bridge that will be used to verify pushed data reports.
    function witOracle()
        override(UsingWitOracle, IWitOracleConsumer)
        external view 
        returns (address)
    {
        return address(__witOracle);
    }
}
</code></pre>

</details>

***

### Learn more about Witnet Custom Data Feeds

Follow the rabbit hole deep and learn how to harness the true potential of Custom Data Feeds in Witnet:

{% content-ref url="../../smart-contracts/witnet-custom-feeds.md" %}
[witnet-custom-feeds.md](../../smart-contracts/witnet-custom-feeds.md)
{% endcontent-ref %}

[^1]: The **Wit/Oracle Framework** enables bidirectional interconnection between smart contracts and the **Witnet blockchain** to retrieve, aggregate and deliver real-world data from one or multiple public sources on the Internet, the IPFS network or even other blockchains.&#x20;

[^2]: **Radon Requests** in Witnet are like smart contracts in any regular EVM, and are uniquely addressed by hashing their bytecode.&#x20;



    Radon Requests are compiled out of **Radon scripts**, which is a domain-specific language (DSL) that formally describes the web-scraping workflow that must be followed by Witnet nodes resolving some **Data Request Transaction**.
