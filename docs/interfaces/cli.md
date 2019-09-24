# Command Line Interface (CLI)

The cli subcommand provides a human-friendly command-line interface to the node [JSON-RPC API][jsonrpc].

## Usage

See all the available options by running the help command.
`cargo run --` can be used to replace `witnet` in a development environment.

```sh
witnet node --help
cargo run -- node --help
```

To get more information about a particular command:

```sh
witnet node blockchain --help
```

The JSON-RPC server address is obtained from the [configuration file][configuration].
The path of this file can be set using the `-c` or `--config` flag.
This flag must appear before `node`.

```sh
witnet -c witnet.toml node blockchain
```

You can use the `-n` flag to easily overwrite the node address.
This flag must appear after the command name.

```sh
witnet node blockchain -n "127.0.0.1:1234"
```

If there is any error, the process will return a non-zero exit code.

```text
witnet node blockchain
Error: Connection refused (os error 111)
```

The executable implements the usual logging API, which can be enabled using `RUST_LOG=witnet=debug`:

```text
$ RUST_LOG=witnet=debug witnet cli getBlockChain
 INFO 2019-01-03T12:04:43Z: witnet::json_rpc_client: Connecting to JSON-RPC server at 127.0.0.1:21338
ERROR 2019-01-03T12:04:43Z: witnet: Error: Connection refused (os error 111)
```

## Commands

### block

Find a block by its hash.

```sh
witnet node block 9372e2ed0c637a9733e92d7e0d4f1aa1f297c43a80bc3be57fc7d7738efb0ef4
```

The hash of the block should be provided as a hexadecimal string.

```json
{"jsonrpc":"2.0","result":{"block_header":{"beacon":{"checkpoint":74005,"hashPrevBlock":"ac6ec0020e726577fa3df3fd04de2a30b020c4a864602375a129e090707a90dc"},"merkle_roots":{"commit_hash_merkle_root":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","dr_hash_merkle_root":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","mint_hash":"a02e6038ec2a472d6daa8f374bdeca84a62cd5731d33dd865f497f34360874ef","reveal_hash_merkle_root":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","tally_hash_merkle_root":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","vt_hash_merkle_root":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"},"proof":{"proof":{"proof":[2,76,213,68,242,86,29,133,44,102,231,220,74,198,196,117,106,87,200,168,77,176,129,130,10,164,24,13,131,141,240,28,46,72,247,80,196,178,67,144,46,246,44,191,20,119,187,160,110,73,60,243,160,231,188,124,69,238,130,148,69,137,102,60,56,33,62,127,90,62,47,62,77,79,163,151,49,233,127,65,103],"public_key":{"bytes":[163,236,130,238,47,169,114,32,51,173,139,216,109,148,153,253,189,195,194,125,3,156,222,125,123,96,212,247,24,171,132,136],"compressed":2}}},"version":0},"block_sig":{"public_key":{"bytes":[163,236,130,238,47,169,114,32,51,173,139,216,109,148,153,253,189,195,194,125,3,156,222,125,123,96,212,247,24,171,132,136],"compressed":2},"signature":{"Secp256k1":{"der":[48,68,2,32,13,144,153,43,104,8,14,205,157,88,181,226,110,189,101,148,248,193,170,99,177,219,228,149,239,34,1,245,13,207,123,220,2,32,108,71,130,109,147,73,92,96,149,102,125,144,146,252,143,66,74,105,52,185,196,217,95,249,157,11,108,254,35,187,67,12]}}},"txns":{"commit_txns":[],"data_request_txns":[],"mint":{"epoch":74005,"output":{"pkh":"twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr","time_lock":0,"value":50000000000}},"reveal_txns":[],"tally_txns":[],"value_transfer_txns":[]}},"id":"1"}
```

### blockchain

List block hashes.

```sh
witnet node blockchain
```

This method accepts two optional arguments.

* `--epoch=n`: the first epoch for which to show block hashes. A negative epoch means "n epochs ago".
* `--limit=n`: the number of epochs. If zero, unlimited.

