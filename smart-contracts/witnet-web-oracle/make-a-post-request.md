---
description: >-
  In addition to HTTP GET, the Witnet Web Oracle also gives your smart contracts
  the ability to perform POST queries with full data integrity thanks to its
  multi-layered decentralization model.
---

# HTTP POST Requests in Solidity

One of the core functionalities of the Witnet oracle is to enable smart contracts to perform HTTP requests to APIs (both [GET](make-a-get-request.md) and POST).

This is best suited for pieces of data that are available on multiple APIs, because many of them can be queried at once and aggregated together, thus getting an increased level of decentralization and fault tolerance.

### Performing HTTP POST requests from your Solidity smart contracts <a href="#performing-http-get-queries-right-from-your-solidity-smart-contracts" id="performing-http-get-queries-right-from-your-solidity-smart-contracts"></a>

The process of defining and performing HTTP POST requests in Solidity using the Witnet oracle is very similar to that of HTTP GET requests. Please make sure that you are familiar with how that works:

{% content-ref url="make-a-get-request.md" %}
[make-a-get-request.md](make-a-get-request.md)
{% endcontent-ref %}

The only difference exists when specifying the data sources. Here is an example of an HTTP POST data source:

```javascript
const testPostSource = new Witnet.HttpPostSource(
    "https://httpbin.org/post",
    "This is the request body",
    {
        "Header-Name": "Header-Value"
    }
)
    .parseJsonMap()
    .getMap("headers")
    .getString("Header-Name")
```

This little example queries an [HTTPBin API](https://httpbin.org/) that echoes back any data and headers that you send in your POST requests. In this data source, we are sending some special header through HTTP POST, and then parsing the same header from the result that we get from the API.

These are the arguments of `HttpPostSource`:

1. URL to query, as a String
2. Request body (aka _data_), as a String (optional)
3. Headers, as a JavaScript object (optional)

There is nothing special or specific to the compilation, instantiation and deployment of HTTP POST requests. If you need help with that, please check out the guide for [HTTP GET requests](make-a-get-request.md).

