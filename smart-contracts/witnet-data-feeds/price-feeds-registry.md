# How To Use Witnet Price Feeds

The preferred way to consume the Witnet-powered price feeds is through the **Price Feeds Router**. ****&#x20;

This smart contract is deployed in all the **** [**supported chains**](../price-feeds/addresses/) **** and allows your own smart contracts and Web3 applications to get the latest price of any of the [**supported currency pairs**](price-feeds-registry.md#currency-pairs) **** by providing the identifier of the pair to a single Solidity method. This removes the need to know the actual contract addresses handling the price updates from the Witnet oracle.

![](<../../.gitbook/assets/image (3).png>)

Alternatively, the Price Feeds Router also lets you find out the actual address of the **Price Feed** contract that is currently serving a specific currency pair (if that pair is supported in your chain).

While all the supported currency pairs are automatically updated in a timely manner according to their different [update conditions](triggering-conditions.md), you can always use the Price Feed contracts to [trigger a new price update](using-witnet-data-feeds.md#forcing-an-update-on-a-witnet-maintained-curreny-pair) at any time, if willing to pay the required gas for that.

## Code examples

Check this out for [different examples](using-witnet-data-feeds.md) on how to read prices from the Price Feeds Router and the Price Feeds contracts:

{% content-ref url="using-witnet-data-feeds.md" %}
[using-witnet-data-feeds.md](using-witnet-data-feeds.md)
{% endcontent-ref %}

## Update conditions

Different price feeds are updated with different periods or every time that certain conditions are met. You can find all the [conditions for updating](triggering-conditions.md) here:

{% content-ref url="triggering-conditions.md" %}
[triggering-conditions.md](triggering-conditions.md)
{% endcontent-ref %}

## Currency pairs

**Currency pairs** are identified by a `bytes32` value, calculated as the `keccak256` hash of the currency pair caption. The caption is composed as the string concatenation of: **`Price-`**, first asset denomination (e.g. **`BTC`**), **`/`**, second asset denomination (e.g. **`USD`**), **`-`**, and the number of decimals.

{% hint style="success" %}
For the sake of simplicity, currency pairs served by the Witnet's Price Router can also be identified by just using the first 4 bytes (see ID4 below) of the full `bytes32` identifier (ID32).
{% endhint %}

This table contains all the currency pairs that are currently being updated on a regular basis:

| **Caption**                                                                                                                    | **ID4**          | **ID32**                                                             |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------- | -------------------------------------------------------------------- |
| [Price-AVAX/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/AvaxUsdPrice.js)                  | **`0x356ba62f`** | `0x356ba62f72df54463d38fa6850079d4ca77a035bd8f193f17b10e40d67638d57` |
| [Price-BOBA/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BobaUsdtPrice.js)                | **`0xf723bde1`** | `0xf723bde14abbffbe1f7e4cc11b10fcffdeb0873cadb864d13ca5fe5fa83255af` |
| [Price-BORING/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BoringUsdtPrice.js)            | **`0x3a9faa5a`** | `0x3a9faa5a41fb4ac71aee7850eda9baeae8e35cd64977afa3eaad8bcca04658d6` |
| [Price-BCH/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BchUsdPrice.js)                    | **`0x88e301ae`** | `0x88e301ae8c594cdfbc44c57db44b36f3137f9e3ab22a718a78fb2d25c2a2a7ad` |
| [Price-BTC/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BtcUsdPrice.js)                    | **`0x24beead4`** | `0x24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946` |
| [Price-CELO/EUR-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CeloEurPrice.js)                  | **`0x21a79821`** | `0x21a798210f2f9a59348801ac3dd2d6ba14edec757bd7bc1894181af90a7fd3a2` |
| [Price-CELO/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CeloUsdPrice.js)                  | **`0x9ed884be`** | `0x9ed884be27401b98a6c3e9d830d4288c949712e57a58235927b1a00dcd487073` |
| [Price-CFX/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CfxUsdtPrice.js)                  | **`0x65784185`** | `0x65784185a07d3add5e7a99a6ddd4477e3c8caad717bac3ba3c3361d99a978c29` |
| [Price-CRO/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CroUsdtPrice.js)                  | **`0x6b8258ca`** | `0x6b8258ca2eb12b227a7f6a0962ad90723fb176285659b4dd6f755c1fc728a2ff` |
| [Price-DAI/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/DaiUsdPrice.js)                    | **`0x9899e356`** | `0x9899e35601719f1348e09967349f72c7d04800f17c14992d6dcf2f17fac713ea` |
| [Price-ETH/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/EthUsdtPrice.js)                   | **`0x3d15f701`** | `0x3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8` |
| [Price-FRAX/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/FraxUsdtPrice.js)                | **`0x1a3ea43e`** | `0x1a3ea43ec9fce5649302474844b0d2c0734ad605b3adfaf3baaab3b7ad43b1a4` |
| [Price-FXS/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/FxsUsdtPrice.js)                  | **`0x5a352c58`** | `0x5a352c582f56d09a9d4372befee579d09061510e65d795c20901d53fa95fb9f3` |
| [Price-GLINT/USD-6](https://github.com/witnet/witnet-price-feed-examples/tree/master/contracts/routed/GlintUsdPriceFeed.sol)   | **`0x5825c341`** | `0x5825c341b55f4565086205df4508d5c676990e84c479a70694d63fc781870ea0` |
| [Price-GLINT/USDC-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/GlintUsdcPrice.js)              | **`0x38b57cfe`** | `0x38b57cfe2aab9a063c4eaf8e57ad9f8319d106ef354cde5cf1c7575ba1c9757c` |
| [Price-GLINT/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/GlintUsdtPrice.js)              | **`0x6d85fc1a`** | `0x6d85fc1ab4e41a1fc4b751a289ad9e33e38534e48e98d1b2e11693cc03ede0fb` |
| [Price-GLMR/USD-6](https://github.com/witnet/witnet-price-feed-examples/tree/master/contracts/routed/GlmrUsdPriceFeed.sol)     | **`0xbd1318d3`** | `0xbd1318d300971b390ddfb28da684ad5f54c9ca1e30c4f71cdde3f2dcce9c6b83` |
| [Price-GLMR/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/GlmrUsdtPrice.js)                | **`0xe4cc70ab`** | `0xe4cc70abfc7ab1836bb8f6dd4888b8c4aa6f3ad1d445d2c9886e5ae2750e7e14` |
| [Price-IMMO/MCUSD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/ImmoMcusdPrice.js)              | **`0x1aa645a8`** | `0x1aa645a8e8124b720e3f7dc5162efd386f327ea59f855b1afeb8ae4c54f6f8ab` |
| [Price-KCS/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/KcsUsdtPrice.js)                  | **`0x31debffc`** | `0x31debffc453c5d04a78431e7bc28098c606d2bbeea22f10a35809924a201a977` |
| [Price-KSW/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/KswUsdPrice.js)                    | **`0x547d1731`** | `0x547d1731254f0589416eee8ea5d0d69147c26de8859ea5de0a9d49d2ef75bf23` |
| [Price-METIS/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/MetisUsdtPrice.js)              | **`0x4ba45817`** | `0x4ba4581716a4352feaf028c4efebf2f9a3c6a03dc1030c92b74ea9c319606d7e` |
| [Price-MJT/KCS-9](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/MjtKcsPrice.js)                    | **`0x2dcfd554`** | `0x2dcfd5546926b857978957b40dcd5164cc788079b46ce9c1abbaedac07f96837` |
| [Price-MOVR/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/MjtKcsPrice.js)                  | **`0x92b17f49`** | `0x92b17f49728c2c6aa29264310b084129ff8d9930618302509d63bd57e127374b` |
| [Price-OKT/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OktUsdtPrice.js)                  | **`0xf75039c1`** | `0xf75039c1cc3d4c1cec5cb42ecf19a812a123ba893e673ac920f0f8d3fcebbe34` |
| [Price-OLO/USDC-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OloUsdcPrice.js)                  | **`0xf75039c1`** | `0xf75039c1cc3d4c1cec5cb42ecf19a812a123ba893e673ac920f0f8d3fcebbe34` |
| [Price-OMG/BTC-9](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgBtcPrice.js)                    | **`0xc4ec7fbc`** | `0xc4ec7fbc6384f83dad668488519c7195acafd67645ebcc7f76a84d77feaca2fb` |
| [Price-OMG/ETH-9](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgEthPrice.js)                    | **`0xe2960cc0`** | `0xe2960cc030131ae6ce0d14aea9ecfa937461aa22d2d55a36b44b27737a11bd75` |
| [Price-OMG/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgUsdtPrice.js)                  | **`0xfb2c7795`** | `0xfb2c779532e89f660244ccdd71749e8d75b3e53a8fc0d5531ef814f8b8300eef` |
| [Price-SAX/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/SaxUsdtPrice.js)                  | **`0x465eb519`** | `0x465eb5194898a1ee043df9dd69d130c648847c0bed777fe413d065b62d2891c5` |
| [Price-STELLA/USD-6](https://github.com/witnet/witnet-price-feed-examples/tree/master/contracts/routed/StellaUsdPriceFeed.sol) | **`0x6278c724`** | `0x6278c7245d4d468f46c10f2963d2f9eb36f4bfb5c19dda54f0bfd5d0db83e9b6` |
| [Price-STELLA/USDT-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/StellaUsdtPrice.js)            | **`0x84aea78e`** | `0x84aea78ea133106231c0aa5aa36d49dcf6480c55e12b140de2f713ebe4f6fb0c` |
| [Price-USDC/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/UsdcUsdPrice.js)                  | **`0x4c80cf2e`** | `0x4c80cf2e5b3d17b98f6f24fc78f661982b8ef656c3b75a038f7bfc6f93c1b20e` |
| [Price-USDT/USD-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/UsdtUsdPrice.js)                  | **`0x538f5a25`** | `0x538f5a25b39995a23c24037d2d38f979c8fa7b00d001e897212d936e6f6556ef` |
| [Price-VSQ/DAI-6](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/VsqDaiPrice.js)                    | **`0x98d36ccb`** | `0x98d36ccbb4bde86f4533dbd6577ccfd8be1ec4175d9fe3aae52079d0950ba36d` |

{% hint style="success" %}
Clicking on any of the captions above will take you to the Javascript equivalent of the **RADON script** that is processed by the Witnet oracle on every single price update of the corresponding currency pair.
{% endhint %}

{% hint style="info" %}
As introduced by the [2017 Witnet whitepaper](https://witnet.io/witnet-whitepaper.pdf), **RADON** is _"a flow-based, tacit, point-free scripting language \[...] implemented as a domain specific language (DSL), \[... that] includes normalization and aggregation methods in a MapReduce style"_.

Basically, it specifies the math, filters, reducers and tally operator to apply to the values fetched from a set of given sources, as well as the witnessing thresholds and quality levels to be met by the Witnet oracle when solving the price update.
{% endhint %}
