# ⚙️ Configuration file

Advanced users may wish to customize specific properties of the node. To achieve this, users must modify the configuration file, which is typically named `witnet.toml` by default. Note that the default `witnet.toml` file does not include all configurable parameters. To view the complete configuration currently in use by your node, you can execute the [#config](../cli.md#config "mention") command.

{% hint style="danger" %}
Be careful when exposing JSON-RPC ports with `enable_sensitive_methods` set to `true`. Doing so may allow a malicious actor to access your node and potentially steal your funds.
{% endhint %}

## Full configuration file example

```toml
# The "environment" in which the protocol will be deployed, eg: mainnet, testnet, etc.
environment = "mainnet" 

# Connections-related configuration
[connections]
# Server address, that is, the socket address (interface ip and port) to which the server accepting connections from other peers should bind to
server_addr = "0.0.0.0:21337"
# Public address
public_addr = "0.0.0.0:21337"
# Maximum number of concurrent connections the server should accept
inbound_limit = 128
# Maximum number of opened connections to other peers this node (acting as a client) should maintain
outbound_limit = 8
# List of other peer addresses this node knows at start, it is used as a bootstrap mechanism to gain access to the P2P network
known_peers = ["136.243.22.47:22339", "51.255.51.101:21338", "209.126.13.170:21332", "89.58.11.231:21337", "207.180.206.216:21333", "51.255.51.101:21337", "162.55.233.238:22339", "148.251.153.67:22387", "161.97.65.252:21337", "144.76.57.252:22365", "173.249.3.178:22337", "194.163.137.36:21333", "154.53.51.17:21332", "185.208.206.52:21333", "173.249.63.214:21337", "88.198.31.248:22380", "5.9.5.85:22339", "66.94.112.71:21337", "66.94.112.65:21337", "173.249.8.65:20337", "94.130.66.3:22378", "173.249.27.241:21337", "38.242.204.144:21333", "193.26.159.13:21337", "45.130.104.29:21336", "103.219.154.96:21337", "52.166.178.145:22337", "173.249.3.178:21337", "209.145.54.183:21333", "52.166.178.145:21337", "5.9.20.188:22386", "167.86.125.10:21332", "85.208.51.169:21337", "45.43.29.118:16", "173.249.8.65:21337", "195.201.164.199:22375"]
# Period of the bootstrap peers task
bootstrap_peers_period_seconds = 1
# Period of the persist peers task
storage_peers_period_seconds = 30
# Period of the peers discovery task
discovery_peers_period_seconds = 30
# Period of the peers melt task
check_melted_peers_period_seconds = 300
# Period of the feeler task (try_peer)
feeler_peers_period_seconds = 2
# Handshake timeout
handshake_timeout_seconds = 5
# Handshake maximum timestamp difference in seconds
handshake_max_ts_diff = 10
# Number of seconds before giving up waiting for requested blocks
blocks_timeout = 400
# Constant to specify when consensus is achieved (in %)
consensus_c = 60
# Period that indicate the validity of a checked peer
bucketing_update_period = 300
# Period in seconds for a potential peer address to be kept "iced", i.e. will not be tried again before that amount of time.
bucketing_ice_period_seconds = 3600
# Reject (tarpit) inbound connections coming from addresses that are alike, so as to prevent sybil peers from monopolizing our inbound capacity.
reject_sybil_inbounds = true
# Limit to reject (tarpit) inbound connections. If the limit is set to 18, the addresses having the same first 18 bits in the IP will collide, so as to prevent sybil peers from monopolizing our inbound capacity.
reject_sybil_inbounds_range_limit = 18
# Limit the number of requested blocks that will be processed as one batch
requested_blocks_batch_limit = 500

# Storage-related configuration
[storage]
# Storage backend to use
backend = "rocksdb"
# Path to the directory that will contain the database. Used only if backend is RocksDB.
db_path = ".witnet/storage"
# Keep a map of "address" to "list of UTXOs" in memory, to speed up getBalance and getUtxoInfo methods
utxos_in_memory = true
# RocksDB option max_open_files. -1 means unlimited.
max_open_files = -1

# Consensus-critical configuration
[consensus_constants]
# Timestamp at checkpoint 0 (the start of epoch 0)
checkpoint_zero_timestamp = 1602666000
# Seconds between the start of an epoch and the start of the next one
checkpoints_period = 45
# Auxiliary bootstrap block hash value
bootstrap_hash = "666564676f6573627272727c2f3030312f3738392f3432382f6130312e676966"
# Genesis block hash value
genesis_hash = "6ca267d9accde3336739331d42d63509b799c6431e8d02b2d2cc9d3943d7ab02"
# Maximum weight a block can have, this affects the number of
# transactions a block can contain: there will be as many
# transactions as the sum of _their_ weights is less than, or
# equal to, this maximum block weight parameter.
#
# Maximum aggregated weight of all the value transfer transactions in one block
max_vt_weight = 20000
# Maximum aggregated weight of all the data requests transactions in one block
max_dr_weight = 80000
# An identity is considered active if it participated in the witnessing protocol at least once in the last `activity_period` epochs
activity_period = 2000
# Reputation will expire after N witnessing acts
reputation_expire_alpha_diff = 20000
# Reputation issuance
reputation_issuance = 1
# When to stop issuing new reputation
reputation_issuance_stop = 1048576
# Penalization factor: fraction of reputation lost by liars for out of consensus claims
reputation_penalization_factor = 0.5
# Backup factor for mining: valid VRFs under this factor will result in broadcasting a block
mining_backup_factor = 8
# Replication factor for mining: valid VRFs under this factor will have priority
mining_replication_factor = 3
# Minimum value in nanowits for a collateral value
collateral_minimum = 1000000000
# Minimum input age of an UTXO for being a valid collateral
collateral_age = 1000
# Build a superblock every `superblock_period` epochs
superblock_period = 10
# Extra rounds for commitments and reveals
extra_rounds = 3
# Minimum difficulty
minimum_difficulty = 2000
# Number of epochs with the minimum difficulty active
# (This number represent the last epoch where the minimum difficulty is active)
epochs_with_minimum_difficulty = 2000
# Superblock signing committee for the first superblocks
bootstrapping_committee = ["wit1g0rkajsgwqux9rnmkfca5tz6djg0f87x7ms5qx", "wit1cyrlc64hyu0rux7hclmg9rxwxpa0v9pevyaj2c", "wit1asdpcspwysf0hg5kgwvgsp2h6g65y5kg9gj5dz", "wit13l337znc5yuualnxfg9s2hu9txylntq5pyazty", "wit17nnjuxmfuu92l6rxhque2qc3u2kvmx2fske4l9", "wit1etherz02v4fvqty6jhdawefd0pl33qtevy7s4z", "wit1drcpu0xc2akfcqn8r69vw70pj8fzjhjypdcfsq", "wit1gxf0ca67vxtg27kkmgezg7dd84hwmzkxn7c62x", "wit1hujx8v0y8rzqchmmagh8yw95r943cdddnegtgc", "wit1yd97y52ezvhq4kzl6rph6d3v6e9yya3n0kwjyr", "wit1fn5yxmgkphnnuu6347s2dlqpyrm4am280s6s9t", "wit12khyjjk0s2hyuzyyhv5v2d5y5snws7l58z207g"]
# Size of the superblock signing committee
superblock_signing_committee_size = 100
# Period after which the committee size should decrease (in superblock periods)
superblock_committee_decreasing_period = 5
# Step by which the committee should be reduced after superblock_agreement_decreasing_period
superblock_committee_decreasing_step = 5
# Initial block reward
initial_block_reward = 250000000000
# Halving period
halving_period = 3500000

# JSON-RPC API configuration
[jsonrpc]
# Binary flag telling whether to enable the JSON-RPC interface or not
enabled = true
# Enable methods not suitable for shared nodes
enable_sensitive_methods = true
# JSON-RPC HTTP server address, that is, the socket address (interface ip and port) for the JSON-RPC server to listen over HTTP
http_address = "127.0.0.1:21339"
# JSON-RPC TCP server address, that is, the socket address (interface ip and port) for the JSON-RPC server to listen over TCP
tcp_address = "127.0.0.1:21338"
# JSON-RPC WebSockets server address, that is, the socket address (interface ip and port) for the JSON-RPC server to listen over WebSockets
ws_address = "127.0.0.1:21340"

# Mining-related configuration
[mining]
# Binary flag telling whether to enable the MiningManager or not
enabled = true
# Limits the number of retrievals to perform during a single epoch. This tries to prevent nodes from forking out or being left in a bad condition if hitting bandwidth or CPU bottlenecks. Set to 0 totally disable participation in resolving data requests.
data_request_max_retrievals_per_epoch = 30
# Timeout for data request retrieval and aggregation execution. This should usually be slightly below half the checkpoints period. Set to 0 to disable timeouts.
data_request_timeout_milliseconds = 2000
# Genesis block path
genesis_path = ".witnet/config/genesis_block.json"
# Percentage to redistribute mint reward in another address
mint_external_percentage = 50
# Mempool size limit in weight units
transactions_pool_total_weight_limit = 192000000
# Minimum value transfer transaction fee that allows being included into a block
minimum_vtt_fee_nanowits = 1

# Wallet-specific configuration
[wallet]
# Whether or not this wallet will communicate with a testnet node.
testnet = false
# Websockets server address.
server_addr = "127.0.0.1:11212"
# Witnet node server address. If more than one address is provided, will choose one at random.
node_url = ["127.0.0.1:21338"]
# How many blocks to ask a Witnet node for when synchronizing.
node_sync_batch_size = 50
# Database path.
db_path = "/home/tommy/.local/share/witnet"
# Database file name.
db_file_name = "witnet_wallet.db"
# Database hash iterations when encrypting.
db_encrypt_hash_iterations = 10000
# Database init-vector-length when encrypting.
db_encrypt_iv_length = 16
# Database random salt length when encrypting.
db_encrypt_salt_length = 32
# Master Key-generation hash iterations. Default `4096`.
id_hash_iterations = 4096
# Master Key-generation hash function. Default `Sha256`.
id_hash_function = "Sha256"
# Lifetime in seconds of an unlocked wallet session id.
session_expires_in = 900
# Duration in milliseconds after which outgoing request should timeout.
requests_timeout = 5000
# Length of the batch of transient addresses to be used for synchronization purposes (e.g. for re-importing a wallet with seed phrase).
sync_address_batch_length = 20
# Allow to use outputs that have not been confirmed by a superblock in new transactions
use_unconfirmed_utxos = true
# If a transaction has not been included in a block for this amount of seconds, mark the UTXOs as available again.
pending_transactions_timeout_seconds = 450

# Rocksdb-specific configuration
[rocksdb]
# If true, the database will be created if it is missing.
create_if_missing = true
# If non-zero, we perform bigger reads when doing compaction. If you're running RocksDB on spinning disks, you should set this to at least 2MB. That way RocksDB's compaction is doing sequential instead of random reads.
compaction_readahead_size = 0
# If true, then every store to stable storage will issue a fsync. If false, then every store to stable storage will issue a fdatasync. This parameter should be set to true while storing data to filesystem like ext3 that can lose files after a reboot.
use_fsync = false
# Enable RocksDB statistics
enable_statistics = false

# Log-specific configuration
[log]
# Level for the log messages.
level = "info"
# Automated bug reporting (helps the community improve the software)
sentry_telemetry = false

# NTP-related configuration
[ntp]
# Period that indicate the validity of a ntp timestamp
update_period_seconds = 1024
# Server to query ntp information
servers = ["0.pool.ntp.org:123", "1.pool.ntp.org:123", "2.pool.ntp.org:123", "3.pool.ntp.org:123"]
# Enable NTP for clock synchronization
enabled = true

# Mempool-related configuration
[mempool]
# Timeout to use again an UTXO spent by a pending transaction
tx_pending_timeout = 450
# Maximum number of recovered transactions to include by epoch
max_reinserted_transactions = 100

# Threshold Activation of Protocol Improvements
[tapi]
# Oppose WIP0028
oppose_wip0028 = false

# Witnessing-specific configuration
[witnessing]
# Allows disabling the default unproxied HTTP transport so as to protect the "clearnet" IP address of a witnessing node. This feature can only be active if the address of at least one retrieval proxy is provided.
allow_unproxied = true
# Tells how strict or lenient to be with inconsistent data sources. Paranoid level is defined as percentage of successful retrievals over total number of retrieval transports. That is, if we have 3 proxies in addition to the default unproxied transport (4), and we set the paranoid percentage to 51 (51%), the node will only from commit to requests in which "half plus one" of the data sources are in consensus (3 out of 4).
paranoid_percentage = 51
# Addresses to be used as proxies when performing data retrieval. This allows retrieving data sources through different transports so as to ensure that the data sources are consistent and we are taking as small of a risk as possible when committing to specially crafted data requests that may be potentially ill-intended.
proxies = []

# Configuration related to protocol versions
[protocol]
v1_7 = [0, 45]

```



##
