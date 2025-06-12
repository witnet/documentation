---
description: Efficiently manage UTXOs in Witnet with the Witnet SDK.
---

# Manage Witnet UTXOs

{% hint style="success" %}
_The code examples below assume that the environment is properly set up as described in_ [_Getting Started_](../getting-started.md)_. You can easily adapt the examples to pass the URL of the Wit/RPC provider to use, and/or the wallet master key (and the password, if encrypted)._
{% endhint %}

Transactions in Witnet get paid by signing **Unspent Transaction Outputs** (or UTXOs), pretty much the same as transactions in Bitcoin. And just like Bitcoin, UTXOs in Witnet can be time-locked. Time-locked UTXOs cannot be spent until the time-lock timestamp is reached.&#x20;

Aside from UTXOs, Witnet addresses may also hold rights to withdraw delegated stake from network validators. Delegated stake can be withdrawn into UTXOs by means of **Unstake Transactions** (aka. Stake Withdrawal Transactions). Withdrawn UTXOs get time-locked for a minimum of two weeks.

The balance of any Witnet address is therefore divided in three different fields:

<table data-header-hidden><thead><tr><th width="131.4444580078125"></th><th></th></tr></thead><tbody><tr><td><strong><code>locked</code></strong></td><td>Sum of all time-locked UTXOs, in nanowits. Cannot be spent at this moment.</td></tr><tr><td><strong><code>staked</code></strong></td><td>Funds currently staked into one or more validators, in nanowits. Delegated stake can be eventually withdrawn. Once withdrawn, deposits will remain time-locked for at least two weeks.</td></tr><tr><td><strong><code>unlocked</code></strong></td><td>Sum of currently unlocked UTXOs, in nanowits.</td></tr></tbody></table>

## List locked and unlocked UTXOs of some random address

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require("@witnet/sdk")
const provider = await Witnet.Provider.fromEnv()
const utxos = await provider.getUtxos("wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc")
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from "@witnet/sdk"
const provider = await Witnet.Provider.fromEnv()
const utxos = await provider.getUtxos("wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc")
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet inspect utxos wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc --verbose
```
{% endtab %}
{% endtabs %}

## Get total balance of some random address



{% tabs %}
{% tab title="Javascript" %}
```javascript
const { utils, Witnet } = require("@witnet/sdk")
const provider = await Witnet.Provider.fromEnv()
const balance = await provider.getBalance("wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc")
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from "@witnet/sdk"
const provider = await Witnet.Provider.fromEnv()
const balance = await provider.getBalance("wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc")
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet inspect balance wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc
```
{% endtab %}
{% endtabs %}

## Select all spendable UTXOs in a wallet&#x20;

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require("@witnet/sdk")
const wallet = await Witnet.Wallet.fromEnv()
let utxos = await wallet.selectUtxos()
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import Witnet from "@witnet/sdk"
const wallet = await Witnet.Wallet.fromEnv()
let utxos = await wallet.selectUtxos()
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet wallet utxos
```
{% endtab %}
{% endtabs %}

## Select spendable UTXOs in a wallet as to cover some target value

Different strategies are possible when selecting input UTXOs as for covering some target value:

<table><thead><tr><th width="196.2220458984375">UTXO Selection Strategy</th><th>Description</th></tr></thead><tbody><tr><td><strong><code>"big-first"</code></strong></td><td>Higher value UTXOs are selected first, until target value is covered.</td></tr><tr><td><strong><code>"random"</code></strong></td><td>UTXOs are selected randomly, until target value is covered.</td></tr><tr><td><strong><code>"slim-fit"</code></strong></td><td>The smallest of all UTXOs that individually covers target value is selected. If none fulfills this condition, UTXOs get then selected by following the <code>BigFirst</code> strategy. </td></tr><tr><td><code>"small-first"</code></td><td>Smaller value UTXOs are selected first, until target value is covered.</td></tr></tbody></table>

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require("@witnet/sdk")

