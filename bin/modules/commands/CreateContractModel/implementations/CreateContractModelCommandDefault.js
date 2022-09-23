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

    if (configFile.modelsFolder !== "./") {
      // Creating contracts directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.modelsFolder}`
      });
    }

    (0, _files.copyFile)({
      sourcePath: _path.default.resolve(__dirname, `../templates/MakeContractTemplate.template`),
      destPath: _path.default.resolve(process.cwd(), configFile.modelsFolder, `${value}Model.ts`)
    });
  }

}

var _default = CreateContractModelCommandDefault;
exports.default = _default;