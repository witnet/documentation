# 🚀 Getting Started (Docker)

**The Witnet Mainnet is open for anyone to join and and run their own full node.**

{% hint style="info" %}
You do not need to run a Witnet node to use Witnet from your Ethereum smart contracts.

If you are a smart contracts developer, what you probably want is to use one of the [data feeds](../intro/tutorials/data-feeds-tutorial.md), a [randomness source](../intro/tutorials/randomness.md), or to connect to [APIs with HTTP GET/POST](../intro/tutorials/apis-and-http-get-post.md).
{% endhint %}

### Hardware requirements <a href="#hardware-requirements" id="hardware-requirements"></a>

Hardware requirements are listed in the node operators docs:

{% content-ref url="requirements.md" %}
[requirements.md](requirements.md)
{% endcontent-ref %}

### Up and running in 1 minute, using Docker <a href="#up-and-running-in-1-minute-using-docker" id="up-and-running-in-1-minute-using-docker"></a>

The most convenient method for running a Witnet node is through the `witnet/witnet-rust` Docker image. For alternate installation methods or more complex setups, take a look at the [docker-compose](reference-material/advanced-setups/docker-compose.md) and [systemd](reference-material/advanced-setups/systemd.md) integrations.

Firstly, you need to [install Docker](https://docs.docker.com/get-docker/) on the device you will be running the node from. Note: some GNU/Linux distributions require some [extra steps](https://docs.docker.com/install/linux/linux-postinstall/) to get Docker up and running.

The Witnet docker image downloads and runs a Witnet node in in just a matter on seconds. To start a node, use:

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
The home directory path is defined differently on Windows:

{% code overflow="wrap" %}
```
docker run -d --name witnet_node --volume %USERPROFILE%\.witnet\:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
```
{% endcode %}
{% endtab %}

{% tab title="Raspberry Pi" %}
Docker on Raspbian for all Raspberry models requires your containers to operate in privileged mode to have access to the system clock. When running the command above, simply add the `--privileged` flag:

{% code overflow="wrap" %}
```
docker run -d --privileged --name witnet_node --volume ~/.witnet:/.witnet --publish 21337:21337 --restart always witnet/witnet-rust
```
{% endcode %}
{% endtab %}
{% endtabs %}



### Restore from a Snapshot <a href="#restore-from-a-snapshot" id="restore-from-a-snapshot"></a>

The Witnet blockchain has been running since October 2020, so syncing a new node from scratch can take a long time. To speed this up, you can restore the node from a snapshot, reducing sync time from days to just a few hours.

1. Download the latest mainnet snapshot file

```bash
wget https://witnet.network/snapshots/mainnet-latest.tar.zst
```

2. Decompress the file

```bash
tar --zstd -xvf mainnet-latest.tar.zst
```

Make note of the folder path where the snapshot was extracted. The folder name will include the date it was created, and the `.bin` file inside will include the corresponding epoch number.

3. Start the Node Using the Snapshot

```bash
 docker run -d \
  --name witnet_node \
  --volume ~/.witnet:/.witnet \
  --publish 21337:21337 \
  --restart always \
  witnet/witnet-rust \
  node server --snapshot-import /path/to/your/witnet_chain_snapshot_mainnet.bin 
   
```

🔁 Replace `/path/to/your/snapshot_file.bin` with the actual path to the `.bin` file you extracted.\
Example:

```
/20250610-snapshot-mainnet/witnet_chain_snapshot_mainnet_3457949.bin
```

### Now what? <a href="#now-what" id="now-what"></a>

There are two **important** things you should do now to make the most of your Witnet node:

1. Open ports as explained below.
2. Follow the [Next Steps](next-steps.md) guide to learn how to check the node status, progress and statistics:

{% content-ref url="next-steps.md" %}
[next-steps.md](next-steps.md)
{% endcontent-ref %}

### Open your ports! <a href="#open-your-ports" id="open-your-ports"></a>

The best way to contribute to the growth and sustainability of the Witnet network is by opening up the listening port of your node, so that other nodes in the network can download block chain data from you and your transactions can be broadcasted more quickly.

For this feature to be effective, you will also need your IP address to be public (and ideally, static). If you are operating a node in your home network, you can request your ISP to assign you a static IP address or at least disable [CGN](https://en.wikipedia.org/wiki/Carrier-grade_NAT) on it.

A simple easy way to debug if you're probably behind a double NAT & will need to speak with your ISP is to run this command

```powershell
tracert -h 5 8.8.8.8
```

if you notice your first 2 hops are behind private IPs then you're most likely behind a double NAT\
Private IP ranges:

```bash
192.168.x.x

10.x.x.x

172.16.x.x through 172.31.x.x

100.64.x.x through 100.127.x.x
```

Depending on your setup, this will normally imply changing the settings on your router or firewall so as to forward all incoming connections to port `21337` from your external IP into the IP of the device or interface where the node is running.

You can find out how to verify that your ports are open in the [Next Steps](next-steps.md) guide:

{% content-ref url="next-steps.md" %}
[next-steps.md](next-steps.md)
{% endcontent-ref %}
