# Welcome to the Witnet ecosystem!

Witnet's mission is to enable a network of computers to act as a 
"decentralized oracle" that retrieves, attests and delivers information
in behalf of smart contracts in a tamper-resistant way.

> This _Decentralized Oracle Network (DON)_ maintains and distributes a
> _block chain_ data structure that serves as a common ledger for the
> operation of the protocol as well as for the _wit_ token, which is
> central for incentivizing the network players to abide by the protocol
> and make them liable for any misbehavior. —
> [Witnet Whitepaper][whitepaper]

Active network participants earn wit tokens for fulfilling the data
retrieval, attestation and delivery tasks coming from different smart
contract platforms such as [Ethereum][ethereum].

## Software ecosystem

### Witnet-rust
> [Witnet-rust][witnet-rust] is the first open-source implementation of
> the Witnet protocol and leverages the [Rust][rust] programming
> language to achieve utmost speed, memory safety and fearless
> concurrency without compromising on performance.

Witnet-Rust is experimental software running on experimental network
protocols:

- All the main components are in place—but they need yet to be
battle tested before mainnet. 
- `Testnet-3` is live. [Here's the roadmap][roadmap] and this is
[how to run a node][run-a-node].
- The Witnet community is doing its best to make `witnet-rust` rock
solid as soon as possible.
- [Contributions][contributing] are more than welcome.

### Sheikah

[Sheikah][sheikah] is a Witnet-compatible desktop wallet, data requests
and smart contracts development environment.

### Ethereum Bridge

The [Ethereum Bridge][use-from-ethereum] is the component in charge of
relaying data requests from Ethereum into Witnet and then communicating
the results back to the originating contracts.

The bridge is actually three different pieces of software:

- The `UsingWitnet` Solidity contract that Ethereum developers can
  extend (`contract MyContract is UsingWitnet { ... }`).
- The Witnet Bridge Interface (WBI): an Ethereum contract where data
  requests are publicly posted to.
- The `bridge` component inside Witnet-Rust, which monitors the WBI for
  new requests and also scans 

## Social ecosystem

### Node operators, a.k.a. *Witnesses*
The Witnet blockchain is free, open, and neutral. That is, everyone is
welcome to run their own node. Every node maintains the history of all
the transactions on the blockchain.

Additionally, every node in the Witnet network can participate in
*witnessing*, i.e. earning wit tokens in exchange of retrieving,
aggregating and delivering data points from public APIs into smart
contracts.

### Developers

The Witnet ecosystem welcomes developers of all kind of backgrounds:
from people who contribute to Witnet-Rust or Sheikah to those who want
to connect their Ethereum smart contracts to external APIs. Developers
can:

- Build Witnet clients.
- Build applications to interact with a Witnet client.
- Write Ethereum smart contracts that use Witnet.
- Contribute to Witnet-Rust or Sheikah.

### Witnet Foundation

[Witnet Foundation][foundation] is the entity currently in charge of
funding the development of Witnet-Rust and Sheikah, as well as fostering
the thriving ecosystem around the Witnet protocol.

[contributing]: community/contributing.md
[ethereum]: https://ethereum.org
[foundation]: https://witnet.foundation
[roadmap]: community/roadmap
[run-a-node]: try/run-a-node.md
[rust]: https://rust-lang.org
[sheikah]: https://github.com/witnet/sheikah
[use-from-ethereum]: try/use
[witnet-rust]: https://github.com/witnet/sheikah 
[whitepaper]: https://witnet.io/static/witnet-whitepaper.pdf
