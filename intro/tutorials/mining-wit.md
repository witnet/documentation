# ⛏️ Start earning WIT coins

{% hint style="info" %}
You do not need to run a Witnet node to use Witnet from your Ethereum smart contracts.

If you are a smart contracts developer, what you probably want is to use one of the [data feeds](data-feeds-tutorial.md), a [randomness source](randomness.md), or to connect to [APIs with HTTP GET/POST](apis-and-http-get-post.md).
{% endhint %}

### What does Mining Mean in Witnet?

{% hint style="success" %}
The Witnet mainnet is totally permissionles and open for anyone to join and and independently run their own node.
{% endhint %}

Like in many other blockchains, the activity of running a validator node and participating in block proposing is usually called mining.

Every time a block proposer gets 1 block accepted into the blockchain by the rest of the nodes in the network, they independently mint 50 new units of Wit coins out of the blue.

Additionally, nodes that successfully participate in solving data requests get rewards in form of Wit coins. These are not freshly minted — they are paid by the creators of the data requests as a mean to incentivize the miners to solve their requests.

### **How To Start Your Witnet Node**

There are multiple ways to run a Witnet validator node. Listed below are the most common methods, with tutorials on how to get started real quick:

#### As a Docker Container (<mark style="color:green;">recommended</mark>)

{% content-ref url="../../node-operators/docker-quick-start-guide.md" %}
[docker-quick-start-guide.md](../../node-operators/docker-quick-start-guide.md)
{% endcontent-ref %}

#### **As a `docker-compose` Service**

{% content-ref url="../../node-operators/advanced-setups/docker-compose.md" %}
[docker-compose.md](../../node-operators/advanced-setups/docker-compose.md)
{% endcontent-ref %}

**As a `systemd` Service**

{% content-ref url="../../node-operators/advanced-setups/systemd.md" %}
[systemd.md](../../node-operators/advanced-setups/systemd.md)
{% endcontent-ref %}

### **What To Expect When Running a Witnet Node**

It is important to understand that mining is a totally decentralized activity, and that you are the only one responsible of ensuring uptime and performance of your node.

Nobody can guarantee that running Witnet nodes will be ever profitable to you, as that largely depends on your own operation costs, the reliability of your infrastructure, and ultimately, luck.

### **I Already Got My Witnet Node Running** — Now what?

After you ensure your node is running and synced, you will need to stake some WIT in order for your node to start mining blocks and participate in data requests. Learn [how to stake](../../node-operators/next-steps.md#how-to-stake-wit).

Also, please read below for tips on how to efficiently manage your Witnet node and how to increase your its probability of mining:

{% content-ref url="../../node-operators/next-steps.md" %}
[next-steps.md](../../node-operators/next-steps.md)
{% endcontent-ref %}
