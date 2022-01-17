# Price Feeds Router

The Witnet's **Price Feeds Router** allows your smart contract, or Web3 application, to get the latest updated price value of any of the [**currency pairs**](#currency-pairs) subsidized by the Witnet Foundation, without needing to know the actual contract addresses in charge of requesting and receiving price updates from the Witnet oracle's sidechain.

**Currency pairs** are identified by a `bytes32` value, calculated as the `keccak256` hash of the currency pair caption. The caption is composed as the string concatenation of: **`Price-`**, first asset denomination (e.g. **`BTC`**), **`/`**, second asset denomination (e.g. **`USD`**), **`-`**, and the number of decimals.

{% hint style="success" %}
For the sake of simplicity, currency pairs served by the Witnet's Price Router can also be identified by just using the first 4 bytes (see ID4 below) of the full `bytes32` identifier (ID32).
{% endhint %}

From the Price Router you may also retrieve the Witnet's **Price Feed** contract that is currently serving a given currency pair, if any. While the Witnet Foundation will make its best to keep all committed currency pairs updated in a timely manner, you can always use the Price Feed contract to [trigger a new price update](./using-witnet-data-feeds.md#forcing-an-update-on-a-witnet-maintained-curreny-pair) at any time, if willing to pay the required gas for that. 

## Currency pairs

This table contains the currency pairs that are currently updated by the Witnet Foundation on a regular basis:

{% content-ref url="triggering-conditions.md" %}triggering-conditionsmd{% endcontent-ref %}

| **Caption** | **ID4** | **ID32**
| :- | - | - 
| [Price-**BOBA/USDT-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BobaUsdtPrice.js) | **`f723bde1`** | `f723bde14abbffbe1f7e4cc11b10fcffdeb0873cadb864d13ca5fe5fa83255af`
| [Price-**BTC/USD-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/BtcUsdPrice.js) | **`24beead4`** | `24beead43216e490aa240ef0d32e18c57beea168f06eabb94f5193868d500946`
| [Price-**CELO/EUR-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CeloEurPrice.js) | **`21a79821`** | `21a798210f2f9a59348801ac3dd2d6ba14edec757bd7bc1894181af90a7fd3a2`
| [Price-**CELO/USD-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CeloUsdPrice.js) | **`9ed884be`** | `9ed884be27401b98a6c3e9d830d4288c949712e57a58235927b1a00dcd487073`
| [Price-**CFX/USDT-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/CfxUsdtPrice.js) | **`65784185`** | `65784185a07d3add5e7a99a6ddd4477e3c8caad717bac3ba3c3361d99a978c29`
| [Price-**FXS/USDT-6**](https://github.com/witnet/witnet-price-feed-examples/pull/65) | **`5a352c58`** | `5a352c582f56d09a9d4372befee579d09061510e65d795c20901d53fa95fb9f3`
| [Price-**KCS/USDT-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/KcsUsdtPrice.js) | **`31debffc`** | `31debffc453c5d04a78431e7bc28098c606d2bbeea22f10a35809924a201a977`
| [Price-**ETH/USD-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/EthUsdtPrice.js) | **`3d15f701`** | `3d15f7018db5cc80838b684361aaa100bfadf8a11e02d5c1c92e9c6af47626c8`
| [Price-**METIS/USDT-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/MetisUsdtPrice.js) | **`4ba45817`** | `4ba4581716a4352feaf028c4efebf2f9a3c6a03dc1030c92b74ea9c319606d7e`
| [Price-**OMG/BTC-9**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgBtcPrice.js) | **`c4ec7fbc`** | `c4ec7fbc6384f83dad668488519c7195acafd67645ebcc7f76a84d77feaca2fb`
| [Price-**OMG/ETH-9**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgEthPrice.js) | **`e2960cc0`** | `e2960cc030131ae6ce0d14aea9ecfa937461aa22d2d55a36b44b27737a11bd75`
| [Price-**OMG/USDT-6**](https://github.com/witnet/witnet-price-feed-examples/blob/master/requests/OmgUsdtPrice.js) | **`fb2c7795`** | `fb2c779532e89f660244ccdd71749e8d75b3e53a8fc0d5531ef814f8b8300eef`

{% hint style="success" %}
Clicking on any of the captions above will take you to the Javascript equivalent of the **RADON script** that will be processed by the Witnet oracle on every single price update of the corresponding currency pair.
{% endhint %}

{% hint style="tip" %}
As introduced by the [2017 Witnet whitepaper](https://witnet.io/witnet-whitepaper.pdf), **RADON** is *"a flow-based, tacit, point-free scripting language [...] implemented as a domain specific language (DSL), [... that] includes normalization and aggregation methods in a MapReduce style"*.

Basically, it specifies the math, filters, reducers and tally operator to apply to the values fetched from a set of given sources, as well as the witnessing thresholds and quality levels to be met by the Witnet oracle when solving the price update.
{% endhint %}
