# Price Feeds Router

The Witnet's **Price Feeds Router** allows your smart contract, or Web3 application, to get the latest updated price value of any of the ***currency pairs*** subsidized by the Witnet Foundation, without needing to know the actual contract addresses in charge of requesting and receiving price updates from the Witnet oracle's sidechain.

Currency pairs are identified by a `bytes32` value, calculated as the `keccak256` hash of the currency pair caption. The caption is composed as the string concatenation of: **`Price-`**, first asset denomination (e.g. **`BTC`**), **`/`**, second asset denomination (e.g. **`USD`**), **`-`**, and the number of decimals.

> As Solidity does not support `float` types, all prices are provided as `int256` values, with a fixed number of decimals digits. For instance, if the BTC/USD price is $41,847.762289, the `WitnetPriceRouter` contract will give `41847762289` for this currency pair, as identified below. 

You may also retrieve the Price Feed contract currently serving a given currency pair, if any. While the Witnet Foundation will make its best to keep all committed currency pairs updated in a timely manner, you can always use the Price Feed contract to trigger a new price update at any time, if willing to pay the required gas for that. 

## Currency pairs

This table contains the currency pairs that are updated by the Witnet Foundation on a regular basis:

| **Caption** | **Full identifier** | **ID4**
|:- | :- | :-
| Price-**BOBA/USDT-6** | `f723bde14abbffbe1f7e4cc11b10fcffdeb0873cadb864d13ca5fe5fa83255af` | **`0xf723bde1`**
| Price-**BTC/USD-6** | `24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946` | **`0x24beead4`**
| Price-**CELO/EUR-6** | `21a798210f2f9a59348801ac3dd2d6ba14edec757bd7bc1894181af90a7fd3a2` | **`0x21a79821`**
| Price-**CELO/USD-6** | `9ed884be27401b98a6c3e9d830d4288c949712e57a58235927b1a00dcd487073` | **`0x9ed884be`**
| Price-**CFX/USDT-6** | `65784185a07d3add5e7a99a6ddd4477e3c8caad717bac3ba3c3361d99a978c29` | **`0x65784185`**
| Price-**KCS/USDT-6** | `31debffc453c5d04a78431e7bc28098c606d2bbeea22f10a35809924a201a977` | **`0x31debffc`**
| Price-**ETH/USD-6** | `3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8` | **`0x3d15f701`**
| Price-**METIS/USDT-6** | `4ba4581716a4352feaf028c4efebf2f9a3c6a03dc1030c92b74ea9c319606d7e` | **`0x4ba45817`**
| Price-**OMG/BTC-9** | `c4ec7fbc6384f83dad668488519c7195acafd67645ebcc7f76a84d77feaca2fb` | **`0xc4ec7fbc`**
| Price-**OMG/ETH-9** | `e2960cc030131ae6ce0d14aea9ecfa937461aa22d2d55a36b44b27737a11bd75` | **`0xe2960cc0`**
| Price-**OMG/USDT-6** | `fb2c779532e89f660244ccdd71749e8d75b3e53a8fc0d5531ef814f8b8300eef` | **`0xfb2c7795`**

> For the sake of simplicity, Witnet-supported currency pairs can also be identified by just using the first 4 bytes of the `keccak256` hash.

