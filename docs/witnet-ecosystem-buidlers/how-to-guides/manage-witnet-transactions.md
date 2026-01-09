---
description: >-
  Use the Witnet SDK to build, sign, send and await finalization of Witnet transactions.
---

# Manage Witnet transactions

Use the Witnet SDK to build, sign, send and await finalization of Witnet transactions.

::: tip
_The code examples below assume that the environment is properly set up as described in_ [_Getting Started_](../getting-started.md)_. You can easily adapt the examples to pass the URL of the Wit/RPC provider to use, and/or the wallet master key (and the password, if encrypted)._
:::

## Witnet transaction types

### Extrinsic transactions

Transactions that need to be signed by one or more externally owned addresses:

<details>

<summary>Value Transfer Transaction (VTT)</summary>

Transfers WIT coins from one set of addresses, to another set of addresses.

VTTs must be signed by the owners of input UTXOs. VTTs are weighted in proportion of the number of inputs and outputs. A maximum of 20,000 of VTT weight units are accepted per block.

</details>

<details>

<summary>Stake Transaction (ST)</summary>

Deposits WIT coins into some "validator" address.

The more staked coins a validator has, the more chances it will have to validate blocks and oracle queries, and therefore the higher the probability to earn rewards. Staked coins, and the eventual yield that they produce, can only be brought back to circulation by the "withdrawer" address specified in the corresponding Stake Transaction.\
\
STs must be signed by the owners of input UTXOs. The withdrawer address may differ from the ones actually signing the transaction. STs are weighted in proportion to the number of inputs. A maximum of 10,000 of ST weight units are accepted per block.

</details>

<details>

<summary>Unstake Transaction (UT)</summary>

Withdraws staked WIT coins from some "validator" address. Any amount of WIT coins can be unstaked, unless the remaining deposit for the same validator-withdrawer pair becomes greater than 0 lesser then 10,000 WIT coins.\
\
Network fees for UTs get paid by consuming part of the funds being withdrawn. The rest will be converted into a UTXO, spendable only by the withdrawer. Withdrawal UTXOs get time-locked for two weeks.\
\
UTs must be signed by the "withdrawer". UTs have a fix weight of 153 units. Nevertheless, a maximum of 10,000 of UT weight units are accepted per block.

</details>

<details>

<summary>Data Request Transaction (DRT)</summary>

