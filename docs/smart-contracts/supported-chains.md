---
description: >-
  A complete list of the chains in which the Witnet oracle blockchain is
  currently bridged.
---

# ⛓️ Supported chains

A complete list of the Wit/Oracle counter-factual contracts deployed by the _**Witnet Foundation**_.

:::info Understanding the Capabilities
- **Network**: The blockchain ecosystem where Witnet is currently operational.

- **PUSH Data Feeds**: Data is pushed to the blockchain based on a heartbeat (e.g., every 24 hours) or price deviation (e.g., 0.5% change). Ideal for simple "read" operations.

- **PULL Data Feeds**: On-demand updates. Users "pull" the data into their transaction to ensure the price is fresh at the exact moment of execution, often saving significant gas for the protocol.

- **Backed Price Feeds**: These are specific feeds subsidized by the Witnet Foundation to ensure high-quality data is readily available for the community. Note: Anyone can still permissionlessly launch and fund their own custom price feeds on any supported network using the Witnet SDK.

- **Verifiable Randomness**: Confirms the availability of the Witnet Randomness Oracle, providing cryptographically secure, non-biasable entropy for gaming, NFTs, and lotteries.

For more information check out the [quick tutorials](https://docs.witnet.io/intro/tutorials/). 

:::


<ClientOnly>
<NetworkTable type="testnet" title="EVM-compatible Networks" :searchable="true" :enableImage="true" />
</ClientOnly>


