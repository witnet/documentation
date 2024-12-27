# Node API Reference

## Usage

The **JSON-RPC API** can be consumed through different transports: TCP, HTTP and Websockets. The node operator can enable or disable the JSON-RPC service, as well as specify a different network address for each transport in the node's configuration file. By default, the `tcp` port is set to be 21338, `http` to 21339 and the `ws` to 21340.

### Sensitive methods

Sensitive methods are those that either use the node's master key or provide information that may compromise the node's public key or address, or even the node's private key itself.&#x20;

Sensitive methods allow node operators to easily manage their own nodes from a command line interface within the same host or private network. By default, sensitive methods are enabled.&#x20;

{% hint style="danger" %}
When exposing any of the JSON-RPC ports (tcp/21388, http/21339, ws/21340) to a public IP, ensure to **disable sensitive methods** first by setting `enable_sensitive_methods = false` in your node's witnet.toml configuration file.
{% endhint %}

* [addPeers](node-api.md#addpeers)
* [authorizeStake](node-api.md#authorizestake)
* [clearPeers](node-api.md#clearpeers)
* [createVRF](node-api.md#createvrf)
* [getPkh](node-api.md#getpkh)
* [getPublicKey](node-api.md#getpublickey)
* [initializePeers](node-api.md#initializepeers)
* [masterKeyExport](node-api.md#masterkeyexport)
* [rewind](node-api.md#rewind)
* [sendRequest](node-api.md#sendrequest)
* [sendValue](node-api.md#sendvalue)
* [sign](node-api.md#sign)
* [stake](node-api.md#stake)
* [tryRequest](node-api.md#tryrequest)
*

### Public methods

Public methods provide information that do not compromise node's private information, like its private or public key, or address:

* [dataRequestReport](node-api.md#datarequestreport)
* [getBalance](node-api.md#getbalance)
* [getBlock](node-api.md#getblock)
* [getBlockChain](node-api.md#getblockchain)
* [getConsensusConstants](node-api.md#getconsensusconstants)
* [getMempool](node-api.md#getmempool)
* [getReputation](node-api.md#getreputation)
* [getReputationAll](node-api.md#getreputationall)
* [getSuperblock](node-api.md#getsuperblock)
* [getSupplyInfo](node-api.md#getsupplyinfo)
* [getTransaction](node-api.md#gettransaction)
* [getUtxoInfo](node-api.md#getutxoinfo)
* [knownPeers](node-api.md#knownpeers)
* [inventory](node-api.md#inventory)
* [nodeStats](node-api.md#nodestats)
* [peers](node-api.md#peers)
* [priority](node-api.md#priority)
* [protocol](node-api.md#protocol)
* [queryStakes](node-api.md#querystakes)
* [signalingInfo](node-api.md#signalinginfo)
* [syncStatus](node-api.md#syncstatus)



***

### addPeers

Add one or more peer addresses to the list of available ones.

#### Parameters

* `Vec<SocketAddr>`

#### Returns

* `true`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
    "jsonrpc":"2.0",
    "id":1,
    "method":"addPeers",
    "params": [
        "5.9.5.85:22339", 
        "45.130.104.29:21336"
    ] 
}
```
{% endtab %}

{% tab title="Response" %}
<pre class="language-json"><code class="lang-json"><strong>{
</strong><strong>    "jsonrpc":"2.0",
</strong><strong>    "result":true,
</strong><strong>    "id":1
</strong><strong>}
</strong></code></pre>
{% endtab %}
{% endtabs %}

***

### authorizeStake

Create a stake authorization for the given address.

#### Parameters

* [`AuthorizeStake`](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/node/src/actors/messages.rs#L324)

#### **Returns**

* [`StakeAuthorization`](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/node/src/actors/messages.rs#L336)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "method":"authorizeStake",
  "params":{
    "withdrawer":"twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy"
  },
  "id":"1"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc": "2.0",
  "result": {
    "signature": {
      "public_key": {
        "bytes": [
          101,231,80,230,185,157,78,151,167,243,100,103,76,127,196,106,176,129,160,101,228,59,157,29,107,253,125,255,14,243,227,27
        ],
        "compressed": 3
      },
      "signature": {
        "Secp256k1": {
          "der": [
            48,69,2,33,0,146,100,190,204,55,107,160,55,65,201,156,170,87,180,179,145,223,183,147,239,245,246,46,100,128,13,232,22,73,37,247,66,2,32,9,185,249,36,41,3,124,32,106,55,203,248,38,112,46,194,30,232,5,2,127,242,1,254,162,46,71,40,216,183,146,147
          ]
        }
      }
    },
    "withdrawer": "twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy"
  },
  "id": "1"
}
```
{% endtab %}
{% endtabs %}

***

### clearPeers

Clear all peers from the list of available ones.

#### Parameters

* None.

#### Returns

* `true`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"clearPeers"}
```
{% endtab %}

{% tab title="Response" %}
```json
{"jsonrpc":"2.0","result":true,"id":1}
```
{% endtab %}
{% endtabs %}

***

### createVRF

Create a VRF proof for the provided message with the stored key.

#### Parameters

* `Vec<u8>`

#### Returns

* `Vec<u8>`

#### Example

{% tabs %}
{% tab title="Request" %}
{% code fullWidth="false" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method": "createVRF",
  "params": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
}
```
{% endcode %}
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
}
```
{% endtab %}
{% endtabs %}

***

### dataRequestReport

Show information about a data request.

#### Parameters

* `drTxHash`: Data request transaction hash.

#### Returns

* [`DataRequestInfo`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L3038)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"dataRequestReport",
  "params":["de93bfab2acf2cd4d9f63b80030370e399de975efcb695e298b64b3345ef5a9e"]
}
```
{% endtab %}

{% tab title="Response" %}
{% code fullWidth="true" %}
```json
{
  "jsonrpc":"2.0",
  "id":1
  "result":{
    "block_hash_dr_tx":"b57bd08bbace0a2e5f50727125280ce79558c0dea0c0a2b0e6afb73dfcd66cb5",
    "block_hash_tally_tx":"ffda00517779d41c69bcdffcc9a8712f4409a3a450fd480dcaea3f87d5474723",
    "current_commit_round":2,
    "current_reveal_round":1,
    "current_stage":null,
    "commits":{
      "wit1307xzln4v3947umyhqst4axgljpck6htmxs65j":{
        "body":{
          "bn256_public_key":null,
          "collateral":[
            {
              "output_pointer":"e3186bf4ffef6d4abfc4bc4417934721300082e8e62292b3224876d04c362d98:0"
            }
          ],
          "commitment":"757b7369d4098d7af11b6ed0f926e64538e316f2d7508fd19e59e0cfbbae91ba",
          "dr_pointer":"de93bfab2acf2cd4d9f63b80030370e399de975efcb695e298b64b3345ef5a9e",
          "outputs":[
            {
              "pkh":"wit1307xzln4v3947umyhqst4axgljpck6htmxs65j",
              "time_lock":0,
              "value":134547600522
            }
          ],
          "proof":{
            "proof":{
              "proof":[2, 129, 181, 148, 6, 251, 28, 203, 245, 157, 206, 237, 204, 25, 50, 130, 155, 77, 192, 24, 61, 22, 5, 131, 201, 160, 19, 221, 121, 177, 124, 173, 35, 137, 187, 180, 184, 198, 218, 59, 115, 219, 220, 209, 159, 239, 124, 184, 65, 212, 112, 146, 214, 114, 224, 159, 227, 197, 180, 81, 118, 131, 250, 112, 188, 154, 221, 137, 104, 126, 106, 225, 197, 175, 108, 84, 146, 20, 202, 226, 153],
              "public_key":{
                "bytes":[253, 242, 46, 51, 111, 53, 231, 64, 148, 82, 37, 188, 226, 235, 187, 202, 175, 195, 1, 111, 165, 123, 152, 164, 50, 32, 134, 224, 68, 87, 228, 138],
                "compressed":2
              }
            }
          }
        },
        "signatures":[
          {
            "public_key":{
              "bytes":[253, 242, 46, 51, 111, 53, 231, 64, 148, 82, 37, 188, 226, 235, 187, 202, 175, 195, 1, 111, 165, 123, 152, 164, 50, 32, 134, 224, 68, 87, 228, 138],
              "compressed":2
            },
            "signature":{
              "Secp256k1":{
                "der":[48, 68, 2, 32, 121, 254, 11, 235, 9, 231, 56, 144, 178, 231, 147, 103, 0, 45, 229, 225, 150, 24, 205, 195, 3, 88, 134, 228, 48, 222, 251, 56, 253, 228, 189, 220, 2, 32, 116, 105, 4, 61, 149, 27, 200, 132, 103, 152, 186, 15, 205, 207, 96, 17, 235, 103, 83, 226, 125, 116, 244, 230, 182, 34, 6, 231, 105, 105, 54, 248]
              }
            }
          }
        ]
      },
      ...
    },
    "reveals":{
      "wit1307xzln4v3947umyhqst4axgljpck6htmxs65j":{
        "body":{
          "dr_pointer":"de93bfab2acf2cd4d9f63b80030370e399de975efcb695e298b64b3345ef5a9e",
          "pkh":"wit1307xzln4v3947umyhqst4axgljpck6htmxs65j",
          "reveal":[ 26, 0, 70, 167, 118 ]
        },
        "signatures":[
          {
            "public_key":{
              "bytes":[ 253, 242, 46, 51, 111, 53, 231, 64, 148, 82, 37, 188, 226, 235, 187, 202, 175, 195, 1, 111, 165, 123, 152, 164, 50, 32, 134, 224, 68, 87, 228, 138 ],
              "compressed":2
            },
            "signature":{
              "Secp256k1":{
                "der":[48, 68, 2, 32, 122, 190, 218, 127, 118, 217, 6, 220, 204, 212, 70, 200, 176, 83, 49, 131, 141, 80, 9, 112, 53, 146, 5, 14, 45, 223, 233, 7, 118, 44, 174, 157, 2, 32, 51, 216, 43, 196, 245, 64, 255, 117, 79, 167, 183, 121, 168, 129, 149, 31, 0, 6, 162, 110, 157, 15, 206, 198, 135, 123, 29, 131, 115, 191, 124, 29]
              }
            }
          }
        ]
      },
      ...
    },
    "tally":{
      "dr_pointer":"de93bfab2acf2cd4d9f63b80030370e399de975efcb695e298b64b3345ef5a9e",
      "error_committers":[],
      "out_of_consensus":[],
      "outputs":[
        {
          "pkh":"wit1fn3jvuch23n6h388f4phz2ldm2jqnznw7zk8tg",
          "time_lock":0,
          "value":15150000000
        },
        ...
      ],
      "tally":[26, 0, 70, 167, 118]
    }
  }
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

***

### getBalance

Get the balance of a the `pkh`.

#### Parameters

* `pkh`: The public key hash to get the balance from.
* `simple?`: Distinguish between fetching a simple balance or fetching confirmed and unconfirmed balance. Defaults to \`false\`.&#x20;

#### Returns

* [`NodeB​alance`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/transaction_factory.rs#L43)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
    "jsonrpc":"2.0",
    "id":1,
    "method":"getBalance",
    "params":["wit1vcpsy5cmfaz2jgt5h3getdkqh38cs5edkxmnla"]
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "confirmed":2426279100000000,
        "total":2426279100000000
    }
}
```
{% endtab %}
{% endtabs %}

***

### getBlock

Get detailed information about a block being queried by its hash.&#x20;

#### Parameters

* `blockHash`: The hash of the block must be provided as a hexadecimal string.
* `metadata`: (Optional) If set to true, transactions metadata will be provided.

#### Returns

* &#x20;[`Block`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L390)&#x20;

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
    "jsonrpc":"2.0",
    "id":1,
    "method":"getBlock",
    "params":[
        "0fc5be1043da24fb0a6e6420d9df286fdc22fada5b371dbb547dad4e08e83212", 
        true
    ]
}
```
{% endtab %}

{% tab title="Response" %}
<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "jsonrpc":"2.0",
  "id":1,
  "result":{ 
     // Block data
     ...
  }
}
</code></pre>
{% endtab %}
{% endtabs %}

***

### getBlockChain

Get the list of all the known block hashes.

#### Parameters

* `epoch`: (Optional) First epoch for which to return block hashes. If the provided value is negative, it returns block hashes from the last n epochs. Default to 0.
* `limit`: (Optional) Number of block hashes to return. If the provided value is negative, return the last n block hashes from this epoch range. If the value is zero, it's unlimited. Default to 0.

#### Returns

* `Vec<u32, Hash>`: An array of epochs and block hashes.&#x20;

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getBlockChain",
  "params": { "limit": 1, "epoch": 1 }
}
```
{% endtab %}

{% tab title="Response" %}
```json
  {
    "jsonrpc":"2.0",
    "id":1,
    "result":[
      [ 1, "4571a766e87dbf2dba5f16756a9bbf812911c7e287738f256b4a6b9238783cd6" ]
    ],
  }
```
{% endtab %}
{% endtabs %}

***

### getConsensusConstants

Get consensus constants used by the node.

#### Parameters

* None

#### Returns

* [`ConsensusConstants`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L160)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getConsensusConstants",
  "params":null
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "activity_period":2000,
    "bootstrap_hash":"666564676f6573627272727c2f3030312f3738392f3432382f6130312e676966",
    "bootstrapping_committee":[
      "wit1g0rkajsgwqux9rnmkfca5tz6djg0f87x7ms5qx",
      "wit1cyrlc64hyu0rux7hclmg9rxwxpa0v9pevyaj2c",
      "wit1asdpcspwysf0hg5kgwvgsp2h6g65y5kg9gj5dz",
      "wit13l337znc5yuualnxfg9s2hu9txylntq5pyazty",
      "wit17nnjuxmfuu92l6rxhque2qc3u2kvmx2fske4l9",
      "wit1etherz02v4fvqty6jhdawefd0pl33qtevy7s4z",
      "wit1drcpu0xc2akfcqn8r69vw70pj8fzjhjypdcfsq",
      "wit1gxf0ca67vxtg27kkmgezg7dd84hwmzkxn7c62x",
      "wit1hujx8v0y8rzqchmmagh8yw95r943cdddnegtgc",
      "wit1yd97y52ezvhq4kzl6rph6d3v6e9yya3n0kwjyr",
      "wit1fn5yxmgkphnnuu6347s2dlqpyrm4am280s6s9t",
      "wit12khyjjk0s2hyuzyyhv5v2d5y5snws7l58z207g"
    ],
    "checkpoint_zero_timestamp":1602666000,
    "checkpoints_period":45,
    "collateral_age":1000,
    "collateral_minimum":1000000000,
    "epochs_with_minimum_difficulty":2000,
    "extra_rounds":3,
    "genesis_hash":"6ca267d9accde3336739331d42d63509b799c6431e8d02b2d2cc9d3943d7ab02",
    "halving_period":3500000,
    "initial_block_reward":250000000000,
    "max_dr_weight":80000,
    "max_vt_weight":20000,
    "minimum_difficulty":2000,
    "mining_backup_factor":8,
    "mining_replication_factor":3,
    "reputation_expire_alpha_diff":20000,
    "reputation_issuance":1,
    "reputation_issuance_stop":1048576,
    "reputation_penalization_factor":0.5,
    "superblock_committee_decreasing_period":5,
    "superblock_committee_decreasing_step":5,
    "superblock_period":10,
    "superblock_signing_committee_size":100
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getMempool

Get all the pending transactions.

#### Parameters

* None

#### Returns

* [`GetMempoolResult`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L430)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getMempool",
  "params":null
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "data_request":[
      "c628764c5f20c95a204ccbb5d58ec5df24ca692f766b3006f7b9421cf972975e"
    ],
    "value_transfer":[
      ...      
    ]
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getPublicKey

Get the public key of the node.

#### Parameters

* None

#### Returns

* `[u8; 33]`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getPublicKey",
  "params":[]
}
```
{% endtab %}

{% tab title="Response" %}
```json
  {
    "jsonrpc":"2.0",
    "result": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]",
    "id":1
  }
```
{% endtab %}
{% endtabs %}

***

### getPkh

Get public address of the node.

#### Parameters

* None

#### Returns

* `String`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getPkh",
  "params":[]
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":"wit1234567890abcdefghijklmnopqrstuvwxyz123",
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getReputation

Displays the reputation score associated with a given public address and its eligibility to mine a block.

#### Parameters

* `pkh`: The Witnet public address.

#### Returns

* [`GetReputationResult`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L399)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getReputation",
  "params": ["wit1nwhl5clpeste6gsexmd706c5jv64kc8fd5q94s"] 
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "stats":{
      "wit1nwhl5clpeste6gsexmd706c5jv64kc8fd5q94s":{
        "eligibility":666,
        "is_active":true,
        "reputation":324
      }
    },
    "total_reputation":1054296
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getReputationAll

Get all the nodes active and their elegibility. It also lists the nodes with reputation grater than 0 but not active, if any.

{% hint style="info" %}
Note that it is perfectly normal for a node to show 0 reputation for the first days of it being up. Please be patient, new identities in the system are subject to a slow start for critical security reasons.
{% endhint %}

#### Parameters

* None.

#### Returns

* [`GetReputationResult`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L399)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"getReputationAll" }
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "stats":{
      "wit10006hgq4m3faf425h3ydm4y20qyz2n0k39gqe9":{
        "eligibility":1,
        "is_active":true,
        "reputation":0
      },
      "wit1002p478qpt79zru0evkaadhhukj57exa77fs2v":{
        "eligibility":1,
        "is_active":true,
        "reputation":0
      },
      ...
      ...
    }
    "total_reputation":1054370
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getSuperblock

Get the blocks that pertain to the superblock specified.

#### Parameters

Map including one only of these:

* `block_epoch`: Superblock epoch.
* `superblock_index`: Superblock index.

#### Returns

* [SuperBlockNotify](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L1254)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getSuperblock",
  "params": { 
    "block_epoch": 1800000 
  } 
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "consolidated_block_hashes":[
      "9b34cb85824d173b603f1f55bde4d6bce06066e577ae6d3b364aea9e15916ecd",
      "3cf4d7dbfa5edfd83ca65864effe9f857d17c6cebaac417c7c1a30ed448222e4",
      "2193d6d6aa7e2a6ea8328a4ed1f5efa78dc2552ad9088d534f929f92c6b344db",
      "37546ac2a0f20ee9af617d368438bf6945fcdbaf9d38582dabfb421343765674",
      "cd8049ee7642e57d88df69ee520aa50dc4a968ea4169254f2f6b8bfa0aa87986",
      "c50c21d54d124459fb0dc9fa022098e71e26b957db5ce92199e868ab7df472d3",
      "d5045f999a7542787aa285e537de0ba290867e025600db2c8a07c3116a4e805e",
      "96b27cb0017806f701aad3382cf447c54ca7339dd2b1d9dbbe92c12752f97a89",
      "7470ff40b7b630b825ade9e0b3f93f8dac3e4bae2f86b7ab3e0eabac66cc63ab",
      "b64ae8ac5fbec6a46ea9d61ed0e20703f59cea680871489808944ddeece10a24"
    ],
    "superblock":{
      "ars_root":"fe5282ad72b912103af8badfb33cd401e327f18c33fa6e177f06933602728917",
      "data_request_root":"d6854103b15ff5f9399e0d4267689aa43d5817de452545dd513cf9c1434f04d1",
      "index":180001,
      "last_block":"b64ae8ac5fbec6a46ea9d61ed0e20703f59cea680871489808944ddeece10a24",
      "last_block_in_previous_superblock":"d8570b129fcfcd88fc1eee52aef2281b8f4bb5266ea9ba2e1ae89fae0e93655e",
      "signing_committee_length":100,
      "tally_root":"4c5e06e77405fd8178145e3208bda87af29c0d90dd95a1f9efa664851577c40e"
    }
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getSupplyInfo

Get supply information.

#### Parameters

* None

#### Returns

* [`SupplyInfo`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L1733)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"getSupplyInfo","params": [] }
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "blocks_minted":1956314,
    "blocks_minted_reward":489078500000000000,
    "blocks_missing":59817,
    "blocks_missing_reward":14954250000000000,
    "current_locked_supply":50050000000,
    "current_time":1693391940,
    "current_unlocked_supply":1238509862457667720,
    "epoch":2016132,
    "in_flight_requests":2,
    "locked_wits_by_requests":15500000000,
    "maximum_supply":2499431427962167720
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### getTransaction

Get detailed information about a transaction being queried by its hash.

#### Parameters

* `txHash`: It should be provided as a hexadecimal string.

#### Returns

* [`Transaction`](https://github.com/witnet/witnet-rust/blob/master/data_structures/src/transaction.rs#L137)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getTransaction",
  "params": ["0afd47114900d4ab866a80203f54900b9fee6bdcd0a44f0be8cad3587c7a445a"] 
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "id":1
  "result": {
    "blockEpoch":2016368,
    "blockHash":"400e7c93f9f715953229f901d0632d1a5826ce7cc2aabe9c4ef17524abe0716f",
    "confirmed":true,
    "transaction":{
      "ValueTransfer":{
        "body":{
          "inputs":[
            {
              "output_pointer":"f8214a721f1eb2c3136bce6a21e9c8b2f024c3135273c88d7a0bbafa3309d46c:1"
            },
            {
              "output_pointer":"564dfaa8beffdbd6490973f2d63c0614d15d3c68ef8b95bf5509607ebf5e7659:0"
            },
            {
              "output_pointer":"65eb3ce6657f8c3ca5f43e419e39bce26b9466d8ffd1b9b1c75529f0f262caf0:0"
            }
          ],
          "outputs":[
            {
              "pkh":"wit1y8y2lwxzmplq8m9c32znsv9h732srj09uq6wwf",
              "time_lock":0,
              "value":58186900000000
            },
            {
              "pkh":"wit1avahnh0f5yzatwvqw8ggg74puylfv5rzz7lxce",
              "time_lock":0,
              "value":40267717748000
            }
          ]
        },
        "signatures":[
          {
            "public_key":{
              "bytes": [168,76,60,25,76,29,57,64,9,192,246,50,77,132,196,204,39,175,103,194,45,93,161,113,20,128,240,3,4,132,140,242 ],
              "compressed":2
            },
            "signature":{
              "Secp256k1":{
                "der": [48,68,2,32,13,178,108,144,169,163,132,37,220,50,26,59,55,189,198,238,179,224,50,223,160,56,251,235,6,9,103,194,241,187,231,185,2,32,10,0,125,149,100,22,36,169,196,199,8,126,149,51,253,251,168,40,70,92,254,187,105,23,118,125,244,102,21,236,184,134]
              }
            }
          },
          {
            "public_key":{
              "bytes": [108,146,137,55,19,101,172,42,40,39,159,174,167,122,65,100,188,160,209,159,235,75,80,93,129,255,225,173,200,54,153,61],
              "compressed":3
            },
            "signature":{
              "Secp256k1":{
                "der": [48,69,2,33,0,138,236,155,104,126,68,141,116,170,227,136,1,20,250,26,171,209,68,238,131,9,41,234,13,193,78,195,32,89,165,156,66,2,32,55,61,102,144,112,99,100,147,81,236,91,30,136,231,146,41,34,93,19,13,43,188,77,250,141,130,140,197,174,182,193,143]
              }
            }
          },
          {
            "public_key":{
              "bytes": [108,146,137,55,19,101,172,42,40,39,159,174,167,122,65,100,188,160,209,159,235,75,80,93,129,255,225,173,200,54,153,61],
              "compressed":3
            },
            "signature":{
              "Secp256k1":{
                "der": [48,69,2,33,0,138,236,155,104,126,68,141,116,170,227,136,1,20,250,26,171,209,68,238,131,9,41,234,13,193,78,195,32,89,165,156,66,2,32,55,61,102,144,112,99,100,147,81,236,91,30,136,231,146,41,34,93,19,13,43,188,77,250,141,130,140,197,174,182,193,143]
              }
            }
          }
        ]
      }
    },
    "weight":1119
  }
}
```
{% endtab %}
{% endtabs %}

***

### getUtxoInfo

Get unspent transaction outputs belonging to given public address.

#### Parameters

* `pkh`: Public address.

#### Returns

* [`UtxoInfo`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/utxo_pool.rs#L560)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"getUtxoInfo",
  "params": ["wit1234567890abcdefghijklmnopqrstuvwxyz123"] 
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "collateral_min":1000000000,
    "utxos":[
      {
        "output_pointer":"1234567890abcdefghijklmnopqrstuvwxyz1234567890123456789012345678:0",
        "timelock":0,
        "utxo_mature":false,
        "value":84420000000
      }
    ]
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### knownPeers

Get the list of peer addresses known to the node.&#x20;

#### Parameters

* None

#### Returns

A list with the address of the peer and the type which can be `new` or `tried`.

* `Vec<`[`AddrType`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/json_rpc/api.rs#L1489)`>`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"knownPeers","params": [] }
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":[
    {
      "address":"5.9.110.149:22345",
      "type":"new"
    },
    {
      "address":"5.9.116.217:22372",
      "type":"tried"
    },
    ...
  ],
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### initializePeers

Initialize all known peers present in [witnet.toml#connections](https://github.com/witnet/witnet-rust/blob/master/witnet.toml#L12).

#### Parameters

* None

#### Returns

* `true`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
 {"jsonrpc":"2.0","id":1,"method":"initializePeers"}
```
{% endtab %}

{% tab title="Response" %}
```json
{"jsonrpc":"2.0","result":true,"id":1}
```
{% endtab %}
{% endtabs %}

***

### inventory

Make the node process, validate and potentially broadcast a new inventory entry.

#### Parameters

* Accepts the JSON serialization of a well-formed [Block](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L390) or [Transaction](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/transaction.rs#L126).&#x20;

#### Returns

* `true` if no errors.

#### Example

{% tabs %}
{% tab title="Request" %}
```json
 {
   "jsonrpc":"2.0",
   "id":1,
   "method": "inventory", 
   "params": {
     "transaction": {
       "ValueTransfer": {
         "body": {
           "inputs": [
             {
               "output_pointer": "0000000000000000000000000000000000000000000000000000000000000000:0"
             }
           ], 
           "outputs": [
             {
               "pkh": "wit100000000000000000000000000000000123456", 
               time_lock: 0, 
               value: 1
             }
           ]
         }, 
         "signatures": [
           {
             "public_key": {
               "bytes": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 
               "compressed": 2
             }, 
             "signature": {
               "Secp256k1": {
                 "der": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]
               }
             }
           }
         ]
       }
     }
   }
 }
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result": true,
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### nodeStats

Get stats info from node.

#### Parameters

* None

#### Returns

* [`NodeStats`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L3230)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"nodeStats","params": [] }
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "block_mined_count":0,
    "block_proposed_count":505,
    "commits_count":0,
    "commits_proposed_count":0,
    "dr_eligibility_count":0,
    "last_block_proposed":"2ae9392499c27a4c0e0f4c0ecf03061af86558c3c85b9418294d199d3d6adc95",
    "slashed_count":0
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### masterKeyExport

Export the private key associated with the node identity in XPRV format.

#### Parameters

* None

#### Returns

* `String`: Private key in XPRV format.

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"masterKeyExport","params":[]}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":"xprv1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1",
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### peers

List inbound and outbound connections currently established by the node. Outbound connections are those initiated on our side, and inbound connections are those that were initiated by peer nodes. A node that does not announce a public address (IP and port) will normally have no inbound connections, as there is no way for other nodes to discover a valid network route to it.

#### Parameters

* None

#### Returns

* `Vec<`[`AddrType`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/json_rpc/api.rs#L1489)`>`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"peers","params": [] }
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":[
    {
      "address":"5.9.116.217:22354",
      "type":"outbound"
    },
    {
      "address":"94.130.44.252:22347",
      "type":"outbound"
    },
    {
      "address":"94.130.55.99:22367",
      "type":"outbound"
    },
    {
      "address":"136.243.153.221:22360",
      "type":"outbound"
    },
    {
      "address":"142.132.134.228:22368",
      "type":"outbound"
    },
    {
      "address":"142.132.150.124:22377",
      "type":"outbound"
    },
    {
      "address":"142.132.254.248:22349",
      "type":"outbound"
    },
    {
      "address":"142.132.254.252:22362",
      "type":"outbound"
    }
  ],
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### priority

Get priority and time-to-block estimations for different priority tiers.

#### Parameters

* None

#### Returns

[`PriorityEstimate`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/priority.rs#L484): A map whose keys represent the different levels of priority for data requests transactions and value transfer transactions: stinky, low, medium, high and opulent. The value is a map which includes:

* `priority`: priority value in nanowits per weight unit.
* `time_to_block`: average for your transaction to be included in a block in seconds.

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"priority","params": []}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result": {
    "drt_high": {
      "priority": 29149.797570850205,
      "time_to_block": 300
    },
    "drt_low": {
      "priority": 28070.175438596492,
      "time_to_block":3600
    },
    "drt_medium": {
      "priority":29149.797570850205,
      "time_to_block":900
    },
    "drt_opulent": {
      "priority": 52901.48448043185,
      "time_to_block":60
    },
    "drt_stinky": {
      "priority": 0.1,
      "time_to_block": 21600
    },
    "vtt_high":{
      "priority": 0.46893317702227433,
      "time_to_block":300
    },
    "vtt_low":{
      "priority": 0.2,
      "time_to_block":3600
    },
    "vtt_medium":{
      "priority": 0.3,
      "time_to_block":900
    },
    "vtt_opulent": {
      "priority": 11.723329425556859,
      "time_to_block":60
    },
    "vtt_stinky":{
      "priority": 0.1,"time_to_block":21600
    }
  },
  "id": 1
}
```
{% endtab %}
{% endtabs %}

***

### protocol

Get information about protocol versions and which version is currently being enforced.

#### Parameters

* None

#### Returns

* Option<[ProtocolInfo](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/data_structures/src/proto/versioning.rs#L28)>

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "method":"protocol",
  "id":"1"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc": "2.0",
  "result": {
    "all_checkpoints_periods": {
      "V1_8": 45,
      "V2_0": 20
    },
    "all_versions": {
      "efv": {
        "V1_8": 981,
        "V2_0": 4260
      },
      "vfe": {
        "981": "V1_8",
        "4260": "V2_0"
      }
    },
    "current_version": "V2_0"
  },
  "id": "1"
}
```
{% endtab %}
{% endtabs %}

***

### queryStakes

Query amount of nanowits staked by an address or get all stake entries in the network.

Parameters

* [`QueryStakesArgument`](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/node/src/actors/json_rpc/api.rs#L2187)

Returns

* [`Vec<StakeEntry>`](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/node/src/actors/messages.rs#L375)

Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "method":"queryStakes",
  "params":{
    "all":true
  },
  "id":1
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":[
    {
      "key":{
        "validator":"twit1pc8jzqph4t0md02e6fgwgsw26yll20p98c3pgh",
        "withdrawer":"twit1f0am8c97q2ygkz3q6jyd2x29s8zaxqlxcqltxx"
      },
      "value":{
        "coins":9692146001200055,
        "epochs":{
          "mining":18942,
          "witnessing":6976
        },
        "nonce":5276
      }
    },
    {
      "key":{
        "validator":"twit19m2w2lhzwwmt7zn8y5xzrq4qxt40xu8r3ycd77",
        "withdrawer":"twit19m2w2lhzwwmt7zn8y5xzrq4qxt40xu8r3ycd77"
      },
      "value":{
        "coins":2506100000000000,
        "epochs":{
          "mining":18938,
          "witnessing":1283
        },
        "nonce":124
      }
    },
    {
      "key":{
        "validator":"twit1f0am8c97q2ygkz3q6jyd2x29s8zaxqlxcqltxx",
        "withdrawer":"twit1f0am8c97q2ygkz3q6jyd2x29s8zaxqlxcqltxx"
      },
      "value":{
        "coins":2184500000384780,
        "epochs":{
          "mining":18944,
          "witnessing":6976
        },
        "nonce":1544
      }
    }
  ],
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### rewind

Delete the chain state until the specified epoch and resync from there.

#### Parameters

* Epoch: `u32`

#### Returns

* `true`

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"rewind","params": [1000000]}
```
{% endtab %}

{% tab title="Response" %}
```json
{"jsonrpc":"2.0","result":true,"id":1}
```
{% endtab %}
{% endtabs %}

***

### sendRequest

Create and broadcast a data request transaction to the Witnet Network.

#### Parameters

* [`BuildDrt`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L225)

#### Returns

* [`DrTransaction`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/transaction.rs#L322)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "method":"sendRequest",
  "params":{
    "dro":{
      "data_request":{
        "time_lock":0,
        "retrieve":[
          {
            "kind":"HTTP-GET",
            "url":"https://api.binance.US/api/v3/ticker?symbol=ETHUSD",
            "script":[
              132, 24, 119,130,24,100,105,108,97,115,116,80,114,105,99,101,130,24,87,26,0,15,66,64,24,91
            ]
          },
          {
            "kind":"HTTP-GET",
            "url":"https://api.bitfinex.com/v1/pubticker/ETHUSD",
            "script":[
              132,24,119,130,24,100,106,108,97,115,116,95,112,114,105,99,101,130,24,87,26,0,15,66,64,24,91
            ]
          },
          {
            "kind":"HTTP-GET",
            "url":"https://www.bitstamp.net/api/v2/ticker/ethusd",
            "script":[
              132,24,119,130,24,100,100,108,97,115,116,130,24,87,26,0,15,66,64,24,91
            ]
          },
          {
            "kind":"HTTP-GET",
            "url":"https://api.bittrex.com/v3/markets/ETH-USD/ticker",
            "script":[
              132,24,119,130,24,100,109,108,97,115,116,84,114,97,100,101,82,97,116,101,130,24,87,26,0,15,66,64,24,91
            ]
          },
          {
            "kind":"HTTP-GET",
            "url":"https://api.coinbase.com/v2/exchange-rates?currency=ETH",
            "script":[
              134,24,119,130,24,102,100,100,97,116,97,130,24,102,101,114,97,116,101,115,130,24,100,99,85,83,68,130,24,87,26,0,15,66,64,24,91
            ]
          },
          {
            "kind":"HTTP-GET",
            "url":"https://api.kraken.com/0/public/Ticker?pair=ETHUSD",
            "script":[
             135,24,119,130,24,102,102,114,101,115,117,108,116,130,24,102,104,88,69,84,72,90,85,83,68,130,24,97,97,97,130,22,0,130,24,87,26,0,15,66,64,24,91
            ]
          }
        ],
        "aggregate":{
          "filters":[
            {
              "op":5,
              "args":[
                250,63,192,0,0
              ]
            }
          ],
          "reducer":3
        },
        "tally":{
          "filters":[
            {
              "op":5,
              "args":[250,64,32,0,0]
            }
          ],
          "reducer":3
        }
      },
      "witness_reward":150000000,
      "witnesses":10,
      "commit_and_reveal_fee":10000000,
      "min_consensus_percentage":51,
      "collateral":15000000000
    },
    "fee":{
      "absolute":3588
    },
    "dry_run":false
  },
  "id":"12"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "body":{
      "dr_output":{
        "collateral":15000000000,
        "commit_and_reveal_fee":10000000,
        "data_request":{
          "aggregate":{
            "filters":[
              {
                "args":[250,63,192,0,0],
                "op":5
              }
            ],
            "reducer":3
          },
          "retrieve":[
            {
              "kind":"HTTP-GET",
              "url":"https://api.binance.US/api/v3/ticker?symbol=ETHUSD",
              "script":[
                132, 24, 119,130,24,100,105,108,97,115,116,80,114,105,99,101,130,24,87,26,0,15,66,64,24,91
              ]
            },
            {
              "kind":"HTTP-GET",
              "url":"https://api.bitfinex.com/v1/pubticker/ETHUSD",
              "script":[
                132,24,119,130,24,100,106,108,97,115,116,95,112,114,105,99,101,130,24,87,26,0,15,66,64,24,91
              ]
            },
            {
              "kind":"HTTP-GET",
              "url":"https://www.bitstamp.net/api/v2/ticker/ethusd",
              "script":[
                132,24,119,130,24,100,100,108,97,115,116,130,24,87,26,0,15,66,64,24,91
              ]
            },
            {
              "kind":"HTTP-GET",
              "url":"https://api.bittrex.com/v3/markets/ETH-USD/ticker",
              "script":[
                132,24,119,130,24,100,109,108,97,115,116,84,114,97,100,101,82,97,116,101,130,24,87,26,0,15,66,64,24,91
              ]
            },
            {
              "kind":"HTTP-GET",
              "url":"https://api.coinbase.com/v2/exchange-rates?currency=ETH",
              "script":[
                134,24,119,130,24,102,100,100,97,116,97,130,24,102,101,114,97,116,101,115,130,24,100,99,85,83,68,130,24,87,26,0,15,66,64,24,91
              ]
            },
            {
              "kind":"HTTP-GET",
              "url":"https://api.kraken.com/0/public/Ticker?pair=ETHUSD",
              "script":[
               135,24,119,130,24,102,102,114,101,115,117,108,116,130,24,102,104,88,69,84,72,90,85,83,68,130,24,97,97,97,130,22,0,130,24,87,26,0,15,66,64,24,91
              ]
            }
          ],
          "tally":{
            "filters":[
              {
                "args":[250,64,32,0,0],
                "op":5
              }
            ],
            "reducer":3
          },
          "time_lock":0
        },
        "min_consensus_percentage":51,
        "witness_reward":150000000,
        "witnesses":10
      },
      "inputs":[
        {
          "output_pointer":"21dda6209a86085a3f555721e26977776444f6e7a351e2a31652934953a807c8:1"
        }
      ],
      "outputs":[
        {
          "pkh":"twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy",
          "time_lock":0,
          "value":999998299995985
        }
      ]
    },
    "signatures":[
      {
        "public_key":{
          "bytes":[
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
          ],
          "compressed":3
        },
        "signature":{
          "Secp256k1":{
            "der":[
              1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
            ]
          }
        }
      }
    ]
  },
  "id":"12"
}
```
{% endtab %}
{% endtabs %}

***

### sendValue

Create and broadcast a value transfer transaction. That is, send some amount of wit coins from the node's own balance into a different Witnet address.

#### Parameters

[`BuildVtt`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L205)

#### Returns

[`VTTTransaction`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/transaction.rs#L202)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"sendValue",
  "params":{
    "dry_run":true,
    "fee":10,
    "utxo_strategy":{
      "random":{
        "from":null
      }
    },
    "vto":[
      {
        "pkh": "wit1234567890abcdefghijklmnopqrstuvwxyz123",
        "time_lock": 0,
        "value": 10
      }
    ]
  }
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "body":{
      "inputs":[
        {
          "output_pointer":"1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde:0"
        }
      ],
      "outputs":[
        {
          "pkh":"wit1234567890abcdefghijklmnopqrstuvwxyz123",
          "time_lock":0,
          "value":1
        },
        {
          "pkh":"wit1234567890123abcdefghijklmnopqrstuvwxyz",
          "time_lock":0,
          "value":999999999999573
        }
      ]
    },
    "signatures":[
      {
        "public_key":{
          "bytes":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
          "compressed":3
        },
        "signature":{
          "Secp256k1":{
            "der":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          }
        }
      }
    ]
  },
  "id":"12"
}
```
{% endtab %}
{% endtabs %}

***

### sign

Sign a piece of data with the node's master key.

#### Parameters

* `[u8; 32]`

#### Returns

* [`KeyedSignature`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L1440)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"sign",
  "params": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
    "result":{
      "public_key":{
        "bytes":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        "compressed":2
      },
      "signature":{
        "Secp256k1":{
          "der":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        }
      }
    }
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### signalingInfo

Get consolidated and on-going upgrades of the Witnet network.

#### Parameters

* None

#### Returns

* [`SignalingInfo`](https://github.com/witnet/witnet-rust/blob/1.7.1/node/src/actors/messages.rs#L749)

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "id":1,
  "method":"signalingInfo",
  "params": null
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "active_upgrades":{
      "THIRD_HARD_FORK":445440,
      "WIP0008":192000,
      "WIP0009-0011-0012":376320,
      "WIP0014-0016":549141,
      "WIP0017-0018-0019":683541,
      "WIP0020-0021":1059861,
      "WIP0022":1708901,
      "WIP0023":1708901,
      "WIP0024":1708901,
      "WIP0025":1708901,
      "WIP0026":1708901,
      "WIP0027":1708901
    },
    "epoch":2016465,
    "pending_upgrades":[]
  },
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### stake

Create and broadcast a stake transaction to the Witnet Network.

Parameters

* [`BuildStakeParams`](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/node/src/actors/messages.rs#L285)

Returns

* [`StakeTransaction`](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/data_structures/src/transaction.rs#L753)

Example

{% tabs %}
{% tab title="Request" %}
```json
{
  "jsonrpc":"2.0",
  "method":"stake",
  "params":{
    "authorization":"009264becc376ba03741c99caa57b4b391dfb793eff5f62e64800de8164925f74209b9f92429037c206a37cbf826702ec21ee805027ff201fea22e4728d8b79293",
    "value":10000000000000,
    "withdrawer":"twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy",
    "fee":{
      "absolute":1
    },
    "utxo_strategy":"random",
    "dry_run":false
  },
  "id":"2"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":{
    "body":{
      "change":{
        "pkh":"twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy",
        "time_lock":0,
        "value":989999999999573
      },
      "inputs":[
        {
          "output_pointer":"21dda6209a86085a3f555721e26977776444f6e7a351e2a31652934953a807c8:0"
        },
        {
          "output_pointer":"21dda6209a86085a3f555721e26977776444f6e7a351e2a31652934953a807c8:1"
        }
      ],
      "output":{
        "authorization":{
          "public_key":{
            "bytes":[
              101, 231, 80, 230, 185, 157, 78, 151, 167, 243, 100, 103, 76, 127, 196, 106, 176, 129, 160, 101, 228, 59, 157, 29, 107, 253, 125, 255, 14, 243, 227, 27
            ],
            "compressed":3
          },
          "signature":{
            "Secp256k1":{
              "der":[
                48, 69, 2, 33, 0, 146, 100, 190, 204, 55, 107, 160, 55, 65, 201, 156, 170, 87, 180, 179, 145, 223, 183, 147, 239, 245, 246, 46, 100, 128, 13, 232, 22, 73, 37, 247, 66, 2, 32, 9, 185, 249, 36, 41, 3, 124, 32, 106, 55, 203, 248, 38, 112, 46, 194, 30, 232, 5, 2, 127, 242, 1, 254, 162, 46, 71, 40, 216, 183, 146, 147
              ]
            }
          }
        },
        "key":{
          "validator":"twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy",
          "withdrawer":"twit13u2luhdlfzu700augc9mm9sa0xhng6jc34r5vy"
        },
        "value":10000000000000
      }
    },
    "signatures":[
      {
        "public_key":{
          "bytes":[
            101, 231, 80, 230, 185, 157, 78, 151, 167, 243, 100, 103, 76, 127, 196, 106, 176, 129, 160, 101, 228, 59, 157, 29, 107, 253, 125, 255, 14, 243, 227, 27
          ],
          "compressed":3
        },
        "signature":{
          "Secp256k1":{
            "der":[
              48, 68, 2, 32, 43, 2, 126, 58, 198, 120, 52, 157, 160, 242, 75, 128, 190, 25, 213, 252, 202, 225, 159, 173, 235, 106, 62, 116, 220, 190, 77, 161, 200, 214, 70, 131, 2, 32, 6, 47, 194, 44, 242, 88, 221, 1, 40, 58, 152, 33, 251, 215, 42, 185, 200, 207, 200, 33, 132, 121, 136, 22, 175, 226, 190, 52, 99, 200, 159, 118
            ]
          }
        }
      },
      {
        "public_key":{
          "bytes":[
            101, 231, 80, 230, 185, 157, 78, 151, 167, 243, 100, 103, 76, 127, 196, 106, 176, 129, 160, 101, 228, 59, 157, 29, 107, 253, 125, 255, 14, 243, 227, 27
          ],
          "compressed":3
        },
        "signature":{
          "Secp256k1":{
            "der":[
              48, 68, 2, 32, 43, 2, 126, 58, 198, 120, 52, 157, 160, 242, 75, 128, 190, 25, 213, 252, 202, 225, 159, 173, 235, 106, 62, 116, 220, 190, 77, 161, 200, 214, 70, 131, 2, 32, 6, 47, 194, 44, 242, 88, 221, 1, 40, 58, 152, 33, 251, 215, 42, 185, 200, 207, 200, 33, 132, 121, 136, 22, 175, 226, 190, 52, 99, 200, 159, 118
            ]
          }
        }
      }
    ]
  },
  "id":"2"
}
```
{% endtab %}
{% endtabs %}

***

### syncStatus

Get node synchronization status.

#### Parameters

* None

#### Returns

[`SyncStatus`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L101): Map with the chain beacon, the current epoch and the state of the node. Values of node state are:

* `WaitingConsensus`: waiting for reaching consensus between its peers
* `Synchronizing`: synchronization process.
* `AlmostSynced`: it has all the blocks in the chain and is ready to start consolidating block candidates in real time.
* `Synced`: can consolidate block candidates, propose its own candidates (mining) and participate in resolving data requests (witnessing).

#### Example

{% tabs %}
{% tab title="Request" %}
```json
{"jsonrpc":"2.0","id":1,"method":"syncStatus","params": []}
```
{% endtab %}

{% tab title="Response" %}
```json
{
   "jsonrpc":"2.0",
   "result":{
      "chain_beacon":{
         "checkpoint":2016476,
         "hashPrevBlock":"59ea553498c85bad0426f08420df943abed61c2559fb11321b7d9293488efbb2"
      },
      "current_epoch":2016477,
      "node_state":"Synced"
   },
   "id":1
}
```
{% endtab %}
{% endtabs %}

***

### tryRequest

Ask your node to resolve data request locally, without actually broadcasting it to the Witnet network.

#### Parameters

* [`DataRequestOutput`](https://github.com/witnet/witnet-rust/blob/1.7.1/data_structures/src/chain/mod.rs#L1347): unsigned data request struct with retrievals' `script` and filters' `args`fields encoded as CBOR values serialized as `Vec<u8>` arrays.

#### Returns

* Data request result stringified as a [RadonTypes](https://github.com/witnet/witnet-rust/blob/1.7.1/rad/src/types/mod.rs#L45) value.

#### Example

{% tabs %}
{% tab title="Request" %}
{% code title="ETH/USD data request" %}
```json
{
  "jsonrpc": "2.0", 
  "id": 1, 
  "method": "tryRequest", 
  "params": { 
    "data_request": { 
      "time_lock": 1, 
      "retrieve": [ 
        { 
          "url": "https://www.bitstamp.net/api/v2/ticker/ethusd/", 
          "contentType": "JSON API", 
          "kind": "HTTP-GET", 
          "headers": [], 
          "script": [ 132, 24, 119, 130, 24, 100, 100, 108, 97, 115, 116, 130, 24, 87, 25, 3, 232, 24, 91 ] 
        }, 
        { 
          "url": "https://api.coincap.io/v2/assets", 
          "contentType": "JSON API", 
          "kind": "HTTP-GET", 
          "headers": [], 
          "script": [ 134, 24, 119, 130, 24, 97, 100, 100, 97, 116, 97, 130, 24, 24, 1, 130, 24, 100, 104, 112, 114, 105, 99, 101, 85, 115, 100, 130, 24, 87, 25, 3, 232, 24, 91 ]
        }, 
        { 
          "url": "https://api.coinpaprika.com/v1/tickers/eth-ethereum", 
          "contentType": "JSON API", 
          "kind": "HTTP-GET", 
          "headers": [], 
          "script": [ 134, 24, 119, 130, 24, 102, 102, 113, 117, 111, 116, 101, 115, 130, 24, 102, 99, 85, 83, 68, 130, 24, 100, 101, 112, 114, 105, 99, 101, 130, 24, 87, 25, 3, 232, 24, 91 ] 
        } 
      ], 
      "aggregate": { 
        "filters": [{ "op": 5, "args": [250, 63, 192, 0, 0] }], 
        "reducer": 3 
      }, 
      "tally": { 
        "filters": [{ "op": 5, "args": [250, 63, 192, 0, 0] }], 
        "reducer": 3 
      }
    },
    "collateral": 1,
    "min_consensus_percentage": 50, 
    "commit_and_reveal_fee": 1, 
    "witnesses": 1, 
    "witness_reward": 1
  }
}
```
{% endcode %}
{% endtab %}

{% tab title="Response" %}
```json
{
  "jsonrpc":"2.0",
  "result":"RadonTypes::RadonInteger(1629459)",
  "id":1
}
```
{% endtab %}
{% endtabs %}

***

### unstake

Create and broadcast an unstake transaction to the Witnet Network.

#### Parameters

* [BuildUnstakeParams](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/node/src/actors/messages.rs#L309)

#### Returns

* [UnstakeTransaction](https://github.com/witnet/witnet-rust/blob/2.0.0-rc.7/data_structures/src/transaction.rs#L843)

#### Example

{% tabs %}
{% tab title="Request" %}
```
// Not allowed yet
```
{% endtab %}

{% tab title="Response" %}
```
// Not allowed yet
```
{% endtab %}
{% endtabs %}

