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

```bash
docker run -d \
    --volume ~/.witnet:/.witnet \
    --name witnet_node \
    --publish 21337:21337 \
    witnet/witnet-rust
```

### How to execute CLI commands on the running node

With your node running, you can execute CLI commands with this simple
one-liner. Using the CLI example below, you can find out how many "satowits" your node has mined:

```bash
docker exec witnet_node ./witnet node getBalance
```

The node operators docs contain a [quick cheatsheet listing all the
supported CLI commands][CLI].


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
enable to compose data requests and RADON scripts visually. In the meantime, or you can play around with [this community-built request editor][witnet.tools].

## Customize configuration

A custom `witnet.toml` file can be used to configure parameters of the node.
Settings like the JSON-RPC server socket address and the directory path of
the database files can be customized. More details and a file example can
be [found here][toml].

The path to the TOML file can be set when starting the node:
```
docker run -d \
    --volume ~/.witnet:/.witnet \
    --volume /path/to/custom/witnet.toml:/witnet.toml \
    --name witnet_node \
    --publish 21337:21337 \
    witnet/witnet-rust
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
