# 🌐 APIs and HTTP GET/POST

One of the core capabilities of the Witnet protocol is to enable smart contracts to securely retrieve data from conventional APIs through HTTP(S) GET and POST calls.

This is specially convenient for pieces of data that are available from multiple sources, because many of them can be queried at once and aggregated together, thus getting an increased level of decentralization and fault tolerance.

### Performing HTTP GET queries right from your Solidity smart contracts

#### Project setup

The HTTP GET/POST capability is enabled by the [Witnet Truffle Box](https://github.com/witnet/truffle-box), a [Truffle](https://www.trufflesuite.com) template project that includes everything you need to quickly get up to speed:

```
mkdir my-first-witnet-project
cd my-first-witnet-project
truffle unbox witnet/truffle-box
```

#### Data request file

HTTP GET/POST queries are defined using a Javascript based DSL and stored in the `requests` folder of your repository.

This exemplifies a data request that fetches the BTC/USD price from 2 different REST APIs:

```javascript
import * as Witnet from "witnet-requests"

const bitstamp = new Witnet.Source("https://www.bitstamp.net/api/ticker/")
  .parseJSONMap()
  .getFloat("last")

const coindesk = new Witnet.Source("https://api.coindesk.com/v1/bpi/currentprice.json")
  .parseJSONMap()
  .getMap("bpi")
  .getMap("USD")
  .getFloat("rate_float")

const aggregator = new Witnet.Aggregator({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

const tally = new Witnet.Tally({
  filters: [
   [Witnet.Types.FILTERS.deviationStandard, 1.5]
  ],
  reducer: Witnet.Types.REDUCERS.averageMean
})

const request = new Witnet.Request()
  .addSource(bitstamp)
  .addSource(coindesk)
  .setAggregator(aggregator)
  .setTally(tally)
  .setQuorum(25)
  .setFees(1000000, 1000000)
  .setCollateral(10000000000)

export { request as default }
```

{% hint style="info" %}
Want to make sense of all the Javascript above? Please make sure to check out the full [HTTP GET tutorial](../../smart-contracts/apis-and-http-get-post-oracle/make-a-get-request.md), where every step is explained in detail
{% endhint %}

### Learn More About The Witnet HTTP GET/POST Oracle

You can find here the complete documentation and API reference for the Witnet HTTP GET/POST oracle, along many more examples and walkthroughs:

{% content-ref url="../../smart-contracts/witnet-web-oracle/" %}
[witnet-web-oracle](../../smart-contracts/witnet-web-oracle/)
{% endcontent-ref %}
