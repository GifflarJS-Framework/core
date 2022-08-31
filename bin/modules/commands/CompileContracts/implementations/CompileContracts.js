"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    const compile = ({
      file,
      configFile
    }) => {
      const gContract = require(_path.default.resolve(process.cwd(), configFile.modelsFolder, file)).default; // Verifying if contract dump file exists


      if ((0, _files.fileExists)({
        path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
      })) {
        // Getting the dump file stringified
        const dumpStringified = (0, _files.readFile)({
          path: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}_dump.json`)
        });
        if (!dumpStringified) throw new Error("Dump file not found."); // Parsing the json file

        const dumpJson = JSON.parse(dumpStringified); // Inserting the compilation json to the dump

        dumpJson.json = gContract.json;
        gContract.code = dumpJson.code;
      } else {
        gContract.write();
      } // Creating contract .sol if not found


      if (!(0, _files.fileExists)({
        path: _path.default.resolve(configFile.contractsFolder, `${value}.sol`)
      })) {
        (0, _files.writeFile)({
          destPath: _path.default.resolve(configFile.contractsFolder, `${gContract.getName()}.sol`),
          content: gContract.code
        });
      }

      const json = gContract.compile(errors => {
        if (errors) console.log(errors);
      }); // Saving ABI

      (0, _files.writeFile)({
        destPath: _path.default.resolve(configFile.compileFolder, `${gContract.getName()}.json`),
        content: JSON.stringify(json.contracts.jsons[gContract.getName()].abi, null, 2)
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


      compile({
        file: value,
        configFile
      });
    } else {
      // Creating code and ABIs for all contracts in contracts folder
      files.map(file => {
        compile({
          file,
          configFile
        });
      });
    }
  }

}

var _default = CompileContracts;
exports.default = _default;