# Witnet Addresses on BOBA Layer 2 networks

Smart contracts deployed into Boba's Layer-2 OVM can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the [Witnet Solidity Bridge] library.

The most convenient way to use the [Witnet Solidity Bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet bytecode and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here. 

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in the [Witnet Solidity Bridge].

## Witnet-provided addresses (verified)

| Contract | BOBA.Rinkeby | BOBA.Mainnet |
| :------- | :----------- | :----------- |
| **WitnetRequestBoard** | Stay tuned! | Stay tuned!
| **WitnetParserLib**  | Stay tuned!| Stay tuned!
| **OmgBtcPriceFeed**  | Stay tuned! | Stay tuned!
| **OmgEthPriceFeed**  | Stay tuned! | Stay tuned!
| **OmgUsdtPriceFeed** | Stay tuned! | Stay tuned!

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
