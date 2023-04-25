<div align="center">
    <img src="https://i.imgur.com/mwbuYqE.png" alt="gifflar banner"/>
</div>

# Gifflar

This is the Gifflar, a command line interface framework that allows you to define Solidity smart contracts creation via TypeScript. The Gifflar uses [Gifflar library](https://github.com/GifflarJS-Framework/solgen) to allow smart contract development through TypeScript functions and JSON model. This enables you to develop systems able to create smart contracts on the fly based on different configurations.

<div align="center">
    <img src="https://github.com/GifflarJS-Framework/core/blob/dev/assets/terminal.gif" alt="gifflar terminal demo"/>
</div>

# Project Status

**In development**

- Version: `v1.0.0_alpha`.

# Smart Contract Languages

For now, the Gifflar framework supports only Solidity code generation, we chose this language because many other blockchains also supports this language for building smart contracts. But we are working to support other smart contracts languages.

# Getting started

Gifflar Environment allows you to develop smart contracts in two ways: Statically or Dinamically.

- `Statically`: You will create the smart contracts with the Gifflar Models, an easy way to create smart contracts code using TypeScript. In this environment you are also able to generate the `.sol` code, to compile them and also to deploy.
- `Dinamically`: This is the feature that Gifflar brings. You can create Gifflar Services and do all the static process on the fly, through a service. This allows you to create different smart contracts based on conditional configurations you've made.

## Index

- [Installation](#installation)
  - [Node version](#node-version)
  - [Install Gifflar](#install-gifflar)
- [Commands](#commands)
  - [Help](#help)
  - [Init](#init)
  - [Make Model](#make-model)
  - [Write](#write)
  - [Compile](#compile)
  - [Make Script](#make-script)
  - [Deploy](#deploy)
  - [Make Service](#make-service)
- [Important Links](#important-links)

## Installation

### Node version

- v14.XX.X

### Install Gifflar

As Gifflar is yet in development phase, you must install it through `build` branch. Soon it will be available in `npm`.

```
$ npm install -g git+https://github.com/GifflarJS-Framework/core.git#build
```

## Commands

```
Usage:
command [arguments]
```

| Command                       | Args                                                                                             | Mandatory args | Description                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------- |
| [help](#help)                 | none                                                                                             | No             | Show all the Gifflar commands available.                                                                       |
| [init](#init)                 | Path to where the project will be initialized. If not passed, `./` is considered.                | No             | Initializes a Gifflar project and `gifflarconfig.json` file.                                                   |
| [make:model](#make-model)     | Model file name.                                                                                 | Yes            | Make a new Gifflar Contract Model.                                                                             |
| [write](#write)               | none                                                                                             | Yes            | Writes the code of the contracts in contracts folder. It subscribes old versions.                              |
| [compile](#compile)           | Contract file name. If no filename is passed, it compiles all contracts inside contracts folder. | No             | Compiles one or all contracts generating ABIs and metadatas inside compile folder. It subscribes old versions. |
| [make:script](#make-script)   | Script file name.                                                                                | Yes            | Make a new Gifflar Deploying Script.                                                                           |
| [deploy](#deploy)             | none                                                                                             | No             | Deploys contracts based on scripts sequence inside scripts folder.                                             |
| [make:service](#make-service) | Service file name.                                                                               | Yes            | Make a new Gifflar Contract Service.                                                                           |

---

### Help

- Command variations:
  - `gifflar help`
  - `gifflar --help`
  - `gifflar -h`

Shows all the Gifflar commands available.

Return:

```txt
Usage:
 command [arguments]

Available Commands
 help, --help, -h                                Shows all the Gifflar available commands.
 init, --init, -i                                Initializes a Gifflar project and creates Gifflar configuration file.
 make
  make:model, --make:model, -m:model             Make a new Gifflar Contract Model. Required a file name as argument.
  make:service, --make:service, -m:service       Make a new Gifflar Service. Required a file name as argument.
  make:script, --make:script, -m:script          Make a new Gifflar Deploying Script. Required a file name as argument.
 write                                           Writes the code of the contracts in contracts folder. It subscribes old versions.
 compile                                         Compiles one or all contracts generating ABIs and metadatas. Writes the codes if no .sol were found. It subscribes old versions.
 deploy                                          Deploys contracts based on scripts inside scripts folder.
```

---

### Init

- Command variations:

  - `gifflar init [path]`
  - `gifflar --init [path]`
  - `gifflar -i [path]`

- Example:
  - `gifflar init my-first-gifflar-project` (Will create a gifflar project inside `my-first-gifflar-project` folder).
  - `gifflar init` (Will create a gifflar project inside current folder).

This command will install all dependencies needed for start developing with Gifflar (You'll be asked to choose between `yarn` or `npm`). It will also create the following folder structure:

```txt
node_modules/
src/
  models/
  services/
  arctifacts/
  scripts/
package.json
package-lock.json (or yarn.lock)
.gitignore
gifflarconfig.json
```

After running the command, the `gifflarconfig.json` will be created. This is the file that contains all the framework paths configurations.

```json
{
  "projectName": "Gifflar Project",
  "root": "./src",
  "modelsFolder": "./src/models",
  "contractsFolder": "./src/contracts",
  "servicesFolder": "./src/services",
  "compileFolder": "./src/arctifacts",
  "scriptsFolder": "./src/scripts",
  "appKey": "a65d5d5f3e0260d94cf8cf533539f32a9d0340925f3d84fb41d4f416819ef254", // Don't use this value
  "defaultNetwork": "local_network",
  "mainAddressPrivateKey": "",
  "networks": [
    {
      "key": "local_network",
      "networkId": 0,
      "gas": 3000000,
      "gasPrice": "10000000000",
      "nodeLink": "http://localhost:8545"
    },
    {
      "key": "bsc_testnet",
      "networkId": 97,
      "gas": 3000000,
      "nodeLink": "https://data-seed-prebsc-1-s1.binance.org:8545/"
    }
  ]
}
```

Let's take a look in every property:

- `projectName`: Is the name of the Gifflar Project you want to give.
- `root`: Is the Gifflar workspace folder.
- `contractsFolder`: Where the `.sol` files will be created.
- `servicesFolder`: Where the Gifflar Services files will be created.
- `compileFolder`: Where the contracts compilation JSON files will be created.
- `scriptsFolder`: Where the deploying scripts files will be created.
- `appKey`: Is an unique application key for encryption and other pourposes.
- `defaultNetwork`: Is the default network configuration key that Gifflar should use when deploying a contract.
- `mainAddressPrivateKey`: The default deployer account private key.
- `networks`: The list of networks configurations to be selected by `defaultNetwork` property.
  - `key`: The unique network key to use as selection.
  - `networkId`: The unique network id for deployed contracts addresses management.
  - `gas`: The network GAS you are willing to use.
  - `gasPrice`: The network GAS price you are willing to pay.
  - `nodeLink`: The network node link which the framework will use to send transactions.

`Note`: If you run `gifflar init` inside an existent Gifflar project, it will update the packages, but it will `NOT` replace the folders or the `gifflarconfig.json` file, it will maintain the already created files. If you would like to reset `gifflarconfig.json`, you can delete it and run `gifflar init` to obtain the default `gifflarconfig.json` file. Just remmember to use the same `appKey` if you were already using it.

---

### Make Model

- Command variations:

  - `gifflar make:model [filename]`
  - `gifflar --make:model [filename]`
  - `gifflar -m:model [filename]`

- Example: `gifflar make:model MyContract` (The framework will automatically add the word 'Model' in the end of filename).

This command will create a Gifflar Model inside the models folder (defined in `gifflarconfig.json`) with a default content. You can use the Gifflar Model if you want to create static smart contracts using Gifflar modeling (see [Gifflar Library Docs](https://github.com/GifflarJS-Framework/solgen/wiki)). These models can be written, compiled and deployed through terminal. If you are building an application to generate smart contracts on the fly, you might use [Gifflar Services](#make-service), so you can create a service that receives a request, dinamically creates the smart contract and then give a response.

The default contract model content is the code below. If you want to understand more about the Gifflar Contract Model functions, you can see the [Gifflar Library Docs](https://github.com/GifflarJS-Framework/solgen/wiki)).

```ts
// Factory
import { createContract } from "@gifflar/solgen";

// Creating contract model
const myContract = createContract("MyContract");

// Creating a contract variable
myContract.createVariable("string", "message", "public");

// Creating a contract constructor function
myContract
  .createConstructor("public")
  .setInput("string", "_message")
  .setAssignment("message", "_message");

export default myContract;
```

`Note`: You should set a different name to every model, so the framework can identify each model separately.

---

### Write

- Command variations: `gifflar write`.

This command takes all the models inside the 'models' folder and translate the JSON model to Solidity code. This process will generate `.sol` files inside 'contracts' folder. These are the codes generated by the framework.

---

### Compile

- Command variations:

  - `gifflar compile`
  - `gifflar compile [filename]`

- Example:
  - `gifflar compile`: Will compile all the models inside 'models' folder.
  - `gifflar compile MyContractModel`: Will compile only MyContractModel.ts inside 'models' folder.

This command will take all the models inside 'models' folder, and will write and compile them. The model will only be compiled if there is no compilation files in 'arctifacts' folder. So if you really needs to recompile a contract, you can delete the compilation files and run the command again, `but be careful` if you have already deployed this contract, you will lose its address management inside the framework. Plus, the command will also create three files inside 'arctifacts' folder. Assuming that your Gifflar Contract Model name is "MyContract", the following files will be created in the compilation phase:

```txt
arctifacts/
  MyContract_dump.json
  MyContract_metadata.json
  MyContract.json
```

- `MyContract_dump.json`: This file is a snapshot of the model with the JSON model, the generated code and compiled JSON (with metadata, ABI, assembly commands...).
- `MyContract_metadata.json`: Is the compiled metadata extracted from the contract compiled JSON.
- `MyContract.json`: Is the contract ABI.

`Note`: If you didn't write the contracts with `gifflar write`, the `gifflar compile` will automatically create the `.json` files for you.

`Node`: If you have already compiled once, and these three compilation files still exists in 'arctifacts' folder, the command will not subscribe them. It will maintain the same content. This is just to secure you to not lose the old content and address management if wasn't your intention.

---

### Make Script

- Command variations:

  - `gifflar make:script [filename]`
  - `gifflar --make:script [filename]`
  - `gifflar -m:script [filename]`

- Example: `gifflar make:script myscript`: Will create the script file inside 'scripts' folder.

This command allows you to create deploying scripts to configure static smart contracts deploys. When you create a script, the framework will rename the file inserting a number in the filename to identify the deploy order. This means, if the filename parameter was `myscript`, and this is the first script to be created, the refactored filename will be `0_myscript`. If this is the second script to be created, the refactored name will be `1_myscript` and so on.

The script will already have a default content, so you should update the content and build your own customized script with the right contract deploying args.

Script's default content:

```ts
import { IScriptFunctionInputs } from "types-gifflar/modules/commands/DeployContracts/dtos/IScriptFunctionInputs";

export default async ({ contracts }: IScriptFunctionInputs) => {
  const contract1 = contracts["MyContract"];

  await contract1.deploy({
    from: "0xF0A2237caEC496B04A9EA9BA8d145AeCBD722664",
    args: ["asd"],
    gas: 3000000,
  });

  const instance = contract1.deployed();
  const message = await instance?.methods.message().call();

  console.log(message);
};
```

Note that the contracts models are already included in the script input. You just need to select the contract by the name you gave to it, then execute the deploy function of the contract model. You'll then be able to recover the instance and use it to call the contract functions.

---

### Deploy

- Command variations: `gifflar deploy`.

This command will execute the scripts sequentially (see [Make Script](#make-script)). In this phase, you might have compiled the contracts you want to deploy, if not, the command will automatically compile them for you. Also, this command will use the network configuration set in `gifflarconfig.json`.

---

### Make Service

- Command variations:

  - `gifflar make:service [filename]`
  - `gifflar --make:service [filename]`
  - `gifflar -m:service [filename]`

- Example: `gifflar make:service contractsBuilder` - Will create the service file `contractsBuilderService` inside 'services' folder.

The services are created to manage all the contracts construction steps (modeling, writing, compiling and deploying). It's how you can create dynamic smart contracts through a given service request. You can create your own logic of creating smart contracts code, so then you can use these services in your API or frontend application.

Note that if you want to work only creating smart contracts on the fly, you can use only Gifflar Services. But if you also or only want to create static smart contracts, you can use the Gifflar Environment to facilitate the smart contracts development using the [Gifflar Models](#make-model).

The created service will have a default code to guide you on the service creation. This code uses the Gifflar Manager from [Gifflar Library](https://github.com/GifflarJS-Framework/solgen) ([Gifflar Library Docs](https://github.com/GifflarJS-Framework/solgen/wiki)) to manage many contracts creation, so the service can keep the contracts in only one object. The default service also exports the functions `createModel`, `write`, `compile` and `deploy`, that are the basic Gifflar functions, but you can also customize the services the way you'd like to. This is the service default code:

```ts
import { createGifflarManager } from "@gifflar/solgen";
import { IContractDeployDTO } from "@gifflar/solgen/bin/modules/managing/gifflarContract/types/IContractDeployDTO";
import { IGifflarManager } from "@gifflar/solgen/bin/modules/managing/gifflarManager/types/IGifflarManager";
import { IGifflarContract } from "@gifflar/solgen/bin/modules/managing/gifflarContract/types/IGifflarContract";
import { INetworkConfig } from "@gifflar/solgen/bin/modules/deployer/types/INetworkConfig";
import { Contract } from "web3-eth-contract";

class ContractService {
  // Creating contract manager
  private myGifflarManager: IGifflarManager = createGifflarManager();

  constructor(accountPrivateKey?: string) {
    const network: INetworkConfig = networks.filter((network) => {
      return network.key === defaultNetwork;
    })[0];
    this.myGifflarManager.setDeployConfig(network);
    if (accountPrivateKey) this.myGifflarManager.addSigner(accountPrivateKey);
  }

  createModel(contractName: string): any {
    // Creating new contract
    const myContract: IGifflarContract =
      this.myGifflarManager.newContract(contractName);

    // Creating a contract variable
    myContract.createVariable({ regularType: "string" }, "message", "public");

    // Creating a contract constructor function
    myContract
      .createConstructor("public")
      .setInput({ regularType: "string" }, "_message")
      .setAssignment("message", { customExpression: "_message" });

    return myContract.toJson();
  }

  write(): string {
    return this.myGifflarManager.writeAll();
  }

  compile(contractName: string, callback: (errors: any) => void): any {
    return this.myGifflarManager.compile(contractName, callback);
  }

  deploy(contractName: string, inputs: IContractDeployDTO): Promise<Contract> {
    return this.myGifflarManager.deploy(contractName, inputs);
  }
}

export default ContractService;
```

You can also take a look at some demo projects that uses the Gifflar Services at [GifflarJS-Framework/gifflar-demo-projects](https://github.com/GifflarJS-Framework/gifflar-demo-projects).

---

## Important Links

- [Gifflar Library Docs](https://github.com/GifflarJS-Framework/solgen/wiki)
- [Gifflar Demo Projects](https://github.com/GifflarJS-Framework/gifflar-demo-projects)
