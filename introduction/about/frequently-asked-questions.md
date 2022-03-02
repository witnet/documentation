# 🤔 Frequently Asked Questions

### Witnet Protocol

#### How is Witnet different than X other oracle?

Unlike other popular oracle designs, Witnet achieves data integrity and bases its security on cryptoeconomic incentives, i.e. rewards and slashing.

For more information about alternative oracle designs and general oracle ecosystem overviews, please check these sections from the [Awesome Witnet](awesome-witnet.md) compilation:

* [On the importance of oracles](awesome-witnet.md#on-the-importance-of-oracles)
* [Other oracles](awesome-witnet.md#other-oracles)

#### How much does it cost to use the Witnet oracle?

The cost really depends on what level does your smart contract integrate with Witnet, in addition to which blockchain you are using. As a rule of thumb:

* **Data feeds:** free to read from. Gas cost of keeping the feeds updated is currently sponsored by Witnet Foundation on most blockchains.
* **Randomness oracle:** user pays the gas cost of the randomization request and is required to deposit an amount of the native token (e.g. ETH) equal to the gas cost of reporting the randomness. The total cost is roughly equivalent to up to \~320,000 gas units. Reading the randomness and deriving random numbers is free.
* **APIs and HTTP GET/POST:** user pays the gas cost of the request and is required to deposit an amount of the native token (e.g. ETH) equal to the gas cost of reporting the result. The total cost is roughly equivalent to up to \~320,000 gas units. Reading the result of the request is free.

### Witnet Coin (Wit)

You can find all the information relative to the Wit coin in its own section of the docs:

{% content-ref url="wit-coin.md" %}
[wit-coin.md](wit-coin.md)
{% endcontent-ref %}

### Ecosystem

#### What blockchains does Witnet support?

The currently supported networks are listed here:

{% content-ref url="../../smart-contracts/supported-chains.md" %}
[supported-chains.md](../../smart-contracts/supported-chains.md)
{% endcontent-ref %}
