# Running a Node in the Witnet Testnet

The Witnet testnet is open for anyone to join and test it by running
their own full node. Running a node on the Witnet mainnet is not
possible before the mainnet is released. Check out the [roadmap] and
save the dates!

!!! tip ""
    You do not need to run a Witnet node to use Witnet from your
    Ethereum smart contracts. __If you are a smart contracts developer,
    what you probably want is to
    [connect your Ethereum contracts to external APIs using Witnet][ethereum]__.
    
## Hardware requirements

Hardware requirements are [listed in the node operators docs][hardware-requirements].

## Up and running in 1 minute, using Docker

The most convenient method for running a Witnet node is through the
`witnet/witnet-rust` Docker image.

First off, you need Docker to be installed in the computer where you will
be running the node. Remember that some GNU/Linux distributions require some
[extra steps][docker-extra-steps] for getting Docker to work.   

The Witnet docker image downloads and runs a witnet-rust node in the latest
testnet in just a matter on seconds.

If that's exactly what you want, and you don't care about mining, you can
just run this command and enjoy:

```bash
docker run -it witnet/witnet-rust latest node server
```

However, if you want to preserve the tokens that you may mine, please make
sure you enable persistence as explained below.

### How to enable persistence

Running the image without mounting any volumes may cause total loss of data
(including private keys and thus any mined wits). Luckily, enabling
persistence is super easy:

```bash
docker run \
    -v ~/.witnet-rust-testnet-6:/.witnet-rust-testnet-6 \
    -it witnet/witnet-rust latest node server
```

### How to execute CLI commands on the running node

First you need to get the `CONTAINER ID` or `NAME` of the running node
with:

```bash
docker ps
```

Then, you can run CLI commands on the running node with this simple
one-liner. In this example, it will show many "satowits" your has mined
so far:

```bash
docker exec -i <container_id> ./witnet node getBalance
```

The node operators docs contain a [quick cheatsheet listing all the
supported CLI commands][CLI].


## Open your ports!

The best way to contribute to the growth and sustainability of the
Witnet network is **opening up the listening port of your node** to the
open Internet, so that other nodes in the network can download block
chain data from yours and **your transactions can be broadcast more
quickly**.

Depending on your setup, this will normally imply changing the settings
on your router or firewall so as to **forward all incoming connections
to port `21337` from your external IP** into the IP of the device or
interface where the node is running. In some cases, you may also have to
run the Docker image with `docker run --network=host` so as to allow
`witnet-rust` to bind to the IP of the host.

## What about Witnet data requests?

As soon as your node is synced, it will be able to start resolving data
requests from others. You can learn how to produce Witnet requests by
following the [tutorial on how to create a Bitcoin price feed using
Ethereum and Witnet][tutorial]. In addition, we will be soon releasing a
user-friendly editor in the [Sheikah desktop app][Sheikah] that will
enable to compose data requests and RADON scripts visually.

[ethereum]: /try/use-from-ethereum
[roadmap]: /community/roadmap
[CLI]: /node-operators/cli
[tutorial]: /tutorials/bitcoin-price-feed/introduction
[Sheikah]: https://github.com/aesedepece/sheikah
[hardware-requirements]: /node-operators/hardware-requirements
[docker-extra-steps]: https://docs.docker.com/install/linux/linux-postinstall/
