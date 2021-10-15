# Witnet Addresses on Conflux networks

CELO smart contracts can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the
[Witnet Solidity Bridge] library.

The most convenient way to use the [Witnet Solidity Bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet bytecode and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here.

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in the [Witnet Solidity Bridge].

## Witnet-provided addresses

| Contract | Celo.Alfajores | Celo.Mainnet |
| :------- | :-------------- | :-------------- |
| **WitnetRequestBoard** | [`0xa5243e2a676a2B83fE4250B4bB339c32E8cC1b46`](https://alfajores-blockscout.celo-testnet.org/address/0xa5243e2a676a2B83fE4250B4bB339c32E8cC1b46/contracts) | Stay tuned!
| **WitnetParserLib**  | [`0xfBFdDb3FeC361C6179d2A0deFAFD963735669EaA`](https://testnet.confluxscan.io/address/cfxtest:acbez2ctj9dmvuep19uyb88wstzw6k41wyzct8ezh7) | Stay tuned!
| **BtcUsdPriceFeed**  | [`0x4F8Ac2D45475A1894Cb85E3A21173d5e83041083`](https://alfajores-blockscout.celo-testnet.org/address/0x4F8Ac2D45475A1894Cb85E3A21173d5e83041083/contracts) | Stay tuned!
| **EthUsdPriceFeed** | [`0xD182e334e3c7140F8a520d326E333CA5f1FB7dDa`](https://alfajores-blockscout.celo-testnet.org/address/0xD182e334e3c7140F8a520d326E333CA5f1FB7dDa/contracts) | Stay tuned!

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
