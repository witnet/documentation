---
description: Get full or filtered lists of stake entries in Witnet, using the Witnet SDK.
---

# Query stake entries in Witnet

{% hint style="success" %}
_The code examples below assume that the environment is properly set up as described in_ [_Getting Started_](../getting-started.md)_. You can easily adapt the examples to pass the URL of the Wit/RPC provider to use, and/or the wallet master key (and the password, if encrypted)._
{% endhint %}

For a node being able to validate blocks and oracle queries (aka. data request transactions), it requires other identities (i.e. "stakers") to trust and delegate some WIT coins into it. Whenever some additional WIT coins are deposited into a validator address, the depositing identity decides the address with rights to eventually withdraw the deposited coins, plus accumulated earnings, minus some commission that the node will charge as compensation for its work and commitment. The "withdrawer" address needs not be the same as the "staker" address, not the "validator" address itself.

For every validator and withdrawer pair, the Witnet nodes keep track of a so-called "**stake entry**", where the current amount of withdrawable WIT coins is stored, as well as the last time when a validator managed to validate a block (or participate in the resolution of an oracle query) based on such stake entry.

### List currently active validators

Active validators in Witnet are considered to be those nodes having either included a valid block into the blockchain, or trustfully participated in the resolution of an oracle query during a past, but recent, number of epochs.&#x20;

> _A new block gets validated every 20 seconds in the Witnet blockchain._

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require('@witnet/sdk')
const provider = await Witnet.JsonRpcProvider.fromURL("https://rpc-testnet.witnet.io")

let since = -4320 // 4320 epochs x 20 secs ~ 24 hours ago
let stakes = await provider.stakes({ 
    params: { 
        distinct: true,
        orderBy: { by: Witnet.StakesOrderBy.Mining, desc: true },
        since,
    }
})
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from '@witnet/sdk'
const provider = await Witnet.JsonRpcProvider.fromURL("https://rpc-testnet.witnet.io")

let since: number = -4320 // 4320 epochs x 20 secs ~ 24 hours ago
let stakes: Array<Witnet.StakeEntry> = await provider.stakes({ 
    params: { 
        distinct: true,
        orderBy: { by: Witnet.StakesOrderBy.Mining, desc: true },
        since,
    }
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet network senate --since 4320 --verbose
```
{% endtab %}
{% endtabs %}

### List stake deposits withdrawable from some address

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require('@witnet/sdk')
const provider = await Witnet.JsonRpcProvider.fromEnv()

let stakes = await provider.stakes({ 
    filter: {
        withdrawer: "wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc",
    },
    params: { 
        orderBy: { 
            by: Witnet.StakesOrderBy.Coins, 
            desc: true 
        },
    },
})
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from '@witnet/sdk'
const provider = await Witnet.JsonRpcProvider.fromEnv()

let stakes: Array<Witnet.StakeEntry> = await provider.stakes({ 
    filter: {
        withdrawer: "wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc",
    },
    params: { 
        orderBy: { 
            by: Witnet.StakesOrderBy.Coins, 
            desc: true 
        },
    },
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet network stakes --withdrawer wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc
```
{% endtab %}
{% endtabs %}

### List stake deposits delegated into some validator address

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require('@witnet/sdk')
const provider = await Witnet.JsonRpcProvider.fromEnv()

let stakes = await provider.stakes({ 
    filter: {
        validator: "wit12x09p34zx0wpxaxknfdjnyxhcguv4jvkxerllz",
    },
    params: { 
        orderBy: { 
            by: Witnet.StakesOrderBy.Coins, 
            desc: true 
        },
    },
})
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from '@witnet/sdk'
const provider = await Witnet.JsonRpcProviderer.fromEnv()

let stakes: Array<Witnet.StakeEntry> = await provider.stakes({ 
    filter: {
        validator: "wit12x09p34zx0wpxaxknfdjnyxhcguv4jvkxerllz",
    },
    params: { 
        orderBy: { by: Witnet.StakesOrderBy.Coins, desc: true },
    },
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet network stakes --validator wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc
```
{% endtab %}
{% endtabs %}
