# 📃 UsingWitnetRequest

{% content-ref url="../../solidity-wizard.md" %}
[solidity-wizard.md](../../solidity-wizard.md)
{% endcontent-ref %}

### Constructor

<table><thead><tr><th width="285">Parameters</th><th width="170">Type</th><th>Description</th></tr></thead><tbody><tr><td><em>_witnetRequest</em></td><td><code>WitnetRequest</code></td><td>Address <em>of the</em> <a href="../core/witnetrequest.md"><em><strong>WitnetRequest</strong></em> </a>instance <em>to use as reference when querying data updates to</em> <a href="../core/witnetoracle.md"><em>WitnetOracle</em></a><em>.</em> </td></tr><tr><td><em>_baseFeeOverHeadPercentage</em></td><td><code>uint16</code></td><td><em>Percentage over base fee to pay when querying new data updates.</em></td></tr></tbody></table>

### Properties

<table><thead><tr><th width="338">Name</th><th width="138">Visibility</th><th>Description</th></tr></thead><tbody><tr><td><strong>dataRequest</strong></td><td>Immutable public</td><td>Address of the <a href="../core/witnetrequest.md"><strong>WitnetRequest</strong> </a>instance passed in the constructor.</td></tr><tr><td><strong>__witnet</strong></td><td>Immutable internal</td><td>Address of the <a href="../core/witnetoracle.md">WitnetOracle </a>instance to directly interact with.</td></tr><tr><td><strong>__witnetBaseFeeOverheadPercentage</strong></td><td>Internal</td><td>Percentage over base fee to pay when querying new data updates. Defaults to 33%.</td></tr><tr><td><strong>__witnetDefaultSLA</strong></td><td>Internal</td><td>Default Service Level Agreement parameters to be fulfilled by the Wit/Oracle blockchain when solving data updates.</td></tr><tr><td><strong>__witnetRequestRadHash</strong></td><td>Immutable internal</td><td>Immutable RAD hash identifying the actual sources and computations being solved by the Wit/Oracle upon every data update.</td></tr></tbody></table>

### Internal methods

<table><thead><tr><th width="416">Methods</th><th>Description</th></tr></thead><tbody><tr><td><strong>_witnetCheckQueryResponseStatus</strong>(uint256)</td><td>Check current <code>WitnetV2.ResponseStatus</code> of the specified query.</td></tr><tr><td><strong>_witnetCheckQueryResultAvailability</strong>(uint256)</td><td>Check if the specified query was already reported back from the Wit/Oracle blockchain.</td></tr><tr><td><strong>_witnetCheckQueryResultError</strong>(uint256)</td><td>Get detailed <code>Witnet.ResultError</code> for the specified query.</td></tr><tr><td><strong>_witnetEstimateEvmReward</strong>()</td><td>Estimate the minimum reward required for posting a data request, using <code>tx.gasprice</code> as a reference.</td></tr><tr><td><strong>__witnetRequestData</strong>(uint256 _evmReward)</td><td>Post a data query in expectation that it will get eventually solved and reported from the Wit/Oracle blockchain, specifying how much fee to pay out from this contract's balance.</td></tr><tr><td><strong>__witnetRequestData</strong>(uint256, RadonSLA)</td><td>Post a data query in expectation that it will get eventually solved and reported, specifying how much fee to pay and the SLA parameters to be fulfilled by the Wit/Oracle blockchain.</td></tr></tbody></table>

### Events

<table data-full-width="false"><thead><tr><th width="224">Events</th><th width="277">Arguments</th><th>Description</th></tr></thead><tbody><tr><td><strong>WitnetQuery</strong></td><td><p><code>address  evmRequester</code></p><p><code>uint256  evmGasPrice</code></p><p><code>uint256  evmReward</code></p><p><code>uint256  queryId</code></p><p><code>bytes32  queryRadHash</code></p><p><code>RadonSLA querySLA</code></p></td><td>Emitted every time a new randomize query gets posted to the <a href="../core/witnetoracle.md">WitnetOracle </a>contract.</td></tr><tr><td><strong>WitnetQueryUpgrade</strong></td><td><p><code>uint256 queryId</code></p><p><code>address evmSender</code></p><p><code>uint256 evmGasPrice</code></p><p><code>uint256 evmReward</code></p></td><td>Emitted if the EVM reward for solving a previously posted randomize is increased by anyone in any amount.</td></tr></tbody></table>
