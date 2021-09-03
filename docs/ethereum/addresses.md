# Witnet Addresses on Ethereum

Ethereum smart contracts can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the
[witnet-ethereum-bridge] Solidity library.

The most convenient way to use the [witnet-ethereum-bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet byte code and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here. 

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in [witnet-ethereum-bridge].

## Mainnet

### Main contracts
* CBOR: [`0x1D9c4a8f8B7b5F9B8e2641D81927f8F8Cc7fF079`](https://etherscan.io/address/0x1D9c4a8f8B7b5F9B8e2641D81927f8F8Cc7fF079)
* Witnet: [`0x916aC9636F4Ea9f54f07c9De8fDCd828e1b32c9B`](https://etherscan.io/address/0x916aC9636F4Ea9f54f07c9De8fDCd828e1b32c9B)
* WitnetRequestBoard: [`0xd653fbd7c736838289262F0F41A458f35393C88a`](https://etherscan.io/address/0xd653fbd7c736838289262F0F41A458f35393C88a)
* WitnetRequestBoardProxy: [`0x400DbF3645b345823124aaB22D04013A46D9ceD5`](https://etherscan.io/address/0x400DbF3645b345823124aaB22D04013A46D9ceD5)

### Public price feeds
* EthUsdPriceFeed: [`0x1ebD93231a7fE551E1d6405404Df34909eff4c2C`](https://etherscan.io/address/0x1ebD93231a7fE551E1d6405404Df34909eff4c2C)
* BtcUsdPriceFeed: [`0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9`](https://etherscan.io/address/0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9)

!!! warning
    These addresses may change soon as the latest version of the Witnet bridge is deployed on Ethereum mainnet in the
    coming days.

## Rinkeby

### Main contracts
* WitnetProxy: [`0x6cE42a35C61ccfb42907EEE57eDF14Bb69C7fEF4`](https://rinkeby.etherscan.io/address/0x6cE42a35C61ccfb42907EEE57eDF14Bb69C7fEF4#code)
* WitnetRequestBoard: [`0xA15D02007f979108653B43089ee25cF653CF8B22`](https://rinkeby.etherscan.io/address/0xA15D02007f979108653B43089ee25cF653CF8B22#code)
* WitnetDecoderLib: [`0x87312848B4d67A9545e563c75fb5C54CA364Fcef`](https://rinkeby.etherscan.io/address/0x87312848B4d67A9545e563c75fb5C54CA364Fcef#code)
* WitnetParserLib: [`0x14b5cAC222d55Cb11CC9fE5Fbf6793177B3048F6`](https://rinkeby.etherscan.io/address/0x14b5cAC222d55Cb11CC9fE5Fbf6793177B3048F6#code)

### Public price feeds
* EthUsdPriceFeed: [`0x1320C130Fc5361ced969Ca737d692a30e1142a13`](https://rinkeby.etherscan.io/address/0x1320C130Fc5361ced969Ca737d692a30e1142a13#code)
* BtcUsdPriceFeed: [`0xa7C971149AdfdFB237A0F78D7d317B916FFCE093`](https://rinkeby.etherscan.io/address/0xa7C971149AdfdFB237A0F78D7d317B916FFCE093#code)

## Goerli

### Main contracts
* WitnetProxy: [`0xb58D05247d16b3F1BD6B59c52f7f61fFef02BeC8`](https://goerli.etherscan.io/address/0xb58D05247d16b3F1BD6B59c52f7f61fFef02BeC8#code)
* WitnetRequestBoard: [`0x035B8CE1e6ec21A8BfEfa82635A01BF2A172E3E0`](https://goerli.etherscan.io/address/0x035B8CE1e6ec21A8BfEfa82635A01BF2A172E3E0#code)
* WitnetDecoderLib: [`0x8b90dDB14ce8604df484e9a37B996719881439BC`](https://goerli.etherscan.io/address/0x8b90dDB14ce8604df484e9a37B996719881439BC#code)
* WitnetParserLib: [`0x46cF0c52f7B2e76F1E95fe163B98F92413f1d5A4`](https://goerli.etherscan.io/address/0x46cF0c52f7B2e76F1E95fe163B98F92413f1d5A4#code)

### Public price feeds
* EthUsdPriceFeed: [`0x031699240f710B47e92Df7766C06ee6C22A75df1`](https://goerli.etherscan.io/address/0x031699240f710B47e92Df7766C06ee6C22A75df1#code)
* BtcUsdPriceFeed: [`0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c`](https://goerli.etherscan.io/address/0x43Fe8778389f4EB98e82B750DCCAfF0D7d57778c#code)

## Kovan

### Main contracts
* CBOR: [`0xB4B2E2e00e9d6E5490d55623E4F403EC84c6D33f`](https://kovan.etherscan.io/address/0xB4B2E2e00e9d6E5490d55623E4F403EC84c6D33f#contracts)
* Witnet: [`0xD9465D38f50f364b3263Cb219e58d4dB2D584530`](https://kovan.etherscan.io/address/0xD9465D38f50f364b3263Cb219e58d4dB2D584530#contracts)
* WitnetRequestBoard: [`0x7D8A488BACB56dA2De17628e26a21fFd97792b81`](https://kovan.etherscan.io/address/0x7D8A488BACB56dA2De17628e26a21fFd97792b81#contracts)
* WitnetRequestBoardProxy: [`0xD9a6d1Ea0d0f4795985725C7Bd40C31a667c033d`](https://kovan.etherscan.io/address/0xD9a6d1Ea0d0f4795985725C7Bd40C31a667c033d#contracts)

### Public price feeds
* EthUsdPriceFeed: [`0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8`](https://kovan.etherscan.io/address/0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8#contracts)
* BtcUsdPriceFeed: [`0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E`](https://kovan.etherscan.io/address/0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E#contracts)

!!! warning
    The contracts currently deployed on Kovan belong to an older version of the Witnet bridge and we cannot guarantee
    their liveness or update period. They will be upgraded soon, but in the meantime, please use some other Ethereum 
    testnet (`rinkeby` or `goerli`).

[witnet-ethereum-bridge]: https://github.com/witnet/witnet-ethereum-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
