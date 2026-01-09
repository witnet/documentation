# Appliances

This section contains ABI references of the public-domain smart contract appliances built on top of the [_**WitnetOracle**_](../core/witnetoracle.md) core bridging contract, as provided by the **Witnet Foundation**.

Your smart contracts can freely read from these appliances, and pull data updates anytime from the Witnet blockchain as well. Pulling data updates requires paying some fee using the same EVM gas token used for paying transactions. Helper methods are provided on each appliance as to determine the minimum fee required for pulling data updates, depending on the nature and size of claimed data, EVM gas price and other EVM-specific implementation intricacies. Data pulled from any of these public appliances will be freely accessible to everyone.
[witnetpricefeeds.md](witnetpricefeeds.md)
[witnetrandomness.md](witnetrandomness.md)
