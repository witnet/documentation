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
| **WitnetRequestBoard** | [`0xA2F4f5290F9cfD3a17Cfa82f2a2fD3E5c05d1442`](https://blockexplorer.rinkeby.boba.network/address/0xA2F4f5290F9cfD3a17Cfa82f2a2fD3E5c05d1442/contracts) | Stay tuned!
| **WitnetParserLib**  | [`0xdF4Df677F645Fe603a883Ad3f2Db03EDFDd75F5C`](https://blockexplorer.rinkeby.boba.network/address/0xdF4Df677F645Fe603a883Ad3f2Db03EDFDd75F5C/contracts) | Stay tuned!
| **OmgBtcPriceFeed**  | [`0x78C2dEb1A416508fB4B20A000cfD9d9673371e00`](https://blockexplorer.rinkeby.boba.network/address/0x78C2dEb1A416508fB4B20A000cfD9d9673371e00/contracts) | Stay tuned!
| **OmgEthPriceFeed**  | [`0x6be8bb17C07453d217cd1BADBa3E55A627DcdD2A`](https://blockexplorer.rinkeby.boba.network/address/0x6be8bb17C07453d217cd1BADBa3E55A627DcdD2A/contracts) | Stay tuned!
| **OmgUsdtPriceFeed** | [`0x758C5adBFC25E260C07535933874e98583A14d41`](https://blockexplorer.rinkeby.boba.network/address/0x758C5adBFC25E260C07535933874e98583A14d41/contracts) | Stay tuned!

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
