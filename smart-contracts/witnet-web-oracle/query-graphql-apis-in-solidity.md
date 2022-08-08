---
description: >-
  Beyond HTTP GET and POST, the Witnet Web Oracle also gives your smart
  contracts the ability to query GraphQL APIs with full data integrity thanks to
  its multi-layered decentralization model.
---

# Query GraphQL APIs in Solidity

GraphQL APIs are just a special type of HTTP POST API. As such, you can query any GraphQL API using the HTTP POST functionality of the Witnet Web Oracle:

{% content-ref url="make-a-post-request.md" %}
[make-a-post-request.md](make-a-post-request.md)
{% endcontent-ref %}

However, for the sake of cleaner code and making things easier, the [`witnet-requests`](https://www.npmjs.com/package/witnet-requests) JavaScript library includes GraphQL as a type of data source. Please read below for an example on how to use it.

### How to query GraphQL APIs from your Solidity smart contracts

The process of defining and performing GraphQL queries in Solidity using the Witnet oracle is very similar to that of HTTP GET or POST requests. Please make sure that you are familiar with how that works:

{% content-ref url="make-a-get-request.md" %}
[make-a-get-request.md](make-a-get-request.md)
{% endcontent-ref %}

The only difference exists when specifying the data sources. Here is an example of a GraphQL data source:

```javascript
const sushiswap = new Witnet.GraphQLSource(
  "https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange",
  `{ pair(id: "0x102d39bc293472dc9ac3e6a0a9261a838b3bc6d7") { token0Price }}`,
  {"Content-Type": "application/json"}
  )
  .parseJSONMap()
  .getMap("data")
  .getMap("pair")
  .getFloat("token0Price")
  .multiply(10 ** 6)
  .round()
```

This example is using the [Sushiswap Polygon subgraph as hosted by TheGraph](https://thegraph.com/hosted-service/subgraph/sushiswap/matic-exchange) to fetch the spot price of the VSQ/DAI price pair.&#x20;

These are the arguments of `HttpPostSource`:

1. URL to query, as a String
2. The GraphQL query, as a String
3. Headers, as a JavaScript object (optional)

There is nothing special or specific to the compilation, instantiation and deployment of HTTP POST requests. If you need help with that, please check out the guide for [HTTP GET requests](make-a-get-request.md).
