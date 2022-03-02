# 📄 CLI Reference

The cli subcommand provides a human-friendly command-line interface to the node [JSON-RPC API](json-rpc/).

## Usage

See all the available options by running the help command using docker, binary or cargo.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node --help
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node --help
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node --help
```
{% endtab %}
{% endtabs %}

To get more information about any specific command, simply add `--help` at the end. For instance, this will show the available options for the `blockchain` command:

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node blockchain --help
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node blockchain --help
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node blockchain --help
```
{% endtab %}
{% endtabs %}

The JSON-RPC server address is obtained from the [configuration file](configuration/). The path of this file can be set using the `-c` or `--config` flag. This flag must appear before `node`.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node -c witnet.toml node blockchain
```
{% endtab %}

{% tab title="Binary" %}
```
witnet -c witnet.toml node blockchain
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- -c witnet.toml node blockchain
```
{% endtab %}
{% endtabs %}

You can use the `-n` flag to easily overwrite the node address. This flag must appear after the command name.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node -c witnet.toml node blockchain -n "127.0.0.1:1234"
```
{% endtab %}

{% tab title="Binary" %}
```
witnet -c witnet.toml node blockchain -n "127.0.0.1:1234"
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- -c witnet.toml node blockchain -n "127.0.0.1:1234"
```
{% endtab %}
{% endtabs %}

If there is any error, the process will return a non-zero exit code.

{% tabs %}
{% tab title="Docker" %}
```
    docker exec witnet_node witnet node node blockchain
    Error: Connection refused (os error 111)
```
{% endtab %}

{% tab title="Binary" %}
```
    witnet node blockchain
    Error: Connection refused (os error 111)
```
{% endtab %}

{% tab title="Cargo" %}
```
    cargo run -- node blockchain
    Error: Connection refused (os error 111)
```
{% endtab %}
{% endtabs %}

The executable implements the usual logging API, which can be enabled using `RUST_LOG=witnet=debug`:

{% tabs %}
{% tab title="Docker" %}
```
    $ docker exec witnet_node witnet node blockchain
    INFO 2019-01-03T12:04:43Z: witnet::json_rpc_client: Connecting to JSON-RPC server at 127.0.0.1:21338
    ERROR 2019-01-03T12:04:43Z: witnet: Error: Connection refused (os error 111)
```
{% endtab %}

{% tab title="Binary" %}
```
    $ RUST_LOG=witnet=debug witnet node blockchain
    INFO 2019-01-03T12:04:43Z: witnet::json_rpc_client: Connecting to JSON-RPC server at 127.0.0.1:21338
    ERROR 2019-01-03T12:04:43Z: witnet: Error: Connection refused (os error 111)
```
{% endtab %}

{% tab title="Cargo" %}
```
    $ RUST_LOG=witnet=debug cargo run -- node blockchain
    INFO 2019-01-03T12:04:43Z: witnet::json_rpc_client: Connecting to JSON-RPC server at 127.0.0.1:21338
    ERROR 2019-01-03T12:04:43Z: witnet: Error: Connection refused (os error 111)
```
{% endtab %}
{% endtabs %}

## Commands

### addPeers

Add addresses to the node's peers and try to connect to them.

The IP addresses are expected in format: list of "address:port" separated by spaces.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node addPeers 52.166.178.145:21337 52.166.178.145:22337
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node addPeers 52.166.178.145:12337 52.166.178.145:22337
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node addPeers 52.166.178.145:12337 52.166.178.145:22337
```
{% endtab %}
{% endtabs %}

Example output:

```
Successfully added peer addresses: ["52.166.178.145:12337", "52.166.178.145:22337"]
```

### address

Get the identifier of the node that acts as its address when interacting with the protocol through transactions.

This is the address used for mining blocks, resolving data requests, and receiving value transfer transactions.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node address
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node address
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node address
```
{% endtab %}
{% endtabs %}

Example output:

```
twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```

### balance

Get total balance of a given Witnet address. Balances are shown in wits.

* `--address=address`: address for which to get balance. If omitted, defaults to the node's own address.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node balance
    docker exec witnet_node witnet node balance --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node balance
    witnet node balance --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node balance
    cargo run -- node balance --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr
