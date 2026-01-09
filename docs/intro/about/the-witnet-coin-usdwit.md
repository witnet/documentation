# 🪙 The Witnet Coin ($WIT)

## Native WIT

The Witnet coin (WIT) is a utility token native to the Witnet Network, a public and permissionless Proof-of-Stake blockchain. It promotes fair and trustworthy behavior throughout the network, playing several key roles within the Witnet Ecosystem:

<table><thead><tr><th width="274.79998779296875">Functions of the Witnet coin (WIT)</th><th>Description</th></tr></thead><tbody><tr><td>Network fees</td><td>The WIT coin pays for all sorts of transactions in the Witnet Network. </td></tr><tr><td>Data-attestation rewards</td><td>The WIT coin pays rewards to node validators participating in oracle queries.</td></tr><tr><td>Staking & network security</td><td>Node validators stake WIT coins to help secure the network and the resolution of oracle queries.</td></tr><tr><td>Composability</td><td>Wrapping native WIT tokens into Ethereum and other EVM ecosystems enables holders to access a wide range of DeFi protocols.</td></tr></tbody></table>

## Wrapped WIT

Native WIT coins can be wrapped into WIT tokens in **Ethereum** by means of the official ERC-20 token contract at [`0xcafe...CaFE`](https://etherscan.io/address/0xcafe5De18756817D98F4603F6828397406D4CaFE#tokentxns).

The **Witnet ERC-20 token** in Ethereum ensures that:

* Users can freely and permissionlessly wrap and unwrap WIT between Witnet and Ethereum.
* The total supply of WIT tokens in Ethereum is backed 1-to-1 by native WIT in Witnet.

::: info
_The WIT token in **Ethereum** supports bridging to some L2 chains, such as **Base**. Please, get_ [_here_](https://github.com/witnet/witnet-wrapped-wit/blob/master/index.md#-supported-networks) _an up-to-date list of supported L2s._
:::


<ExternalLinkButton
  image="uniswap.svg"
  title="Buy/Sell wrapped WIT"
  website="https://app.uniswap.io"
/>

<ExternalLinkButton
  image="superbridge.png"
  title="Bridge wrapped WIT to L2s"
  website="https://superbridge.app/?fromChainId=1&toChainId=8453&tokenAddress=0xcafe5De18756817D98F4603F6828397406D4CaFE"
/>

## Tokenomics

### Total Supply

Computed as the sum of the initial supply plus the sum of all minted supply up to date, minus total burnt supply, the **Total Supply** as of November 2025 is **1,558,310,000 WIT**.

<figure><img src="/assets/Group 709.png" alt="" width="563"><figcaption></figcaption></figure>

#### Initial supply

A total of 750,000,000 Witnet coins were originally pre-mined in the genesis block:

<table><thead><tr><th width="284.20001220703125">Genesis allocation</th><th width="179.79998779296875">Amount</th><th>Notes</th></tr></thead><tbody><tr><td>Founders and Early Contributors</td><td>250M WIT</td><td>6-month cliff in April 2021 + 18 months of bi-weekly unlocks.</td></tr><tr><td>Witnet Foundation</td><td>250M WIT</td><td>Supports development and ecosystem growth.</td></tr><tr><td>Early investors & Community Sale</td><td>250M WIT</td><td>Distributed via Republic.co and SAFT participants.</td></tr></tbody></table>

#### Minted supply

Upon the upgrade of the Witnet protocol to Wit/2, the block time was reduced from 45 to 20 seconds, whereas the block rewards were reduced from 250.0 to 50.0 WIT. Since then, the Witnet supply experiences an **annual inflation rate of 6.6%**, ensuring long-term sustainability of staking rewards.

| Increment in Total Supply | Time scale           |
| ------------------------- | -------------------- |
| 50 WIT                    | 1 Epoch (20 seconds) |
| 216,000 WIT               | Daily                |
| 6,480,000 WIT             | Monthly              |
| 78,840,000 WIT            | Yearly               |

As of November 2025, the total **Minted Supply** since genesis were 800,000,000 WIT.

#### Burnt supply

As in Witnet protocol version 2.0, validators that do not comply with a majority of witnesses when participating in oracle queries, they get slashed by making them lose some collateral (proportional to query resolution rewards, as established by data requesters), and some mining power as well (worsening their long-term APY). As of November 2025, a total of **2,720,000 WIT** had been burnt.

### Circulating Supply

The **Circulating Supply** equals the Total Supply minus the WIT coins that are unavailable for immediate transfer, including those that are locked or staked. The Circulating Supply includes the reserves that the Witnet ERC-20 token in Ethereum relies on.

<figure><img src="/assets/Group 706.png" alt="" width="563"><figcaption></figcaption></figure>

The current circulating supply can be checked in real time on CoinMarketCap and CoinGecko:

<ExternalLinkButton
  image="cg.svg"
  title="Check WIT circulating supply in CoinGecko"
  website="https://www.coingecko.com/en/coins/witnet"
/>

<ExternalLinkButton
  image="witnet_explorer.png"
  title="Check WIT distribution in the Witnet Explorer"
  website="https://witnet.network/balances"
/>

#### Staking rewards

Node validators need to stake native WIT in order to be eligible for mining blocks and participating in the resolution of oracle queries. The more native WIT a validator stakes, the more chances it will have to earn minting rewards, and so the higher the APY it can expect:

<div data-with-frame="true"><figure><img src="/assets/GZhmMVmWgA8E_gU.png" alt=""><figcaption><p>Staking in Witnet is designed to be as fair as possible.</p></figcaption></figure></div>

You can view the current staked supply and estimate your potential earnings using this calculator:
<ExternalLinkButton
  image="staking-witnet.svg"
  title="WIT Staking Rewards Calculator"
  website="https://staking.witnet.io"
/>

<!-- TODO: replace table with custom component button with preview -->
Learn how to stake your native WIT into a validator node and start earning rewards with this tutorial:
[mining-wit.md](../tutorials/mining-wit.md)
