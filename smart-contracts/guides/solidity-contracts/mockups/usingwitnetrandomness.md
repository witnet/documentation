# 📃 UsingWitnetRandomness

{% content-ref url="../../solidity-wizard.md" %}
[solidity-wizard.md](../../solidity-wizard.md)
{% endcontent-ref %}

### Constructor

| Parameters           | Type               | Description                                                                                               |
| -------------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| _\_witnetRandomness_ | `WitnetRandomness` | _Address of the_ [_**WitnetRandomness**_ ](../appliances/witnetrandomness.md)_contract to interact with._ |

### Properties

| Name        | Visibility         | Description                                                                                                              |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **witnet**  | Immutable public   | Address of the [WitnetOracle ](../core/witnetoracle.md)instance used by WitnetRandomness for posting randomize requests. |
| **\_\_RNG** | Immutable internal | [**WitnetRandomness**](../appliances/witnetrandomness.md) instance where to query and fetch randomness from.             |

### Events

<table data-full-width="false"><thead><tr><th width="224">Events</th><th width="277">Arguments</th><th>Description</th></tr></thead><tbody><tr><td><strong>WitnetQuery</strong></td><td><p><code>address  evmRequester</code></p><p><code>uint256  evmGasPrice</code></p><p><code>uint256  evmReward</code></p><p><code>uint256  queryId</code></p><p><code>bytes32  queryRadHash</code></p><p><code>RadonSLA querySLA</code></p></td><td>Emitted every time a new randomize query gets posted to the <a href="../core/witnetoracle.md">WitnetOracle </a>contract.</td></tr><tr><td><strong>WitnetQueryUpgrade</strong></td><td><p><code>uint256 queryId</code></p><p><code>address evmSender</code></p><p><code>uint256 evmGasPrice</code></p><p><code>uint256 evmReward</code></p></td><td>Emitted if the EVM reward for solving a previously posted randomize is increased by anyone in any amount.</td></tr><tr><td><strong>Randomizing</strong></td><td><p><code>address evmOrigin</code></p><p><code>address evmSender</code></p><p><code>uint256 witOracleQueryId</code></p></td><td>Emitted every time a new randomize is requested to the <a href="../appliances/witnetrandomness.md">WitnetRandomness </a>contract.</td></tr></tbody></table>
