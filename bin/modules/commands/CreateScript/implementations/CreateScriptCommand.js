"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateScriptCommand {
  async execute(value) {
    // Checking if value was set
    if (!value) {
      throw new Error("You must define the script name");
    } // Obtaining the configFile


    const content = (0, _files.readFile)({
      path: _path.default.resolve(process.cwd(), "gifflarconfig.json")
    });

    if (!content) {
      throw new Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");
    }

    const configFile = JSON.parse(content); // Checking if scripts folder

    if (!configFile.scriptsFolder) {
      throw new Error("No path to scripts folder found");
    } // Checking if project has types-gifflar instaled


    if (!(0, _files.fileExists)({
      path: _path.default.resolve(process.cwd(), "node_modules", "types-gifflar/modules/commands/DeployContracts/dtos/IScriptFunctionInputs.d.ts")
    })) {
      const npmCommand = `npm install -dev git+https://github.com/GifflarJS-Framework/types-gifflar.git`;
      const yarnCommand = `yarn add -D git+https://github.com/GifflarJS-Framework/types-gifflar.git`;
      throw new Error(`You must install types-gifflar first. Please, run "${npmCommand}" or "${yarnCommand}"`);
    } // Creating root directory


    if (configFile.root !== "./") {
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.root}`
      });
    } // Creating scripts folder


    if (configFile.scriptsFolder !== "./") {
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.scriptsFolder}`
      });
    } // Obtaining the list of scripts files


    const scriptFiles = (0, _files.listFolderFiles)({
      path: configFile.scriptsFolder
    }); // Defining next script index order

    let scriptOrder = 0;
    scriptFiles.map(file => {
      if (file.includes(scriptOrder.toString())) {
        scriptOrder += 1;
      }
    }); // Creating script

    (0, _files.copyFile)({
      sourcePath: _path.default.resolve(__dirname, `../templates/MakeScriptTemplate.template`),
      destPath: _path.default.resolve(process.cwd(), configFile.scriptsFolder, `${scriptOrder}_${value}.ts`)
    });
  }

}

var _default = CreateScriptCommand;
exports.default = _default;