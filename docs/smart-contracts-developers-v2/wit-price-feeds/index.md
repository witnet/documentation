# 💹 Wit/Price Feeds

The **Witnet Foundation** subsidizes a series of price feeds on multiple ecosystems based on the needs of specific projects and partnerships. These price feeds can be openly read for free, as they get periodically updated by the Witnet Foundation driven by two main update conditions:

* The **deviation threshold** condition: The Witnet Foundation polls every few seconds all supported price feeds based on the actual data providers and computations as settled on the _WitnetPriceFeeds_ contract. If the value of some price feed deviates too much from the last updated on-chain value, the Witnet Foundation will force and pay the [_WitnetPriceFeeds_](../../smart-contracts/guides/solidity-contracts/appliances/witnetpricefeeds.md) contract to request a price update to be ultimately solved and reported back from the Witnet blockchain.
* The **heartbeat** condition: If no significant deviation is detected during certain period of time (i.e. the heartbeat), the Witnet Foundation will again force and pay the _WitnetPriceFeeds_ contract to pull a price update from the Witnet blockchain. This way a fresh value can always be provided to those consuming contracts that eventually read from the _WitnetPriceFeeds_ contract, freely and at no cost.  

::: info
_**Did you know?**_

On-chain price values in the _WitnetPriceFeeds_ contract are not actually produced by the Witnet Foundation, but by the public data providers and computations that are deterministically bound to each supported price feed. These public data providers and computations can be formally traced and verified both on-chain and off-chain. Every time a price update is requested on-chain, it is the Witnet public and permissionless blockchain that will ultimately solve the request by attesting the data providers and computations specific for each supported price feed.

> _**TL;DR**_
>
> Price feed subsidized by the Witnet Foundation follow both a **PUSH-update** model (smart contracts just read for free in expectancy that price feeds will get regularly updated), and a **PULL-update** model as well (contracts can force a price update on their own devises).
:::

::: tip
**How trustworthy are price updates?**

The trustworthiness of the data reported from the Witnet blockchain comes from the fact that the ones actually retrieving data from the Internet are a selection of independent and anonymous Witnet nodes that get randomly sampled from a pool of thousands of nodes, every single time a new price update is requested. The witnessing nodes on the Witnet blockchain will only be rewarded for their work if they spontaneously give a coordinated response, which chances are that will match what's published by the data sources.

> _**TL;DR**_ \
> &#xNAN;_&#x44;ata retrieved by smart contracts relying on the_ [_Wit/Oracle_](../wit-oracle/) _contracts framework can be claimed to be 100% truthful to the data providers being formally required on-chain._
:::
