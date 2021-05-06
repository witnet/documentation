# Running a Node in the Witnet Mainnet

The Witnet Mainnet is open for anyone to join and and run their own full node.

!!! tip ""
    You do not need to run a Witnet node to use Witnet from your
    Ethereum smart contracts. __If you are a smart contracts developer,
    what you probably want is to
    [connect your Ethereum contracts to external APIs using Witnet][ethereum]__.
    
## Hardware requirements

Hardware requirements are [listed in the node operators docs][hardware-requirements].

## Up and running in 1 minute, using Docker

The most convenient method for running a Witnet node is through the
`witnet/witnet-rust` Docker image. For alternate installation methods or
more complex setups, take a look at the [docker-compose] and [systemd] integrations.

Firstly, you need to [install Docker][docker] on the device you will
be running the node from. Note: some GNU/Linux distributions require some
[extra steps][docker-extra-steps] to get Docker up and running.   

The Witnet docker image downloads and runs a Witnet node in in just a matter on seconds.
To start a node, use:

=== "Multiline"
    ```console
    docker run -d \
        --name witnet_node \
        --volume ~/.witnet:/.witnet \
        --publish 21337:21337 \
        --restart always \
        witnet/witnet-rust
    ```
=== "One-liner"
    ```console
    docker run -d --name witnet_node --volume ~/.witnet:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
    ```

!!! warning "Raspberry Pi users"
    For some reason, Docker on Raspbian for all Raspberry models requires your containers to operate
    in privileged mode. When running the command above, simply add the `--privileged` flag:
    ```console
    docker run -d --privileged --name witnet_node --volume ~/.witnet:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
    ```

## Now what?

There are two **important** things you should do now to make the most of
your Witnet node:

1. [Open ports](#open-your-ports) as explained below.
2. Follow the [Next Steps][next] guide to learn how to check the node
 status, progress and statistics. 

## Open your ports!

The best way to contribute to the growth and sustainability of the
Witnet network is by **opening up the listening port of your node**, 
so that other nodes in the network can download block chain data from
you and **your transactions can be broadcasted more quickly**.

For this feature to be effective, you will also need your IP address to
be public (and ideally, static). If you are operating a node in your home
network, you can request your ISP to assign you a static IP address or at
least disable [CGN] on it.

Depending on your setup, this will normally imply changing the settings
on your router or firewall so as to **forward all incoming connections
to port `21337` from your external IP** into the IP of the device or
interface where the node is running. 

You can find out how to verify that your ports are open in the [Next Steps][next]
guide.

## What about Witnet data requests?

As soon as your node is synced, it will be able to start resolving data
requests from others. You can learn how to produce Witnet requests by
following the [tutorial on how to create a Bitcoin price feed using
Ethereum and Witnet][tutorial]. In addition, we will be soon releasing a
user-friendly editor in the [Sheikah desktop app][Sheikah] that will
enable to compose data requests and RADON scripts visually. In the meantime,
you can play around with [this community-built request editor][witnet.tools].

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
[docker-compose]: /node-operators/docker-compose-service
[systemd]: /node-operators/systemd-service
[docker]: https://docs.docker.com/get-docker/
[next]: /try/next-steps/