# 🗜️ Compile from Source Code

## Install compilation dependencies

### Rust

`witnet-rust` is being developed using the Rust programming language. You need to install Rust on your system to be able to compile the source code. Follow installation instructions for your operating system provided on [rustup.rs](https://rustup.rs)

### Compilation dependencies

::: tabs
== GNU/Linux (apt)
```bash
  apt install -y clang git libssl-dev protobuf-compiler librocksdb-dev pkg-config
```

== Mac OS
```bash
xcode-select --install

brew install git openssl protobuf rocksdb
```
:::

## Clone source code from Witnet GitHub repository

::: tabs
== HTTPS
```bash
git clone https://github.com/witnet/witnet-rust.git
cd witnet-rust
```

== SSH
```bash
git clone git@github.com:witnet/witnet-rust.git
cd witnet-rust
```

== GitHub CLI
```bash
gh repo clone witnet/witnet-rust
cd witnet-rust
```
:::

## Get the latest genesis\_block.json

::: tabs
== cURL
```bash
  curl https://raw.githubusercontent.com/witnet/genesis_block/master/latest/genesis_block.json -o genesis_block.json
```

== wget
```bash
  wget https://raw.githubusercontent.com/witnet/genesis_block/master/latest/genesis_block.json
```
:::

## Compile and run with `cargo`

By default, this line will run a Witnet node and connect to the Testnet using the default configuration:

```bash
  cargo run node server
```

For more `witnet-rust` commands you can read the [witnet-rust CLI documentation](./cli.md).

## Building a release

This one-liner will build a releasable standalone binary compatible with the architecture of your computer's processor:

```bash
  cargo build --release
```

The resulting binary will be located at `./target/release/witnet`.
