# 🔎 Next steps

## The first minutes and hours in your node's life

As soon as the `witnet_node` container is up, it will do the following things in order:

1. Try to open connections to other nodes in the network. It needs 8 "outbound" connections. This should take from several seconds to a few minutes.
2. Discover what is the tip of the block chain, and download all the blocks from that chain. This can take from several minutes to several hours. The synchronization time depends heavily on how long the block chain is, but also on your Internet bandwidth, CPU speed, memory size and speed, and storage drive write throughput.
3. Go into _Synced_ status. In Synced status, your node will validate transactions and blocks in real time, and it will try itself to propose block candidates and participate in resolving _data requests_.

## What to expect from your node's balance and reputation

* Getting your first block proposal accepted by the network and minting your first wit tokens is not easy, and can take from a few days up to some weeks due to the probabilistic nature of the cryptographic sortition algorithm that rules the system.
* As with minting blocks, being assigned a request for the first time can take some time. Once you have mined one block or resolved at least one request, your node will earn reputation and it will start getting assignments more often.

{% hint style="info" %}
Note that it is perfectly normal for a node to show 0 "balance", "reputation", "blocks included" or "accepted commits" for the first days of it being up. Please be patient, new identities in the system are subject to a slow start for critical security reasons. Read below for tips on how to increase your node's probability of mining.
{% endhint %}

## Stake some WIT tokens to increase your node's probability of mining

The most efficient way to increase your node's probability of mining is to deposit some WIT tokens into its address.

In doing so, your node will be able to start participating in resolving data requests, which allows it to earn reputation points and join the _Active Reputation Set (ARS)_ — a list of nodes that have recently proved their reliability.

This is crucial to increasing the mining probability because the network prioritizes blocks from identities with reputation or belonging to the ARS.

Once you transfer some amount of WIT tokens to your node, staking starts to happen automatically after 7 days.

