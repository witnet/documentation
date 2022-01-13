# Using Price Feeds

## Reading multiple currency pairs from the router

### Solidity

To read price values from the Price Router contract use the official **`WitnetPriceRouter`** address, depending on the EVM chain in which you plan to deploy your contract. 

{% content-ref url="contract-addresses/README.md" %} contract-addresses/README.md {% endcontent-ref %}

For instance, this example shows a possible implementation for the Boba/Rinkeby testnet, a Layer-2 solution bound to Ethereum Rinkeby:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";

contract MyContractBoba {
    IWitnetPriceRouter public router;
    
    /**
     * Network: Boba Rinkeby
     * WitnetPriceRouter: 0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25
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

{% hint style="danger" %}
As Solidity does not support `float` types, all prices are provided as `int256` values, with a fixed number of decimals digits.

For instance, if the BTC/USD price is $41,847.762289, the Price Router contract will give `41847762289` for the currency pair identified as `"Price-BTC/USD-6"`.
{% endhint %}

### Javascript

You may also read from your **Web3** application the latest updates on any of the supported currency pairs, by directly interacting with the Price Router contract:

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

{% content-ref url="api-reference.md#IWitnetPriceRouter" %}api-reference.md{% endcontent-ref %}


## Forcing an update on a Witnet-maintained price feed

### Solidity

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

{% hint style="success" %}
Lorem ipusm
{% endhint %}

{% content-ref url="api-reference.md#IWitnetPriceFeed" %}api-reference.md{% endcontent-ref %}
{% content-ref url="api-reference.md#IWitnetRequest" %}api-reference.md{% endcontent-ref %}
{% content-ref url="api-reference.md#UsingWitnet" %}api-reference.md{% endcontent-ref %}
