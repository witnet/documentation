---
description: Create HD-wallets and check Witnet account balances using the Witnet SDK.
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Manage Witnet wallets

{% hint style="success" %}
_The code examples below assume that the environment is properly set up as described in_ [_Getting Started_](../getting-started.md)_. You can easily adapt the examples to pass the URL of the Wit/RPC provider to use, and/or the wallet master key (and the password, if encrypted)._
{% endhint %}

### Deriving HD-wallet accounts

{% tabs %}
{% tab title="Javascript" %}
<pre class="language-javascript"><code class="lang-javascript"><strong>const { utils, Witnet } = require('@witnet/sdk')
</strong>
main()

async function main () {
    // create wallet by reading decrypted XPRV string from environment
    // and connecting to the Wit/RPC provider set on environment as well.
    const wallets = [
        // create a wallet with 5 accounts, by passing decrypted XPRV string
        await Witnet.Wallet.fromXprv("xprv1...", { limit: 5 }),
        // create a wallet with 5 accounts, by passing encrypted XPRV and password,
        await Witnet.Wallet.fromEncryptedXprv("xprv1...", "passwd...", { limit: 5 }),
        // create a wallet with 5 accounts, by using XPRV master key string set on environment
        await Witnet.Wallet.fromEnv({ limit: 5 }),
    ];
    // ...
}
</code></pre>
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { utils, Witnet } from "@witnet/sdk"

// ...

// create wallet by reading decrypted XPRV string from environment
// and connecting to the Wit/RPC provider set on environment as well.
const wallets: Array<Witnet.Wallet> = [
    // create a wallet with 5 accounts, by passing decrypted XPRV string
    await Witnet.Wallet.fromXprv("xprv1...", { limit: 5 }),
    // create a wallet with 5 accounts, by passing encrypted XPRV and password,
    await Witnet.Wallet.fromEncryptedXprv("xprv1...", "passwd...", { limit: 5 }),
    // create a wallet with 5 accounts, by using XPRV master key string set on environment
    await Witnet.Wallet.fromEnv({ limit: 5 }),
];
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet wallet accounts --limit 5
```
{% endtab %}
{% endtabs %}

### Deriving the coinbase address

The wallet's coinbase address corresponds to the address that a node using the wallet's master key would derive for signing block and super-block proposals, data witnessing commits and data reveal transactions.

{% hint style="info" %}
_Account addresses in Witnet are also referred as "public key hashes", or "pkh". Witnet addresses are encoded in Bech32. Mainnet addresses are prefixed with `wit1`, and Testnet addresses with `twit1`._
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
<pre class="language-javascript"><code class="lang-javascript">// validator's pkh address derived from a master key
<strong>const validator = wallet.coinbase.pkh
</strong></code></pre>
{% endtab %}

{% tab title="Typescript" %}
```typescript
// validator's pkh address derived from a master key
const validator: string = wallet.coinbase.pkh
```
{% endtab %}
{% endtabs %}

### Exploring wallet accounts&#x20;

When importing a wallet you may rather derive only the accounts holding some $WIT balance. In these cases, a "gap" number can be provided, standing for the number of consecutively derived accounts with no available funds required before stopping the search. The search can also be limited to a maximum number of entries.&#x20;

{% tabs %}
{% tab title="Javascript" %}
```javascript
// search derivation max gap
let gap = 5

// max number of wallets to explore
let limit = 5

// on existing wallet:
let accounts = await wallet.exploreAccounts(limit, gap)

// when creating a new wallet:
const wallet2 = await Witnet.Wallet.fromEnv({ limit, gap, onlyWithFunds: true })
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
search derivation max gap
let gap = 5

// max number of wallets to explore
let limit = 5

// on existing wallet:
let accounts: Array<Witnet.Account> = await wallet.exploreAccounts(limit, gap)

// or when creating a new wallet object:
const wallet2: Witnet.Wallet = await Witnet.Wallet.fromEnv({ 
    limit, gap, 
    onlyWithFunds: true 
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet wallet accounts --gap 5
```
{% endtab %}
{% endtabs %}

### Searching for a specific address

You can also search for some specific address within a wallet, even if holding no current balance. A "gap" parameter can also be provided, as to set the number of consecutive accounts with no funds to derive before giving up the search.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const someAccount = wallet.getAccount("wit1...", gap)
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
const someAccount: Witnet.Account = wallet.getAccount("wit1...", gap)
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet accounts wit1...
```
{% endtab %}
{% endtabs %}

### Getting total stake delegated from some wallet account

The balance of any Witnet address is divided in three different fields:

<table data-header-hidden><thead><tr><th width="112.4444580078125"></th><th></th></tr></thead><tbody><tr><td><strong><code>locked</code></strong></td><td>Time-locked balance, in nanowits. Cannot be spent at this moment.</td></tr><tr><td><strong><code>staked</code></strong></td><td>Funds currently staked into one or more validators, in nanowits. Delegated stake can be eventually withdrawn. Once withdrawn, deposits will remain time-locked for at least two weeks.</td></tr><tr><td><strong><code>unlocked</code></strong></td><td>Currently available funds, in nanowits.</td></tr></tbody></table>

{% tabs %}
{% tab title="Javascript" %}
```javascript
let balance = (await wallet.getAccount("wit1...").getBalance()).staked
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
let balance = (await wallet.getAccount("wit1...").getBalance()).staked
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet accounts wit1... --verbose
```
{% endtab %}
{% endtabs %}

### Getting total $WIT treasury of a wallet

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require("@witnet/sdk")
// ...
let treasury = Witnet.Coins.fromBalance(await wallet.getBalance())
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from "@witnet/sdk"
// ...
let treasury = Witnet.Coins.fromBalance(await wallet.getBalance())
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet accounts --verbose
```
{% endtab %}
{% endtabs %}
