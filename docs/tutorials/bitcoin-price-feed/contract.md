# 5. Write your consumer contract that will handle price feed updates

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally decentralized Bitcoin price feed][intro]
    on Ethereum with Solidity and Witnet.*

## Initialize a basic contract

Let's start by creating a really barebones contract and saving it as
`contracts/PriceFeed.sol`:

```js
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you created before
import "./requests/BitcoinPrice.sol";

// Your contract needs to inherit from UsingWitnet
contract PriceFeed is UsingWitnet {
  // This constructor does a nifty trick to tell the `UsingWitnet` library where
  // to find the Witnet contracts on whatever Ethereum network you use.
  constructor (address _wbi) UsingWitnet(_wbi) public { }
}
```


[intro]: /tutorials/bitcoin-price-feed/introduction
