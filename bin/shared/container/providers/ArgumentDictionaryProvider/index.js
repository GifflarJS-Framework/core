"use strict";

var _tsyringe = require("tsyringe");

var _ArgumentDictionaryProvider = _interopRequireDefault(require("./implementations/ArgumentDictionaryProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  default: _ArgumentDictionaryProvider.default
};

_tsyringe.container.registerSingleton("ArgumentDictionaryProvider", providers.default);