```sh
# Get all the block hashes from the genesis block
witnet node blockchain --epoch=0 --limit=0

# Get the block hashes from epochs [0, 19]
witnet node blockchain --epoch=0 --limit=20

# Get the block hashes from the last 10 epochs
witnet node blockchain --epoch=-10 --limit=0

# Get the block hash from 10 epochs ago
witnet node blockchain --epoch=-10 --limit=1

# Get the block hash from the last block
witnet node blockchain --epoch=-1 --limit=1
```

Example output:

```
block for epoch #76229 had digest 8dd75bb0d5475a93c27c4166677fbb3bc154e6731c7e07ecad549a58851c84a4
```

### getBalance

Get total balance of the given account.

* `--pkh=address`: Public key hash for which to get balance. If omitted, defaults to the node pkh.

```sh
witnet node getBalance
witnet node getBalance --pkh=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```

Example output:

```
34099999950005
```

### getPkh

Get the public key hash of the node.

This is the address used for mining blocks, resolving data requests, and
receiving value transfer transactions.

```sh
witnet node getPkh
```

Example output:

```
twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```

### getReputation

Get the reputation of the given account.

* `--pkh=address`: Public key hash for which to get balance. If omitted, defaults to the node pkh.

```sh
witnet node getReputation
witnet node getReputation --pkh=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```

Example output:

```
Identity twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr has 1 reputation and is active
```

```sh
witnet node getReputation --all
```

Example output:

```
Total Reputation: {
    [A] twit1t99a5r6d0lqstl8rdkqw3ywfs2y4zwqhy5zprt: 1
    [A] twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr: 1
}
```

### raw

The `raw` command allows sending raw JSON-RPC requests from the command line.
It can be used in an interactive way: each line of user input will be sent
to the JSON-RPC server without any modifications:

```sh
$ witnet -c witnet.toml node raw
```

Each block represents a method call:
the first line is a request, the second line is a response.

```js
hi
{"jsonrpc":"2.0","error":{"code":-32700,"message":"Parse error"},"id":null}
```
```js
{"jsonrpc": "2.0","method": "getBlockChain", "id": 1}
{"jsonrpc":"2.0","result":[[242037,"3f8c9ed0fa721e39de9483f61f290f76a541757a828e54a8d951101b1940c59a"]],"id":1}
```
```js
{"jsonrpc": "2.0","method": "someInvalidMethod", "id": 2}
{"jsonrpc":"2.0","error":{"code":-32601,"message":"Method not found"},"id":2}
```
```js
bye
{"jsonrpc":"2.0","error":{"code":-32700,"message":"Parse error"},"id":null}
```


Alternatively, the input can be read from a file using pipes, as is usual in Unix-like environments:

```text
$ cat get_block_chain.txt | witnet node raw
{"jsonrpc":"2.0","result":[[242037,"3f8c9ed0fa721e39de9483f61f290f76a541757a828e54a8d951101b1940c59a"]],"id":1}
```

### send

Create a value transfer transaction.

* `--pkh=address`: public key hash of the destination.
* `--value=amount`: value
* `--fee=fee`: fee
* `--time-lock=timestamp`: optional time lock for the created output: the receiver will not be able to spend
the output until the timestamp is reached. 0 means no time-lock.

On success, returns the transaction hash:

```
witnet node send --pkh=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1
{"jsonrpc":"2.0","result":"a6c26804cf76e08ab379ea63e4aa046095dade2ae52fb3ecac90817583e61349","id":"1"}
```

On error, returns the error message:

```
witnet node send --pkh=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=9999999999999999999 --fee=1
{"jsonrpc":"2.0","error":{"code":-32603,"message":"Cannot build a transaction transferring more value than the current available balance: 9999999999999999999 + 1 > 39649999949502"},"id":"1"}
```

Example with time lock set to 2019-10-01

```
witnet node send --pkh=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1 --time-lock=1569888000
{"jsonrpc":"2.0","result":"e5b55ec4930f32383e63de9316238f369ee26d89d4375521071a885fc46b4c17","id":"1"}
```

[jsonrpc]: json-rpc/
[configuration]: ../configuration/toml-file/
