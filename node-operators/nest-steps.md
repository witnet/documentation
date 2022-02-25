# Next steps

## The first minutes and hours in your node's life

As soon as the `witnet_node` container is up, it will do the following things in order:

1. Try to **open connections to other nodes** in the network. It needs 8 "outbound" connections. This should take from several seconds to a few minutes.
2. Discover what is the **tip of the block chain**, and **download all the blocks** from that chain. This can take from several minutes to several hours. The synchronization time depends heavily on how long the block chain is, but also on your Internet bandwidth, CPU speed, memory size and speed, and storage drive write throughput.
3. Go into **_Synced_ status**. In Synced status, your node will **validate transactions and blocks** in real time, and it will try itself to **propose block candidates** and participate in **resolving _data requests_**.

## What to expect from your node's balance and reputation

- Getting your first block proposal accepted by the network and minting your first wit tokens is not easy, and can
take from a few hours up to several days (or more!) due to the probabilistic nature of the [cryptographic sortition]
algorithm that rules the system.
- As with minting blocks, being assigned a request for the first time can take some time. Once you have mined one block
or resolved at least one request, your node will earn reputation and it will start getting assignments more often.

!!! warning "Don't panic"
    Note that it is **perfectly normal** for a node to show 0 "balance", "reputation", "blocks included" or "accepted commits" for the first days of it being up.
    Please be patient, new identities in the system are subject to a slow start for critical security reasons.
    Read below for tips on how to increase your node's probability of mining.

## Stake some WIT tokens to increase your node's probability of mining

The most efficient way to increase your node's probability of mining is to deposit some WIT tokens into its address.

In doing so, your node will be able to start participating in resolving data requests, which allows it to earn
reputation points and join the _Active Reputation Set (ARS)_ — a list of nodes that have recently proved their
reliability.

This is crucial to increasing the mining probability because the network prioritizes blocks from identities with
reputation or belonging to the ARS.

Once you transfer some amount of WIT tokens to your node, staking starts to happen automatically after 12.5 hours.

!!! info "Getting WIT tokens"
    Join the [Witnet community][Telegram] and the [Witnet OTC community][OTC] on Telegram to find out how to get an
    initial amount of WIT tokens that you can put into your node.

## Monitoring your node's progress

Here are some useful commands that you can use to keep track of how your node is performing in the network.
A complete documentation of all the CLI methods is available in the [node operator docs][CLI]. 

### nodeStats 

Among other information, this shows the synchronization state of your node, as well as counters for proposed and accepted blocks and participations in resolving data requests ("commitments").

=== "Docker"
  ```console
    docker exec  witnet_node witnet node nodeStats
    ```
=== "Cargo"
  ```console
    cargo run --release -- node nodeStats
    ```
=== "Binary"
  ```console
    witnet node nodeStats
    ```

### balance

The `balance` command will print your node's current balance.

=== "Docker"
  ```console
    docker exec witnet_node witnet node balance
    ```
=== "Cargo"
  ```console
    cargo run --release -- node balance
    ```
=== "Binary"
  ```console
    witnet node balance
    ```


### reputation

The `reputation` command will print your node's current reputation score.

=== "Docker"
  ```console
    docker exec witnet_node witnet node reputation
    ```
=== "Cargo"
  ```console
    cargo run --release -- node reputation
    ```
=== "Binary"
  ```console
    witnet node reputation
    ```


!!! tip "Reputation is tricky"
    Despite its name, the *reputation* metric that exists in the Witnet protocol is not as vital as reputation is in real life.
    The reputation score of a node gives a rough idea about its performance, but it is heavily influenced by randomness and luck.
    It is perfectly normal that the reputation score goes up and down over time, sometimes smoothly, sometimes more abruptly.
    Likewise, there is probably nothing wrong if your node shows 0 reputation points or is marked as "not active".
    Do not get too obsessed about it!
    
## Check ports and incoming connections

