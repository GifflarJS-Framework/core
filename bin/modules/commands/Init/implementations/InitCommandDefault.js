"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _files = require("../../../../utils/files");

var _path2 = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InitCommandDefault {
  async execute(_path) {
    const INITIAL_CONFIG = {
      projectName: "Gifflar Project",
      root: "./gifflar",
      modelsFolder: "./gifflar/models",
      contractsFolder: "./gifflar/contracts",
      servicesFolder: "./gifflar/services",
      compileFolder: "./gifflar/arctifacts",
      scriptsFolder: "./gifflar/scripts",
      appKey: _crypto.default.createHash("sha256").update(new Date().getTime().toString()).digest("hex"),
      defaultNetwork: "local_network",
      mainAddressPrivateKey: "",
      networks: [{
        key: "local_network",
        networkId: 0,
        gas: "3000000",
        gasPrice: "10000000000",
        nodeLink: "http://localhost:8545"
      }, {
        key: "bsc_testnet",
        networkId: 97,
        gas: "3000000",
        nodeLink: "https://data-seed-prebsc-1-s1.binance.org:8545/"
      }]
    }; // Writing config file

    (0, _files.writeFile)({
      destPath: _path2.default.resolve(process.cwd(), _path || "./", "gifflarconfig.json"),
      content: JSON.stringify(INITIAL_CONFIG, null, 1)
    });
  }

}

var _default = InitCommandDefault;
exports.default = _default;