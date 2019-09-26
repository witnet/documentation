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

If you want to build support for Witnet into your existing Solidity
project, you can simply add the `UsingWitnet` contract as a dependency,
which is distributed inside the `witnet-ethereum-bridge` npm package:

```console tab="npm"
npm install --save witnet-ethereum-bridge
```

```console tab="yarn"
yarn add witnet-ethereum-bridge
```



## Write your first Witnet data request

We have put together [this comprehensive tutorial on how to create a
Witnet data request][create-a-data-request] so that you can get started
in a matter of minutes.

## Writing a Solidity contract that uses the Witnet request 

Once you are done with [the tutorial on how to create your first data
request][create-a-data-request], you can directly go back to this
section and dive deep into the next step: writing a Solidity contract
that deploys a Witnet request, has it resolved and reacts to its result.

Let's start from scratch:

```ts
contract PriceFeed {}
```

Now let's import the `UsingWitnet` contract and inherit from it:
```ts
import "witnet-ethereum-bridge/contracts/UsingWitnet.sol"

contract PriceFeed is UsingWitnet {}
```

What are we inheriting here? Among other Witnet-related utilities, the
`UsingWitnet` contract injects the following methods into any inheriting
contract:

- `postWitnetRequest`, which allows you to post an instance of a request
  to the Witnet Decentralized Oracle Network.
- `readWitnetResult`, which allows you to retrieve the result of
  previously posted requests so that your contract can decide based on
  its value.

## Compiling the whole thing

Compiling the requests and contracts is as simply as it gets:

```console tab="npm"
npm run compile
```

```console tab="yarn"
yarn compile
```


[truffle]: https://www.trufflesuite.com/
[create-a-data-request]: try/my-first-data-request/#write-your-first-witnet-request
