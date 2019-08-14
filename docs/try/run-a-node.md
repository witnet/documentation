# Running a Node in the Witnet Testnet

The Witnet testnet is open for anyone to join and test it by running
their own full node. Running a node on the Witnet mainnet is not
possible before the mainnet is released. Check out the [roadmap] and
save the dates!

!!! tip
    You do not need to run a Witnet node to use Witnet from your
    Ethereum smart contracts. __If you are a smart contracts developer,
    what you probably want is to [use Witnet from Solidity][ethereum]__.
    
## Using Docker

The most convenient method for running a Witnet node is through the
`witnet/witnet-rust` Docker image.

This docker image downloads and runs a witnet-rust node in the latest
testnet in just a matter on seconds.

If that's exactly what you want, you can just run this and enjoy:

```bash
docker run -it witnet/witnet-rust latest node server
```

### How to enable persistence

Be careful though, as running the image without mounting any volumes
may cause total loss of data (including private keys and thus any mined
wits). Luckily, enabling persistence is super easy:

```bash
docker run \
    -v ~/.witnet-rust-testnet-3:/.witnet-rust-testnet-3 \
    -it witnet/witnet-rust latest node server
```

### How to run specific releases
Specific versions or releases can be simply run form the the same image:

```bash
docker run \
    -v ~/.witnet-rust-testnet-3:/.witnet-rust-testnet-3 \
    -it witnet/witnet-rust 0.3.2 node server
```

### How to execute CLI commands on the running node

First you need to get the `CONTAINER ID` or `NAME` of the running node
with:

```bash
docker ps
```

Then, you can run CLI commands on the running node with this simple
one-liner. In this example, it will show the latest blocks in the chain:

```bash
docker exec -i <container_id> ./witnet node blockchain
```

### Debug mode

Debug mode shows more info on what is happening under the hood. It is
activated with the `--debug` flag in the right place:

```bash
docker run -it witnet/witnet-rust latest --debug node server
```

Passing the `RUST_LOG=witnet=debug` environment flag does the same:

```bash
docker run \
    -e RUST_LOG=witnet=debug \
    -it witnet/witnet-rust latest node server
```

[ethereum]: /try/use-from-ethereum
[roadmap]: /community/roadmap