```
{% endtab %}
{% endtabs %}

Example output:

```
34099.999950005 wits
```

### block

Print out detailed information about a block being queried by its hash.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node block 9372e2ed0c637a9733e92d7e0d4f1aa1f297c43a80bc3be57fc7d7738efb0ef4
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node block 9372e2ed0c637a9733e92d7e0d4f1aa1f297c43a80bc3be57fc7d7738efb0ef4
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node block 9372e2ed0c637a9733e92d7e0d4f1aa1f297c43a80bc3be57fc7d7738efb0ef4
```
{% endtab %}
{% endtabs %}

The hash of the block should be provided as a hexadecimal string.

Example output:

```json
{
    "jsonrpc": "2.0",
    "result": {
      "block_header": {
        "beacon": {
          "checkpoint": 74005,
          "hashPrevBlock": "ac6ec0020e726577fa3df3fd04de2a30b020c4a864602375a129e090707a90dc"
        },
        "merkle_roots": {
          "commit_hash_merkle_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","dr_hash_merkle_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","mint_hash": "a02e6038ec2a472d6daa8f374bdeca84a62cd5731d33dd865f497f34360874ef","reveal_hash_merkle_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","tally_hash_merkle_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","vt_hash_merkle_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        },
        "proof": {
          "proof": {
            "proof": [
              2,76,213,68,242,86,29,133,44,102,231,220,74,198,196,117,106,87,200,168,77,176,129,130,10,164,24,13,131,141,240,28,46,72,247,80,196,178,67,144,46,246,44,191,20,119,187,160,110,73,60,243,160,231,188,124,69,238,130,148,69,137,102,60,56,33,62,127,90,62,47,62,77,79,163,151,49,233,127,65,103
            ],
            "public_key": {
              "bytes": [
                163,236,130,238,47,169,114,32,51,173,139,216,109,148,153,253,189,195,194,125,3,156,222,125,123,96,212,247,24,171,132,136
              ],
              "compressed": 2
            }
          }
        },
        "version":0
      },
      "block_sig": {
        "public_key": {
          "bytes": [
            163,236,130,238,47,169,114,32,51,173,139,216,109,148,153,253,189,195,194,125,3,156,222,125,123,96,212,247,24,171,132,136
          ],
          "compressed": 2
        },
        "signature": {
          "Secp256k1": {
            "der": [
              48,68,2,32,13,144,153,43,104,8,14,205,157,88,181,226,110,189,101,148,248,193,170,99,177,219,228,149,239,34,1,245,13,207,123,220,2,32,108,71,130,109,147,73,92,96,149,102,125,144,146,252,143,66,74,105,52,185,196,217,95,249,157,11,108,254,35,187,67,12
          ]
        }
      }
    },
    "txns": {
      "commit_txns": [],
      "data_request_txns": [],
      "mint": {
        "epoch":74005,"output": {
          "pkh": "twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr",
          "time_lock": 0,
          "value":50000000000
        }
      },
      "reveal_txns": [],
      "tally_txns": [],
      "value_transfer_txns": []
    }
  },
  "id": "1"
}
```

### blockchain

List block hashes in the local block chain, matched with their epochs.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node blockchain
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node blockchain
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo --run node blockchain
```
{% endtab %}
{% endtabs %}

This method accepts two optional arguments:

* `--epoch=n`: the first epoch for which to show block hashes. A negative epoch means "n epochs ago".
* `--limit=n`: the number of epochs. If zero, unlimited.

{% tabs %}
{% tab title="Docker" %}
```
# Get all the block hashes from the genesis block
    docker exec witnet_node witnet node blockchain --epoch=0 --limit=0

    # Get the block hashes from epochs [0, 19]
    docker exec witnet_node witnet node blockchain --epoch=0 --limit=20

    # Get the block hashes from the last 10 epochs
    docker exec witnet_node witnet node blockchain --epoch=-10 --limit=0

    # Get the block hash from 10 epochs ago
    docker exec witnet_node witnet node blockchain --epoch=-10 --limit=1

    # Get the block hash from the last block
    docker exec witnet_node witnet node blockchain --epoch=-1 --limit=1
