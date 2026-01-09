# ⛏️ Start Mining WIT Coins

::: warning
You do not need to run a Witnet node to start using real-world data in your smart contracts.

If you're a developer, you might want to begin with short tutorials on [using Witnet Price Feeds](data-feeds-tutorial.md), [generating verifiable randomness](randomness.md), or [customizing your own data feeds](apis-and-http-get-post.md) for your blockchain project.
:::

### What does Mining Mean in Witnet?

::: tip
The Witnet blockchain is totally permissionless and open for anyone to join and run their own nodes.
:::

Like in many other blockchains, the activity of running a validator node and participating in block proposing is usually called mining.

Every time a block proposer gets 1 block accepted into the blockchain by the rest of the nodes in the network, they independently mint 50 new units of WIT coins out of the blue. Additionally, nodes that successfully participate in solving data requests get rewards in form of WIT coins as well. These are not freshly minted — they are paid by the creators of the data requests as a mean to incentivize the miners to solve their requests.

### **How To Start Your Witnet Node**

There are multiple ways to run a Witnet validator node. Listed below are the most common methods, with tutorials on how to get started real quick:
<!-- TODO: remove extension for inside links -->
| As a Docker container (recommended) | [docker-quick-start-guide.md](../../node-operators/docker-quick-start-guide.md "mention")                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| As a Docker Compose service         | [docker-compose.md](../../node-operators/reference-material/advanced-setups/docker-compose.md "mention") |
| As a System daemon service          | [systemd.md](../../node-operators/reference-material/advanced-setups/systemd.md "mention")               |

### **I Already Got My Witnet Node Running** — Now what?

After you ensure your node is running and synced, you will need to:

<!-- TODO: Convert these headings into a stepper or numbered UI in VitePress if desired. -->

#### 1. Buy wrapped WIT in Ethereum

As simple as swapping any other crypto asset that you own to ERC-20 WIT, in [**Uniswap**](https://app.uniswap.org/).

#### 2. Unwrap it as native WIT to Witnet

Use the [**Witnet Unwrapping Dashboard**](https://erc20.witnet.io/unwrap) to securely convert your tokens into native WIT.

#### 3. Generate a stake authorization code on your node

[Tell your node to authorize the Witnet address](../../node-operators/next-steps.md#c499) where to stake WIT coins from.

#### 4. Stake WIT from myWitnetWallet

Use the generated authorization code and [**myWitWallet**](../about/sheikah-witnet-wallet.md#mywitwallet) to delegate any amount between 10,000 and 10,000,000 WIT coins per running node:

* [Medium: A Complete Guide to Staking and Staking $WIT with myWitWallet.](https://medium.com/witnet/a-complete-guide-to-staking-and-unstaking-wit-with-mywitwallet-2-0-8b08061c6aed)
* [Youtube: How to Stake & Unstake through myWitWallet!](https://www.youtube.com/watch?v=y_8DzmPTLCk)

::: tip
You can withdraw your delegated stake and any generated yield at any time. Whether you delegate to your own nodes or use Staking-as-a-Service, you have this flexibility. With Staking-as-a-Service, you exchange a portion of the yield for the ease of not having to maintain your own nodes continuously.
:::

### **What To Expect When Running a Witnet Node**

It is important to understand that mining is a totally decentralized activity, and that you are the only one responsible of ensuring uptime and performance of your node.

Nobody can guarantee that running Witnet nodes will be ever profitable to you, as that largely depends on your own operation costs, the reliability of your infrastructure, and ultimately, how much WIT you decide to stake:

<figure>
<img src="/assets/GZhmMVmWgA8E_gU.png" alt="">
<figcaption>
<!-- TODO: center below the image, add a smaller size, and reduce distance between the text and the image -->
<p>Staking in Witnet is designed to be as fair as possible.</p>
</figcaption>
</figure>

Continue reading to learn how to effectively manage your Witnet node and enhance your earning potential:

<InternalLinkButton
  text="Next steps"
  to="/node-operators/next-steps"
/>
