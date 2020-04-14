# Running `witnet-rust` from source code

## Install compilation dependencies

### Rust 

`witnet-rust` is developed using the Rust programming language.
You need to install Rust on your system to be able to compile the source code.
Follow installation instructions for your operating system provided on [rustup.rs][rustup]

### Compilation dependencies

```console tab="GNU/Linux (apt)"
apt install -y clang git libssl-dev protobuf-compiler librocksdb-dev
```

```console tab="macOS"
xcode-select --install

brew install git openssl protobuf rocksdb
```

## Clone source code from Witnet GitHub repository

```console tab="HTTPS"
git clone https://github.com/witnet/witnet-rust.git
cd witnet-rust
```

## Get the latest genesis_block.json

```console
curl https://raw.githubusercontent.com/witnet/genesis_block/latest/genesis_block.json -o genesis_block.json
```

## Compile and run with `cargo`

By default, this line will run a Witnet node and connect to the Testnet using the default configuration:

```console
cargo run node server
```

For more `witnet-rust` commands you can read the [witnet-rust CLI documentation][CLI].

## Building a release

This one-liner will build a releasable standalone binary compatible with the architecture of your computer's processor:

```console
cargo build --release
```

The resulting binary will be located at `./target/release/witnet`.

[rustup]: https://rustup.rs/
[CLI]: /node-operators/cli
