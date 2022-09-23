"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateServiceCommandDefault {
  async execute(value) {
    // Checking if value was set
    if (!value) {
      throw new Error("You must define the service name");
    } // Obtaining the configFile


    const content = (0, _files.readFile)({
      path: _path.default.resolve(process.cwd(), "gifflarconfig.json")
    });

    if (!content) {
      throw new Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");
    }

    const configFile = JSON.parse(content);

    if (configFile.root !== "./") {
      // Creating root directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.root}`
      });
    }

    if (configFile.servicesFolder !== "./") {
      // Creating services directory
      (0, _files.makeDirectory)({
        path: `${process.cwd()}/${configFile.servicesFolder}`
      });
    }

    const filePath = _path.default.resolve(process.cwd(), configFile.servicesFolder);

    await (0, _files.copyFile)({
      sourcePath: _path.default.resolve(__dirname, `../templates/MakeServiceTemplate.template`),
      destPath: _path.default.resolve(filePath, `${value}Service.ts`)
    }); // Creating gifflarConfig import

    const fileDepth = filePath.split("/").length - 2;
    const rootDepth = process.cwd().split("/").length - 2;
    const backDepth = fileDepth - rootDepth;
    let importGifflarConfig = `import { networks, defaultNetwork } from "`;

    for (let i = 0; i < backDepth; i++) {
      importGifflarConfig += `../`;
    }

    importGifflarConfig += `gifflarconfig.json";\n`;
    let fileContent = await (0, _files.readFile)({
      path: _path.default.resolve(filePath, `${value}Service.ts`)
    });
    fileContent = importGifflarConfig + fileContent;
    (0, _files.writeFile)({
      destPath: _path.default.resolve(filePath, `${value}Service.ts`),
      content: fileContent
    });
  }

}

var _default = CreateServiceCommandDefault;
exports.default = _default;