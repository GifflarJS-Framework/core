"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WriteContractsCommand {
  async execute(value) {
    const content = (0, _files.readFile)({
      path: _path.default.resolve(process.cwd(), "gifflarconfig.json")
    });

    if (!content) {
      throw Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");
    }

    const configFile = JSON.parse(content);

    if (configFile.contractsFolder !== "./") {
      // Creating contracts directory
      (0, _files.makeDirectory)({
        path: _path.default.resolve(process.cwd(), configFile.contractsFolder)
      });
    }

    if (configFile.compileFolder !== "./") {
      // Creating contracts directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.compileFolder}`
      });
    }

    if (!(0, _files.fileExists)({
      path: configFile.modelsFolder
    })) {
      throw new Error("None contract model were found. If you have the contract models, please, your 'gifflarconfig.json' is correct.");
    } // listing all files in contracts folder


    const files = (0, _files.listFolderFiles)({
      path: configFile.modelsFolder
    }); // Creating code for all contracts in contracts folder

    files.map(file => {
      const gContract = require(_path.default.resolve(process.cwd(), configFile.modelsFolder, file)).default;

      const code = gContract.write();
      (0, _files.writeFile)({
        destPath: _path.default.resolve(configFile.contractsFolder, `${gContract.getName()}.sol`),
        content: code
      }); // Verifying if contract dump file exists

      if ((0, _files.fileExists)({
        path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
      })) {
        // Getting the dump file stringified
        const dumpStringified = (0, _files.readFile)({
          path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
        });
        if (!dumpStringified) throw new Error("Dump file not found."); // Parsing the json file

        const dumpJson = JSON.parse(dumpStringified); // Inserting the code to the dump

        dumpJson.code = gContract.code; // Updating dump file

        (0, _files.writeFile)({
          destPath: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`),
          content: JSON.stringify(dumpJson, null, 2)
        });
      } else {
        // Saving dump file
        (0, _files.writeFile)({
          destPath: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`),
          content: JSON.stringify(gContract, null, 2)
        });
      }
    });
  }

}

var _default = WriteContractsCommand;
exports.default = _default;