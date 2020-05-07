# Using Witnet from Ethereum / Solidity

Using Witnet as an oracle for resolving your Ethereum smart contracts is
very simple, thanks to the Witnet [Truffle][truffle] box and the
`UsingWitnet` Solidity library.

## Write your first Witnet-powered Ethereum contract

The Witnet community has put together
[this comprehensive tutorial][tutorial] with instructions on how to create a
price feed Ethereum contract using Solidity, Truffle and Witnet
so that anyone can get started in minutes.

## How can Ethereum contracts communicate with Witnet?

Witnet is a separate blockchain. However, communication between Ethereum
and Witnet is enabled via the Witnet Bridge
Interface and the *bridge nodes*; these nodes operate in both
blockchains and get randomly selected to perform the job of relaying
requests and responses back and forth between the chains.

This system, which resembles the architecture of a sidechain, is better
described in [this Medium post][bridges].

## Do I need wit tokens in order to access Witnet from Ethereum?

**No :)** Accessing Witnet from Ethereum requires you to
neither own nor pay any wit tokens; instead, bridge nodes are paid in
ETH, and spend their own wit tokens to post your requests
into Witnet on your behalf.

[truffle]: https://www.trufflesuite.com/
[tutorial]: /tutorials/bitcoin-price-feed/introduction
[bridges]: https://medium.com/witnet/ethereum-loves-witnet-9a3fd21e6f5c