```
{% endtab %}

{% tab title="Binary" %}
```
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
{% endtab %}

{% tab title="Cargo" %}
```
# Get all the block hashes from the genesis block
    cargo run -- node blockchain --epoch=0 --limit=0
    
    # Get the block hashes from epochs [0, 19]
    cargo run -- node blockchain --epoch=0 --limit=20
    
    # Get the block hashes from the last 10 epochs
    cargo run -- node blockchain --epoch=-10 --limit=0
    
    # Get the block hash from 10 epochs ago
    cargo run -- node blockchain --epoch=-10 --limit=1
    
    # Get the block hash from the last block
    cargo run -- node blockchain --epoch=-1 --limit=1
```
{% endtab %}
{% endtabs %}

Example output:

```
block for epoch #76229 had digest 8dd75bb0d5475a93c27c4166677fbb3bc154e6731c7e07ecad549a58851c84a4
```

### dataRequestReport

Show information about a data request.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node dataRequestReport 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node dataRequestReport 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node dataRequestReport 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}
{% endtabs %}

Example output:

```
Report for data request 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d:
Deployed in block 159045c67d97e284588be4da89a43319735919144b2aaf1468e7eae6682f42b6 by twit10smy4dez7dpuc8yk3ck2qzgtuaa4vx3nqh5ysl
FINISHED with 2 commits and 2 reveals
Commit rounds: 1/2
Reveal rounds: 1/2
Reveals:
    [Rewarded ] twit1xpc5d7dz6rsnnjrlp98vtn496qzrawu7y5cyx4: RadonTypes::RadonFloat(10172.642950000001)
    [Rewarded ] twit1xcnfm3q57h7uh7y2m23y6hd7jsqufyrlmxgfnq: RadonTypes::RadonFloat(10172.642950000001)
Tally: RadonTypes::RadonFloat(10172.642950000001)
```

If you want to see the request move forwards through its different stages in real time you can use the `watch` command while it is being resolved:

{% tabs %}
{% tab title="Docker" %}
```
watch --color docker exec witnet_node witnet node dataRequestReport 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}

{% tab title="Binary" %}
```
watch --color witnet node dataRequestReport 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}

{% tab title="Cargo" %}
```
watch --color cargo run -- node dataRequestReport 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}
{% endtabs %}

### joinTransaction

Create a value transfer transaction that joins UTXOs.

The following arguments must be provided.

* `--value=amount`: amount in nanoWits.
* `--fee=fee`: miner fee in nanoWits.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node joinTransaction --value=100 --fee=1
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node joinTransaction --value=100 --fee=1
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node joinTransaction --value=100 --fee=1
```
{% endtab %}
{% endtabs %}

### knownPeers

Get the list of peer addresses known to the node. These addresses are tagged as:

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node knownPeers
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node knownPeers
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node knownPeers
```
{% endtab %}
{% endtabs %}

### masterKeyExport

Export the node's master private key. Please keep this totally secret. Anyone with knowledge of this key has full access to all your wit tokens.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node masterKeyExport
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node masterkeyExport
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node masterkeyExport
```
{% endtab %}
{% endtabs %}

### minerList

Display the list of block hashes for each epoch, their miners and the numbers of blocks mined by each address.

{% tabs %}
{% tab title="Docker" %}
```
docker exec  witnet_node ./witnet node minerList
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node minerList
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node minerList
```
{% endtab %}
{% endtabs %}

### nodeStats

Display local node stats.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node nodeStats
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node nodeStats
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node nodeStats
```
{% endtab %}
{% endtabs %}

Among other information, this shows counters for proposed and accepted blocks and participations in resolving data requests ("commitments"):

Block mining stats

* Proposed blocks
* Blocks included in the block chain

Data Request mining stats:

* Times with eligibility to mine a data request
* Proposed commits
* Accepted commits
* Slashed commits

Example output:

```json
Block mining stats:
- Proposed blocks: 81
- Blocks included in the block chain: 1
Data Request mining stats:
- Times with eligibility to mine a data request: 2
- Proposed commits: 0
- Accepted commits: 0
- Slashed commits: 0
```

!!! tip Note that it is perfectly normal for a node to show 0 "blocks included" or "accepted commits" for the first days of it being up. Please be patient, new identities in the system are subject to a slow start for critical security reasons.

### output

Display a transaction output, as referred by it's "output pointer", that is, `<transaction_id>:<output_index>`.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node output 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d:0
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node output 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node output 33c656101dd1dfa2258415d6487c648152b95983d1151f46a679b5d1902f6a8d
```
{% endtab %}
{% endtabs %}

