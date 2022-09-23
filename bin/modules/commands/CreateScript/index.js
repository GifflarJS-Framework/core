"use strict";

var _tsyringe = require("tsyringe");

var _CreateScriptCommand = _interopRequireDefault(require("./implementations/CreateScriptCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _CreateScriptCommand.default
};

_tsyringe.container.registerSingleton("CreateScriptCommand", implementations.default);