# Running a Node in the Witnet Testnet

The Witnet Testnet is open for anyone to join and test it by running
their own full node. Running a node on the Witnet Mainnet is not
possible before Mainnet is launched. 

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

Firstly, you need to install Docker on the device you will
be running the node from. Note: some GNU/Linux distributions require some
[extra steps][docker-extra-steps] to get Docker up and running.   

The Witnet docker image downloads and runs a witnet-rust node in the latest
Testnet in just a matter on seconds.

To start a node, use:

```console tab="Multiline"
docker run -d \
    --name witnet_node \
    --volume ~/.witnet:/.witnet \
    --publish 21337:21337 \
    --restart always \
    witnet/witnet-rust
```

```console tab="One-liner"
docker run -d --name witnet_node --volume ~/.witnet:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
```

## Now what?

As soon as the `witnet_node` container is up, it will do the following things in order:

1. Try to **open connections to other nodes** in the network. It needs 8 "outbound" connections. This should take from several seconds to a few minutes.
2. Discover what is the **tip of the block chain**, and **download all the blocks** from that chain. This can take from several minutes to several hours. The synchronization time depends heavily on how long the block chain is, but also on your Internet bandwidth, CPU speed, memory size and speed, and storage drive write throughput.
3. Go into **_Live_ status**. In Live status, your node will **validate transactions and blocks** in real time, and it will try itself to **propose block candidates**. Getting your first block proposal accepted by the network is not easy, and can take from a few minutes up to 48 hours (or more!) due to the probabilistic nature of the [cryptographic sortition] algorithm that rules the system.
4. While in Live status, your node will also try to participate in **resolving _data requests_**. As with minting blocks, being assigned a request for the first time can take some time: from several minutes up to 48 hours (or more!). Once you have resolved at least one request, your node will earn reputation and it will start getting assignments more often.

## How to interact with your node

You can check if your node is doing well at any time through the node's own command line interface (CLI).
Using the CLI example below, you can find out how many _[nanowits]_ your node has minted:

```bash
docker exec witnet_node ./witnet node getBalance
```

The node operators docs contain a [quick cheatsheet listing all the
supported CLI commands][CLI].

!!! tip "" 
    Do not worry if your balance is 0 for the first hours or days!
    That is perfectly normal. Getting your first block proposal accepted
    by the network can take quite a while. As your node proves some
    reliability over time, it will mint blocks more often.

## Open your ports!

The best way to contribute to the growth and sustainability of the
Witnet network is by **opening up the listening port of your node**, 
so that other nodes in the network can download block
chain data from you and **your transactions can be broadcasted more
quickly**.

For this feature to be effective, you will also need your IP address to
be static and public. If you are operating a node in your home network,
you can request your ISP to assign you a static IP address and disable
[CGN] on it.

Depending on your setup, this will normally imply changing the settings
on your router or firewall so as to **forward all incoming connections
to port `21337` from your external IP** into the IP of the device or
interface where the node is running. 

To check if the port is correctly opened, you can telnet your external
IP with `telnet "IP" 21337` from the Internet. You should see an incoming
connection on the logs for which the handshake timeouts.

## What about Witnet data requests?

As soon as your node is synced, it will be able to start resolving data
requests from others. You can learn how to produce Witnet requests by
following the [tutorial on how to create a Bitcoin price feed using
Ethereum and Witnet][tutorial]. In addition, we will be soon releasing a
user-friendly editor in the [Sheikah desktop app][Sheikah] that will
enable to compose data requests and RADON scripts visually. In the meantime,
you can play around with [this community-built request editor][witnet.tools].

## Customize configuration

A custom `witnet.toml` file can be used to configure parameters of the node.
Settings like the JSON-RPC server socket address and the directory path of
the database files can be customized. More details and a file example can
be [found here][toml].

The path to the TOML file can be set when starting the node (please remember
to replace the path in the example):

```console tab="Multiline"
docker run -d \
    --name witnet_node \
    --volume ~/.witnet:/.witnet \
    --volume /path/to/custom/witnet.toml:/witnet.toml \
    --publish 21337:21337 \
    --restart always \
    witnet/witnet-rust
```

```console tab="One-liner"
docker run -d --name witnet_node --volume ~/.witnet:/.witnet --volume /path/to/custom/witnet.toml:/witnet.toml --publish 21337:21337 --restart always witnet/witnet-rust
```

[ethereum]: /try/use-from-ethereum
[roadmap]: /community/roadmap
[CLI]: /node-operators/cli
[tutorial]: /tutorials/bitcoin-price-feed/introduction
[Sheikah]: https://github.com/witnet/sheikah
[hardware-requirements]: /node-operators/hardware-requirements
[docker-extra-steps]: https://docs.docker.com/install/linux/linux-postinstall/
[CGN]: https://en.wikipedia.org/wiki/Carrier-grade_NAT
[toml]: https://github.com/witnet/witnet-rust/blob/master/docs/configuration/toml-file.md
[witnet.tools]: https://witnet.tools/tools/ide
[nanowits]: /overview/glossary
[cryptographic sortition]: https://medium.com/witnet/cryptographic-sortition-in-blockchains-the-importance-of-vrfs-ad5c20a4e018