### peers

List inbound and outbound connections currently established by the node. Outbound connections are those initiated on our side, and inbound connections are those that were initiated by peer nodes. A node that does not announce a public address (IP and port) will normally have no inbound connections, as there is no way for other nodes to discover a valid network route to it.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node peers
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node peers
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node peers
```
{% endtab %}
{% endtabs %}

### raw

The `raw` command allows sending raw JSON-RPC requests from the command line. It can be used in an interactive way (don't forget the `-i` flag when using Docker): each line of user input will be sent to the JSON-RPC server without any modifications:

{% tabs %}
{% tab title="Docker" %}
```
$ docker exec -i witnet_node witnet node raw
```
{% endtab %}

{% tab title="Binary" %}
```
$ witnet -c witnet.toml node raw
```
{% endtab %}

{% tab title="Cargo" %}
```
$ cargo run -- -c witnet.toml node raw
```
{% endtab %}
{% endtabs %}

Each block represents a method call: the first line is a request, the second line is a response.

```js
hi
{"jsonrpc": "2.0","error": {"code":-32700,"message": "Parse error"},"id":null}
```

```js
{"jsonrpc": "2.0","method": "blockChain", "id": 1}
{"jsonrpc": "2.0","result": [[242037,"3f8c9ed0fa721e39de9483f61f290f76a541757a828e54a8d951101b1940c59a"]],"id":1}
```

```js
{"jsonrpc": "2.0","method": "someInvalidMethod", "id": 2}
{"jsonrpc": "2.0","error": {"code":-32601,"message": "Method not found"},"id":2}
```

```js
bye
{"jsonrpc": "2.0","error": {"code":-32700,"message": "Parse error"},"id":null}
```

Alternatively, the input can be read from a file using pipes, as is usual in Unix-like environments. For instance, the `bitcoin_price.json` data request example from the [witnet-rust reposity](https://github.com/witnet/witnet-rust/tree/master/examples) can be easily deployed into the network using the `raw` command like this:

{% tabs %}
{% tab title="Docker" %}
```
cat examples/bitcoin_price.json | docker exec -i witnet_node witnet node raw
    {"jsonrpc": "2.0","result": "06e19d996a6776d6cd1ca215f6acd0975d71e64a9dacc06fcfdd7b2538cdbf6d","id": "1"}
```
{% endtab %}

{% tab title="Binary" %}
```
cat examples/bitcoin_price.json | witnet node raw
    {"jsonrpc": "2.0","result": "06e19d996a6776d6cd1ca215f6acd0975d71e64a9dacc06fcfdd7b2538cdbf6d","id": "1"}
```
{% endtab %}

{% tab title="Cargo" %}
```
cat examples/bitcoin_price.json | cargo run -- node raw
    {"jsonrpc": "2.0","result": "06e19d996a6776d6cd1ca215f6acd0975d71e64a9dacc06fcfdd7b2538cdbf6d","id": "1"}
```
{% endtab %}
{% endtabs %}

### reputation

Displays the reputation score associated with a given Witnet address and its elegibility to mine a block.

* `--address=address`: address for which to get reputation score. If omitted, defaults to the node's own address.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node reputation
    docker exec witnet_node witnet node reputation --address=twit1p2my760gmg4gwsnhunwnx3epvj9c4whnsnn8j4
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node reputation
    witnet node reputation --address=twit1p2my760gmg4gwsnhunwnx3epvj9c4whnsnn8j4
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node reputation
    cargo run -- node reputation --address=twit1p2my760gmg4gwsnhunwnx3epvj9c4whnsnn8j4
```
{% endtab %}
{% endtabs %}

Example output:

