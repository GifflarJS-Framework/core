"use strict";

var _tsyringe = require("tsyringe");

var _CompileContracts = _interopRequireDefault(require("./implementations/CompileContracts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _CompileContracts.default
};

_tsyringe.container.registerSingleton("CompileContractsCommand", implementations.default);