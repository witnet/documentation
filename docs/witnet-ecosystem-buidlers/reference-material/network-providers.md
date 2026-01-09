# 🕸️ Network Providers

To enable your apps to interact with the Witnet network, you can either connect to your own Witnet node or use one of the public Wit/RPC providers maintained by the **Witnet Foundation**:

<table><thead><tr><th width="152.20001220703125">Network</th><th width="281.39996337890625">WIT/RPC Providers</th><th width="91.800048828125">Id</th><th>Description</th></tr></thead><tbody><tr><td><strong>Witnet Mainnet</strong></td><td><code>https://rpc-01.witnet.io</code><br><code>https://rpc-02.witnet.io</code></td><td><code>0x9fed</code></td><td>Where Wit/oracle queries get notarized for real, and results forever stored into the Witnet blockchain. Transactions get paid in real <strong>WIT coins</strong>.</td></tr><tr><td><strong>Witnet Testnet</strong></td><td><code>https://rpc-testnet.witnet.io</code></td><td><code>0x749f</code></td><td>Only for testing purposes. Transactions get paid in testnet TWIT coins with no market value whatsoever.</td></tr></tbody></table>

::: danger
_If you choose to use your own Witnet node, please ensure "sensitive methods" are disabled in the configuration file before exposing the JSON-RPC ports._
:::
