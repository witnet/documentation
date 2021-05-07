# 5. Compile the request

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

Compiling the request could not be easier:

=== "npm"
	```console
    npm run compile-requests
    ```
=== "yarn"
	```console
    yarn compile-requests
    ```

The `compile-requests` npm task will:

1. Analyze your requests for syntactic and semantic errors.
2. Warn you of any security issues and broken incentives.
3. Try to compile the requests into Witnet bytecode.
4. Put the bytecode into auxiliary Solidity contracts that you can
   import into your own contracts.
5. Write [migration files][migrations] with default constructor
   arguments that you can later customize.

If you now take a look in the `contracts/requests` folder, you will notice a
new file called `BitcoinPrice.sol`. It will contain something like this:

```solidity
pragma solidity ^0.6.0;

import "witnet-ethereum-bridge/contracts/Request.sol";

// The bytecode of the BitcoinPrice request that will be sent to Witnet
contract BitcoinPriceRequest is Request {
  constructor () Request(hex"0aaf0108b6cfb3ec051237122468747470733a2f2f7777772e6269747374616d702e6e65742f6170692f7469636b65722f1a0f8418451874821861646c6173741872125c123168747470733a2f2f6170692e636f696e6465736b2e636f6d2f76312f6270692f63757272656e7470726963652e6a736f6e1a2788184518748218616362706918748218616355534418748218616a726174655f666c6f617418721a070a05818218570322070a058182185703100a18042002280130013801") public { }
}
```

As you can see, the contract contains the byte code for the request you
just wrote, exported as a Solidity contract that you can then import
and instantiate from your own contracts.

The next step is to [write your main consumer contract][next].

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[migrations]: /tutorials/bitcoin-price-feed/migrations
[intro]: /tutorials/bitcoin-price-feed/introduction
[next]: /tutorials/bitcoin-price-feed/contract