```
[A] twit1p2my760gmg4gwsnhunwnx3epvj9c4whnsnn8j4 -> Reputation: 1, Eligibility: 28.571429%
```

The parameter `[A]` notifies that the node is active.

Adding the flag `--all` lists all the nodes active and their elegibility. It also lists the nodes with reputation grater than 0 but not active, if any.

!!! tip Note that it is perfectly normal for a node to show 0 reputation for the first days of it being up. Please be patient, new identities in the system are subject to a slow start for critical security reasons.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node reputation --all
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node reputation --all
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node reputation --all
```
{% endtab %}
{% endtabs %}

Example output:

```
Total Reputation: {
    [A] twit1hgert0dwtfmfcnv34epvjyhwamny20vkx09zjc -> Reputation: 2, Eligibility: 42.857143%
    [A] twit1p2my760gmg4gwsnhunwnx3epvj9c4whnsnn8j4 -> Reputation: 1, Eligibility: 28.571429%
    [A] twit18gqex3jg4pazz5am2588fc89qyvg350gs603j2 -> Reputation: 1, Eligibility: 28.571429%

}
```

### send

Create and broadcast a value transfer transaction. That is, send some amount of wit tokens from the node's own balance into a different Witnet address.

* `--address=address`: recipient address.
* `--value=amount`: amount in nanoWits.
* `--fee=fee`: miner fee in nanoWits.
* `--time-lock=timestamp`: optional time lock for the created output: the receiver will not be able to spend the output until the timestamp is reached. 0 means no time-lock.

On success, returns the transaction hash:

{% tabs %}
{% tab title="Docker" %}
```
    docker exec witnet_node witnet node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1
    {"jsonrpc": "2.0","result": "a6c26804cf76e08ab379ea63e4aa046095dade2ae52fb3ecac90817583e61349","id": "1"}
```
{% endtab %}

{% tab title="Binary" %}
```
    witnet node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1
    {"jsonrpc": "2.0","result": "a6c26804cf76e08ab379ea63e4aa046095dade2ae52fb3ecac90817583e61349","id": "1"}
```
{% endtab %}

{% tab title="Cargo" %}
```
    cargo run -- node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1
    {"jsonrpc": "2.0","result": "a6c26804cf76e08ab379ea63e4aa046095dade2ae52fb3ecac90817583e61349","id": "1"}
```
{% endtab %}
{% endtabs %}

On error, returns the error message:

{% tabs %}
{% tab title="Docker" %}
```
    docker exec witnet_node witnet node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=9999999999999999999 --fee=1
    {"jsonrpc": "2.0","error": {"code":-32603,"message": "Cannot build a transaction transferring more value than the current available balance: 9999999999999999999 + 1 > 39649999949502"},"id": "1"}
```
{% endtab %}

{% tab title="Binary" %}
```
    witnet node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=9999999999999999999 --fee=1
    {"jsonrpc": "2.0","error": {"code":-32603,"message": "Cannot build a transaction transferring more value than the current available balance: 9999999999999999999 + 1 > 39649999949502"},"id": "1"}
```
{% endtab %}

{% tab title="Cargo" %}
```
    cargo run -- node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=9999999999999999999 --fee=1
    {"jsonrpc": "2.0","error": {"code":-32603,"message": "Cannot build a transaction transferring more value than the current available balance: 9999999999999999999 + 1 > 39649999949502"},"id": "1"}
```
{% endtab %}
{% endtabs %}

Example with time lock set to 2019-10-01

{% tabs %}
{% tab title="Docker" %}
```
    docker exec witnet_node witnet node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1 --time-lock=1569888000
    {"jsonrpc": "2.0","result": "e5b55ec4930f32383e63de9316238f369ee26d89d4375521071a885fc46b4c17","id": "1"}
```
{% endtab %}

{% tab title="Binary" %}
```
    witnet node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1 --time-lock=1569888000
    {"jsonrpc": "2.0","result": "e5b55ec4930f32383e63de9316238f369ee26d89d4375521071a885fc46b4c17","id": "1"}
