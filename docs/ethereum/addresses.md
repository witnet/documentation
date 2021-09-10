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
| **WitnetRequestBoard** | [`0x400DbF3645b345823124aaB22D04013A46D9ceD5`](https://etherscan.io/address/0x400DbF3645b345823124aaB22D04013A46D9ceD5) | [`0xb58D05247d16b3F1BD6B59c52f7f61fFef02BeC8`](https://goerli.etherscan.io/address/0xb58D05247d16b3F1BD6B59c52f7f61fFef02BeC8#code) | [`0x6cE42a35C61ccfb42907EEE57eDF14Bb69C7fEF4`](https://rinkeby.etherscan.io/address/0x6cE42a35C61ccfb42907EEE57eDF14Bb69C7fEF4#code)
| **WitnetParserLib** | [`0x916aC9636F4Ea9f54f07c9De8fDCd828e1b32c9B`](https://etherscan.io/address/0x916aC9636F4Ea9f54f07c9De8fDCd828e1b32c9B) | [`0x46cF0c52f7B2e76F1E95fe163B98F92413f1d5A4`](https://goerli.etherscan.io/address/0x46cF0c52f7B2e76F1E95fe163B98F92413f1d5A4#code) | [`0x14b5cAC222d55Cb11CC9fE5Fbf6793177B3048F6`](https://rinkeby.etherscan.io/address/0x14b5cAC222d55Cb11CC9fE5Fbf6793177B3048F6#code)
| **BtcUsdPriceFeed** | [`0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9`](https://etherscan.io/address/0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9) | [`0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c`](https://goerli.etherscan.io/address/0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c#code) | [`0xa7C971149AdfdFB237A0F78D7d317B916FFCE093`](https://rinkeby.etherscan.io/address/0xa7C971149AdfdFB237A0F78D7d317B916FFCE093#code)
| **EthUsdPriceFeed** | [`0x1ebD93231a7fE551E1d6405404Df34909eff4c2C`](https://etherscan.io/address/0x1ebD93231a7fE551E1d6405404Df34909eff4c2C) | [`0x031699240f710B47e92Df7766C06ee6C22A75df1`](https://goerli.etherscan.io/address/0x031699240f710B47e92Df7766C06ee6C22A75df1#code) | [`0x1320C130Fc5361ced969Ca737d692a30e1142a13`](https://rinkeby.etherscan.io/address/0x1320C130Fc5361ced969Ca737d692a30e1142a13#code)

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
