"use strict";

var _tsyringe = require("tsyringe");

var _CreateContractModelCommandDefault = _interopRequireDefault(require("./implementations/CreateContractModelCommandDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _CreateContractModelCommandDefault.default
};

_tsyringe.container.registerSingleton("CreateContractModelCommand", implementations.default);