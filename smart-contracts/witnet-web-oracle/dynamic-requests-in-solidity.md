# Dynamic Requests in Solidity



### 1.  Assess the HTTP Request

Begin by thoroughly understanding the HTTP request that you need Witnet to resolve. Identify the parameters that your smart contract may require, and determine where these parameters are located within the HTTP request. Additionally, consider how you will convert the returned JSON object into a value that can be reported back to your smart contract.

To illustrate the process, let's use an example HTTP request:

**`https://api.weather.gov/gridpoints/BOU/63,62/forecast`**.

This API endpoint provides the weather forecast for a specific grid location.

1.  Identify Parameters: Review the HTTP request and identify the parameters that your smart contract may require. In this case, the parameters could be the latitude and longitude of the grid location. To convert latitude and longitude to a grid location use. If you do not know the grid that correlates to your location, you can use the `/points` endpoint to retrieve the exact grid endpoint by coordinates:

    **`https://api.weather.gov/points/{latitude},{longitude>}`**

    For example: **`https://api.weather.gov/points/39.7456,-97.0892`**


2.  Locate Parameters: Determine where these parameters are located within the HTTP request. In our example, the grid locations are part of the URL path. The value “BOU” represents grid ID and the values "63" and "62" represent a 2.5km grid section, respectively, in the URL **`https://api.weather.gov/gridpoints/BOU/63,62/forecast`**.

    **`https://api.weather.gov/gridpoints/{gridId}/{gridX},{gridY}/forecast`**\
    &#x20;
3. Convert JSON Object: Consider how you will convert the returned JSON object into a value that can be reported back to your smart contract. In the case of the weather forecast API, the response will likely be a JSON object containing various weather data fields. You will need to extract the relevant information, such as temperature, humidity, or precipitation, and convert it into a format suitable for your smart contract, such as integers or strings.\


This public weather API endpoint will return JSON that looks something like this:

```json
{
	...
	"properties": {
		...
		"periods": [
			{
				...
				"name": "This Afternoon",
				"temperature": 69,
				"temperatureUnit": "F",
        "temperatureTrend": "falling",
				...
			}, 
			{
				"name": "Tonight",
				...
			},
			...
		},
	},
} 
```

We can see that the returned JSON value is a map that contains a map called “properties”, which contains an array called “periods”. Each item in the “periods” array is a map that contains several values, we are only interested in the temperature.

To write a request script that will fetch the temperature, we use the RADON scripting language:

```jsx
witnetRadonScript()
  .parseJSONMap()
  .getMap("properties")
  .getArray("periods")
  .getMap(0)
  .getInteger("temperature")
```

####

### 2.  Build a WitnetRequestTemplate (WRT)

To create a parameterized data request, you will need to build a WitnetRequestTemplate (WRT) instance based on the assessment you conducted in the previous step. Typically, your smart contract will only need to handle a single WRT. You can create the WRT using an off-chain migration script or programmatically within a smart contract constructor or initializer method.

Import the Witnet Solidity Bridge framework within your project folder:

```bash
$ npm install --save-dev witnet-solidity
$ npx witnet init
```

Edit the retrievals.js file to define the retrieval

`./migrations/witnet/radons/retrievals.js`

```jsx
const Witnet = require("witnet-requests");
const witnetRadonScript = () => new Witnet.Script([ Witnet.TYPES.STRING ]);
module.exports = {
  'dynamic-weather-request-example': {
    requestMethod: Witnet.Types.RETRIEVAL_METHODS.HttpGet,
    requestAuthority: "<https://api.weather.gov>",
    requestPath: "gridpoints/\\\\0\\\\/\\\\1\\\\,\\\\2\\\\/forecast",
    requestScript: witnetRadonScript()
        .parseJSONMap()
        .getMap("properties")
        .getArray("periods")
        .getMap(0)
        .getInteger("temperature"),
    templateValues: {
      gridId: ["BOU"],
      gridX: ["63"],
      gridY: ["62"]
    },
  },
};
```

Edit the templates.js file to define your template calling the retrieval you just constructed.

`./migrations/witnet/templates.js`

```jsx
module.exports = {
 WitnetdynamicRequestExample: {
    WitnetRequestTemplate1: {
      retrievals: [
        'dynamic-weather-request-example',
      ],
      aggregator: 'mode-no-filters',
      tally: 'mode-no-filters',
      tests: {
        test1: [
          [ "BOU", "63", "62" ],
        ],
      },
    }
  },
};
```

With the retrieval and template created, you can run `$ witnet test` to test the request locally in the same way to will be processed by the Witnet protocol. Once you are confident that your request is correctly constructed, you can run `$ witnet deploy` to deploy your WitnetRequestTemplate.

For this purpose, you can utilize the WitnetRequestFactory (WRF) contract. Alternatively, you can obtain this address by calling the factory() method at the WitnetRequestBoard (WRB) contract address.

{% hint style="info" %}
&#x20;The WRF contract has a predetermined address across all supported chains, currently set as `0x1111111FDE7dC956E3d7922Bc779D9E2349Afb63`.
{% endhint %}



### 3.  Settle a WitnetRequest (WR)

Every time your smart contract needs to retrieve a new Key from a specific gridX and gridY, you must create and settle a new WitnetRequest (WR) contract. This involves posting the WR to the WitnetRequestBoard (WRB). When posting the WR, you need to specify certain parameters for the Witnet Service Level Agreement (SLA). These parameters determine the level of decentralization and security for your application and help ensure successful query resolution.

Upon posting the WR to the WRB, you will receive a unique queryId. You can use this queryId to track the status of the query and ultimately read the result provided by Witnet when it becomes available.



### 4.  Check the Status of the Query

Implement a method in your smart contract that checks the status of a previously posted query. When a result is ready, you need to determine whether it was successful or not. In the case of a successful result, you can use various helper methods available in the Witnet and WitnetCBOR libraries to deserialize the result into a usable format (e.g., converting a string into an address).

It's important to consider that a query can fail for different reasons.

At the application level:

* the gridId or positions might be invalid
* &#x20;the Key might not be found,
* or it could contain an unexpected value type

At the Witnet level:

* the required consensus for the SLA might not be reached ("Witnet: Tally: Insufficient consensus"),
* there might not be enough interested witnessing nodes due to low incentives ("Witnet: Tally: Insufficient commits").



#### Step 5: Test and Deploy

```bash
$ npx witnet avail
```

`$ npx witnet console`

This will allow you to access an EVM console that you can interact with contracts live

```
 $ npx witnet console
```

This will test the Witnet data request locally to ensure that you are getting the correct data before you deploy your contracts.

```
 $ npx witnet test
```

This will deploy and migrate your contracts to the network you chose.

```bash
$ npx witnet deploy
```

Usage:

```bash
$ npx witnet deploy <witnet-supported-chain> --artifacts <comma-separated-artifacts-to-be-deployed>
```

To get a list of \<witnet-supported-chain>:

```
$ npx witnet avail --chains
```

No need to specify `<witnet-supported-chain>` if `WITNET_SIDECHAIN` environment variable is set, though. However, if `<witnet-supported-chain>` is specified, that will always prevail upon the value of `WITNET_SIDECHAIN`.
