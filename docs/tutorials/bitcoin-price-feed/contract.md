# 6. Write your consumer contract that will handle price feed updates

!!! note ""
    *This article is part of the [beginner tutorial on creating a totally
    decentralized Bitcoin price feed][intro] on Ethereum with Solidity and
    Witnet.*

## Plan the contract

Your contract will maintain a public variable in its state that will
contain the price of a bitcoin in US Dollars. An update of the price
point can be requested on demand by any interested party:

- Anyone will be able to call a `requestUpdate` method in the contract
  that creates a new instance of the `BitcoinPrice.sol` contract and
  send it to Witnet.
- Once the request is resolved, anyone will be able to call the
`completeUpdate` and write the result into the contract state.

## Initialize a basic contract

Let's start by creating a bare-bones contract and saving it as
`contracts/PriceFeed.sol`:

```js
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you created before
import "./requests/BitcoinPrice.sol";

// Your contract needs to inherit from UsingWitnet
contract PriceFeed is UsingWitnet {
  uint64 public bitcoinPrice; // The public Bitcoin price point
  uint256 public lastRequestId;      // Stores the ID of the last Witnet request
  bool public pending;               // Tells if an update has been requested but not yet completed
  Request public request;            // The Witnet request object, is set in the constructor

  // emits when the price is updated
  event PriceUpdated(uint64);

  // emits when found an error decoding request result
  event ResultError(string);

  // This constructor does a nifty trick to tell the `UsingWitnet` library where
  // to find the Witnet contracts on whatever Ethereum network you use.
  constructor (address _wrb) public UsingWitnet(_wrb) {
    // Instantiate the Witnet request
    request = new BitcoinPriceRequest();
  }
}
```

The above will:

- Import `UsingWitnet.sol` so your contract is Witnet-enabled.
- Import `BitcoinPrice.sol` so that you can instantiate the Witnet
  request when necessary.
- Make your contract inherit `UsingWitnet`.
- Define events for price updates (`PriceUpdated`) and errors (`ResultError`).
- Make the constructor receive the address of the Witnet Request
  Board (`_rb`) and pass it down to the `UsingWitnet` constructor
  through `UsingWitnet(_wrb)`
- Construct an instance of the `BitcoinPriceRequest` contract, which is the
  Solidity representation of the data request at `/requests/BitcoinPrice.js`

## Write the `requestUpdate` method that launches the Witnet request

```js
function requestUpdate() public payable {
  require(!pending, "An update is already pending. Complete it first before requesting another update");

  // Send the request to Witnet and store the ID for later retrieval of the result
  // The `witnetPostRequest` method comes with `UsingWitnet`
  lastRequestId = witnetPostRequest(request);

  // Signal that there is already a pending request
  pending = true;
}
```

## Write the `completeUpdate` method that reads the result of the Witnet request

```js
function completeUpdate() public {
  require(pending, "There is no pending update.");

  // Read the result of the Witnet request
  // The `witnetReadResult` method comes with `UsingWitnet`
  Witnet.Result memory result = witnetReadResult(lastRequestId);

  // If the Witnet request succeeded, decode the result and update the price point
  // If it failed, revert the transaction with a pretty-printed error message
  if (result.isOk()) {
    bitcoinPrice = result.asUint64();
    emit PriceUpdated(bitcoinPrice);
  } else {
    (, string memory errorMessage) = result.asErrorMessage();
    emit ResultError(errorMessage);
  }

  // In any case, set `pending` to false so a new update can be requested
  pending = false;
}
```

## Quick recap

This is what the complete contract looks like:
 
```js
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you created before
import "./requests/BitcoinPrice.sol";

// Your contract needs to inherit from UsingWitnet
contract PriceFeed is UsingWitnet {
  uint64 public bitcoinPrice; // The public Bitcoin price point
  uint256 public lastRequestId;      // Stores the ID of the last Witnet request
  bool public pending;               // Tells if an update has been requested but not yet completed
  Request public request;            // The Witnet request object, is set in the constructor

  // emits when the price is updated
  event PriceUpdated(uint64);

  // emits when found an error decoding request result
  event ResultError(string);

  // This constructor does a nifty trick to tell the `UsingWitnet` library where
  // to find the Witnet contracts on whatever Ethereum network you use.
  constructor (address _wrb) public UsingWitnet(_wrb) {
    // Instantiate the Witnet request
    request = new BitcoinPriceRequest();
  }

  function requestUpdate() public payable {
    require(!pending, "An update is already pending. Complete it first before requesting another update.");

    // Send the request to Witnet and store the ID for later retrieval of the result
    // The `witnetPostRequest` method comes with `UsingWitnet`
    lastRequestId = witnetPostRequest(request);

    // Signal that there is already a pending request
    pending = true;
  }
    
  function completeUpdate() public {
    require(pending, "There is no pending update.");

    // Read the result of the Witnet request
    // The `witnetReadResult` method comes with `UsingWitnet`
    Witnet.Result memory result = witnetReadResult(lastRequestId);

    // If the Witnet request succeeded, decode the result and update the price point
    // If it failed, revert the transaction with a pretty-printed error message
    if (result.isOk()) {
      bitcoinPrice = result.asUint64();
      emit PriceUpdated(bitcoinPrice);
    } else {
      (, string memory errorMessage) = result.asErrorMessage();
      emit ResultError(errorMessage);
    }

    // In any case, set `pending` to false so a new update can be requested
    pending = false;
  }
}
```

We can now [prepare to deploy][next]!

!!! question "Remember: You are not alone!"
    Join the Witnet Community [Discord] or [Telegram].
    Members of the Witnet community will be happy to answer your
    questions and assist you through this
    tutorial.

[Discord]: https://discord.gg/X4uurfP
[Telegram]: https://t.me/witnetio
[intro]: /tutorials/bitcoin-price-feed/introduction
[next]: /tutorials/bitcoin-price-feed/migrations