{% hint style="info" %}
Join the [Witnet community](https://t.me/witnetio) and the [Witnet OTC community](https://t.me/witnet\_market) on Telegram to find out how to get an initial amount of WIT tokens that you can put into your node.
{% endhint %}

## Monitoring your node's progress

Here are some useful commands that you can use to keep track of how your node is performing in the network. A complete documentation of all the CLI methods is available in the node [operator docs](cli.md).

### nodeStats

Among other information, this shows the synchronization state of your node, as well as counters for proposed and accepted blocks and participations in resolving data requests ("commitments").

{% tabs %}
{% tab title="Docker" %}
```shell-session
docker exec  witnet_node witnet node nodeStats
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run --release -- node nodeStats
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node nodeStats
```
{% endtab %}
{% endtabs %}

### balance

The `balance` command will print your node's current balance.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node balance
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node balance
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run --release -- node balance
```
{% endtab %}
{% endtabs %}

### reputation

The `reputation` command will print your node's current reputation score.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node reputation
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node reputation
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run --release -- node reputation
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
The reputation score of a node gives a rough idea about its performance, but this metric is heavily influenced by randomness and luck. It is perfectly normal that the reputation score goes up and down over time, sometimes smoothly, sometimes more abruptly. Likewise, there is probably nothing wrong if your node shows 0 reputation points or is marked as _not active_. Do not get too obsessed about it!
{% endhint %}

## Check ports and incoming connections

To check if the listening port is correctly opened to the Internet, you can use a [port forwarding testing](https://www.yougetsignal.com/tools/open-ports/) tool or try to open a connection to your public IP from a device that is not in the same network as your node:

{% tabs %}
{% tab title="Telnet" %}
```
# If you get stuck when running this command, it is indeed a good sign that
# the connection was stablished. To exist a Telnet session, press "Ctrl + ]",
# then write "quit" and press Enter.
telnet your_public_ip 21337
```
{% endtab %}

{% tab title="GNU NetCat" %}
```
nc -vz your_public_ip:21337
```
{% endtab %}
{% endtabs %}

The final check to verify that your port is correctly forwarded is using the `peers` method to look if any of the peer connections is tagged as _inbound_:

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node peers
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node peers
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run --release -- node peers
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Multiple Witnet nodes can run in the same device or network and still get incoming connections. This is possible by forwarding a different external port (e.g. `22337`) to the port of your second node.

However, your second node may require setting an additional parameter in its configuration file so that it is aware of the new port. Please read below how to customize the configuration file. The parameter you need to adjust is `public_addr`.
{% endhint %}

## Back up your private master key

Doing a backup of the private master key of your node is a great way to keep your Wit coins safe.

#### Export

This command will print your master key into your console terminal:

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node masterKeyExport
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node masterKeyExport
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run --release -- node masterKeyExport
```
{% endtab %}
{% endtabs %}

You can also add the `--write` flag to write a backup of your master key into a file in the configuration directory of your node (`~/.witnet/config` by default):

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node masterKeyExport --write
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node masterKeyExport --write
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run --release -- node masterKeyExport --write
```
{% endtab %}
{% endtabs %}

It is recommended to move or copy the resulting file into a safe place. Writing it into a piece of paper and keeping it somewhere safe from light, water, fire (and eyes 👀) is the best option.

{% hint style="warning" %}
Please keep the exported key totally secret. Anyone with knowledge of this key has full access to all your Wit coins.
{% endhint %}

#### **Import**

Importing master keys is only allowed when creating a new node, as overwriting a existing key could be dangerous. The process is quite simple:

{% tabs %}
{% tab title="Docker + nano" %}
```
mkdir -p ~/.witnet/config

nano ~/.witnet/config/master.key 

chmod 777 ~/.witnet/config

# Now enter your master key into the file editor, 
# save with Ctrl+O and exit with Ctrl+X
docker run -d \
    --name witnet_node \
    --volume ~/.witnet:/.witnet \
    --publish 21337:21337 \
    --restart always \
    witnet/witnet-rust \
    node server --master-key-import /.witnet/config/master.key
```
{% endtab %}

{% tab title="Docker + vim" %}
```
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
{% endtab %}

{% tab title="Binary" %}
```
witnet node server --master-key-import ~/.witnet/config/master.key
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Never use the same master key on multiple nodes at once. You may find your nodes exposed to double-spend issues and severe slashing.
{% endhint %}

## Customize the configuration if needed

A custom `witnet.toml` configuration file can be used to adjust some parameters of the node. The default configuration file itself contains detailed explanations for each parameter.

If you created your node following this guide, your `witnet.toml` file will be found in the `~/.witnet/config` folder, right in your user's directory.

You can easily edit the configuration file like this:

{% tabs %}
{% tab title="Vim (Mac OS and GNU/Linux)" %}
```
vim ~/.witnet/config/witnet.toml
```
{% endtab %}

{% tab title="Nano (GNU/Linux)" %}
```
nano ~/.witnet/config/witnet.toml
```
{% endtab %}
{% endtabs %}

## Upgrade your Witnet node

Upgrading is as easy as it gets:

**1. Remove the old container**

```
docker stop witnet_node
docker rm witnet_node
```

**2. Pull the latest version of the Docker image**

```
docker pull witnet/witnet-rust
```

**3. Recreate the container using the latest Docker image**

{% tabs %}
{% tab title="MacOS and Linux" %}
```
docker run -d \    
    --name witnet_node \    
    --volume ~/.witnet:/.witnet \    
    --publish 21337:21337 \    
    --restart always \    
    witnet/witnet-rust
```
{% endtab %}

{% tab title="Windows" %}
```
docker run -d --name witnet_node --volume %USERPROFILE%\.witnet\:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
```
{% endtab %}

{% tab title="Raspberry Pi" %}
Docker on Raspbian for all Raspberry models requires your containers to operate in privileged mode to have access to the system clock. When running the command above, simply add the `--privileged` flag:

```
docker run -d --privileged --name witnet_node --volume ~/.witnet:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you changed the persistent storage path in the past, change `~/.witnet` for whatever path you were using.
{% endhint %}

Voilà! Your Witnet node is now upgraded. Your master key is safe and your addresses will be the same. Remember that you can always double-check the Witnet version that you are running with this command:

```
docker exec witnet_node witnet --version
```

## Long term maintenance of your node

There are some operations that are recommended from time to time to make sure your node is in perfect order:

* Give a look to the result of the `nodeStats`, `balance` and `reputation` commands.
* Check that you are getting incoming connections as explained above.
* Keep an eye on announcements for software and networks upgrades through the Witnet Community [Discord](https://discord.gg/X4uurfP) and [Telegram](https://t.me/witnetio) to make sure that you are running the latest release, which should give your node the best performance, liveness and security.
* Restart your node once in a while (e.g. `docker restart witnet_node`) so that the node can perform some housekeeping operations. This helps reducing memory footprint and optimize disk space.