## Code snippets
### Solidity examples
#### **Reading multiples currency pairs from the router**
To read price values from the Price Router contract (aka `WitnetPriceRouter`), use the official Price Router address, depending on the EVM chain in which you plan to deploy your contract. 

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
    function getBtcUsdPrice() public view returns (int128 _price) {
        (_price,,) = router.valueFor(bytes32(0x24beead4));
    }
    
    /// Returns the ETH / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getEthUsdPrice() public view returns (int128 _price) {
        (_price,,) = router.valueFor(bytes32(0x3d15f701));
    }
    
    /// Returns the BTC / ETH price (6 decimals), derived from the ETH/USD and 
    /// the BTC/USD pairs that were ultimately provided by the Witnet oracle.
    function getBtcEthPrice() public view returns (int128 _price) {
        return (1000000 * getBtcUsdPrice()) / getEthUsdPrice();
    }
}
```
> Please, find below the list of the EVM chains currently supported by the Witnet oracle, and their corresponding Price Router contract addresses. 

#### **Forcing an update on a Witnet-maintained price feed**
First, get from the WitnetPriceRouter contract the WitnetPriceFeed address that is currently serving price updates on any given currency pair. Then, just call on the `requestUpdate() payable` method.

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

### Javascript example

You may also read from your Web3 application the latest updates on any of the supported currency pairs, by directly interacting with the Price Router contract:

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

## Price Router contract

### API reference
Unrestricted functions defined within the [`IWitnetPriceRouter`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetPriceRouter.sol) interface:
| Function | Description
| :- | :-
| `currencyPairId(string)` | Pure helper function returning the `keccak256` hash (aka ID) of the provided string caption.
| `getPriceFeed(bytes32)` | Returns the ERC165-compliant price feed contract currently serving updates on the given currency pair.
| `getPriceFeedCaption(address)` | Returns human-readable caption of the currency pair being served by the given price feed contract address.
| `lookupERC2362ID(bytes32)` | Returns a human-readable caption of the given currency pair identifier, if known.
| `supportedCurrencyPairs()` | Returns a list of known currency pairs IDs.
| `supportsCurrencyPair(bytes32)` | Returns `true` if the given pair is currently being served by a compliant price feed contract.
| `supportsPriceFeed(address)` | Returns `true` if the given price feed contract is currently serving updates to any known currency pair.

### Addresses
(tab: Mainnets)
| EVM chain | `WitnetPriceRouter` address | Supported currency pairs
|-| :- | :-
| ***Boba** (L2)* | [`0x93f61D0D5F623144e7C390415B70102A9Cc90bA5`](https://blockexplorer.boba.network/address/0x93f61D0D5F623144e7C390415B70102A9Cc90bA5/read-contract) | <a href="https://feeds.witnet.io/feeds/boba-mainnet_boba-usdt_6" target="_blank" rel="noopener noreferrer">BOBA/USDT-6</a>
| ***Celo*** | [`0x931673904eB6E69D775e35F522c0EA35575297Cb`](https://explorer.celo.org/address/0x931673904eB6E69D775e35F522c0EA35575297Cb/read-contract) | <a href="https://feeds.witnet.io/feeds/celo-mainnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/celo-mainnet_celo-eur_6" target="_blank" rel="noopener noreferrer">CELO/EUR-6</a>, <a href="https://feeds.witnet.io/feeds/celo-mainnet_celo-usd_6" target="_blank" rel="noopener noreferrer">CELO/USD-6</a>, <a href="https://feeds.witnet.io/feeds/celo-mainnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***Conflux*** | [`0x806c8dFd322EE2d52b188CC472e0814F64304C32`](https://confluxscan.io/address/cfx:acag3dt7gj1sfzkndcgpj61aufh0jpcpgjcmvbnnrx?tab=contract-viewer) | <a href="https://feeds.witnet.io/feeds/conflux-mainnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/conflux-mainnet_cfx-usdt_6" target="_blank" rel="noopener noreferrer">CFX/USDT-6</a>, <a href="https://feeds.witnet.io/feeds/conflux-mainnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***Ethereum*** | [`0x83A757eAe821Ad7B520D9A74952337138A80b2AF`](https://etherscan.io/address/0x83a757eae821ad7b520d9a74952337138a80b2af#readContract) | <a href="https://feeds.witnet.io/feeds/ethereum-mainnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/ethereum-mainnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***KuCoinChain*** | [`0xD39D4d972C7E166856c4eb29E54D3548B4597F53`](https://scan.kcc.io/address/0xD39D4d972C7E166856c4eb29E54D3548B4597F53/read-contract) | <a href="https://feeds.witnet.io/feeds/kcc-mainnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/kcc-mainnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>, <a href="https://feeds.witnet.io/feeds/kcc-mainnet_kcs-usdt_6" target="_blank" rel="noopener noreferrer">KCS-USDT-6</a>
| ***Metis** (L2)* | [`0xD39D4d972C7E166856c4eb29E54D3548B4597F53`](https://andromeda-explorer.metis.io/address/0xD39D4d972C7E166856c4eb29E54D3548B4597F53/read-contract) | <a href="https://feeds.witnet.io/feeds/metis-mainnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/metis-mainnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>, <a href="https://feeds.witnet.io/feeds/metis-mainnet_metis-usdt_6" target="_blank" rel="noopener noreferrer">METIS/USDT-6</a>

(tab: Testnets)
| EVM chain | `WitnetPriceRouter` address | Supported currency pairs
|-| :- | :-
| ***Boba** Rinkeby* | [`0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a`](https://blockexplorer.rinkeby.boba.network/address/0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a/read-contract) | <a href="https://feeds.witnet.io/feeds/boba-rinkeby_boba-usdt_6" target="_blank" rel="noopener noreferrer">BOBA/USDT-6</a>, <a href="https://feeds.witnet.io/feeds/boba-rinkeby_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/boba-rinkeby_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6, <a href="https://feeds.witnet.io/feeds/boba-rinkeby_omg-btc_9" target="_blank" rel="noopener noreferrer">OMG/BTC-9</a>, <a href="https://feeds.witnet.io/feeds/boba-rinkeby_omg-eth_9" target="_blank" rel="noopener noreferrer">OMG/ETH-9</a>, <a href="https://feeds.witnet.io/feeds/boba-rinkeby_omg-usdt_6" target="_blank" rel="noopener noreferrer">OMG/USDT-6</a>
| ***Celo** Alfajores* | [`0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE`](https://alfajores-blockscout.celo-testnet.org/address/0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE/read-contract) | <a href="https://feeds.witnet.io/feeds/celo-alfajores_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/celo-alfajores_celo-eur_6" target="_blank" rel="noopener noreferrer">CELO/EUR-6</a>, <a href="https://feeds.witnet.io/feeds/celo-alfajores_celo-usd_6" target="_blank" rel="noopener noreferrer">CELO/USD-6</a>, <a href="https://feeds.witnet.io/feeds/celo-alfajores_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***Conflux** Testnet* | [`0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25`](https://testnet.confluxscan.io/address/cfxtest:ach0dv7vv7y51b80cyr2y1nxh2pyn4xpeyst6h7jph?tab=contract-viewer) | <a href="https://feeds.witnet.io/feeds/conflux-testnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/conflux-testnet_cfx-usdt_6" target="_blank" rel="noopener noreferrer">CFX/USDT-6</a>, <a href="https://feeds.witnet.io/feeds/conflux-testnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***Ethereum** Goerli* | [`0x1cF3Aa9DBF4880d797945726B94B9d29164211BE`](https://goerli.etherscan.io/address/0x1cF3Aa9DBF4880d797945726B94B9d29164211BE#readContract) | <a href="https://feeds.witnet.io/feeds/ethereum-goerli_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/ethereum-goerli_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***Ethereum** Rinkeby* | [`0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9`](https://rinkeby.etherscan.io/address/0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9#readContract) | <a href="https://feeds.witnet.io/feeds/ethereum-rinkeby_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/ethereum-rinkeby_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***Harmony** Testnet* | [`0x08d479a544b05B297454e5CAc133abA3a584AB8E`](https://explorer.pops.one/address/0x08d479a544b05B297454e5CAc133abA3a584AB8E?activeTab=7) | <a href="https://feeds.witnet.io/feeds/harmony-testnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/harmony-testnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>
| ***KCC** Testnet* | [`0xba7CF62498340fa3734EC51Ca8A69928F0d9E03a`](https://scan-testnet.kcc.network/address/0xba7CF62498340fa3734EC51Ca8A69928F0d9E03a/read-contract) | <a href="https://feeds.witnet.io/feeds/kcc-testnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/kcc-testnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>, <a href="https://feeds.witnet.io/feeds/kcc-testnet_kcs-usdt_6" target="_blank" rel="noopener noreferrer">KCS-USDT-6</a>
| ***Metis** Stardust* | [`0x5134EAF08bcf8cE1922991150AAad1774e93751f`](https://stardust-explorer.metis.io/address/0x5134EAF08bcf8cE1922991150AAad1774e93751f/read-contract) | <a href="https://feeds.witnet.io/feeds/metis-testnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/metis-testnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>, <a href="https://feeds.witnet.io/feeds/metis-testnet_metis-usdt_6" target="_blank" rel="noopener noreferrer">METIS/USDT-6</a>
| ***Polygon** Mumbai* | [`0x6d5544ca5b35bf2e7a78ace4E7B8d191fe5C9FAb`](https://mumbai.polygonscan.com/address/0x6d5544ca5b35bf2e7a78ace4E7B8d191fe5C9FAb#readContract) | <a href="https://feeds.witnet.io/feeds/polygon-testnet_btc-usd_6" target="_blank" rel="noopener noreferrer">BTC/USD-6</a>, <a href="https://feeds.witnet.io/feeds/polygon-testnet_eth-usd_6" target="_blank" rel="noopener noreferrer">ETH/USD-6</a>

## Price Feed contracts

### API reference
Functions defined within the [`IWitnetPriceFeed`](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetPriceFeed.sol) interface:
    
| Function | Description
| :- | :-
| `estimateUpdateFee(uint256)` | Estimates minimum fee amount in native currency to be paid when requesting a new price update. Actual fee depends on the gas price when calling `requestUpdate()`.
| `lastPrice()` | Returns result of the last valid price update request successfully solved by the Witnet oracle.
| `lastTimestamp()` | Returns the EVM-timestamp when last valid price was reported back from the Witnet oracle.
| `lastValue()` | Returns a tuple containing last valid price and timestamp, the Witnet transaction hash that triggered the last valid update, as well as the status code of the latest update request that got posted to the Witnet oracle.
| `latestQueryId()` | Returns identifier of the latest update request posted to the Witnet oracle.
| `latestUpdateDrTxHash()` | Returns hash of the Witnet transaction that triggered the latest update request, or `0x0` while it remains unsolved.
| `latestUpdateErrorMessage()` | Returns an explanatory error message, if any, of the latest update request posted to the Witnet oracle, or an empty string if it was not yet solved, or was solved with no errors.
| `latestUpdateStatus()` | Returns the status code of the latest update request posted to the Witnet oracle: `200`, if the latest update request was succesfully solved with no errors; `400`, if the latest update request was solved with errors; or `404`, if the latest update request was not solved yet.
| `pendingUpdate()` | Returns `true` if the latest update request posted to the Witnet oracle has not been solved yet.
| `requestUpdate()` | Posts a new price udpate request to the Witnet oracle. Requires payment of a fee that depends on the value of `tx.gasprice`. If the previous update request was not solved yet, calling this method again allows you to upgrade the update fee, if called with a higher `tx.gasprice`value.
| `supportsInterface(bytes4)` | Tells whether this contract implements the interface defined by its `interfaceId`. See [EIP-165](https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]). Price Feed contracts must at least implement the **IERC165** and the **IWitnetPriceFeed** interfaces. 

### RADON scripts
Witnet's Price Feed contracts contain its own immutable CBOR-encoded `bytecode()` reflecting the actual **RADON script** (link) that will be processed by the Witnet oracle on every single price update. These bytecodes have been compiled off-chain from their Javascript-equivalent scripts:

=== "BOBA/USDT-6"
https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BobaUsdtPrice.js

=== "BTC/USD-6"
https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BtcUsdPrice.js

=== "CELO/EUR-6"
{% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CeloEurPrice.js" %}
=== "CELO/USD-6"
{% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CeloUsdPrice.js" %}

=== "CFX/USDT-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CfxUsdtPrice.js" %}
=== "ETH/USD-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/EthUsdPrice.js" %}

=== "KCS/USDT-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/KcsUsdtPrice.js" %}

=== "METIS/USDT-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/MetisUsdtPrice.js" %}

=== "OMG/BTC-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgBtcPrice.js" %}

=== "OMG/ETH-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgEthPrice.js" %}

=== "OMG/USDT-6"
    {% embed url ="https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgUsdtPrice.js" %}
    
> As introduced by the 2017 Witnet whitepaper (link), RADON is *"a flow-based, tacit, point-free scripting language [...] implemented as a domain specific language (DSL), [... that] includes normalization and aggregation methods in a MapReduce style"*. Basically, it specifies the math, filters, reducers and tally operator to apply to the values fetched from a set of given sources, as well as the witnessing thresholds and quality levels (link) to be met by the Witnet oracle when solving the price update.

> You can easily compile your own Data Feeds off-chain, not only price feeds, but actually data feeds of any kind (i.e. weather, social-networks, sports, etc.), by writing Javascript like the ones shown above, and using the `witnet-request-js` [library](https://github.com/witnet/witnet-requests-js). You can also learn on how to instantiate your own `WitnetPriceFeed` contracts, with your own Witnet Data Request bytecodes, by following the examples in the `witnet-price-feeds` [Github repository](https://github.com/witnet/witnet-price-feed-examples).
