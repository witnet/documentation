# Witnet Addresses on Conflux Network

Conflux smart contracts can send oracle queries (aka _data requests_) to the Witnet decentralized oracle using the
[witnet-ethereum-bridge] Solidity library.

The most convenient way to use the [witnet-ethereum-bridge] library is through the [Witnet Truffle Box], because it
allows writing Witnet data requests using Javascript, which is automatically compiled to Witnet byte code and then
wrapped in a Solidity contract that you can easily import from your own contracts.

The [Witnet Truffle Box] also abstracts away the complexity of having to instantiate or link the Witnet contracts
listed here. 

These addresses are provided for reference, just in case someone prefers not to use the [Witnet Truffle Box] and
rather talk to the Witnet Request Board and other contracts directly using the interfaces in [witnet-ethereum-bridge].

## Conflux Mainnet - Tethys

Witnet is not live yet on Conflux mainnet, but will be deployed soon. Stay tuned!

## Conflux Testnet

### Main contracts
* Witnet: [cfxtest:ace03e0bd2cnkna0e16c769rb6mpb18b46nnfg8mck](https://testnet.confluxscan.io/address/cfxtest:ace03e0bd2cnkna0e16c769rb6mpb18b46nnfg8mck)
* WitnetRequestBoard: [cfxtest:acee21t6kvabde2rzrgmt4wf43nxuxp00anv17p79h](https://testnet.confluxscan.io/address/cfxtest:acee21t6kvabde2rzrgmt4wf43nxuxp00anv17p79h)
* [cfxtest:acctgrbsj2bgnyrcsh8b1zx2yru4wjessjjrmhmpe0](https://testnet.confluxscan.io/address/cfxtest:acctgrbsj2bgnyrcsh8b1zx2yru4wjessjjrmhmpe0)

### Public price feeds
* BtcUsdPriceFeed: [cfxtest:acexkt9t0dm7tzhv9t1znbnc83ehtb703u9pyvd0cd](https://testnet.confluxscan.io/address/cfxtest:acexkt9t0dm7tzhv9t1znbnc83ehtb703u9pyvd0cd)
* EthUsdPriceFeed: [cfxtest:achf22mnyxrkt4bd4xb9b1fufwdw3bhg2pe445me8s](https://testnet.confluxscan.io/address/cfxtest:achf22mnyxrkt4bd4xb9b1fufwdw3bhg2pe445me8s)

[witnet-ethereum-bridge]: https://github.com/witnet/witnet-ethereum-bridge
[Witnet Truffle Box]: /try/use-from-ethereum