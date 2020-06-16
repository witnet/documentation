# I got my Witnet node running. What's next?

## The first minutes and hours in your node's life

As soon as the `witnet_node` container is up, it will do the following things in order:

1. Try to **open connections to other nodes** in the network. It needs 8 "outbound" connections. This should take from several seconds to a few minutes.
2. Discover what is the **tip of the block chain**, and **download all the blocks** from that chain. This can take from several minutes to several hours. The synchronization time depends heavily on how long the block chain is, but also on your Internet bandwidth, CPU speed, memory size and speed, and storage drive write throughput.
3. Go into **_Synced_ status**. In Synced status, your node will **validate transactions and blocks** in real time, and it will try itself to **propose block candidates** and participate in **resolving _data requests_**.

## What to expect from your node's balance and reputation

- Getting your first block proposal accepted by the network and minting your first wit tokens is not easy, and can take from a few minutes up to 48 hours (or more!) due to the probabilistic nature of the [cryptographic sortition] algorithm that rules the system.
- As with minting blocks, being assigned a request for the first time can take some time: from several minutes up to 48 hours (or more!). Once you have resolved at least one request, your node will earn reputation and it will start getting assignments more often.

!!! warning "Don't panic"
    Note that it is **perfectly normal** for a node to show 0 "balance", "reputation", "blocks included" or "accepted commits" for the first days of it being up.
    Please be patient, new identities in the system are subject to a slow start for critical security reasons.

## Monitoring your node's progress

Here are some useful commands that you can use to keep track of how your node is performing in the network.
A complete documentation of all the CLI methods is available in the [node operator docs][CLI]. 

### nodeStats 

```console tab="Docker"
docker exec  witnet_node witnet node nodeStats
```

```console tab="Cargo"
cargo run --release -- node nodeStats
```

```console tab="Binary"
witnet node nodeStats
```

Among other information, this shows counters for proposed and accepted blocks and participations in resolving data requests ("commitments"):

### balance

```console tab="Docker"
docker exec witnet_node witnet node balance
```

```console tab="Cargo"
cargo run --release -- node balance
```

```console tab="Binary"
witnet node balance
```

The `balance` command will print your node's current balance.

### reputation

```console tab="Docker"
docker exec witnet_node witnet node reputation
```

```console tab="Cargo"
cargo run --release -- node reputation
```

```console tab="Binary"
witnet node reputation
```

The `reputation` command will print your node's current reputation score.

!!! tip "Reputation is tricky"
    Despite its name, the *reputation* metric that exists in the Witnet protocol is not as vital as reputation is in real life.
    The reputation score of a node gives a rough idea about its performance, but it is heavily influenced by randomness and luck.
    It is perfectly normal that the reputation score goes up and down over time, sometimes smoothly, sometimes more abruptly.
    Do not get too obsessed about it!
    
## Check ports and incoming connections

To check if the listening port is correctly opened to the Internet, you can use
a [port forwarding testing][port-test] tool or try to open a connection to
your public IP from a device that is not in the same network as your node:

```sh tab="Telnet"
# If you get stuck when running this command, it is indeed a good sign that
# the connection was stablished. To exist a Telnet session, press "Ctrl + ]",
# then write "quit" and press Enter.
telnet your_public_ip 21337
```

```console tab="GNU Netcat"
nc -vz your_public_ip:21337
```

The final check to verify that your port is correctly forwarded is using the
`peers` method to look if any of the peer connections is tagged as "inbound":

```console tab="Docker"
docker exec witnet_node witnet node peers
```

```console tab="Cargo"
cargo run --release -- node peers
```

```console tab="Binary"
witnet node peers
```

!!! tip "Multiple nodes in the same device or network"
    Multiple Witnet nodes can run in the same device or network and still get
    incoming connections. This is possible by forwarding a different external
    port (e.g. `22337`) to the port of your second node.
    
    However, your second node may require setting an additional parameter in
    its configuration file so that it is aware of the new port. Please read
    below how to customize the configuration file. The parameter you need to
    adjust is `public_addr`.

## Customize configuration

A custom `witnet.toml` configuration file can be used to adjust some parameters
of the node. The configuration file itself contains detailed explanations for each
parameter.

If you created your node following this guide, your `witnet.toml` file will
be found in the `~/.witnet/config` folder, right in your user's directory.

You can easily edit the configuration file like this:

```console tab="Vim (Mac OS)"
vim /users/$USER/.witnet/config/witnet.toml
```

```console tab="Vim (GNU/Linux)"
vim /home/$USER/.witnet/config/witnet.toml
```

```console tab="Nano (GNU/Linux)"
nano /home/$USER/.witnet/config/witnet.toml
```


## Long term maintenance of your node

There are some operations that are recommended from time to time to make sure your node is in perfect order:

- Give a look to the result of the `nodeStats`, `balance` and `reputation` commands.
- Check that you are getting incoming connections as explained above.
- Keep an eye on announcements for software and networks upgrades through the Witnet Community [Discord] and [Telegram] to make sure that you are running the latest release, which should give your node the best performance, liveness and security. 
- Restart your node once in a while (e.g. `docker restart witnet_node`) so that the node can perform some housekeeping operations. This helps reducing memory footprint and optimize disk space. 

[cryptographic sortition]: https://medium.com/witnet/cryptographic-sortition-in-blockchains-the-importance-of-vrfs-ad5c20a4e018
[CLI]: /node-operators/cli
[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[port-test]: https://www.yougetsignal.com/tools/open-ports/