"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateContractModelCommandDefault {
  async execute(value) {
    const configFile = JSON.parse((0, _files.readFile)({
      path: _path.default.resolve(process.cwd(), "gifflarconfig.json")
    }));
    if (!configFile) throw Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");

    if (configFile.root !== "./") {
      // Creating root directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.root}`
      });
    }

    if (configFile.modelsFolder !== "./") {
      // Creating contracts directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.modelsFolder}`
      });
    }

    (0, _files.copyFile)({
      sourcePath: _path.default.resolve(`${__dirname}/../../../../templates/MakeContractTemplate.template`),
      destPath: _path.default.resolve(process.cwd(), configFile.modelsFolder, `${value}Contract.ts`)
    });
  }

}

var _default = CreateContractModelCommandDefault;
exports.default = _default;