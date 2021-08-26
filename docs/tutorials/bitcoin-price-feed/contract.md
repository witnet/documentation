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

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;


// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you created before
import "./requests/BitcoinPrice.sol";

// Your contract needs to inherit from UsingWitnet
contract PriceFeed is UsingWitnet {

    // The public Bitcoin price point
    uint64 public lastPrice;

    // Stores the ID of the last Witnet request
    uint256 public lastRequestId;

    // Stores the timestamp of the last time the public price point was updated
    uint256 public timestamp;

    // Tells if an update has been requested but not yet completed
    bool public pending;

    // The Witnet request object, is set in the constructor
    Request public request;

    // Emits when the price is updated
    event PriceUpdated(uint64);

    // Emits when found an error decoding request result
    event ResultError(string);

    // This constructor does a nifty trick to tell the `UsingWitnet` library where
    // to find the Witnet contracts on whatever Ethereum network you use.
    constructor (WitnetRequestBoard _wrb) UsingWitnet(_wrb) {
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

```solidity
/**
 * @notice Sends `request` to the WitnetRequestBoard.
 * @dev This method will only succeed if `pending` is 0.
 **/
function requestUpdate() public payable {
    require(!pending, "Complete pending request before requesting a new one");

    // Send the request to Witnet and store the ID for later retrieval of the result
    // The `_witnetPostRequest` method comes with `UsingWitnet`
    lastRequestId = _witnetPostRequest(request);

    // Signal that there is already a pending request
    pending = true;
}
```

## Write the `completeUpdate` method that reads the result of the Witnet request

```solidity
/**
 * @notice Reads the result, if ready, from the WitnetRequestBoard.
 * @dev The `witnetRequestAccepted` modifier comes with `UsingWitnet` and allows to
 * protect your methods from being called before the request has been successfully
 * relayed into Witnet.
 **/
function completeUpdate() public witnetRequestResolved(lastRequestId) {
    require(pending, "There is no pending update.");

    // Read the result of the Witnet request
    // The `_witnetReadResult` method comes with `UsingWitnet`
    Witnet.Result memory result = _witnetReadResult(lastRequestId);

    // If the Witnet request succeeded, decode the result and update the price point
    // If it failed, revert the transaction with a pretty-printed error message
    // `witnet.isOk()`, `witnet.asUint64()` and `witnet.asErrorMessage()` come with `UsingWitnet`
    if (witnet.isOk(result)) {
        lastPrice = witnet.asUint64(result);
        timestamp = block.timestamp;
        emit PriceUpdated(lastPrice);
    } else {
        string memory errorMessage;

        // Try to read the value as an error message, catch error bytes if read fails
        try witnet.asErrorMessage(result) returns (Witnet.ErrorCodes, string memory e) {
            errorMessage = e;
        }
        catch (bytes memory errorBytes){
            errorMessage = string(errorBytes);
        }
        emit ResultError(errorMessage);
    }

    // In any case, set `pending` to false so a new update can be requested
    pending = false;
}
```

## Quick recap

This is what the complete contract looks like:
 
```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;


// Import the UsingWitnet library that enables interacting with Witnet
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol";
// Import the BitcoinPrice request that you created before
import "./requests/BitcoinPrice.sol";

// Your contract needs to inherit from UsingWitnet
contract PriceFeed is UsingWitnet {

    // The public Bitcoin price point
    uint64 public lastPrice;

    // Stores the ID of the last Witnet request
    uint256 public lastRequestId;

    // Stores the timestamp of the last time the public price point was updated
    uint256 public timestamp;

    // Tells if an update has been requested but not yet completed
    bool public pending;

    // The Witnet request object, is set in the constructor
    Request public request;

    // Emits when the price is updated
    event PriceUpdated(uint64);

    // Emits when found an error decoding request result
    event ResultError(string);

    // This constructor does a nifty trick to tell the `UsingWitnet` library where
    // to find the Witnet contracts on whatever Ethereum network you use.
    constructor (WitnetRequestBoard _wrb) UsingWitnet(_wrb) {
        // Instantiate the Witnet request
        request = new BitcoinPriceRequest();
    }

    /**
     * @notice Sends `request` to the WitnetRequestBoard.
     * @dev This method will only succeed if `pending` is 0.
     **/
    function requestUpdate() public payable {
        require(!pending, "Complete pending request before requesting a new one");

        // Send the request to Witnet and store the ID for later retrieval of the result
        // The `_witnetPostRequest` method comes with `UsingWitnet`
        lastRequestId = _witnetPostRequest(request);

        // Signal that there is already a pending request
        pending = true;
    }

    /**
     * @notice Reads the result, if ready, from the WitnetRequestBoard.
     * @dev The `witnetRequestAccepted` modifier comes with `UsingWitnet` and allows to
     * protect your methods from being called before the request has been successfully
     * relayed into Witnet.
     **/
    function completeUpdate() public witnetRequestResolved(lastRequestId) {
        require(pending, "There is no pending update.");

        // Read the result of the Witnet request
        // The `_witnetReadResult` method comes with `UsingWitnet`
        Witnet.Result memory result = _witnetReadResult(lastRequestId);

        // If the Witnet request succeeded, decode the result and update the price point
        // If it failed, revert the transaction with a pretty-printed error message
        // `witnet.isOk()`, `witnet.asUint64()` and `witnet.asErrorMessage()` come with `UsingWitnet`
        if (witnet.isOk(result)) {
            lastPrice = witnet.asUint64(result);
            timestamp = block.timestamp;
            emit PriceUpdated(lastPrice);
        } else {
            string memory errorMessage;

            // Try to read the value as an error message, catch error bytes if read fails
            try witnet.asErrorMessage(result) returns (Witnet.ErrorCodes, string memory e) {
                errorMessage = e;
            }
            catch (bytes memory errorBytes){
                errorMessage = string(errorBytes);
            }
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
