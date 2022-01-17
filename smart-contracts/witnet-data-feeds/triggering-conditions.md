# Triggering Conditions

Depending on the currency pair and the network in which is deployed, the Witnet Foundation will commit and pay for a regular price update according to the following parameters:

### Heartbeat

### Deviation threshold

### Cooldown period

---

{% hint style="info" %}
While the Witnet Foundation pays for every single price update according to these triggering conditions, every single [supported currency pair](./price-feeds-registry#currency-pairs) involves a selection of **well-known and reputed sources** (i.e. exchanges), proven to trade significant volumes in a daily basis, and totally unconnected to the Witnet Foundation itself. 
{% endhint %}

{% hint style="success" %}
Would the established triggering conditions for a certain currency pair not meet the service levels required by your application, you can always [trigger a new price update](./using-witnet-data-feeds.md#forcing-an-update-on-a-witnet-maintained-curreny-pair) at any time.

Requesting price updates to the Witnet oracle indeed requires the payment of a fee, proportional to the gas price of the request transaction. This fee, however, can be paid with the same *native currency* (🎉) that is used for paying gas in whatever EVM chain your application is running. 
{% endhint %}

{% content-ref url="contract-addresses/README.md" %} contract-addresses/README.md {% endcontent-ref %}