Triggers the resolution of some oracle query, defined as a combination of a fully formed [_**Radon Request**_](#user-content-fn-1)[^1], and some SLA parameters determining (1) the number of validators that will be required to attend the oracle query, (2) the size of the expected result and (3) the reward that earnest validators will get.

DRTs must be signed by the owners of input UTXOs. Unlike other extrinsic transactions, change address in DRTs must match the address of its first (perhaps only) signer.\
\
DRTs are weighted in proportion to the number of input UTXOs, the complexity of the Radon Request, the number of required witnesses and the size of the expected result. A maximum of 80,000 DRT weight units are accepted per block.

</details>

### Intrinsic transactions

Transactions that get automatically generated and signed by network validators:

<details>

<summary>Data Request Commit Transaction (DRCT)</summary>

Must be individually emitted by validators selected to attend the resolution of some oracle query currently being in COMMIT phase. It contains the hash of the oracle query result as computed by every witnessing validator.

</details>

<details>

<summary>Data Request Reveal Transaction (DRRT)</summary>

Must be individually emitted by validators elected to attend the resolution of some oracle query currently being in REVEAL phase. It must contain the oracle query result as computed by the validator and its hash matching the one previously reported in a Data Request Commit Transaction.

</details>

<details>

<summary>Data Request Tally Transaction (DRTT)</summary>

Must be included by block validators as soon as a data request witnessing act comes to an end. It pays out witnessing rewards and collateral back to honest witnesses.

</details>

<details>

<summary>Mint Transaction (MT)</summary>

Must be included one and just one per block. It pays the block reward to the validator that signs the block. Block rewards are not manifested as UTXO, but as an increment in the stake entry upon which the block validator became eligible for proposing blocks at that epoch.

</details>

::: info
_Intrinsic transactions can only be built out from the Witnet Rust crates._
:::

## Building Witnet transactions

::: tip
_Transaction factories in the **Witnet SDK** (Javascript) can be attached to either a **Wallet**, an **Account** or a **Signer** object. This will determine the variety of different signers that may end up signing one single transaction._
:::

::: info
_Example of **Signer** objects at your disposal:_

* `wallet.coinbase`
* `wallet.getSigner(pkh)`
* `account.internal`
* `account.external`
:::

### Value transfers

Value transfers are determined by a list of **recipients**, and a amount of WIT coins to be transferred to each one of them. The sum of all input UTXO must cover the total transfer value and the network fees.

::: warning
_The output UTXO change, if any, will be owned by the_  **`changePkh`** _address of the ledger object (i.e. Wallet, Account or Signer) attached to the transaction factory ._
:::

::: tabs
== Javascript
```javascript
const { Witnet } = require("@witnet/sdk")

const wallet = await Witnet.Wallet.fromEnv({ 
    strategy: Witnet.UtxoSelectionStrategy.SlimFit,
})

const vttFactory = await Witnet.ValueTransfers.from(wallet)

// transfer 100.0 WIT to single recipient address
const receipt = await vttFactory.signTransaction({ 
    recipients: [[ "wit1...", Witnet.Coins.fromWits(100.0) ]],
})
```

== Typescript
```typescript
import { Witnet } from "@witnet/sdk"

const wallet = await Witnet.Wallet.fromEnv({
    strategy: Witnet.UtxoSelectionStrategy.SlimFit
})

const vttFactory = await Witnet.ValueTransfers.from(wallet)

// transfer 100.0 $WIT to single recipient address
const receipt = await vttFactory.signTransaction({
    recipients: [[ "wit1...", Witnet.Coins.fromWits(100.0) ]],
})
```

== CLI
```bash
$ npx witnet wallet transfer --into wit1... --value 100.0 
```
:::

### Stake deposits

Stake deposits are determined by the amount of WIT coins to be staked, a **validator** address and an **authorization** code, where:

* The stake **value** must be equal or greater than 10,000 WIT.
* The authorization code must have been previously generated and signed by the specified validator.
* The withdrawer address embedded within the authorization code will be the only one allowed to withdraw part of, or whole, the stake (plus eventual benefits).

::: warning
_The output UTXO change, if any, will be owned by the_  **`changePkh`** _address of the ledger object (i.e. Wallet, Account or Signer) attached to the transaction factory._
:::

::: tabs
== Javascript
```javascript
const sdtFactory = await Witnet.StakeDeposits.from(wallet)

let authorization = "..."
let receipt = await sdtFactory.signTransaction({
    authorization,
    validator: wallet.coinbase.pkh,
    value: Witnet.Coins.fromWits(10000.0),
})
```

== Typescript
```typescript
const sdtFactory = await Witnet.StakeDeposits.from(wallet)

let receipt: Witnet.TransactionReceipt = await sdtFactory.signTransaction({
    authorization: "...",
    validator: wallet.coinbase.pkh,
    value: Witnet.Coins.fromWits(10000.0),
})
```

== CLI
```bash
$ npx witnet wallet stake <auth_hex_code> --value 10000.0 --withdrawer wit1...
```
:::

### Stake withdrawals

Stake withdrawals can only be performed from addresses having previously delegated stake into validators (or delegatees). Withdrawers have right to withdraw not only the staked amount, but also any stake yield produced by delegatees since the stake delegations took place, minus some initially arranged commission.

Any amount can be withdrawn from the current stake hold on some specific withdrawer - validator stake entry, as long as the remaining stake keeps being equal or greater to 10,000 WIT, or the full stake is withdrawn.

::: info
_Unlike other extrinsic transactions, Stake Withdrawals can get confirmed even if paying no network fees. The implied decrease of witnessing power in the validator whose part of the stake is being withdrawn turns out to be enough incentive for other block validators to process these transactions._
:::

::: tabs
== Javascript
```javascript
const signer = wallet.getSigner("wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc")

// select the delegatee currently holding the highest staked deposit from `signer`
const stakeEntry = await signer.getDelegatees({ 
    by: Witnet.StakesOrderBy.Coins, 
    reverse: true, 
})[0]

// create the stake withdrawl transaction
const swtFactory = await Witnet.StakeWithdrawals.from(signer)
const receipt = await swtFactory.signTransaction({
    validator: stakeEntry.key.validator,
    value: Witnet.Coins.fromPedros(stakeEntry.value.coins),
})
```

== Typescript
```typescript
const signer: Witnet.Signer = wallet.getSigner("wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc")

// select the delegatee currently holding the highest staked deposit from `signer`
const stakeEntry: Array<Witnet.StakeEntry> = await signer.getDelegatees({ 
    by: Witnet.StakesOrderBy.Coins, 
    reverse: true, 
})[0]

// create the stake withdrawl transaction
const swtFactory = await Witnet.StakeWithdrawals.from(signer)
const receipt: Witnet.TransactionReceipt = await swtFactory.signTransaction({
    validator: stakeEntry.key.validator,
    value: Witnet.Coins.fromPedros(stakeEntry.value.coins),
})
```

== CLI
```bash
$ npx witnet wallet delegatees
$ npx witnet wallet withdraw --from <validator> --into wit165ec489lcrt27w5wa7q9je7rgr4dtvyff9vwsc --value all 
```
:::

### Oracle queries

An oracle query is defined as a combination of a _**Radon Request**_ and some _**Service Level Agreement parameters**_**.**

> _**Radon Requests** are the "smart data contracts" of the Witnet blockchain. They formally describe how to retrieve data or real-world facts from one or multiple sources on the Internet, and how to aggregate and transform that data before delivering a query result. They can also be used as an entropy source for randomness._

<table><thead><tr><th width="154.00006103515625">SLA parameters</th><th>Description</th></tr></thead><tbody><tr><td><code>fees?</code></td><td><p>The reward for the validator that eventually gets the Data Request Transaction (or DRT) included in the blockchain.</p><p></p><p>It also determines the reward that the validator including all involved Commit transactions, the one including all Reveal transactions, and every <em>proven-to-be earnest</em> member of the witnessing committee will all get, individually. </p><p></p><p><strong>If no fees are specified, a value will be self-estimated</strong> based on current network congestion, with the expectancy of getting the DRT mined in less than 5 minutes.</p></td></tr><tr><td><code>witnesses?</code></td><td><p>The number of witnesses requested to solve the oracle query. </p><p></p><p><em>This number provides redundancy against validators that unexpectedly (or willingly) disconnect from the network, or reveal diverging results.</em>  </p><p></p><p>It can be set to any number between 1 and <a data-footnote-ref href="#user-content-fn-2">125</a>, although a value of 12 should be a great balance on most cases as to guarantee getting a fully secure and reliable result.</p><p></p><p><strong>It defaults to 12 if not specified</strong>. On the Witnet testnet, it defaults to the minimum between 12 and the actual number of active validators (which could eventually turn below 12).</p></td></tr><tr><td><code>maxResultSize?</code></td><td><p>Limits the size of the expected result. </p><p></p><p>It can be set up to 2048 bytes, although it only needs to be specified if the <em>Radon Request</em> is known to produce data of variable size (e.g. strings, byte buffers, arrays or maps). <strong>Defaults to 32, if required but not specified</strong>.</p></td></tr></tbody></table>

::: info
_The total cost of an oracle query is covered by the signer of the DRT, and ultimately depends on two factors:_

* _The **network congestion**: rate of data requests being currently solved on the Witnet network._
* _The **transaction weight**: determined by the complexity of the Radon Request, the number of required witnesses, and the size of the expected result._
:::

::: danger
_The output UTXO in a DRT, if any, would stand for returning the change of the transaction (i.e. sum of input UTXOs value minus fees minus value), and would be owned by the signer of the DRT (i.e. the data requester). This is so as to avoid exploitation of the fee market for DRTs, by using dummy DRTs as if they were VTTs._
:::

::: tabs
== Javascript
```javascript
const { requests } = require("@witnet/sdk/assets")
const { Witnet } = require("@witnet/sdk")

const wallet = await Witnet.Wallet.fromEnv()

// request randomness from the Wit/Oracle,
// leveraging Radon Request assets included in the Witnet SDK:
const rngRequests = await Witnet.DataRequests.from(
    wallet, 
    requests.WitOracleRequestRandomness,
)
let receipt1 = await rngRequests.signTransaction({ 
    fees: Witnet.Coins.fromWits(0.1),
    witnesses: 5,
})

// request WIT/USDT price update from the Wit/Oracle, 
// leveraging Radon Request assets included in the Witnet SDK:
const witUsdtUpdates = await Witnet.DataRequests.from(
    wallet,
    requests.defi.tickers.crypto.WitOracleRequestPriceWitUsdt6,
)
let receipt2 = await witUsdtUpdates.signTransaction({
    fees: Witnet.Coins.fromPedros(10000),
    witnesses: 10,
})
```

== Typescript
```typescript
import { assets, Witnet } from "@witnet/sdk"

const wallet = await Witnet.Wallet.fromEnv()

// request randomness from the Wit/Oracle,
// leveraging Radon Request assets included in the Witnet SDK:
const rngRequests = await Witnet.DataRequests.from(
    wallet, 
    assets.requests.WitOracleRequestRandomness,
)
let receipt1: Witnet.TransactionRecept = await rngRequests.signTransaction({ 
    fees: Witnet.Coins.fromWits(0.1),
    witnesses: 5,
})

// request WIT/USDT price update from the Wit/Oracle, 
// leveraging Radon Request assets included in the Witnet SDK:
const witUsdtUpdates = await Witnet.DataRequests.from(
    wallet,
    assets.requests.defi.tickers.crypto.WitOracleRequestPriceWitUsdt6,
)
let receipt2: Witnet.TransactionReceipt = await witUsdtUpdates.signTransaction({
    fees: Witnet.Coins.fromPedros(10000),
    witnesses: 10,
})
```

== CLI
```bash
$ npx witnet wallet notarize WitOracleRequestRandomness --witnesses 5 --fees 0.1
$ npx witnet wallet notarize WitOracleRequestPriceWitUsdt6 --witnesses 10 --fees 0.00001
```
:::



## Confirming Witnet transactions

### Step 1: Build a Witnet transaction factory object

This needs to be done just once per transaction type, or in the case of [oracle queries](manage-witnet-transactions.md#oracle-queries) once per **Radon Request** wanted to be used. As shown on examples above, [transaction factories](#user-content-fn-3)[^3] must be attached upon construction to some given [ledger object](#user-content-fn-4)[^4].

::: tip
_Different transaction factories can get attached to the same ledger object, in which case they would all share the same UTXO and transaction caches._ 
:::

::: tabs
== Javascript
```javascript
const { assets, Witnet } = require("@witnet/sdk")

const wallet = await Witnet.Wallet.fromEnv()

const [ vtts, rngs ] = [
    await Witnet.ValueTransfers.from(wallet),
    await Witnet.DataRequests.from(
        wallet, 
        assets.requests.WitOracleRequestRandomness
    ),
]

// ...

// settle the UTXO selection strategy on all factories attached to `wallet`:
wallet.strategy = Witnet.UtxoSelectionStrategy.SlimFit

```

== Typescript
```typescript
import { assets, Witnet } from "@witnet/sdk"

const wallet: Witnet.Wallet = await Witnet.Wallet.fromEnv()

const [ vtts, rngs ] = [
    await Witnet.ValueTransfers.from(wallet),
    await Witnet.DataRequests.from(
        wallet, 
        assets.requests.WitOracleRequestRandomness
    ),
]

// ...

// settle the UTXO selection strategy on all factories attached to `wallet`:
wallet.strategy = Witnet.UtxoSelectionStrategy.SlimFit
```
:::

#### Witnet UTXO Selection Strategies

The **UTXO selection strategy** that is followed when building a new transaction can be changed at anytime by updating the `strategy` property on the factory's ledger to any of the following values:

<table><thead><tr><th width="143.22210693359375">UTXO strategies</th><th>Description</th></tr></thead><tbody><tr><td><code>"big-first"</code></td><td>Biggest UTXOs are selected first.</td></tr><tr><td><code>"random"</code></td><td>UTXOs are selected randomly.</td></tr><tr><td><code>"slim-fit"</code></td><td>The smallest of all UTXOs that individually covers the transaction fees and value value is selected. If none fulfills this condition, UTXOs get then selected by following the <code>"big-first"</code> strategy. </td></tr><tr><td><code>"small-first"</code></td><td>Smallest UTXOs are selected first.</td></tr></tbody></table>



### Step 2: Build and sign a new Witnet transaction

As shown on examples above on a case-by-case basis, building a transaction from a transaction factory is as simple as calling to the **`signTransaction`** method and passing some required or optional transaction parameters, depending on the transaction type being signed.

::: info
_Signing a transaction before sending it over to the network allows you to double check the self-estimated values for those parameters that may have not been specified (e.g. the fees, or the number of witnesses on DRTs), as well as the ultimately selected input UTXOs, expected transaction outputs, signing addresses, and total cost in WIT coins, before any money being spent whatsoever._
:::

::: warning
_A **TypeError** will be thrown if passing invalid transaction parameters, or not passing the required ones depending to the transaction type. An **Error** will be thrown instead if the attached ledger objects had not enough available UTXOs as to cover for transaction expenses, or if some previously signed transaction is in the process of being transmitted to the Witnet network._
:::

::: tabs
== Javascript
```javascript
// ...

const receipts = []

// estimate fees and sign transaction for transfering 10.0 WIT to "wit1..."
receipts.push(await vtts.signTransaction({
    fees: Witnet.TransactionPriority.High,
    recipients: [[ "wit1...aa", Witnet.Coins.fromWits(10.0) ]],
}))

// check that estimated fees are not too high
if (receipts[0].fees.wits >= 5.0) throw Error("Estimated fees to high!")

```

== Typescript
```typescript
const receipts: Array<Witnet.TransactionReceipt> = []

// estimate fees and sign transaction for transfering 10.0 WIT to "wit1..."
receipts.push(await vtts.signTransaction({
    fees: Witnet.TransactionPriority.High,
    recipients: [[ "wit1...aa", Witnet.Coins.fromWits(10.0) ]],
}))

// check that estimated fees are not too high
if (receipts[0].fees.wits >= 5.0) throw Error("Estimated fees to high!")
```
:::

#### Witnet Transaction Priorities

One optional parameter common to all transaction types is the **fees**. A specific amount of WIT coins can of course be specified, or a **Transaction Priority** value instea&#x64;**.** Depending on the specified priority, the Witnet SDK will seamlessly evaluate the network congestion and estimate the actual fees to pay with the expectation of getting the transaction included in a block within a limited time range:

<table><thead><tr><th width="170">Priority value</th><th>Expected time to inclusion in a block</th></tr></thead><tbody><tr><td><code>"opulent"</code></td><td>Less than 60 seconds.</td></tr><tr><td><code>"high"</code></td><td>Less than 5 minutes.</td></tr><tr><td><code>"medium"</code></td><td>Less than 15 minutes.</td></tr><tr><td><code>"low"</code></td><td>Less than 1 hour.</td></tr><tr><td><code>"stinky"</code></td><td>Less than 6 hours.</td></tr></tbody></table>



### Step 3: Broadcast a transaction into the Witnet network

A previously signed transaction can be sent over the network by just calling the **`sendTransaction`** on a transaction factory object with no extra parameters. Calling this method with no parameters fails if the previously signed transaction had already been sent.

::: warning
_A **TransmissionError** will be thrown if the transmission fails for whatever reason. The transmission could then be either retried, or just discarded by passing new transaction parameters._
:::

::: tabs
== Javascript
```javascript
// ...

if (receipts[0].fees.wits >= 5.0) throw new Error("Estimated fee is too high, atm!");
else {
    // send the just signed transaction
    receipts[0] = await vtts.sendTransaction().catch(err => console.error(err))
}

```

== Typescript
```typescript
// ...

if (receipts[0].fees.wits >= 5.0) throw new Error("Estimated fee is too high, atm!");
else {
    // send the just signed transaction
    receipts[0] = await vtts.sendTransaction().catch(err => console.error(err))
}
```
:::

Transaction parameters can also be passed when calling to `sendTransaction`, in which case any previously signed and not yet sent transaction would get discarded and its input UTXOs recovered. A new transaction would then get built, signed and immediately sent to the network.

::: info
_When all transaction parameters are known in advance, or you intend to send a transaction no matter the final cost, you can then build, sign and send the transaction all at the same time by just passing the transaction parameters to_ `sendTransaction` _._
:::

::: tabs
== Javascript
```javascript
// ...

if (receipts[0].fees.wits >= 5.0) {
    // recover UTXOs from just signed transaction,
    // build and sign a new transaction with same parameters,
    // this time specifing the network fees to pay,
    // and send it right away:
    receipts[0] = await vtts.sendTransaction({
        fees: Witnet.Coins.fromWits(5.0),
        recipients: [[ "wit1...aa", Witnet.Coins.fromWits(10.0) ]],        
    }).catch(err => console.error(err))
} else {
    // accept estimations and send the just signed transaction
    receipts[0] = await vtts.sendTransaction().catch(err => console.error(err))
}

// ...

// sign and send a VTT with highest priority, no matter its cost:
receipts.push(await vtts.sendTransaction({
    fees: Witnet.TransactionPriority.Opulent,
    recipients: [
        [ "wit1...bb", Witnet.Coins.fromWits(11.1) ],
        [ "wit1...cc", Witnet.Coins.fromWits(22.2) ],
    ],
}))
console.info(receipts[1])

```

== Typescript
```typescript
// ...

if (receipts[0].fees.wits >= 5.0) {
    // recover UTXOs from just signed transaction,
    // build and sign a new transaction with same parameters,
    // this time specifing the network fees to pay,
    // and send it right away:
    receipts[0] = await vtts.sendTransaction({
        fees: Witnet.Coins.fromWits(5.0),
        recipients: [[ "wit1...aa", Witnet.Coins.fromWits(10.0) ]],        
    }).catch(err => console.error(err))
} else {
    // accept estimations and send the just signed transaction
    receipts[0] = await vtts.sendTransaction().catch(err => console.error(err))
}

// ...

// sign and send a VTT with highest priority, no matter its cost:
receipts.push(await vtts.sendTransaction({
    fees: Witnet.TransactionPriority.Opulent,
    recipients: [
        [ "wit1...bb", Witnet.Coins.fromWits(11.1) ],
        [ "wit1...cc", Witnet.Coins.fromWits(22.2) ],
    ],
}))
console.info(receipts[1])

```
:::



### Step 4: Await inclusion of a transaction in the Witnet blockchain

Passing a transaction **hash** to the **`confirmTransaction`** method on on a ledger object , provides a way to get asynchronously reported every time a change in the status of some previously sent transaction is detected. Additionally, the following parameters can be optionally specified:

<table data-card-size="large" data-column-title-hidden data-view="cards" data-full-width="false"><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>confirmations</strong></td><td>Number of blocks to wait for after inclusion, as to consider the transaction to be finalized. Defaults to 0 if no otherwise specified, meaning the wait ends as soon as the transaction gets included in a block.</td><td></td></tr><tr><td><strong>timeoutSecs</strong></td><td>An overall timeout is settled as to abort the waiting if it takes too long. Defaults to 10 minutes if no otherwise specified. </td><td></td></tr><tr><td><strong>onCheckpoint</strong></td><td>Handler function to be called upon each new Witnet epoch (i.e. every 20 seconds), once the transaction gets presumably included in a block, as long as the number of required confirmations is not reached. An updated <strong>transaction receipt</strong> is reported on each call.</td><td></td></tr><tr><td><strong>onStatusChange</strong></td><td>Handler function to be called every time a change on the <strong>transaction status</strong> is detected, or some network error is produced while polling for status updates. An updated <strong>transaction receipt</strong> is reported on each call.</td><td></td></tr></tbody></table>

::: info
_A generic **Error** will be thrown if the transaction hash isn't found in the internal cache of sent transactions._
:::

::: warning
_A **TimeoutError** will be thrown If the waiting for inclusion times out._

_The input UTXOs won't be automatically pushed back into the UTXOs cache. In these cases, you can either force to reload the whole UTXO dataset when signing the next transaction, or resume the wait for inclusion by again calling to_ `confirmTransaction`_._
:::

::: danger
_A **MempoolError** will be thrown if a not yet included transaction gets removed from the Witnet mempool._

_This can happen if a transaction relies on some input UTXO that gets eventually consumed by other transaction paying higher network fees (e.g. created from the same wallet but different application, for instance). It may rarely happen as well with UTs referring stake entries that get incidentally slashed before those UTs get included in a block._

_The wait for inclusion cannot be resumed on transactions removed from the Witnet mempool. The local UTXOs caches that belong to the signers of the failing transaction will be automatically reloaded, though._
:::

::: tip
_Once the required number of **confirmations** is reached, the output UTXOs owned by any addresses controlled by the signing ledger will be automatically added to their respective UTXOs cache._
:::

::: tabs
== Javascript
```javascript
// ...

// wait up to 15 minutes for all sent transaction
// to get finalized after 3 confirmations:
await Promise.all(
    receipts.map(tx => 
        wallet.confirmTransaction(tx.hash, {
            confirmations: 3,
            onCheckpoint: (tx => { 
                console.info(`${tx.hash}: checkpoint: #${tx.blockEpoch + tx.confirmations}`) 
            }),
            onStatusChange: (tx => { 
                console.info(`${tx.hash}: status: ${tx?.error || tx.status}`) 
            }),
            timeoutSecs: 900,            
        }).catch(err => console.error(`${err.tx.hash}: ${err.message})
    )
);
```

== Typescript
```typescript
// ...

// wait up to 15 minutes for all sent transaction
// to get finalized after 3 confirmations:
await Promise.all(
    receipts.map((tx: Witnet.TransactionReceipt) => 
        wallet.confirmTransaction(tx.hash, {
            confirmations: 3,
            onCheckpoint: (tx => { 
                console.info(`${tx.hash}: checkpoint: #${tx.blockEpoch + tx.confirmations}`) 
            }),
            onStatusChange: (tx => { 
                console.info(`${tx.hash}: status: ${tx?.error || tx.status}`) 
            }),
            timeoutSecs: 900,            
        }).catch(err => console.error(`${err.tx.hash}: ${err.message})
    )
);
```

== CLI
```bash
$ npx witnet wallet transfer --into wit1... --value 100.0 --force --confirmations 3
```
:::

#### Witnet Transaction Receipts

Calls to `signTransaction`, `sendTransaction` and `confirmTransaction` methods, as well as calls to **Transaction Callback** handlers, provide a **Transaction Receipt** object that contains metadata describing a Witnet-compliant transaction and its current network status. Some of the receipt fields are common to all transaction types, while others are specific to certain transaction types:

<table><thead><tr><th width="151">Receipt Fields</th><th width="110">Tx. Types</th><th>Description</th></tr></thead><tbody><tr><td><code>authorization?</code></td><td>STs</td><td>Authorization code signed by some validator, authorizing some specific withdrawer to eventually delegate stake into such validator.</td></tr><tr><td><code>blockEpoch?</code></td><td>All</td><td>Witnet epoch at which the transaction got included in a block. </td></tr><tr><td><code>blockHash?</code></td><td>All</td><td>Hash of the block that included the transaction on chain.</td></tr><tr><td><code>blockMiner?</code></td><td>All</td><td>The validator address that included the transaction on chain. </td></tr><tr><td><code>change?</code></td><td>All but UTs</td><td>Difference between total inputs, minus the transaction's fees and value. Measured in WIT coins.</td></tr><tr><td><code>confirmations?</code></td><td>All</td><td>Number of blocks after the transaction got included in a block. </td></tr><tr><td><code>droHash?</code></td><td>DRTs</td><td>The hash of combining both the <code>radHash</code> and rest of SLA parameters of the DRT. Different DRTs can share the same <code>droHash</code>. </td></tr><tr><td><code>error?</code></td><td>All</td><td>Network error produced upon latest transmission or status polling attempt. It gets cleared out out when a re-transmission or the latest polling attempt get solved successfully.</td></tr><tr><td><strong><code>fees</code></strong></td><td>All</td><td>Amount of WIT coins that the validator including the transaction on chain will get.</td></tr><tr><td><strong><code>from</code></strong></td><td>All</td><td>The list of signing addresses that pay for the transaction.</td></tr><tr><td><strong><code>hash</code></strong></td><td>All</td><td>The unique hash of the signed transaction.</td></tr><tr><td><code>outputLock?</code></td><td>VTTs, UTs</td><td>Timestamp since when value transfer outputs will be available for expenditure. </td></tr><tr><td><code>radHash?</code></td><td>DRTs</td><td>The unique hash of the <strong>Radon Request</strong> included in the DRT. DRTs referring the same Radon Request will share the same <code>radHash</code>. </td></tr><tr><td><code>recipients?</code></td><td>VTTs</td><td>Array of recipient addresses and amount of WIT coins that each one of them will get.</td></tr><tr><td><strong><code>status</code></strong></td><td>All</td><td>Last known <strong>Transaction Status</strong>.</td></tr><tr><td><strong><code>timestamp</code></strong></td><td>All</td><td>The Unix timestamp of the last time a change was locally detected in the transaction status.</td></tr><tr><td><strong><code>type</code></strong></td><td>All</td><td>The name of the transaction type.</td></tr><tr><td><strong><code>tx</code></strong></td><td>All</td><td>Protobuf object containing a Witnet-compliant object, including inputs, outputs and signatures.</td></tr><tr><td><code>validator?</code></td><td>STs, UTs</td><td>The validator address.</td></tr><tr><td><strong><code>value</code></strong></td><td>All</td><td>The total amount of WIT coins to be received by either the specified or implicit recipients (on all transaction types but DRTs), or the set of validators involved in solving an oracle query (on DRTs).</td></tr><tr><td><strong><code>weight</code></strong></td><td>All</td><td>The transaction's weight units.</td></tr><tr><td><code>withdrawer?</code></td><td>STs, UTs</td><td>The withdrawer address.</td></tr><tr><td><code>witnesses?</code></td><td>DRTs</td><td>The number of witnessing validators expected to contribute to the resolution of an oracle query.</td></tr></tbody></table>

#### Witnet Transaction Status

Transactions created out of calls to `signTransaction` and `sendTransaction` methods will be internally cached in memory. The status of cached transactions can vary over time to any of the following values:

<table><thead><tr><th width="157">Transaction status</th><th>Description</th></tr></thead><tbody><tr><td><code>"signed"</code></td><td>The transaction has been signed but not yet attempted to be sent.</td></tr><tr><td><code>"pending"</code></td><td>The transaction has been signed and is being transmitted to the network.</td></tr><tr><td><code>"relayed"</code></td><td>The transaction has been successfully transmitted to the Witnet network.</td></tr><tr><td><code>"removed"</code></td><td>The transaction has been removed from the Witnet mempool without ever being included in a block. </td></tr><tr><td><code>"mined"</code></td><td>The transaction has just been included within a Witnet block, with no confirmations just yet.</td></tr><tr><td><code>"confirmed"</code></td><td>The transaction has kept being included within the same Witnet block (no chain rollbacks detected) for some specified number of epochs.</td></tr><tr><td><code>"finalized"</code></td><td>The transaction has been included within a Witnet block, and double-checked by the end of next superblock. </td></tr></tbody></table>

<!-- TODO: replace with tooltip component -->

[^1]: **Radon Requests** are no more than formal description of where to get data from and how to transform it before delivering a query result. They can well be considered to be as "contracts", as all validators are enforced to execute them always in exactly the same way. Radon Requests are uniquely identified by the **RAD hash**, computed as the SHA-256 hash of the its Protobuf-encoded bytecode.

[^2]: Due to the block limitation of 80,000 weight units for inclusion of DRTs, the maximum number of witnesses is ultimately limited by the complexity of Radon Request and the size of the expected result. On Radon Request producing primitive values (like integers, floats, buffer up to 32 bytes), the maximum number of witnesses limited to 125, in practice.

[^3]: I.e. [_ValueTransfers_](manage-witnet-transactions.md#value-transfers), [_StakeDeposits_](manage-witnet-transactions.md#stake-deposits), [_StakeWithdrawals_](manage-witnet-transactions.md#stake-withdrawals), [_DataRequests_](manage-witnet-transactions.md#oracle-queries)_._

[^4]: Either a _**Wallet**_, a wallet's _**Account**_, or a stand-alone _**Signer**._
