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

class CompileContracts {
  async execute(value) {
    const content = (0, _files.readFile)({
      path: _path.default.resolve(process.cwd(), "gifflarconfig.json")
    });

    if (!content) {
      throw Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");
    }

    const configFile = JSON.parse(content);

    if (configFile.root !== "./") {
      // Creating root directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.root}`
      });
    }

    if (configFile.compileFolder !== "./") {
      // Creating compilations directory
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
    });

    const compile = async ({
      file,
      configFile
    }) => {
      const gContractModule = await Promise.resolve(`${_path.default.resolve(process.cwd(), configFile.modelsFolder, file)}`).then(s => _interopRequireWildcard(require(s)));
      const gContract = gContractModule.default; // Verifying if contract dump file exists

      if ((0, _files.fileExists)({
        path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
      })) {
        // If already exists, don't compile again
        return; // Getting the dump file stringified
        // const dumpStringified = readFile({
        //   path: path.resolve(
        //     configFile.compileFolder,
        //     `${gContract.getName()}_dump.json`
        //   ),
        // });
        // if (!dumpStringified) throw new Error("Dump file not found.");
        // Parsing the json file
        // const dumpJson: IContractJson = JSON.parse(dumpStringified);
        // Inserting the compilation json to the dump
        // dumpJson.json = gContract.json;
        // gContract.code = dumpJson.code;
      } else {
        gContract.write();
      } // Rewriting contract .sol


      (0, _files.writeFile)({
        destPath: _path.default.resolve(configFile.contractsFolder, `${gContract.getName()}.sol`),
        content: gContract.code
      });
      const json = gContract.compile(errors => {
        if (errors) console.log(errors);
      }); // Saving compiled JSON

      (0, _files.writeFile)({
        destPath: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}.json`),
        content: JSON.stringify(json.contracts.jsons[gContract.getName()], null, 2)
      }); // Saving Metadata

      (0, _files.writeFile)({
        destPath: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_metadata.json`),
        content: JSON.stringify(JSON.parse(json.contracts.jsons[gContract.getName()].metadata), null, 2)
      }); // Saving dump file

      (0, _files.writeFile)({
        destPath: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`),
        content: JSON.stringify(gContract, null, 2)
      });
    };

    if (value) {
      // Verifying if single contract file exists
      if (!(0, _files.fileExists)({
        path: _path.default.resolve(configFile.modelsFolder, `${value}.ts`)
      })) {
        throw new Error("Requested contract model were not found.");
      } // Compiling single contract


      await compile({
        file: value,
        configFile
      });
    } else {
      // Creating code and ABIs for all contracts in contracts folder
      await Promise.all(files.map(async file => {
        await compile({
          file,
          configFile
        });
      }));
    }
  }

}

var _default = CompileContracts;
exports.default = _default;