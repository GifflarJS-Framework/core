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

| Command                                  | Args                                                                                             | Mandatory args | Description                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------- |
| help, --help, -h                         | none                                                                                             | No             | Show all the Gifflar commands available.                                                                       |
| init, --init, -i                         | Path to where the project will be initialized. If not passed, `./` is considered.                | No             | Initializes a Gifflar project and `gifflarconfig.json` file.                                                   |
| make:model, --make:model, -m:model       | Model file name.                                                                                 | Yes            | Make a new Gifflar Contract Model.                                                                             |
| make:service, --make:service, -m:service | Service file name.                                                                               | Yes            | Make a new Gifflar Contract Service.                                                                           |
| make:script, --make:script, -m:script    | Script file name.                                                                                | Yes            | Make a new Gifflar Deploying Script.                                                                           |
| write                                    | none                                                                                             | Yes            | Writes the code of the contracts in contracts folder. It subscribes old versions.                              |
| compile                                  | Contract file name. If no filename is passed, it compiles all contracts inside contracts folder. | No             | Compiles one or all contracts generating ABIs and metadatas inside compile folder. It subscribes old versions. |
| deploy                                   | none                                                                                             | No             | Deploys contracts based on scripts sequence inside scripts folder.                                             |

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

### Init

- Command variations: `gifflar init [path]`, `gifflar --init [path]`, `gifflar -i [path]`.

- Example: `gifflar init my-first-gifflar-project` (Will create a gifflar project inside `my-first-gifflar-project` folder).

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

### Make Model

### Make Service

### Make Script

### Write

### Compile

### Deploy
