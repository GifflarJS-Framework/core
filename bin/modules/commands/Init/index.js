"use strict";

var _tsyringe = require("tsyringe");

var _InitCommandDefault = _interopRequireDefault(require("./implementations/InitCommandDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _InitCommandDefault.default
};

_tsyringe.container.registerSingleton("InitCommand", implementations.default);