To check if the listening port is correctly opened to the Internet, you can use
a [port forwarding testing][port-test] tool or try to open a connection to
your public IP from a device that is not in the same network as your node:

=== "Telnet"
  ```sh
    # If you get stuck when running this command, it is indeed a good sign that
    # the connection was stablished. To exist a Telnet session, press "Ctrl + ]",
    # then write "quit" and press Enter.
    telnet your_public_ip 21337
    ```
=== "GNU Netcat"
    ```console
    nc -vz your_public_ip:21337
    ```

The final check to verify that your port is correctly forwarded is using the
`peers` method to look if any of the peer connections is tagged as "inbound":

=== "Docker"
  ```console
    docker exec witnet_node witnet node peers
    ```
=== "Cargo"
  ```console
    cargo run --release -- node peers
    ```
=== "Binary"
  ```console
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

## Back up your private master key

Doing a backup of the private master key of your node is a great way to keep
your wit tokens safe.

This command will print your master key into your console terminal:

=== "Docker"
  ```console
    docker exec witnet_node witnet node masterKeyExport
    ```
=== "Cargo"
  ```console
    cargo run --release -- node masterKeyExport
    ```
=== "Binary"
  ```console
    witnet node masterKeyExport
    ```

You can add the `--write` flag to write a backup of your master key into a file
in the configuration directory of your node (`~/.witnet/config` by default):

=== "Docker"
  ```console
    docker exec witnet_node witnet node masterKeyExport --write
    ```
=== "Cargo"
  ```console
    cargo run --release -- node masterKeyExport --write
    ```
=== "Binary"
  ```console
    witnet node masterKeyExport --write
    ```

It is recommended to **move or copy the resulting file into a safe place**. Writing
it into a piece of paper and keeping it somewhere safe from light, water, fire 
(and eyes) is the best option.

**Please keep this totally secret**. Anyone with knowledge of this key has full access to
all your wit tokens.

**Importing master keys is only allowed when creating a new node**, as overwriting a
existing key could be dangerous. The process is quite simple:

=== "Docker + nano"
  ```console
    mkdir -p ~/.witnet/config

    nano ~/.witnet/config/master.key 

    # Now enter your master key into the file editor, save with Ctrl+O and exit with Ctrl+X

    docker run -d \
        --name witnet_node \
        --volume ~/.witnet:/.witnet \
        --publish 21337:21337 \
        --restart always \
        witnet/witnet-rust \
        node server --master-key-import /.witnet/config/master.key
    ```
=== "Docker + vim"
  ```console
    mkdir -p ~/.witnet/config
    
    vim ~/.witnet/config/master.key 
    
    # Now enter your master key into the file editor, save and exit by typing Escape, then ":wq" and Enter 
    
    docker run -d \
        --name witnet_node \
        --volume ~/.witnet:/.witnet \
        --publish 21337:21337 \
        --restart always \
        witnet/witnet-rust \
        node server --master-key-import /.witnet/config/master.key
    ```
=== "Binary"
  ```console
    witnet node server --master-key-import ~/.witnet/config/master.key
    ```

!!! danger "Never use the same master key on multiple nodes at once"
    Operating multiple nodes with the same master key is a terrible idea.
    You may find your nodes exposed to double-spend issues and severe slashing.

## Customize configuration if needed

A custom `witnet.toml` configuration file can be used to adjust some parameters
of the node. The configuration file itself contains detailed explanations for each
parameter.

If you created your node following this guide, your `witnet.toml` file will
be found in the `~/.witnet/config` folder, right in your user's directory.

You can easily edit the configuration file like this:

=== "Vim (Mac OS)"
  ```console
    vim ~/.witnet/config/witnet.toml
    ```
=== "Vim (GNU/Linux)"
  ```console
    vim ~/.witnet/config/witnet.toml
    ```
=== "Nano (GNU/Linux)"
  ```console
    nano ~/.witnet/config/witnet.toml
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
[OTC]: https://t.me/witnet_market
