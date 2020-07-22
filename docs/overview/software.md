# Witnet Software ecosystem

## Witnet-Rust
> [Witnet-Rust] is the first open-source implementation of the Witnet
> protocol and leverages the [Rust][rust] programming language to
> achieve utmost speed, memory safety and fearless concurrency without
> compromising on performance.

Witnet-Rust is experimental software running on experimental network
protocols:

- All the main components are in place—but they need yet to be
battle tested before Mainnet. 
- `Testnet-8` is live. [Here's the roadmap][roadmap] and this is
  [how to run a node][run-a-node].
- The Witnet community is doing its best to make `witnet-rust` rock
solid as soon as possible.
- [Contributions][contributing] are more than welcome.

## Sheikah

[Sheikah][sheikah] is a Witnet-compatible desktop wallet, data requests
and smart contracts development environment.

## Ethereum Bridge

The [Ethereum Bridge][use-from-ethereum] is the component in charge of
relaying data requests from Ethereum into Witnet and then communicating
the results back to the originating contracts.

The bridge is composed of three different pieces of software:

- The `UsingWitnet` Solidity contract that Ethereum developers can
  extend (`contract MyContract is UsingWitnet { ... }`).
- The Witnet Bridge Interface (WBI): an Ethereum contract where data
  requests are publicly posted to.
- The `bridge` component inside [Witnet-Rust], which monitors the WBI
  for new requests and also scans

## Open source libraries

### Verifiable Random Functions (VRFs)

- [vrf-solidity]: fast and effective library for VRFs written in Solidity
- [vrf-rs]: implementation of Elliptic Curve VRFs written in Rust

### Elliptic Curve

- [elliptic-curve-solidity]: implementation of Elliptic Curve arithmetic operations written in Solidity

### Bonneh-Lynn-Shacham (BLS) signatures

- [bls-solidity]: fast and effective library for 256-bit Barreto-Naehrig (BN256) curve operations written in Solidity
- [bls-signatures-rs]: implementation of BLS signatures written in Rust


[roadmap]: /community/roadmap
[run-a-node]: /try/run-a-node
[rust]: https://rust-lang.org
[sheikah]: https://github.com/witnet/sheikah
[use-from-ethereum]: /try/use-from-ethereum
[Witnet-Rust]: https://github.com/witnet/sheikah 
[contributing]: /developer/contributing
[vrf-solidity]: https://github.com/witnet/vrf-solidity
[vrf-rs]: https://github.com/witnet/vrf-rs
[elliptic-curve-solidity]: https://github.com/witnet/elliptic-curve-solidity
[bls-solidity]: https://github.com/witnet/bls-solidity
[bls-signatures-rs]: https://github.com/witnet/bls-signatures-rs
