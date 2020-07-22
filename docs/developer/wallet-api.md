# Wallet Server API

The wallet exposes a JSON-RPC API over Websocket by default at the URL `127.0.0.1:21338`.
It can be set in the Witnet configuration file as follows:

```toml
[wallet]
node_url = "127.0.0.1:21338"
```


## Summary

| Method Name                                 | Request Params                                           | Response                                      |
| ------------------------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| [create_data_request](#create_data_request) | `session_id`, `wallet_id`, `request`, `fee`              |                                               |
| [create_mnemonics](#create_mnemonics)       | `length`                                                 | `mnemonics`                                   |
| [create_vtt](#create_vtt)                   | `session_id`, `wallet_id`, `pkh`, `value`, `fee`         |                                               |
| [create_wallet](#create_wallet)             | `name`, `caption`, `seed_source`, `seed_data`, `password`| `wallet_id`                                   |
| [close_session](#close_session)             | `session_id`                                             | `success`                                     |
| [generate_address](#generate_address)       | `session_id`, `wallet_id`                                | `address`, `path`                             |
| [get_addresses](#get_addresses)             | `session_id`, `wallet_id`, `offset`, `limit`             |                                               |
| [get_balance](#get_balance)                 | `session_id`, `wallet_id`                                | `total`                                       |
| [get_wallet_infos](#get_wallet_infos)       | (none)                                                   | `wallet_info[]`                               |
| [lock_wallet](#update_wallet)               | `session_id`, `wallet_id`                                | `success`                                     |
| [run_rad_request](#run_rad_request)         | `request`
| [rpc.on](#rpc.on)                           | `session_id`                                             | (`subscription_id`)                           | 
| [update_wallet](#update_wallet)             | `session_id`, `wallet_id`, `name`, `caption`             | `success`                                     |
| [send_transaction](#send_transaction)       | `session_id`, `wallet_id`, `transaction`                 |                                               |
| [shutdown](#shutdown)                       | `session_id`                                             |                                               |
| [sign_data](#sign_data)                     | `session_id`, `wallet_id`, `data`, `extended_pk`
| [unlock_wallet](#unlock_wallet)             | `wallet_id`, `password`                                  | `session_id`, `session_expiration_secs`, ...  |
| [validate_mnemonics](#validate_mnemonics)   | `seed_source`, `seed_data`                               | `valid`                                       |

## Wallet API Endpoints:

### create_data_request

The method `create_data_request` creates a data request from the wallet using.

Request with parameters:

- `session_id`: *number*, generated identifier obtained from unlocking the wallet. See [Unlock Wallet](#unlock_wallet).
- `wallet_id`: *String*, the ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `fee`: *integer*, amount in nanowits.
- `request`: a struct with parameters: data request with CBOR codification, `collateral`, amout in nanoWits,`witness_reward`, amout in nanoWits,`witnesses`, minimum number of witnet nodes that must perform the request,`commit_fee`, amout in nanoWits., `reveal_fee`, amout in nanoWits.,`tally_fee`, amout in nanoWits and`min_consensus_percentage`, minimum of consensus required to consider the request as valid.

As an example , this data request created a data request that retrives the last bitcoin blockhash from three different sources.
```json
{
    "jsonrpc": "2.0",
    "method": "create_data_request",
    "id": "1",
    "params": {
"session_id": "678f4320d8f8ff1a9f86f56f20f0c6a76fba92db0e8e5b1fd2f21092de985f3e",
"wallet_id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
"request": {
            "data_request": {
                "time_lock": 0,
                "retrieve": [
                    {
                        "kind": "HTTP-GET",
                        "url": "https://blockchain.info/q/latesthash",
                        "script": [
                            128
                        ]
                    },
                    {
                        "kind": "HTTP-GET",
                        "url": "https://api-r.bitcoinchain.com/v1/status",
                        "script": [
                            130,
                            24,
                            119,
                            130,
                            24,
                            103,
                            100,
                            104,
                            97,
                            115,
                            104
                        ]
                    },
                    {
                        "kind": "HTTP-GET",
                        "url": "https://api.blockchair.com/bitcoin/stats",
                        "script": [
                            131,
                            24,
                            119,
                            130,
                            24,
                            102,
                            100,
                            100,
                            97,
                            116,
                            97,
                            130,
                            24,
                            103,
                            111,
                            98,
                            101,
                            115,
                            116,
                            95,
                            98,
                            108,
                            111,
                            99,
                            107,
                            95,
                            104,
                            97,
                            115,
                            104
                        ]
                    }
                ],
                "aggregate": {
                    "filters": [],
                    "reducer": 2
                },
                "tally": {
                    "filters": [
                        {
                            "op": 8,
                            "args": []
                        }
                    ],
                    "reducer": 2
                }
            },
            "witness_reward": 1000,
            "witnesses": 3,
            "commit_fee": 10,
            "reveal_fee": 10,
            "tally_fee": 30,
            "min_consensus_percentage": 51,
            "collateral": 1000000000
},
        "fee": 0
    }
}
```

Returns the data request:

```json
{"jsonrpc":"2.0","result":{"bytes":"1297030aa0020a280a260a220a201a79a8689f9ede624043993b620e6042d2b7e80573c19f6752328db4a25c6fc41001121f0a160a14e6635e52a21ab22eaf27bdd036dd104b25d712c310eeabd2d4d1031ad2010abc011229122468747470733a2f2f626c6f636b636861696e2e696e666f2f712f6c6174657374686173681a01801237122868747470733a2f2f6170692d722e626974636f696e636861696e2e636f6d2f76312f7374617475731a0b8218778218676468617368124a122868747470733a2f2f6170692e626c6f636b63686169722e636f6d2f626974636f696e2f73746174731a1e83187782186664646174618218676f626573745f626c6f636b5f686173681a02100222060a020808100210e8071803200a280a301e3833408094ebdc0312720a4b0a490a473045022100dc671fb90cab42baa3a8e26bcd91da954b05299840539288624518ecc3b85140022033d6d65405ada2a72a1a55bb33577a76ef9ab320b58df96a4ce0ab498042620212230a2103f0acd97ec011b875376888b3538f70644e2ad537f61169e95b7c703176925d00","transaction":{"DataRequest":{"body":{"dr_output":{"collateral":1000000000,"commit_fee":10,"data_request":{"aggregate":{"filters":[],"reducer":2},"retrieve":[{"kind":"HTTP-GET","script":[128],"url":"https:\/\/blockchain.info\/q\/latesthash"},{"kind":"HTTP-GET","script":[130,24,119,130,24,103,100,104,97,115,104],"url":"https:\/\/api-r.bitcoinchain.com\/v1\/status"},{"kind":"HTTP-GET","script":[131,24,119,130,24,102,100,100,97,116,97,130,24,103,111,98,101,115,116,95,98,108,111,99,107,95,104,97,115,104],"url":"https:\/\/api.blockchair.com\/bitcoin\/stats"}],"tally":{"filters":[{"args":[],"op":8}],"reducer":2},"time_lock":0},"min_consensus_percentage":51,"reveal_fee":10,"tally_fee":30,"witness_reward":1000,"witnesses":3},"inputs":[{"output_pointer":"1a79a8689f9ede624043993b620e6042d2b7e80573c19f6752328db4a25c6fc4:1"}],"outputs":[{"pkh":"twit1ue34u54zr2ezate8hhgrdhgsfvjawykr9kxtqq","time_lock":0,"value":124999996910}]},"signatures":[{"public_key":{"bytes":[240,172,217,126,192,17,184,117,55,104,136,179,83,143,112,100,78,42,213,55,246,17,105,233,91,124,112,49,118,146,93,0],"compressed":3},"signature":{"Secp256k1":{"der":[48,69,2,33,0,220,103,31,185,12,171,66,186,163,168,226,107,205,145,218,149,75,5,41,152,64,83,146,136,98,69,24,236,195,184,81,64,2,32,51,214,214,84,5,173,162,167,42,26,85,187,51,87,122,118,239,154,179,32,181,141,249,106,76,224,171,73,128,66,98,2]}}}]}},"transaction_id":"b7dbb6fdbf5f07ab6d0b037a9e2119d102172f372ffcdf4630122d1b2914ae02"},"id":"1"}
```


### create_mnemonics

The JsonRPC method `create_mnemonics` is used to generate a [BIP39 mnemonic sentence](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) that can be used to generate a new [HD wallet](https://en.bitcoinwiki.org/wiki/Deterministic_wallet).

Request with parameters:

- `length`: *integer*, indicating how many words the mnemonic sentence should have. Must be one of these: `12`, `15`, `18`, `21` or `24`.

```json
{
  "jsonrpc": "2.0",
  "method": "create_mnemonics",
  "params": { 
    "length": 12 
  },
  "id": 1
}
```

Response:

 - `mnemonics`: *String*, list of words of the mnemonic sentences.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "mnemonics": "day voice lake monkey suit bread occur own cattle visit object ordinary"
  },
  "id": 1
}
```

### create_vtt

Creates a value transfer transaction.

Request with parameters:

- `time_lock`: *Integer*, indicates the epoch from which the data request could run before, before this epoch the request is ignored.
- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).
- `wallet_id`: *String*, ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `address`: *String*, the recipient address.
- `amount`: *number*, value to transfer in nanoWits.
- `fee`: *number*, miner fee in nanoWits.
- `label`: *String*, optional label to refer the vtt.

Example:

```json
{
  "jsonrpc": "2.0",
  "method": "create_vtt",
  "params": {
    "time_lock": 0,
    "session_id": "7bbb8d1bec5419451fa57ae686de93d26e8d265b9328f5dc2f1e6e28acac4201",
    "wallet_id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
    "address": "wit1nfkythqds4r2hz3le2zaauxtl7yum76jr6409f",
    "amount": 1,
    "fee": 1,
    "label": ""
  },
  "id": 18
}
```

The response includes all the information about the transaction:

- `bytes`: the bytes of the transaction.
- `metadata`: description of the outcome of the transaction, includes
    - `fee`: miner fee in nanoWits.
    - `to`: the address of the reciever.
    - `value`: value that has been transferd in nanoWits.

- `transaction`:
    - `ValueTransfer`:
        - `body`: Includes the inputs and outputas of the transaction.
            - `inputs`: output_pointer.
            - `outputs`: the pkh, the time_locak and value.
        - `signatures`: The signature of the transaction and the public key
            - `public_key`
            - `signature`

- `transaction_id`: the ID of the transaction.


 Example of a `create_vtt` response:

```json
 { "jsonrpc": "2.0", "result": { "bytes": "0add010a670a280a260a220a204c4cc66b8bf7828797596ded89db7ddb1cd5b44dc18007738ef3d40e089a6add1001121a0a160a149a6c45dc0d8546ab8a3fca85def0cbff89cdfb521001121f0a160a1425e15594103fde1d9864807d091923ab648d6d1f10fec3d2d4d10312720a4b0a490a4730450221008e0c49acdcc92f63c6c71aa1ce7bb4d0524775c8e0af9d597d1b8bdfd8d2741e02201edd0d276786f7fcf319c4157501dca9c74457cac3b385a7475e6de85e1d826712230a2103f0acd97ec011b875376888b3538f70644e2ad537f61169e95b7c703176925d00", "metadata": { "fee": 448, "to": "wit1nfkythqds4r2hz3le2zaauxtl7yum76jr6409f", "value": 1 }, "transaction": { "ValueTransfer": { "body": { "inputs": [ { "output_pointer": "4c4cc66b8bf7828797596ded89db7ddb1cd5b44dc18007738ef3d40e089a6add:1" } ], "outputs": [ { "pkh": "twit1nfkythqds4r2hz3le2zaauxtl7yum76jd0ut9c", "time_lock": 0, "value": 1 }, { "pkh": "twit1yhs4t9qs8l0pmxrysp7sjxfr4djg6mgldk69zs", "time_lock": 0, "value": 124999999998 } ] }, "signatures": [ { "public_key": { "bytes": [ 240, 172, 217, 126, 192, 17, 184, 117, 55, 104, 136, 179, 83, 143, 112, 100, 78, 42, 213, 55, 246, 17, 105, 233, 91, 124, 112, 49, 118, 146, 93, 0 ], "compressed": 3 }, "signature": { "Secp256k1": { "der": [ 48, 69, 2, 33, 0, 142, 12, 73, 172, 220, 201, 47, 99, 198, 199, 26, 161, 206, 123, 180, 208, 82, 71, 117, 200, 224, 175, 157, 89, 125, 27, 139, 223, 216, 210, 116, 30, 2, 32, 30, 221, 13, 39, 103, 134, 247, 252, 243, 25, 196, 21, 117, 1, 220, 169, 199, 68, 87, 202, 195, 179, 133, 167, 71, 94, 109, 232, 94, 29, 130, 103 ] } } } ] } }, "transaction_id": "66387166eba2d8af0b55bf309b9557ae812bdec0039fc45ece1f744ed309816f" }, "id": 18 }
```



### create_wallet

The JsonRPC method `create_wallet` is used to generate a new Master Key for an empty [HD wallet](https://en.bitcoinwiki.org/wiki/Deterministic_wallet) that is stored encrypted in the file system.

Request with parameters:

- `name` (optional): *String*, human-friendly name for the wallet.
- `caption` (optional): *String*, human-friendly caption for the wallet.
- `seed_source`: *`"mnemonics"|"xprv"`*, literal to identify if the seed source is of the type *mnemonics* or *xprv* and determine how the HD wallet master key will be generated from the data sent in the `seedData` parameter.
- `seed_data`: *String*, data used for generating the new HD wallet master key.
- `password`: *String*, password that will seed the key used to encrypt the wallet in the file system. The password must have at least eight characters.

```json
{
  "jsonrpc": "2.0",
  "method": "create_wallet",
  "params": {
    "name": "Wallet #1",
    "caption": "Personal use",
    "seed_source": "mnemonics",
    "seed_data": "exotic demand way fatigue skull poverty happy divide scrub seed jeans novel",
    "password": "12345678"
  },
  "id": 1
}
```

Response:

- `wallet_id`: *String*, ID associated with the given wallet.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "wallet_id": "6c344625884c2f910065ab170dc18ad3cbbc03c7234507c7c22dbd78e3b26667"
  },
  "id": 1
}
```

### close_session

The JsonRPC method `close_session` is used to close an active session without locking the currently unlocked wallet.

Request with parameters:

- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).

```json
{
	"jsonrpc": "2.0",
	"method": "close_session",
  "params": {
    "session_id": "9fa1d779afea88a29768dd05647e37b2f64fc103c1081b0ee9e62fb283f5cd02"
  },
  "id": "1"
}
```

Response:

- `success`: *Boolean*, reporting if the wallet was successfully closed.

```json
{
	"jsonrpc": "2.0",
  	"result": {
      "success": true
    },
  	"id": "1"
}
```


### generate_address

The JsonRPC method `generate_address` is used to derive deterministically a new external address for the given wallet and session ID.

Request with parameters:

- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).
- `wallet_id`: *String*, ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).

```json
{
	"jsonrpc": "2.0",
	"method": "generate_address",
  "params": {
    "session_id": "9fa1d779afea88a29768dd05647e37b2f64fc103c1081b0ee9e62fb283f5cd02",
    "wallet_id": "6c344625884c2f910065ab170dc18ad3cbbc03c7234507c7c22dbd78e3b26667"
  },
  "id": "1"
}
```

Response:

- `address`: *String*, address derived deterministically.
- `path`: *String*, derivation path used to generate the address.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "address": "twit1gtvu9a37w9sxaej30grp9rpxkkwwjk3pq0jqf9",
    "path": "m/3'/4919'/0'/0/0"
  },
  "id": "1"
}
```


### get

The method `get` allows to retrieve a previous stored key-value data in the wallet database.

Request with parameters:

- `wallet_id`: *String*, the ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).
- `key`: *String*, key under which the value will be stored.

```json
{
  "jsonrpc": "2.0",
  "method": "get",
  "params": {
    "wallet_id": "d5b53a4c40388a9be87acaf5a4dec9fd5c48f94913734bff88a08b18a618c76b",
    "session_id": "5982a279bbd201192f9d3685975c6cebb714ac32dea00cfea80e2013d510e35e",
    "key": "templates"
  },
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "value": {
      "name": "object"
    }
  },
  "id": 1
}
```


### get_addresses

The JsonRPC method `get_addresses` is used to query for a list of previously derived addresses given a wallet and session ID.

Request with parameters:

- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).
- `wallet_id`: *String*, ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `offset` (optional): *number*, initial position of the address list to be queried (by default is set to `0`).
- `limit` (optional): *number*, size of the address list to be returned (by default is set to `25`).

```json
{
  "jsonrpc": "2.0",
  "method": "get_addresses",
  "params": {
    "session_id": "9bcb54bf7494c21c29ef97256f6741b5b5bd5cb31d09d38e5ce98699010beea7",
    "wallet_id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
    "offset": 0,
    "limit": 25
  },
  "id": "1"
}
```

Response with an array of addresses and additional related information:

- `addresses`: *Array<Address>*, list of queried addresses with additional information.
  - `account`: *number*, identifies the current account in the session (the current version only supports the default account `0`).
  - `address`: *String*, address serialized in Bech32 format.
  - `index`: *number*, sequential index used to derive address.
  - `info`: *String*, additional information with balance movements and dates.
    - `first_payment_date`: *number*, date of first received movement in UTC format (Coordinated Universal Time).
    - `label`: *String*, user-defined label for this address.
    - `last_payment_date`: *number*, date of last received movement in UTC format (Coordinated Universal Time).
    - `received_amount`: *number*, total amount (in nanoWits) received by this address.
    - `received_payments`: *Array<String>*, list of Unspent Transaction Outputs (UTXOs) proving funds to this address.
  - `keychain`: *number*, `change` value of the derivation path (See [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
  - `path`: *String*, derivation path used to generate the address.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "addresses": [
      {
        "account": 0,
        "address": "twit1eghyyar76nuvdfu0h70f4gmxruj2rw4g8x2nn8",
        "index": 0,
        "info": {
          "first_payment_date": 1592476860,
          "label": null,
          "last_payment_date": 1592476860,
          "received_amount": 125000000000,
          "received_payments": [
            "78bd0d8e4ef8ab67d4f18b357545f9dc73f63b7bf97a9a20c69b91b9e17ba985:1"
          ]
        },
        "keychain": 0,
        "path": "m/3'/4919'/0'/0/0",
      }
    ],
    "total": 1
  },
  "id": "1"
}
```

### get_balance

The JsonRPC method `get_balance` is used to query the current balance for a given wallet.

Request with parameters:

- `session_id`: *String*, session ID assigned to you when you unlocked the wallet. See [unlock_wallet](#unlock_wallet).
- `wallet_id`: *String*, ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).

```json
{
	"jsonrpc": "2.0",
	"method": "get_balance",
  "params": {
    "session_id": "9fa1d779afea88a29768dd05647e37b2f64fc103c1081b0ee9e62fb283f5cd02",
    "wallet_id": "6c344625884c2f910065ab170dc18ad3cbbc03c7234507c7c22dbd78e3b26667"
  },
  "id": "1"
}
```

Response:

- `total`: *String*, total balance of the wallet in nanoWits (including timelocked transactions).

```json
{
  "jsonrpc": "2.0",
  "result": {
    "total": "0"
  },
  "id": "1"
}
```

### get_wallet_infos

The JsonRPC method `get_wallet_infos` displays the information about the wallet.

This method has no parameters, as an example:

```json
{
  "jsonrpc": "2.0",
  "method": "get_wallet_infos",
  "id": "1"
}
```

Response:

- `caption`: *String*, human-friendly caption for the wallet.
- `id`: *String*, wallet ID.
- `name`:*String*, human-friendly name for the wallet.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "infos": [
      {
        "caption": null,
        "id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
        "name": null
      }
    ]
  },
  "id": "1"
}
```


### lock_wallet

The JsonRPC method `lock_wallet` is used to *lock* the wallet with the specified ID and close the active session. The decryption key for that wallet (hold in memory) is forgotten and the wallet server will be unable to update that wallet information until it is unlocked again.

Request with parameters:

- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).
- `wallet_id`: *String*, ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).

```json
{
	"jsonrpc": "2.0",
  	"method": "lock_wallet",
  	"params": {
    	"session_id": "f1188c907e581f067ac589cf962c7f4fea9443e93d8df10a945e7d17fae49870",
    	"wallet_id": "6c344625884c2f910065ab170dc18ad3cbbc03c7234507c7c22dbd78e3b26667"
  	},
  	"id": "1"
}
```

Response:

- `success`: *Boolean*, reporting if the wallet was successfully locked.

```json
{
	"jsonrpc": "2.0",
  	"result": {
      "success": true
    },
  	"id": "1"
}
```




### rpc.off

Use this method `rpc.off` to unsubscribe from previous subscriptions.

Request with parameters:

- `<data>`: *Array<String>*, subscription identifiers assigned when subscribing to wallet sessions. See [rpc.on](#rpc.on).

```json
{
  "method": "rpc.off",
  "params": ["221794a024ddaee0b0a0e9cb6bfd8f00fed86855134d917255f3cfac3dc84f2b"],
  "id": "1",
  "jsonrpc": "2.0"
}
```

The response for a successful unsubscribe:

```json
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "1"
}
```


### rpc.on

Use this method `rpc.on` to subscribe to update events related to your session wallets.

Request with parameters:

- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).

```json
{
  "method": "rpc.on",
  "params": {
    "session_id": "d4fe394eb9b82b4116f15d821bfb95cf1ddc912bc8fc1d6b2ab1f9c6e37269c4"
  },
  "id": "1",
  "jsonrpc": "2.0"
}
```

The response is:

- `result`: *String*, subscription identifier that can be used to unsubscribe from notifications. See [rpc.off](#rpc.off).


```json
{
  "jsonrpc": "2.0",
  "result": "221794a024ddaee0b0a0e9cb6bfd8f00fed86855134d917255f3cfac3dc84f2b",
  "id": "1"
}
```

Here is an example of a block event sent out by a node:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications",
  "params": [
    {
      "events": [
        {
          "Block": {
            "block_hash": "eb44b8169b155896c323ab392430fe43efde4bd7c896a932c39dfa262738522d",
            "epoch": 293566
          }
        }
      ],
      "status": {
        "account": {
          "balance": 0,
          "id": 0
        },
        "node": {
          "address": "127.0.0.1:21338",
          "last_beacon": {
            "checkpoint": 293566,
            "hashPrevBlock": "eb44b8169b155896c323ab392430fe43efde4bd7c896a932c39dfa262738522d"
          },
          "network": "Mainnet"
        },
        "session": "c8a58658d4d2785e407e77a3dc7e04ac05c5dc66ab76eb0e0d031642ea20e42a",
        "wallet": {
          "id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
          "last_sync": {
            "checkpoint": 293565,
            "hashPrevBlock": "44877f15997b2b791f0da65027c447bce4935554fbc46de449b2219ff5568973"
          }
        }
      }
    }
  ]
}
```

### run_rad_request

The JsonRPC method `run_rad_request` is used to execute a RAD request in order to test it functionally before deploying it on the network.

The request has as parameter a `rad_request`, which has itself as parameters:

- `time_lock`: *Integer*, indicates the epoch from which the data request could run before, before this epoch the request is ignored.
- `retrive`: *retrive-object*, is composed of a supported retrieve method, the url of the API from which get the data of the request, and the the bytes-serialized RADON script.
- `aggregate`: *aggregate-object*, includes the operators needed to perform the aggregation from the retrive.
- `tally`: *aggregate-object*, includes the operators needed to perform the tally after the aggregation.


Example:

```json
{"jsonrpc":"2.0","method":"run_rad_request","params":{
 "rad_request": {
        "time_lock": 0,
        "retrieve": [
          {
            "kind": "HTTP-GET",
            "url": "https://csrng.net/csrng/csrng.php?min=0&max=100",
            "script": [
              131,
              24,
              118,
              130,
              24,
              24,
              0,
              130,
              24,
              100,
              102,
              114,
              97,
              110,
              100,
              111,
              109
            ]
          }
        ],
        "aggregate": {
                    "filters": [],
                    "reducer": 2
                },
    "tally": {
                    "filters": [
                        {
                            "op": 8,
                            "args": []
                        }
                    ],
                    "reducer": 2
                }
            }
        },"id":1}

```

The response includes all the partial results of the request:

```json
{ "jsonrpc": "2.0", "result": { "result": { "aggregate": { "metadata": "Aggregation", "partial_results": [ { "RadonArray": [ { "RadonFloat": 98 } ] }, { "RadonFloat": 98 } ], "result": { "RadonFloat": 98 }, "running_time": { "nanos": 148354, "secs": 0 } }, "retrieve": [ { "metadata": "Retrieval", "partial_results": [ { "RadonString": "[{\"status\":\"success\",\"min\":0,\"max\":100,\"random\":98}]" }, { "RadonArray": [ { "RadonMap": { "max": { "RadonFloat": 100 }, "min": { "RadonFloat": 0 }, "random": { "RadonFloat": 98 }, "status": { "RadonString": "success" } } } ] }, { "RadonMap": { "max": { "RadonFloat": 100 }, "min": { "RadonFloat": 0 }, "random": { "RadonFloat": 98 }, "status": { "RadonString": "success" } } }, { "RadonFloat": 98 } ], "result": { "RadonFloat": 98 }, "running_time": { "nanos": 3303591, "secs": 0 } } ], "tally": { "metadata": { "Tally": { "consensus": 1, "errors": [ false ], "liars": [ false ] } }, "partial_results": [ { "RadonArray": [ { "RadonFloat": 98 } ] }, { "RadonArray": [ { "RadonFloat": 98 } ] }, { "RadonFloat": 98 } ], "result": { "RadonFloat": 98 }, "running_time": { "nanos": 214414, "secs": 0 } } } }, "id": 1 }

```





### send_transaction





### set

The method `set` allows to  set a value to a key in the wallet data base.


Request with parameters:
- `wallet_id`:
- `session_id`: 
- `key`: *String*
- `value`: *Object*


```json
{
  "jsonrpc": "2.0",
  "method": "set",
  "params": {
    "wallet_id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
    "session_id": "3cf194594d69c3b2b80a11f30953da96599dd2dd56cf72db838abba092cea3df",
    "key": "templates",
    "value": {     
  "name": "object"
  }
},
  "id": 13
}

```

Response

```json
×
{
  "jsonrpc": "2.0",
  "result": null,
  "id": 13
}
```


### shutdown

To shutdown the wallet. It has no response, directly stops the wallet specified in the parameters.

Request with parameters:

- `session_id`: *String*, session ID assigned when unlocking the wallet. See [unlock_wallet](#unlock_wallet).

```json
{
  "method": "shutdown",
  "params": {
    "session_id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c"
  },
  "id": "1",
  "jsonrpc": "2.0"
}
```

### sign_data

This method uses the wallet's master key to sign message data.

The parameters are:

- `session_id`: *number*, generated identifier obtained from unlocking the wallet. See [Unlock Wallet](#unlock_wallet).
- `wallet_id`: *String*, the ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `data`: *String*, the data to be signed.
- `extended_pk`: *Bool*, if this flag is set to true, extended public key will be include (`chaincode`).

Example

```json
{
  "jsonrpc": "2.0",
  "method": "sign_data",
  "params": {
    "session_id": "61078ed2685b82854b1d40b23e200994e80a04c2e2ba82e0e92c7adb9e348cad",
    "wallet_id": "8f5b85981addad621a86f01a1ddb646ccd90620c95247948ce8d99feefd0496c",
    "data": "data",
    "extended_pk": true
  },
  "id": 1
```

The response includes the parameters:

- `chaincode`:
- `public_key`:*String*, the wallet's public key.
- `signture`:*String*, the signature.

```json

{
  "jsonrpc": "2.0",
  "result": {
    "chaincode": "c42185b347af99f7fbb4bf41f8ea1e9b1be70f1a4507f7cbe62e99f487af4af4",
    "public_key": "025aaf8c0fd8598a5486085900e1ffe464ef4241281a5fff80389235740d3f19d2",
    "signature": "30450221008fb3756fb3056df78cd43d0f2abe97a60c203eeb6d5e2180b9f7abad7ade375102207a488ae575abb88f1eaddfdbe72ad1c4738c62f8e96c448c5f7b1ad478199e5d"
  },
  "id": 1
}
```

### unlock_wallet

The JsonRPC method `unlock_wallet` is used to *unlock* the wallet with the specified identifier by providing a decryption key. This key will be hold in memory until the wallet is locked again. As long as a wallet is unlocked, you can operate it without having to supply the password again by just using the session ID, until it expires.

Request with parameters:

- `wallet_id`: *String*, the ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `password`: *String*, the password that unlocks the wallet.

```json
{
  "jsonrpc": "2.0",
  "method": "unlock_wallet",
  "params": {
    "wallet_id": "6c344625884c2f910065ab170dc18ad3cbbc03c7234507c7c22dbd78e3b26667",
    "password": "12345678"
  },
  "id": 1
}
```

Response:

- `session_id`: *number*, generated identifier for the current wallet session.
- `session_expiration_secs`: *number*, amount of seconds after which the session will expire.
- `account_balance`: *number*, wallet's account balance in nano Wits.
- `name`: *String*, human-friendly name for the wallet.
- `caption`: *String*, human-friendly caption for the wallet.
- `current_account`: *number*, identifies the current active account in the session (the current version only supports the default account `0`).
- `available_accounts`: *Array<number>*, list of available accounts in the wallet.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "account_balance": 0,
    "available_accounts": [
      0
    ],
    "caption": null,
    "current_account": 0,
    "name": null,
    "session_expiration_secs": 3200,
    "session_id": "9c4f690a50de45b91bb4a5d7fc964c6853ca4eb29fa4ed3e2c9ddfd3e2da45e7"
  },
  "id": 1
}
```


### update_wallet

The JsonRPC method `update_wallet` is used to update the name and/or caption of an existing wallet.

Request with parameters:

- `wallet_id`: *String*, the ID associated to the wallet. See [get_wallet_infos](#get-wallet-infos).
- `session_id`: *number*, generated identifier obtained from unlocking the wallet. See [Unlock Wallet](#unlock_wallet).
- `name`: *String*, human-friendly name for the wallet.
- `caption`: *String*, human-friendly caption for the wallet.

```json
{
  "jsonrpc": "2.0",
  "method": "update_wallet",
  "params": {
    "session_id": "f1188c907e581f067ac589cf962c7f4fea9443e93d8df10a945e7d17fae49870",
    "wallet_id": "6c344625884c2f910065ab170dc18ad3cbbc03c7234507c7c22dbd78e3b26667",
    "name": "New Name",
    "caption": "New Caption"
  },
  "id": 1
}
```

Response:

- `success`: *Boolean*, reporting if the wallet's update was successfull.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "success": true
  },
  "id": 1
}
```



### validate_mnemonics

The JsonRPC method `validate_mnemonics` is used to verify that validity of the seed source that might be used to generate a new wallet.

Request with parameters:

- `seed_source`: *`"mnemonics"|"xprv"`*, literal to identify if the seed source is of the type *mnemonics* or *xprv*.
- `seed_data`: *String*, containing the used seed data, either a list of mnemonic words or a `xprv`.

```json
{
  "jsonrpc": "2.0",
  "method": "validate_mnemonics",
  "params": { 
  	"seed_source": "mnemonics",
    "seed_data": "day voice lake monkey suit bread occur own cattle visit object ordinary"
  },
  "id": 1
}
```

Response:

- `valid`: *Boolean*, true if valid seed in form of *mnemonics* or `xprv`.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "valid": true
  },
  "id": 1
}
```




