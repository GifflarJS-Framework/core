"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeployContractsCommand {
  async execute(value) {
    const configFile = JSON.parse((0, _files.readFile)({
      path: _path.default.resolve(process.cwd(), "gifflarconfig.json")
    }));
    if (!configFile) throw Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."); // Checking if default network is defined

    if (!configFile.defaultNetwork || !configFile.networks) {
      throw Error("No default network found");
    } // Filtering the network config choosen


    const networkConfig = configFile.networks.filter(config => {
      return config.key === configFile.defaultNetwork;
    })[0]; // Checking if default network was found by key

    if (!networkConfig) {
      throw Error("No default network found");
    } // Creating web3 through network config


    const web3 = new _web.default(new _web.default.providers.HttpProvider(networkConfig.nodeLink)); // Recovering account from private key

    const account = web3.eth.accounts.privateKeyToAccount(configFile.mainAddressPrivateKey); // Saving account to memory

    web3.eth.accounts.wallet.add(account);

    if (configFile.scriptsFolder !== "./" && !(0, _files.fileExists)({
      path: configFile.scriptsFolder
    })) {
      console.log("No scripts folder found. Creating new one..."); // Creating contracts directory

      (0, _files.makeDirectory)({
        path: _path.default.resolve(process.cwd(), configFile.scriptsFolder)
      });
      console.log(`Scripts folder created in: ${configFile.scriptsFolder}`);
    }

    if (!(0, _files.fileExists)({
      path: configFile.modelsFolder
    })) {
      throw new Error("None contract model were found. If you have the contract models, please, your 'gifflarconfig.json' is correct.");
    } // listing all files in contracts folder


    const files = (0, _files.listFolderFiles)({
      path: configFile.modelsFolder
    }); // Creating code for all contracts in contracts folder

    const contracts = {};
    files.map(file => {
      const gContract = require(_path.default.resolve(process.cwd(), configFile.modelsFolder, file)).default; // Verifying if contract dump file exists


      if ((0, _files.fileExists)({
        path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
      })) {
        // Getting the dump file stringified
        const dumpStringified = (0, _files.readFile)({
          path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
        }); // Parsing the json file

        const dumpJson = JSON.parse(dumpStringified); // Inserting the dump file info to the contract

        gContract.code = dumpJson.code;
        gContract.json = dumpJson.json;
        gContract.instance = dumpJson.instance;
        gContract.setWeb3(web3);
      }

      contracts[gContract.getName()] = gContract;
    }); // listing all files in scripts folder

    const scriptFiles = (0, _files.listFolderFiles)({
      path: configFile.scriptsFolder
    });

    if (!scriptFiles.length) {
      throw new Error("No scripts created yet.");
    } // Iterating the scripts sequentially


    scriptFiles.reduce(async (accumulator, file) => {
      await accumulator; // Getting script function

      const scriptFunction = require(_path.default.resolve(process.cwd(), configFile.scriptsFolder, file)).default; // Executing script


      await scriptFunction({
        contracts
      });
    }, Promise.resolve());
  }

}

var _default = DeployContractsCommand;
exports.default = _default;