```
{% endtab %}

{% tab title="Cargo" %}
```
    cargo run -- node send --address=twit1ulyzvnknjnndkfva636erkkp83wxhhwdfhptsr --value=1234 --fee=1 --time-lock=1569888000
    {"jsonrpc": "2.0","result": "e5b55ec4930f32383e63de9316238f369ee26d89d4375521071a885fc46b4c17","id": "1"}
```
{% endtab %}
{% endtabs %}

### sendRequest

Send a serialized data request. An example of how to create such a request can be found in the [tutorial](https://docs.witnet.io/tutorials/bitcoin-price-feed/introduction/).

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node sendRequest --hex "data request output serialized in hexadecimal format"
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node sendRequest --hex "data request output serialized in hexadecimal format"
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node sendRequest --hex "data request output serialized in hexadecimal format"
```
{% endtab %}
{% endtabs %}

### server

Run a Witnet node server.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node server
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node server
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node server
```
{% endtab %}
{% endtabs %}

### splitTransaction

Create a value transfer transaction that splits UTXOs.

The following arguments must be provided:

* `--value=amount`: amount in nanoWits.
* `--size=size`: amount in nanoWits of each UTXO.
* `--fee=fee`: miner fee in nanoWits.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node joinTransaction --value=100 --size=3 --fee=1
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node joinTransaction --value=100 --size=3 --fee=1
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node joinTransaction --value=100 --size=3 --fee=1
```
{% endtab %}
{% endtabs %}

### transaction

Print out detailed information about a transaction being queried by its hash.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node transaction f6ebdd2e3f52af8404ae3dfbf87fcfc85803a8c14a35966acca6e18585acb8f5
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node transaction f6ebdd2e3f52af8404ae3dfbf87fcfc85803a8c14a35966acca6e18585acb8f5
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node transaction f6ebdd2e3f52af8404ae3dfbf87fcfc85803a8c14a35966acca6e18585acb8f5
```
{% endtab %}
{% endtabs %}

The hash of the transaction should be provided as a hexadecimal string.

Example output:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0c29023ec3c8c9e1a51871a67e235168315160d9f757737c2c390f0a35ad1b24",
    "transaction": {
      "ValueTransfer": {
        "body": {
          "inputs": [
            {
              "output_pointer": "126549b3ea96f40bb211660d7991109d72b43e68e846ea76d4d2f6cd5a3cc7ff:1"
            }
          ],
          "outputs": [
            {
              "pkh": "twit12nqlkyp0zfhthfz898tplh3ns7nedcvlezx4r4",
              "time_lock": 0,
              "value": 100
            },
            {
              "pkh": "twit10smy4dez7dpuc8yk3ck2qzgtuaa4vx3nqh5ysl",
              "time_lock": 0,
              "value":499999999987
            }
          ]
        },
        "signatures": [
          {
            "public_key": {
              "bytes": [
                109,158,138,247,58,8,183,138,57,113,147,147,136,177,252,244,33,147,143,200,255,89,208,192,214,81,128,224,219,180,136,155
              ],
              "compressed": 3
            },
            "signature": {
              "Secp256k1": {
                "der": [
                  48,68,2,32,25,163,14,139,5,92,35,157,90,73,162,93,88,67,117,152,104,178,208,225,123,131,236,59,240,136,18,55,79,168,12,218,2,32,76,68,59,125,99,133,74,11,232,70,157,116,68,151,70,39,187,132,190,110,245,214,29,179,198,182,24,133,137,177,187,142
                ]
              }
            }
          }
        ]
      }
    }
  },
  "id": "1"
}
```

### utxos

Get the unspent transaction outputs of the node. This shows how many UTXOs are available for your node to spend or collateralize.

{% tabs %}
{% tab title="Docker" %}
```
docker exec witnet_node witnet node utxos
```
{% endtab %}

{% tab title="Binary" %}
```
witnet node utxos
```
{% endtab %}

{% tab title="Cargo" %}
```
cargo run -- node utxos
```
{% endtab %}
{% endtabs %}

The output includes information about:

* `Total number of utxos`
* `Total number of utxos bigger than collateral minimum`
* `Total number of utxos older than collateral coinage`

The flag `--long` can be added to the command to get a detailed list of the UTXOs and whether each of them is spendable or collateralizable at this time.
