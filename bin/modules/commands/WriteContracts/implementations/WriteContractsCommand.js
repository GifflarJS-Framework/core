"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class WriteContractsCommand {
  execute = async value => {
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

    await Promise.all(files.map(async file => {
      const gContractModule = await Promise.resolve(`${_path.default.resolve(process.cwd(), configFile.modelsFolder, file)}`).then(s => _interopRequireWildcard(require(s)));
      const gContract = gContractModule.default;
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
      }
    }));
  };
}

var _default = WriteContractsCommand;
exports.default = _default;