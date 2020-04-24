# Wallet Server API

The wallet exposes a JSON-RPC API over Websocket by default at the URL `127.0.0.1:21338`.
It can be set in the Witnet configuration file as follows:

```toml
[wallet]
node_url = "127.0.0.1:21338"
```


## Summary

| Method Name                                             | Request Params                  | Response          |
| ------------------------------------------------------- | ------------------------------- | ----------------- |
| [get_wallet_infos](#get_wallet_infos)                   | (none)                          | `wallet_info[]`   |
| [create_mnemonics](#create_mnemonics)                   | length                          | `string`          |
| [validate_mnemonics](#validate_mnemonics)               | seed_source, seed_data          | `boolean`         |



## Wallet API Endpoints:


### get_wallet_infos
    
The JsonRPC method `get_wallet_infos` returns a list of all wallets with names and captions stored on the wallet server database.

Request (no parameters):

```json
{
  "jsonrpc": "2.0",
  "method": "get_wallet_infos",
  "id": "1"
}
```

Response with an array of all wallets stored inn the server with their information, `infos[]`, containing:

- `id`: *String*, ID associated with the given wallet. 
- `name`: *String*, human-friendly name for the given wallet.
- `caption`: *String*, human-friendly caption for the given wallet.

```json
{
  "jsonrpc": "2.0",
  "result": 
  {
    "infos": 
    [
      {
        "caption":null, 
        "id":"81ccbf4548cfeba37cef93dc64e7f0d8fb410e3967bb40160a36aa362943c520",
        "name":null
      },
      {
        "caption":"caption text",
        "id":"9fa1d779afea88a29768dd05647e37b2f64fc103c1081b0ee9e62fb283f5cd02",
        "name":"wallet name"
      }		
    ]
  },
  "id": 1
}
```


### create_mnemonics

The JsonRPC method `create_mnemonics` is used to generate a [BIP39 mnemonic sentence](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) that can be used to generate a new [HD wallet](https://en.bitcoinwiki.org/wiki/Deterministic_wallet).

Request with parameters:

- `length`: *integer* indicating how many words the mnemonic sentence should have. Must be one of these: `12`, `15`, `18`, `21` or `24`.

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


### validate_mnemonics

The JsonRPC method `validate_mnemonics` is used to validate that validity of the seed source that might be used to generate a new wallet.

Request with parameters:

- `seed_source`: *`"mnemonics | xprv"`* literal to identify if the seed source is of the type *mnemonics* or *xprv*.
- `seed_data`: *String* containing the used seed data, either a list of mnemonic words or a `xprv`.

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

- `valid`: *Boolean*, true if valid seed in form of *mnemonics* or *xpriv*.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "valid": true
  },
  "id": 1
}
```
