# Witnet Addresses on Conflux networks

Conflux smart contracts can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the
[Witnet Solidity Bridge] library.

The most convenient way to use the [Witnet Solidity Bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet bytecode and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here.

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in the [Witnet Solidity Bridge].

## Witnet-provided addresses

| Contract | Conflux.Testnet | Conflux.Tethys |
| :------- | :-------------- | :-------------- |
| **WitnetRequestBoard** | [`cfxtest:acfnpy71hjhamy075xyps56124zje5154ux9nte7vt`](https://testnet.confluxscan.io/address/cfxtest:acfnpy71hjhamy075xyps56124zje5154ux9nte7vt) | [`cfx:accpscf948r53a7ru7k7zppff59k432w3uxv8ahfsh`](https://confluxscan.io/address/cfx:accpscf948r53a7ru7k7zppff59k432w3uxv8ahfsh)
| **WitnetParserLib**  | [`cfxtest:acbez2ctj9dmvuep19uyb88wstzw6k41wyzct8ezh7`](https://testnet.confluxscan.io/address/cfxtest:acbez2ctj9dmvuep19uyb88wstzw6k41wyzct8ezh7) | [`cfx:acce01z1j9zs5vv9hxwf717hcanxb239degecah33c`](https://confluxscan.io/address/cfx:acce01z1j9zs5vv9hxwf717hcanxb239degecah33c)
| **BtcUsdPriceFeed**  | [`cfxtest:acc3kr4gjzwe04w952mzw9k45um6s6yeyehfrumbjg`](https://testnet.confluxscan.io/address/cfxtest:acc3kr4gjzwe04w952mzw9k45um6s6yeyehfrumbjg) | [`cfx:accseyfygp5zcm2ezkmex27bn85vnr6svakcrh5szz`](https://confluxscan.io/address/cfx:accseyfygp5zcm2ezkmex27bn85vnr6svakcrh5szz)
| **CfxUsdtPriceFeed**  | [`cfxtest:aca6264crfcp2fr8emv7twawfa1gr60gvenht8s02u`](https://testnet.confluxscan.io/address/cfxtest:aca6264crfcp2fr8emv7twawfa1gr60gvenht8s02u) | [`cfx:acdsxkx6wkczz8xwnxab0jb06v8rk1p3fe62ga6gzd`](https://confluxscan.io/address/cfx:acdsxkx6wkczz8xwnxab0jb06v8rk1p3fe62ga6gzd)
| **EthUsdPriceFeed** | [`cfxtest:acar99f7x8wjmy953gfmtuu7mc1es7k6ve2u7sfbjz`](https://testnet.confluxscan.io/address/cfxtest:acar99f7x8wjmy953gfmtuu7mc1es7k6ve2u7sfbjz) | [`cfx:ach7cc0ywe86d6aexrdn95p9a2tbac585e9nt8m5c9`](https://confluxscan.io/address/cfx:ach7cc0ywe86d6aexrdn95p9a2tbac585e9nt8m5c9)

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
