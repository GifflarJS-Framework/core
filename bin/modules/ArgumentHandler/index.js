"use strict";

var _tsyringe = require("tsyringe");

var _ArgumentHandlerDefault = _interopRequireDefault(require("./implementations/ArgumentHandlerDefault"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const implementations = {
  default: _ArgumentHandlerDefault.default
};

_tsyringe.container.registerSingleton("ArgumentHandler", implementations.default);