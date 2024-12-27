# 📃 UsingWitnet

{% content-ref url="../../solidity-wizard.md" %}
[solidity-wizard.md](../../solidity-wizard.md)
{% endcontent-ref %}

### Constructor

| Parameters       | Type           | Description                                                                                 |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------- |
| _\_witnetOracle_ | `WitnetOracle` | Address _of the_ [_**WitnetOracle**_ ](../core/witnetoracle.md)_instance to interact with._ |

### Properties

<table><thead><tr><th width="346">Name</th><th width="183">Visibility</th><th>Description</th></tr></thead><tbody><tr><td><strong>__witnet</strong></td><td>Immutable internal</td><td>Address of the <a href="../core/witnetoracle.md"><strong>WitnetOracle</strong> </a>instance to directly interact with.</td></tr><tr><td><strong>__witnetBaseFeeOverheadPercentage</strong></td><td>Internal</td><td>Percentage over base fee to pay when querying new data updates. Defaults to 33%.</td></tr><tr><td><strong>__witnetDefaultSLA</strong></td><td>Internal</td><td>Default Service Level Agreement parameters to be fulfilled by the Wit/Oracle blockchain when solving data updates.</td></tr></tbody></table>

### Internal methods

<table><thead><tr><th width="416">Methods</th><th>Description</th></tr></thead><tbody><tr><td><strong>_witnetCheckQueryResultAvailability</strong>(uint256)</td><td>Check if the specified query was already reported back from the Wit/Oracle blockchain.</td></tr><tr><td><strong>_witnetEstimateEvmReward</strong>(uint16)</td><td>Estimate the minimum reward required for posting a data request, using <code>tx.gasprice</code> as a reference.</td></tr><tr><td><strong>_witnetCheckQueryResponseStatus</strong>(uint256)</td><td>Check current <code>WitnetV2.ResponseStatus</code> of the specified query.</td></tr><tr><td><strong>_witnetCheckQueryResultError</strong>(uint256)</td><td>Get detailed <code>Witnet.ResultError</code> for the specified query.</td></tr></tbody></table>

### Events

<table data-full-width="false"><thead><tr><th width="224">Events</th><th width="277">Arguments</th><th>Description</th></tr></thead><tbody><tr><td><strong>WitnetQuery</strong></td><td><p><code>address  evmRequester</code></p><p><code>uint256  evmGasPrice</code></p><p><code>uint256  evmReward</code></p><p><code>uint256  queryId</code></p><p><code>bytes32  queryRadHash</code></p><p><code>RadonSLA querySLA</code></p></td><td>Emitted every time a new randomize query gets posted to the <a href="../core/witnetoracle.md">WitnetOracle </a>contract.</td></tr><tr><td><strong>WitnetQueryUpgrade</strong></td><td><p><code>uint256 queryId</code></p><p><code>address evmSender</code></p><p><code>uint256 evmGasPrice</code></p><p><code>uint256 evmReward</code></p></td><td>Emitted if the EVM reward for solving a previously posted randomize is increased by anyone in any amount.</td></tr></tbody></table>