const wallet = await Witnet.Wallet.fromEnv()
const utxos = await wallet.selectUtxos({
    strategy: Witnet.UtxoSelectionStrategy.SmallFirst,
    value: Witnet.Coins.fromWits(10000.0) // 10,000 Wits
});
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from "@witnet/sdk"

const wallet = await Witnet.Wallet.fromEnv()
const utxos = await wallet.selectUtxos({
    strategy: Witnet.UtxoSelectionStrategy.SlimFit,
    value: 10 ** 14,
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet wallet utxos --value 1000.0 --strategy slim-fit
```
{% endtab %}
{% endtabs %}

## Joining wallet's spendable UTXOs into a specific wallet account

Joining multiple spendable UTXOs of a wallet into a single UTXO of some specific value is possible by creating a **Value Transfer Transaction** (or VTT) where all inputs correspond to the spendable UTXOs that are to be joined. The sum of all input UTXOs will then be available as a single UTXO to the recipient of such VTT.&#x20;

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require("@witnet/sdk")

const wallet = await Witnet.Wallet.fromEnv({
    strategy: Witnet.UtxoSelectionStrategy.SlimFit,
})
const vtt = await Witnet.ValueTransfers.from(wallet)
const receipt = await vtt.sendTransaction({
    recipients: [[ 
        wallet.accounts[0].pkh, 
        Witnet.Coins.fromWits(10000.0),  // 10,000.00 $WIT
    ]], 
})
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from "@witnet/sdk"

const wallet = await Witnet.Wallet.fromEnv({
    strategy: Witnet.UtxoSelectionStrategy.SlimFit,
})
const vtt = await Witnet.ValueTransfers.from(wallet)
const receipt: Witnet.TransactionReceipt = await vtt.sendTransaction({
    recipients: [[ 
        wallet.accounts[0].pkh, 
        Witnet.Coins.fromWits(10000.0),  // 10,000.00 $WIT
    ]], 
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet utxos --value 10000.0 --strategy slim-fit --join --into wit1...
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
_The more input UTXOs a VTT has, the greater the transaction weight will be. Because no more than 20,000 VTT weight units can be included within a Witnet block, you can get an exception if trying to build a transaction with too many inputs. In such cases, try changing the UTXO selection strategy to either `SlimFit` or `BigFirst` , or creating multiple VTTs with lower target values._
{% endhint %}

## Splitting UTXOs&#x20;

Splitting spendable funds into multiple smaller UTXOs enables automation scripts and bots to eventually handle concurrent data request transactions signed from one specific address.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const { Witnet } = require("@witnet/sdk")

const wallet = await Witnet.Wallet.fromEnv({
    strategy: Witnet.UtxoSelectionStrategy.BigFirst
})
const vtt = await Witnet.ValueTransfers.from(wallet)
let splits = 50
let coins = Witnet.Coins.fromWits(10000.0 / splits) // 200.0 $WIT per split
const receipt = await vtt.sendTransaction({
    recipients: Array(splits).fill([ "wit1...", coins ]) 
})
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { Witnet } from "@witnet/sdk"

const wallet = await Witnet.Wallet.fromEnv({
    strategy: Witnet.UtxoSelectionStrategy.BigFirst
})
const vtt = await Witnet.ValueTransfers.from(wallet)
let splits = 50
let coins = Witnet.Coins.fromWits(10000.0 / splits) // 200.0 $WIT per split
const receipt: Witnet.TransactionReceipt = await vtt.sendTransaction({
    recipients: Array(splits).fill([ "wit1...", coins ]) 
})
```
{% endtab %}

{% tab title="CLI" %}
```bash
$ npx witnet wallet utxos --value 10000.0 --strategy big-first --split 50 --into wit1...
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
_Due to the VTT weight limitation, the maximum number of output UTXOs in a VTT is restricted to 50._
{% endhint %}
