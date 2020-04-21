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

Starting a node is as easy as it gets:

```bash
docker run -d \
    --volume ~/.witnet:/.witnet \
    --name witnet_node \
    --publish 21337:21337 \
    witnet/witnet-rust
```

### How to execute CLI commands on the running node

Then, you can run CLI commands on the running node with this simple
one-liner. In this example, it will show many "satowits" your has mined
so far:

```bash
docker exec witnet_node ./witnet node getBalance
```

The node operators docs contain a [quick cheatsheet listing all the
supported CLI commands][CLI].


## Open your ports!

The best way to contribute to the growth and sustainability of the
Witnet network is **opening up the listening port of your node** to the
open Internet, so that other nodes in the network can download block
chain data from yours and **your transactions can be broadcast more
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
enable to compose data requests and RADON scripts visually.

[ethereum]: /try/use-from-ethereum
[roadmap]: /community/roadmap
[CLI]: /node-operators/cli
[tutorial]: /tutorials/bitcoin-price-feed/introduction
[Sheikah]: https://github.com/witnet/sheikah
[hardware-requirements]: /node-operators/hardware-requirements
[docker-extra-steps]: https://docs.docker.com/install/linux/linux-postinstall/
[CGN]: https://en.wikipedia.org/wiki/Carrier-grade_NAT
