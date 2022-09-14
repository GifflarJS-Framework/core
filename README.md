<div align="center">
    <img src="https://i.imgur.com/mwbuYqE.png" alt="gifflar banner"/>
</div>

# Gifflar

This is the Gifflar, a command line interface framework that allows you to define Solidity smart contracts creation via JavaScript. The Gifflar uses [Gifflar library](https://github.com/GifflarJS-Framework/gifflar-library) to allow smart contract development through javascript functions and JSON model. This enables you to develop systems able to create smart contracts on the fly based on different configurations.

## Project Status

**In development**

- Version: `alpha`.

## Getting started

### Installation

#### Node version

- v14.XX.X

#### Install Gifflar

As Gifflar is yet in development phase, you must install it through `build` branch. Soon it will be available in `npm`.

```
$ npm install -g git+https://github.com/GifflarJS-Framework/core.git#build
```

### Commands

```
Usage:
command [arguments]
```

#### Commands Table

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

#### Help

- Command variations: `gifflar help`, `gifflar --help`, `gifflar -h`.

Shows all the Gifflar commands available.

Return:

```txt
Usage:
 command [arguments]

Available Commands
 help, --help, -h                                Show all the Gifflar available commands.
 init, --init, -i                                Initializes the Gifflar configuration file.
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

- Command variations: `gifflar init [path]`, `gifflar --init [path]`, `gifflar -i [path]`.

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

Node: If you run `gifflar init` inside an existent Gifflar project, it will update the packages, but it will `NOT` replace the folders or the `gifflarconfig.json` file, it will maintain the already created files. If you would like to reset `gifflarconfig.json`, you can delete it and run `gifflar init` to obtain the default `gifflarconfig.json` file.

---

### Make Model

- Command variations: `gifflar make:model [filename]`, `gifflar --make:model [filename]`, `gifflar -m:model [filename]`.

- Example: `gifflar make:model MyContract` (The framework will automatically add the word 'Model' in the end of filename).

This command will create a Gifflar Model inside the models folder (defined in `gifflarconfig.json`) with a default content. You can use the Gifflar Model if you want to create static smart contracts using Gifflar modelation. These models can be written, compiled and deployed through terminal. If you are building an application to generate smart contracts on the fly, you might use [Gifflar Services](#make-service), so you can create a service that receives a request, dinamically creates the smart contract and then give a response.

Note: You should set a different name to every model, so the framework can identify each model separately.

---

### Write

- Command variations: `gifflar write`.

This command takes all the models inside the 'models' folder and translate the JSON model to Solidity code. This process will generate `.sol` files inside 'contracts' folder. These are the codes generated by the framework.

---

### Compile

- Command variations: `gifflar compile`, `gifflar compile [filename]`.

- Example:
  - `gifflar compile`: Will compile all the models inside 'models' folder.
  - `gifflar compile MyContractModel`: Will compile only MyContractModel.ts inside 'models' folder.

This command will take all the models indide 'models' folder, and will write and compile them. If you have already written in the [Writing Phase](#write) but made some updates inside the model, this command will rewrite the model and subscribe the corresponding `.sol` file. Plus, the command will also create three files inside 'arctifacts' folder. Assuming that your Gifflar Contract Model name is "MyContract", the following files will be created in the compilation phase:

```txt
arctifacts/
  MyContract_dump.json
  MyContract_metadata.json
  MyContract.json
```

- `MyContract_dump.json`: This file is a snapshot of the model with the JSON model, the generated code and compiled JSON (with metadata, ABI, assembly commands...).
- `MyContract_metadata.json`: Is the compiled metadata extracted from the contract compiled JSON.
- `MyContract.json`: Is the contract ABI.

Note: If you didn't write the contracts with `gifflar write`, the `gifflar compile` will automatically create the `.json` files for you.

Node: If you have already compiled once, and these three compilation files still exists in 'arctifacts' folder, the command will not subscribe them. It will maintain the same content. This is just to secure you to not lose the old content if wasn't your intention.

---

### Make Script

- Command variations: `gifflar make:script [filename]`, `gifflar --make:script [filename]`, `gifflar -m:script [filename]`.

- Example: `gifflar make:script myscript`: Will create the script file inside 'scripts' folder.

This command allows you to create deploy scripts to configure static smart contracts deploys. When you create a script, the framework will rename the file inserting a number in the filename to identify the deploy order. This means, if the filename parameter was `myscript`, and this is the first script to be created, the refactored filename will be `0_myscript`. If this was the second script to be created, the refactored name would be `1_myscript` and so on.

The script will already have a default content, so you should update the content and build your own customized script with the right contract deploy args.

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

This command will execute the scripts sequentially (see [Make Script](#make-script)). In this phase, you must have compiled the contracts you want to deploy. Also, this command will use the network configuration set in `gifflarconfig.json`.

---

### Make Service

---
