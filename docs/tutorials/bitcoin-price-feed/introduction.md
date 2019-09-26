# Basic Witnet tutorial: how to create a decentralized Bitcoin price feed on Ethereum with Solidity and Witnet

## What and why

In this example we will:

- Query **two different APIs** for the USD price of a bitcoin using **4
  witnessing nodes** from Witnet.
- Tell those nodes to **aggregate** the values from both APIs and report
  the result.
- Define how to **tally** the results reported by the different nodes
  into **a single data point** that can be trustlessly consumed by an
  Ethereum smart contract.

## How decentralized will the price feed be

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


[pricefeed]: https://github.com/witnet/truffle-examples-pricefeed
[create-project]: ../create-project
