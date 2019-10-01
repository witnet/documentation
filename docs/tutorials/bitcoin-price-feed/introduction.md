# Basic Witnet tutorial: how to create a decentralized Bitcoin price feed on Ethereum with Solidity and Witnet

## What and why

In this tutorial you will:

- Query **two different APIs** for the USD price of 1 bitcoin using **4
  witnessing nodes** from Witnet.
- Tell those nodes to **aggregate** the values from both APIs and report
  the result.
- Define how to **tally** the results reported by the different nodes
  into **a single data point** that can be trustlessly consumed by an
  Ethereum smart contract.
- **Write a Solidity contract** that keeps the bitcoin price in a public
  variable and handles updates using Witnet.
- Compile and deploy the entire flow into a local Ethereum network.

## How decentralized will this price feed be

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
  points get aggregated and averaged, filtering out any outliers so as
  to cancel any malicious reporter who may try to leverage a slight
  drift of the data point.

## Show me the code upfront

The final result of this tutorial is available in
[this GitHub repository][pricefeed]. You can also check it out with
Truffle:

```console
mkdir PriceFeed
cd PriceFeed
truffle unbox stampery-labs/witnet-pricefeed-example
```

## Let's do it!

Ready to start? Let's begin by [creating a new Witnet-enabled Solidity
project][create-project].

!!! question "Remember: You are not alone!"
    You are invited to join the [Witnet Community Discord][discord].
    Members of the Witnet community will be happy to answer your
    questions and doubts, as well as assisting you through this
    tutorial.

[discord]: https://discord.gg/X4uurfP
[pricefeed]: https://github.com/stampery-labs/witnet-pricefeed-example
[create-project]: /tutorials/bitcoin-price-feed/create-project
