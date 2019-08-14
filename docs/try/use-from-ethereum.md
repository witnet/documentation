# Using Witnet from Ethereum / Solidity

Using Witnet as an oracle for resolving your Ethereum smart contracts is
really easy thanks to the `UsingWitnet` Solidity library.

## Create a new Witnet-enabled project

If you are creating a new project from scratch, the quickest way to get
things working is using [Truffle][truffle] to import a Witnet-enabled
project template:
```console
truffle unbox witnet/truffle-box
```

## Add Witnet to your existing project

If you want to build support for Witnet into your existing project, you
can simply add the `UsingWitnet` contract as a dependency:

```console tab="npm"
npm install --save-dev witnet-ethereum-bridge
```

```console tab="yarn"
yarn add --dev witnet-ethereum-bridge
```

## Write your first Witnet data request


## Compiling the whole thing

```console tab="npm"
npm run compile
```

```console tab="yarn"
yarn compile
```

[truffle]: https://www.trufflesuite.com/
