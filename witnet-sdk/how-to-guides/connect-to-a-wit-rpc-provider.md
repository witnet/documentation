---
description: Initialize and verify connection to a Wit/RPC provider using the Witnet SDK
---

# Connect to a Wit/RPC provider

{% hint style="success" %}
_The code examples below assume that the environment is properly set up as described in_ [_Getting Started_](../getting-started.md)_. You can easily adapt the examples to pass the URL of the Wit/RPC provider to use, and/or the wallet master key (and the password, if encrypted)._
{% endhint %}

### Step 1: Initialize connection to the Wit/RPC provider

A connection is considered to be initialized once information about the actual Witnet network being served by the provider is retrieved. Namely, an initialized connection lets you know the network identifier, and whether you are connected to the **Witnet Mainnet**, or perhaps to some **Testnet**.

{% tabs %}
{% tab title="Javascript" %}
<pre class="language-javascript" data-full-width="true"><code class="lang-javascript"><strong>const { Witnet } = require('@witnet/sdk')
</strong>
main()

async function main() {
    const provider = await Witnet.Provider.fromEnv() 
    console.log(provider.network)
    console.log(provider.networkId)
    // ...
}
</code></pre>
{% endtab %}

{% tab title="Typescript" %}
```typescript
import Witnet from '@witnet/sdk'

main()

async function main() {
    const provider = await Witnet.Provider.fromEnv() // reads actual URL from environment
    console.log(provider.network)
    console.log(provider.networkId)
    // ...
}
```
{% endtab %}
{% endtabs %}

### Step 2: Check synchronization status and current epoch

In order to serve up-to-date information, the provider needs to keep synchronized with the Witnet blockchain. The following code shows how to check the provider's `node_state`, and the `current_epoch` of the Witnet network as well as.

{% tabs %}
{% tab title="Javascript" %}
```javascript
// ...
let syncStatus = await provider.syncStatus()

syncStatus.node_state // "Synced" | "AlmostSynced" | "WaitingConsensus" | "Synchronizing"
syncStatus.current_epoch
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
// ...
let syncStatus: Witnet.SyncStatus = await provider.syncStatus()

syncStatus.node_state
syncStatus.current_epoch
```
{% endtab %}
{% endtabs %}
