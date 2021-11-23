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
| **WitnetRequestBoard** | [`0x58D8ECe142c60f5707594a7C1D90e46eAE5AF431`](https://blockexplorer.rinkeby.boba.network/address/0x58D8ECe142c60f5707594a7C1D90e46eAE5AF431) | Stay tuned!
| **WitnetParserLib**  | [`0x7D8A488BACB56dA2De17628e26a21fFd97792b81`](https://blockexplorer.rinkeby.boba.network/address/0x7D8A488BACB56dA2De17628e26a21fFd97792b81)| Stay tuned!
| **BtcUsdPriceFeed**  | [`0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0`](https://blockexplorer.rinkeby.boba.network/address/0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0) | Stay tuned!
| **EthUsdPriceFeed**  | [`0xD9465D38f50f364b3263Cb219e58d4dB2D584530`](https://blockexplorer.rinkeby.boba.network/address/0xD9465D38f50f364b3263Cb219e58d4dB2D584530) | Stay tuned!
| **OmgBtcPriceFeed**  | [`0x56834Ff8D4b27db647Da97CA3bd8540f7fA0e89D`](https://blockexplorer.rinkeby.boba.network/address/0x56834Ff8D4b27db647Da97CA3bd8540f7fA0e89D)| Stay tuned!
| **OmgEthPriceFeed**  | [`0x225BAd150B9D5202DC805B34A0DF64B1a77459dF`](https://blockexplorer.rinkeby.boba.network/address/0x225BAd150B9D5202DC805B34A0DF64B1a77459dF)| Stay tuned!
| **OmgUsdtPriceFeed** | [`0xE2Efa3fe66352e63F118bB9165435C5BEDB777d0`](https://blockexplorer.rinkeby.boba.network/address/0xE2Efa3fe66352e63F118bB9165435C5BEDB777d0)| Stay tuned!

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
