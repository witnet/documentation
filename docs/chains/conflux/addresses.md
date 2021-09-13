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

| Contract | Conflux.Testnet | Conflux.Mainnet |
| :------- | :-------------- | :-------------- |
| **WitnetRequestBoard** | [`cfxtest:acfnpy71hjhamy075xyps56124zje5154ux9nte7vt`](https://testnet.confluxscan.io/address/cfxtest:acfnpy71hjhamy075xyps56124zje5154ux9nte7vt) | Stay tuned!
| **WitnetParserLib**  | [`cfxtest:acbez2ctj9dmvuep19uyb88wstzw6k41wyzct8ezh7`](https://testnet.confluxscan.io/address/cfxtest:acbez2ctj9dmvuep19uyb88wstzw6k41wyzct8ezh7) | Stay tuned!
| **CfxUsdtPriceFeed**  | [`cfxtest:ace8bsds7wn52khyk29nebzwfpvz5rppd28kcxetj8`](https://testnet.confluxscan.io/address/cfxtest:ace8bsds7wn52khyk29nebzwfpvz5rppd28kcxetj8) | Stay tuned!
| **BtcUsdPriceFeed**  | [`cfxtest:acg28k0yppzj5gc0dc1gazy6wt34m6ak5j5t12htkn`](https://testnet.confluxscan.io/address/cfxtest:acexkt9t0dm7tzhv9t1znbnc83ehtb703u9pyvd0cd) | Stay tuned!
| **EthUsdPriceFeed** | [`cfxtest:ach8fz1axbh6p000u6xmsxpcfcawumvuyau4ac8tu5`](https://testnet.confluxscan.io/address/cfxtest:achf22mnyxrkt4bd4xb9b1fufwdw3bhg2pe445me8s) | Stay tuned!

[Witnet Solidity Bridge]: https://github.com/witnet/witnet-solidity-bridge
[Witnet Truffle Box]: /try/use-from-ethereum
