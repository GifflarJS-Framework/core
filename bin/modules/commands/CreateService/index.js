"use strict";

var _tsyringe = require("tsyringe");

var _CreateServiceCommandDefault = _interopRequireDefault(require("./implementations/CreateServiceCommandDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _CreateServiceCommandDefault.default
};

_tsyringe.container.registerSingleton("CreateServiceCommand", implementations.default);