# Price Feeds Router

The Witnet's **Price Feeds Router** allows your smart contract, or Web3 application, to get the latest updated price value of any of the ***currency pairs*** subsidized by the Witnet Foundation, without needing to know the actual contract addresses in charge of requesting and receiving price updates from the Witnet oracle's sidechain.

Currency pairs are identified by a `bytes32` value, calculated as the `keccak256` hash of the currency pair caption. The caption is composed as the string concatenation of: **`Price-`**, first asset denomination (e.g. **`BTC`**), **`/`**, second asset denomination (e.g. **`USD`**), **`-`**, and the number of decimals.

> As Solidity does not support `float` types, all prices are provided as `int256` values, with a fixed number of decimals digits. For instance, if the BTC/USD price is $41,847.762289, the `WitnetPriceRouter` contract will give `41847762289` for this currency pair, as identified below. 

## Currency pairs

This table contains the currency pairs that are updated by the Witnet Foundation on a regular basis:

| **Caption** | **Full identifier** | **ID4**
|:- | :- | -:
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
### Solidity
To read price values from the Price Router contract, use the official contract address, depending on the EVM chain in which you plan to deploy your contract. 
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";

contract MyContractBoba {
    IWitnetPriceRouter public router;
    
    /**
     * Network: Boba Rinkeby
     * WitnetPriceRouter: 0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a
     */
    constructor()
        router = IWitnetPriceRouter(0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a);
    }
    
    /// Returns the BOBA / USDT price (6 decimals), ultimately provided by the Witnet oracle.
    function getBobaUsdtPrice() public view returns (int128 _price) {
        (_price,,,) = router.valueFor(bytes32(0xf723bde1));
    }
    
    /// Returns the BTC / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getBtcUsdPrice() public view returns (int128 _price) {
        (_price,,,) = router.valueFor(bytes32(0x24beead4));
    }
    
    /// Returns the ETH / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getEthUsdPrice() public view returns (int128 _price) {
        (_price,,,) = router.valueFor(bytes32(0x3d15f701));
    }
    
    /// Returns the BTC / ETH price (6 decimals), derived from the ETH/USD and 
    /// the BTC/USD pairs, ultimately provided by the Witnet oracle.
    function getBtcEthPrice() public view returns (int128 _price) {
        return (1000000 * getBtcUsdPrice()) / getEthUsdPrice();
    }
}
```

> Please, find below the list of the EVM chains currently supported by the Witnet oracle, and their corresponding Price Router contract addresses. 

### Javascript

You may also read from your Web3 application the latest updates on any of the supported currency pairs, by directly interacting with the Price Feeds Router:

```javascript
web3 = Web3(Web3.HTTPProvider('https://mainnet.boba.network'))
abi = '[{ "inputs": [{ "internalType": "bytes32", "name": "_id", "type": "bytes32" }], "name": "valueFor", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]'
addr = '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a'
contract = web3.eth.contract(address=addr, abi=abi)
// get last value for "Price-BOBA/USDT-6"
valueFor = contract.functions.valueFor().call("0xf723bde1")
print("lastPrice:", valueFor[0])
print("lastTimestamp:", valueFor[1])
print("latestUpdateStatus:", valueFor[2])
```

## Price Router contract

### Addresses
(tab: Mainnets)
| | WitnetPriceRouter | Currency pairs
|-| :-: | :-
| Boba | `` | BOBA/USDT-6
| Celo | `` | BTC/USD-6, CELO/EUR-6, CELO/USD-6, ETH/USD-6
| Conflux | `` | BTC/USD-6, CFX/USDT-6, ETH/USD-6
| Ethereum | `` | BTC/USD-6, ETH/USD-6
| Harmony | `` | BTC/USD-6, ETH/USD-6
| KuCoinChain | `` | BTC/USD-6, ETH/USD-6, KCS-USDT-6
| Metis | `` | BTC/USD-6, ETH/USD-6, METIS/USDT-6
| Polygon | `` | BTC/USD-6, ETH/USD-6

(tab: Testnets)
| | WitnetPriceRouter | Currency pairs
|-| :-: | :-
| Boba | `` | BOBA/USDT-6
| Celo | `` | BTC/USD-6, CELO/EUR-6, CELO/USD-6, ETH/USD-6
| Conflux | `` | BTC/USD-6, CFX/USDT-6, ETH/USD-6
| Ethereum | `` | BTC/USD-6, ETH/USD-6
| Harmony | `` | BTC/USD-6, ETH/USD-6
| KuCoinChain | `` | BTC/USD-6, ETH/USD-6, KCS-USDT-6
| Metis | `` | BTC/USD-6, ETH/USD-6, METIS/USDT-6
| Polygon | `` | BTC/USD-6, ETH/USD-6

### Interface
### Source code




