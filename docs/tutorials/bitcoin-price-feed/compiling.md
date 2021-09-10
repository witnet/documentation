# 5. Compile and try the request

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*
    
## Compile you data request

Compiling the request could not be easier:

=== "npm"
	```console
    npm run compile:requests
    ```
=== "yarn"
	```console
    yarn compile:requests
    ```

The `compile:requests` npm task will:

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
pragma solidity >=0.7.0 <0.9.0;

import "witnet-solidity-bridge/contracts/requests/WitnetRequestInitializableBase.sol";

// The bytecode of the BitcoinPrice request that will be sent to Witnet
contract BitcoinPriceRequest is WitnetRequestInitializableBase {
    constructor () {}  
    function initialize() public {
        WitnetRequestInitializableBase.initialize(hex"0abf0108f3b5988906123b122468747470733a2f2f7777772e6269747374616d702e6e65742f6170692f7469636b65722f1a13841877821864646c6173748218571903e8185b125c123168747470733a2f2f6170692e636f696e6465736b2e636f6d2f76312f6270692f63757272656e7470726963652e6a736f6e1a2786187782186663627069821866635553448218646a726174655f666c6f61748218571903e8185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc000001003100a186420012846308094ebdc03");
    }
}
```

As you can see, the contract contains the byte code for the request you
just wrote, exported as a Solidity contract that you can then import
and instantiate from your own contracts.

## Try your data request

Data requests can be easily tried and debugged locally using the
`try` npm task:

=== "npm"
	```console
    npm run try
    ```
=== "yarn"
	```console
    yarn try
    ```
    
The first time you invoke the `try` npm task, it will tell you that it
needs to download a native `witnet_toolkit` binary. Just press Enter and
it will do it for you.

A few seconds later, you should be presented with a _"Witnet data request
local execution report"_. If you go to the latest part — the "Tally stage" 
— you can see what the result of your data request would be if executed
right now:

```
╔════════════════════════════════════════════╗
║ Witnet data request local execution report ║
║ BitcoinPrice.sol                           ║
╚╤═══════════════════════════════════════════╝
<multiple lines ommitted>
 │  ┌────────────────────────────────────────────────┐
 └──┤ Tally stage                                    │
    ├────────────────────────────────────────────────┤
    │ Execution time: 0.00123 ms                     │
    │ Result is Integer: 47742275                    │
    └────────────────────────────────────────────────┘
```

Now that you have compiled and tried your data request, the next step
is to [write your main consumer contract][next].

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
