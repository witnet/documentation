# Code Examples

## Reading multiple price pairs from the router

The Price Router contract is the easiest and most convenient way to consume Witnet price feeds on any of the [supported chains](../../introduction/supported-chains.md).

### Solidity example

To read price values from the Price Router contract, you need first to identify the **`WitnetPriceRouter`** address specific to the chain in which you plan to deploy your contracts:

{% content-ref url="contract-addresses/" %}
[contract-addresses](contract-addresses/)
{% endcontent-ref %}

The example below shows how to read the price of two different assets from the Witnet Price Router:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";

contract MyContractBoba {
    IWitnetPriceRouter public router;
    
    /**
     * IMPORTANT: replace the address below with the WitnetPriceRouter address
     * of the network you are using! Please find the address here:
     * https://docs.witnet.io/smart-contracts/price-feeds/contract-addresses
     */
    constructor()
        router = IWitnetPriceRouter(0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25);
    }
    
    /// Returns the BTC / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getBtcUsdPrice() public view returns (int256 _price) {
        (_price,,) = router.valueFor(bytes32(0x24beead4));
    }
    
    /// Returns the ETH / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getEthUsdPrice() public view returns (int256 _price) {
        (_price,,) = router.valueFor(bytes32(0x3d15f701));
    }
    
    /// Returns the BTC / ETH price (6 decimals), derived from the ETH/USD and 
    /// the BTC/USD pairs that were ultimately provided by the Witnet oracle.
    function getBtcEthPrice() public view returns (int256 _price) {
        return (1000000 * getBtcUsdPrice()) / getEthUsdPrice();
    }
}
```

{% hint style="info" %}
As Solidity does not support `float` types, all prices are provided as `int256` values, with a fixed number of decimals digits.

For instance, if the BTC/USD price is $41,847.762289, the Price Router contract will give `41847762289` for the currency pair identified as `"Price-BTC/USD-6"`.
{% endhint %}

### Javascript example

You may also read the latest price of any of the supported currency pairs from your **Web3** application by interacting directly with the Price Router contract:

```javascript
web3 = Web3(Web3.HTTPProvider('https://mainnet.boba.network'))
abi = '[{ "inputs": [{ "internalType": "bytes32", "name": "_id", "type": "bytes32" }], "name": "valueFor", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]'
addr = '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a'
contract = web3.eth.contract(address=addr, abi=abi)
// get last value for "Price-BOBA/USDT-6"
valueFor = contract.functions.valueFor().call("0xf723bde1")
print("Price-BOBA/USDT-6:", valueFor[0])
print("> lastTimestamp:", valueFor[1])
print("> latestUpdateStatus:", valueFor[2])
```

{% hint style="info" %}
The **`WitnetPriceRouter`** contract offers a series of methods that can be used to list the currency pairs that are currently maintained by the Witnet Foundation, as well as their human-readable captions, and the Price Feed contracts currently serving updates for each one of them:
{% endhint %}

{% content-ref url="api-reference.md" %}
[api-reference.md](api-reference.md)
{% endcontent-ref %}

## Reading last price and timestamp from a Price Feed contract serving a specific pair

For&#x20;

### Solidity example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";
import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceFeed.sol";

contract MyContractCelo {

    IWitnetPriceRouter public immutable witnetPriceRouter;
    IWitnetPriceFeed public celoEurPrice;
    
    /**
     * IMPORTANT: replace the address below with the WitnetPriceRouter address
     * of the network you are using! Please find the address here:
     * https://docs.witnet.io/smart-contracts/price-feeds/contract-addresses
     */
    constructor()
        witnetPriceRouter = IWitnetPriceRouter(0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE);
        updateCeloEurPriceFeed();
    }
    
    /// Detects if the WitnetPriceRouter is now pointing to a different IWitnetPriceFeed implementation:
    function updateCeloEurPriceFeed() public {
        IERC165 _newPriceFeed = witnetPriceRouter.getPriceFeed(bytes32(0x21a79821));
        if (address(_newPriceFeed) != address(0)) {
            celoEurPrice = IWitnetPriceFeed(address(_newPriceFeed));
        }
    }
    
    /// Returns the CELO / EUR price (6 decimals), ultimately provided by the Witnet oracle, and
    /// the timestamps at which the price was reported back from the Witnet oracle's sidechain 
    /// to Celo Alfajores.
    function getCeloEurPrice() external view returns (int256 _lastPrice, uint256 _lastTimestamp) {
        (_lastPrice, _lastTimestamp,,) = celoEurPrice.lastValue();
    }
    
    // ...
}
```

{% hint style="success" %}
When interacting with a **IWitnetPriceFeed** contract, you can get not only the last valid price value (and timestamp) solved by the Witnet oracle, but also the hash of the transaction within the Witnet's sidechain that triggered that last valid update request. This Witnet transaction hash can be used as a means to verify and track the whole resolution process that took in place within the Witnet oracle's sidechain.

Moreover, you can also detect whether there is a recent price update pending to be solved, or if the latest update attempt could not get solved for whatever reason.
{% endhint %}

## Forcing an update on a Witnet-maintained curreny pair

### Solidity example

First, get from the **`WitnetPriceRouter`** contract the **`IWitnetPriceFeed`** address that is currently serving price updates on any given currency pair.

Then, just call on the `requestUpdate() payable` method.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";
import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceFeed.sol";

contract MyContractConflux {
    IWitnetPriceRouter public router;
    
    /**
     * Network: Conflux Testnet
     * WitnetPriceRouter: 0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a
     */
    constructor()
        router = IWitnetPriceRouter(0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a);
    }
    
    /// Force udpate on the CFX / USDT currency pair
    function forceCfxUsdtUpdate() external payable {
        IWitnetPriceFeed _priceFeed = router.getPriceFeed(bytes32(0x65784185));
        uint _updateFee = _priceFeed.estimateFee(tx.gasprice);
        _priceFeed.requestUpdate{value: _updateFee}();
        if (msg.value > _updateFee) {
            payable(msg.sender).transfer(msg.value - _updateFee);
        }
    }
    
    // ...
}
```

{% content-ref url="api-reference.md" %}
[api-reference.md](api-reference.md)
{% endcontent-ref %}
