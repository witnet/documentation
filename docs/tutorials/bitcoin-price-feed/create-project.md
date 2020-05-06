# 1. Create a new Witnet-enabled project

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

## Using the Witnet Truffle Box

If you are creating a new project from scratch, the quickest way to get
things working is using [Truffle][truffle] to download a Witnet-enabled
project template:

```console tab="GNU/Linux, Mac OS or Linux Subsystem for Windows"
mkdir bitcoin-price-feed
cd bitcoin-price-feed
truffle unbox witnet/truffle-box
```

You can keep reading this page to learn more about the Truffle box
boilerplate, but if you are feeling impatient you can [jump straight to defining data sources][next].

### Project folder structure

After *unboxing* you should find yourself in a project that has been
populated with the following directory structure:

```
bitcoin-price-feed
├── contracts       // Where your Solidity contracts will be
│   └── requests    // Where Witnet requests end up after compilation
├── migrations      // Deployment scripts
├── requests        // Witnet request source code (.js files)
└── test            // Scripts for testing your contracts
```

## Next step: adding data sources

You are now ready to move forward into
[defining the data sources to be used][next].

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[truffle]: https://www.trufflesuite.com/
[intro]: /tutorials/bitcoin-price-feed/introduction
[next]: /tutorials/bitcoin-price-feed/sources
