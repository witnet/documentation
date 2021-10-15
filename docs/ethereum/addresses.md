# Witnet Addresses on Ethereum networks

Ethereum smart contracts can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the [Witnet Solidity Bridge] library.

The most convenient way to use the [Witnet Solidity Bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet bytecode and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here. 

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in the [Witnet Solidity Bridge].

## Witnet-provided addresses (verified)

| Contract | Mainnet | Goerli | Rinkeby |
| :------- | :------ | :----- | :------ | 
| **WitnetRequestBoard** | [`0x9E4fae1c7ac543a81E4E2a5486a0dDaad8194bdA`](https://etherscan.io/address/0x9E4fae1c7ac543a81E4E2a5486a0dDaad8194bdA) | [`0xb58D05247d16b3F1BD6B59c52f7f61fFef02BeC8`](https://goerli.etherscan.io/address/0xb58D05247d16b3F1BD6B59c52f7f61fFef02BeC8#code) | [`0x6cE42a35C61ccfb42907EEE57eDF14Bb69C7fEF4`](https://rinkeby.etherscan.io/address/0x6cE42a35C61ccfb42907EEE57eDF14Bb69C7fEF4#code)
| **WitnetParserLib** | [`0xfAB822EcFEdC440D505F731e78786C4a6b39B553`](https://etherscan.io/address/0xfAB822EcFEdC440D505F731e78786C4a6b39B553) | [`0x7fbFAA0cA6B098e234135a9D813f735762fEF601`](https://goerli.etherscan.io/address/0x7fbFAA0cA6B098e234135a9D813f735762fEF601#code) | [`0x2E499f44d2977945d52B7BD7834B2C5195d9CE84`](https://rinkeby.etherscan.io/address/0x2E499f44d2977945d52B7BD7834B2C5195d9CE84#code)
| **BtcUsdPriceFeed** | [`0x4250a9d579E42588A8fFEd02e1a078A3BF767e8d`](https://etherscan.io/address/0x4250a9d579E42588A8fFEd02e1a078A3BF767e8d) | [`0xcd445329A50EB30e82F349A89D583B2Cb516F18f`](https://goerli.etherscan.io/address/0xcd445329A50EB30e82F349A89D583B2Cb516F18f#code) | [`0xccAe308C9b91a3e3De8E0Dd4136Ce0Bb608e6ea4`](https://rinkeby.etherscan.io/address/0xccAe308C9b91a3e3De8E0Dd4136Ce0Bb608e6ea4#code)
| **EthUsdPriceFeed** | [`0x11C073F17f018Bc1B372c7283fDe0608003823D5`](https://etherscan.io/address/0x11C073F17f018Bc1B372c7283fDe0608003823D5) | [`0x7D72Bd8F6c9D06Ae6D3Fd4B1aE0CAdab732959a7`](https://goerli.etherscan.io/address/0x7D72Bd8F6c9D06Ae6D3Fd4B1aE0CAdab732959a7#code) | [`0x4566CaD4e76575f85fA423EF46080Afe353f7A05`](https://rinkeby.etherscan.io/address/0x4566CaD4e76575f85fA423EF46080Afe353f7A05#code)

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
