"use strict";

var _tsyringe = require("tsyringe");

var _WriteContractsCommand = _interopRequireDefault(require("./implementations/WriteContractsCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _WriteContractsCommand.default
};

_tsyringe.container.registerSingleton("WriteContractsCommand", implementations.default);