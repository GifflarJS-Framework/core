"use strict";

var _tsyringe = require("tsyringe");

var _HelpCommandDefault = _interopRequireDefault(require("./implementations/HelpCommandDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _HelpCommandDefault.default
};

_tsyringe.container.registerSingleton("HelpCommand", implementations.default);