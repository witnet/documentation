# Update Conditions

Depending on the currency pair, and the EVM chain in which its corresponding Price Feed contract is deployed, price updates will be issued according to the following parameters:

### Deviation threshold

The Witnet Foundation is every few seconds attesting for price changes and comparing new off-chain prices with respect the last one stored on-chain. If the price either raises or decreases in a percentage greater than the established **deviation threshold**, a new price update request will be immediately posted to Witnet oracle in order to ultimately update the on-chain price value that is served via the corresponding [Price Router and Price Feed contracts](broken-reference).

### Heartbeat threshold

To preclude the possibility of not detecting significant price deviations during long periods of time, the **heartbeat** parameter guarantees a currency pair to be updated at least once every certain amount of minutes.

Knowing the heartbeat can be used to double check the liveness of either the corresponding [Price Feed contract](using-witnet-data-feeds.md#reading-last-price-and-timestamp-from-a-price-feed-contract-serving-a-given-currency-pair), or the [Witnet Data Request](broken-reference) that is posted to the Witnet oracle on every update request.

### Cooldown period

The **cooldown period** establishes the minimum time that must elapse since the last on-chain price update until the next one. This parameter alone contents from having a thrashing number of updates during highly volatile situations.

***

{% hint style="info" %}
While it is the Witnet Foundation that pays for every single price update according to these triggering conditions, every single [supported currency pair](broken-reference) involves a selection of **well-known and reputed sources** (i.e. exchanges), proven to trade significant volumes in a daily basis, and totally unconnected to the Witnet Foundation itself.
{% endhint %}

{% hint style="success" %}
Would the established triggering conditions for a certain currency pair not meet the service levels required by your application, you can always [trigger a new price update](using-witnet-data-feeds.md#forcing-an-update-on-a-witnet-maintained-curreny-pair) at any time.

Requesting price updates to the Witnet oracle indeed requires the payment of a fee, proportional to the gas price of the request transaction. This fee, however, can be paid with the same _native currency_ (🎉) that is used for paying gas in whatever EVM chain your application is running.
{% endhint %}
