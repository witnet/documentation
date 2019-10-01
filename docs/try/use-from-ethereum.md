# Using Witnet from Ethereum / Solidity

Using Witnet as an oracle for resolving your Ethereum smart contracts is
really easy thanks to the Witnet [Truffle][truffle] box and the
`UsingWitnet` Solidity library.

## Write your first Witnet-powered Ethereum contract

The Witnet community has put together
[this comprehensive tutorial on how to create a
price feed Ethereum contract using Solidity, Truffle and Witnet][tutorial]
so that you can get started in a matter of minutes.

## How can Ethereum contracts communicate with Witnet?

Witnet is a separate blockchain. However, communication between Ethereum
and Witnet is actually made possible thanks to the Witnet Bridge
Interface and the *bridge nodes*, which are nodes that operate in both
blockchains and get randomly selected for performing the job of relaying
requests and responses back and forth between the two.

This system, which resembles the architecture of a sidechain, is better
described in [this Medium post][bridges].

## Do I need Wit tokens for using Witnet from Ethereum?

**No!** Using Witnet from Ethereum is specially convenient because you
do not need to own or pay any Wit tokens: you pay the bridge nodes using
ETH and then they spend their own Wit tokens when posting your requests
into Witnet in your behalf.

[truffle]: https://www.trufflesuite.com/
[tutorial]: /tutorials/bitcoin-price-feed/introduction
[bridges]: https://medium.com/witnet/ethereum-loves-witnet-9a3fd21e6f5c
