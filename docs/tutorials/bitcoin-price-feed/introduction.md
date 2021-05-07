# Basic Witnet tutorial: how to create a decentralized Bitcoin price feed on Ethereum with Solidity and Witnet

## What and why?

In this tutorial you will:

- Query **two different APIs** for the USD price of 1 bitcoin using **50
  witnessing nodes** from Witnet.
- Tell those nodes to **aggregate** the values from both APIs and report
  the result.
- Define how to **tally** the results reported by the different nodes
  into **a single data point** that can be trustlessly consumed by an
  Ethereum smart contract.
- **Write a Solidity contract** that keeps the bitcoin price in a public
  variable and handles updates using Witnet.
- Compile and deploy the entire flow into a local Ethereum network.

!!! tip ""
    Remember: using Witnet from Ethereum is particularly convenient because
    you do not need to own or pay any wit tokens: you pay the bridge
    nodes using ETH and then they spend their own wit tokens when  
    posting your requests into Witnet in your behalf. 

## How decentralized will this price feed be?

None of the parties involved in the process of deploying, updating and
using the price feed will have any power to tamper with the integrity of
the data points it provides:

- Once deployed, **no one will be able to prevent the price feed from
  being updated or queried**.
- **Nobody can set the price directly**. The only way to update it is
  through a Witnet request.
- The price is averaged from two different public APIs, thus mitigating
  their influence in the final price.
- The data is relayed by 4 different Witnet nodes, whose reported data
  points are aggregated and averaged, filtering out any outliers so as
  to cancel any malicious reporter who may try to leverage a slight
  drift of the data point.

## What will the code look like?

The final result of this tutorial is available in
[this GitHub repository][pricefeed]. You can also check it out with
Truffle:

```console
mkdir PriceFeed
cd PriceFeed
truffle unbox stampery-labs/witnet-pricefeed-example
```

## Ready to start? 

Let's begin by [creating a new Witnet-enabled Solidity
project][create-project].

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[pricefeed]: https://github.com/stampery-labs/witnet-pricefeed-example
[create-project]: /tutorials/bitcoin-price-feed/create-project
