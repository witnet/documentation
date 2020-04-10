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
- Once the request gets resolved, anyone will be able to call the
`completeUpdate` to actually write the result into the contract state.

It is an assumption that the mere existence of a multiparty contract
that consumes the price feed will be enough incentive for the interested
parties to request and complete the update always that the price point
inside the contract differs from the actual market price more than the
cost of performing the Witnet request.

## Initialize a basic contract

Let's start by creating a really bare-bones contract and saving it as
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
  int128 public bitcoinPrice; // The public Bitcoin price point
  uint256 lastRequestId;      // Stores the ID of the last Witnet request
  bool pending;               // Tells if an update has been requested but not yet completed
  Request request;            // The Witnet request object, is set in the constructor

  // Allows logging errors
  event Error(uint64, string);

  // This constructor does a nifty trick to tell the `UsingWitnet` library where
  // to find the Witnet contracts on whatever Ethereum network you use.
  constructor (address _wbi) UsingWitnet(_wbi) public {
    // Instantiate the Witnet request
    request = new BitcoinPriceRequest();
  }
}
```

What you are doing here is quite straightforward:

- Import `UsingWitnet.sol` so your contract is Witnet-enabled.
- Import `BitcoinPrice.sol` so that you can instantiate the Witnet
  request when needed.
- Make your contract inherit `UsingWitnet`.
- Make the constructor receive the address of the Witnet Bridge
  Interface (`_wbi`) and pass it down to the `UsingWitnet` constructor
  through `UsingWitnet(_wbi)`

## Write the `requestUpdate` method that launches the Witnet request

```js
function requestUpdate() public payable {
  require(!pending, "An update is already pending. Complete it first before requesting another update.");

  // Amount to pay to the bridge node relaying this request from Ethereum to Witnet
  uint256 _witnetRequestReward = 100 szabo;
  // Amount of wei to pay to the bridge node relaying the result from Witnet to Ethereum
  uint256 _witnetResultReward = 100 szabo;

  // Send the request to Witnet and store the ID for later retrieval of the result
  // The `witnetPostRequest` method comes with `UsingWitnet`
  lastRequestId = witnetPostRequest(request, _witnetRequestReward, _witnetResultReward);
}
```

## Write the `resolveUpdate` method that reads the result of the Witnet request

```js
// The `witnetRequestAccepted` modifier comes with `UsingWitnet` and allows to
// protect your methods from being called before the request has been successfully
// relayed into Witnet.
function completeUpdate() public payable witnetRequestAccepted(lastRequestId) {
  require(pending, "There is no pending update.");

  // Read the result of the Witnet request
  // The `witnetReadResult` method comes with `UsingWitnet`
  Witnet.Result memory result = witnetReadResult(lastRequestId);

  // If the Witnet request succeeded, decode the result and update the price point
  // If it failed, log the error message
  if (result.isOk()) {
      bitcoinPrice = result.asInt128();
  } else {
    (Witnet.ErrorCodes errorCode, string memory errorMessage) = result.asErrorMessage();
    emit Error(uint64(errorCode), errorMessage);
  }

  // In any case, set `pending` to false so a new update can be requested
  pending = false;
}
```

## Quick recap

This is what the complete contract looks like:
 
```js
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you created before
import "./requests/BitcoinPrice.sol";

// Your contract needs to inherit from UsingWitnet
contract PriceFeed is UsingWitnet {
  int128 public bitcoinPrice; // The public Bitcoin price point
  uint256 lastRequestId;      // Stores the ID of the last Witnet request
  bool pending;               // Tells if an update has been requested but not yet completed
  Request request;            // The Witnet request object, is set in the constructor

  // Allows logging errors
  event Error(uint64, string);

  // This constructor does a nifty trick to tell the `UsingWitnet` library where
  // to find the Witnet contracts on whatever Ethereum network you use.
  constructor (address _wbi) UsingWitnet(_wbi) public {
    // Instantiate the Witnet request
    request = new BitcoinPriceRequest();
  }

  function requestUpdate() public payable {
    require(!pending, "An update is already pending. Complete it first before requesting another update.");

    // Amount to pay to the bridge node relaying this request from Ethereum to Witnet
    uint256 _witnetRequestReward = 100 szabo;
    // Amount of wei to pay to the bridge node relaying the result from Witnet to Ethereum
    uint256 _witnetResultReward = 100 szabo;

    // Send the request to Witnet and store the ID for later retrieval of the result
    // The `witnetPostRequest` method comes with `UsingWitnet`
    lastRequestId = witnetPostRequest(request, _witnetRequestReward, _witnetResultReward);
  }

  // The `witnetRequestAccepted` modifier comes with `UsingWitnet` and allows to
  // protect your methods from being called before the request has been successfully
  // relayed into Witnet.
  function completeUpdate() public payable witnetRequestAccepted(lastRequestId) {
    require(pending, "There is no pending update.");

    // Read the result of the Witnet request
    // The `witnetReadResult` method comes with `UsingWitnet`
    Witnet.Result memory result = witnetReadResult(lastRequestId);

    // If the Witnet request succeeded, decode the result and update the price point
    // If it failed, log the error message
    if (result.isOk()) {
        bitcoinPrice = result.asInt128();
    } else {
      (Witnet.ErrorCodes errorCode, string memory errorMessage) = result.asErrorMessage();
      emit Error(uint64(errorCode), errorMessage);
    }

    // In any case, set `pending` to false so a new update can be requested
    pending = false;
  }
}

```

!!! question "Remember: You are not alone!"
    You are invited to join the [Witnet Community Discord][discord].
    Members of the Witnet community will be happy to answer your
    questions and doubts, as well as assisting you through this
    tutorial.

[discord]: https://discord.gg/X4uurfP
[intro]: /tutorials/bitcoin-price-feed/introduction
