# Compile witnet-rust from Source Code

## Install compilation dependencies

### Rust

`witnet-rust` is being developed using the Rust programming language. You need to install Rust on your system to be able to compile the source code. Follow installation instructions for your operating system provided on [rustup.rs](https://rustup.rs)

### Compilation dependencies

{% tabs %}
{% tab title="GNU/Linux (apt)" %}
```
  apt install -y clang git libssl-dev protobuf-compiler librocksdb-dev pkg-config
```
{% endtab %}

{% tab title="Mac OS" %}
```
xcode-select --install

brew install git openssl protobuf rocksdb
```
{% endtab %}
{% endtabs %}

## Clone source code from Witnet GitHub repository

{% tabs %}
{% tab title="HTTPS" %}
```
git clone https://github.com/witnet/witnet-rust.git
cd witnet-rust
```
{% endtab %}

{% tab title="SSH" %}
```
git clone git@github.com:witnet/witnet-rust.git
cd witnet-rust
```
{% endtab %}

{% tab title="GitHub CLI" %}
```
gh repo clone witnet/witnet-rust
cd witnet-rust
```
{% endtab %}
{% endtabs %}

## Get the latest genesis\_block.json

{% tabs %}
{% tab title="cURL" %}
```
  curl https://raw.githubusercontent.com/witnet/genesis_block/master/latest/genesis_block.json -o genesis_block.json
```
{% endtab %}

{% tab title="wget" %}
```
  wget https://raw.githubusercontent.com/witnet/genesis_block/master/latest/genesis_block.json
```
{% endtab %}
{% endtabs %}

## Compile and run with `cargo`

By default, this line will run a Witnet node and connect to the Testnet using the default configuration:

```
  cargo run node server
```

For more `witnet-rust` commands you can read the [witnet-rust CLI documentation](../node-operators/cli/).

## Building a release

This one-liner will build a releasable standalone binary compatible with the architecture of your computer's processor:

```
  cargo build --release
```

The resulting binary will be located at `./target/release/witnet`.
