"use strict";

var _tsyringe = require("tsyringe");

var _DeployContractsCommand = _interopRequireDefault(require("./implementations/DeployContractsCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _DeployContractsCommand.default
};

_tsyringe.container.registerSingleton("DeployContractsCommand", implementations.default);