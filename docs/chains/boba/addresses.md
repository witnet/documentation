# Witnet Addresses on BOBA networks

Smart contracts deployed into Boba's Layer-2 OVM can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the [Witnet Solidity Bridge] library.

The most convenient way to use the [Witnet Solidity Bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet bytecode and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here. 

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in the [Witnet Solidity Bridge].

## BOBA Mainnet

Witnet is not live yet on BOBA mainnet, but will be deployed soon. Stay tuned!

## BOBA Rinkeby

### Witnet entrypoint addresses
* WitnetRequestBoard: [``]()
* WitnetParserLib: [``]()

### Published Price Feed contracts
* OMG/BTC: [``]()
* OMG/ETH: [``]()
* OMG/USDT: [``]()
* BTC/USD: [``]()
* ETH/USD: [``]()

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
