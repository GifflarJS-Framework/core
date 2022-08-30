"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IArgumentDictionaryProvider = require("../../../shared/container/providers/ArgumentDictionaryProvider/types/IArgumentDictionaryProvider");

var _dec, _dec2, _dec3, _dec4, _class;

let ArgumentHandlerDefault = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ArgumentDictionaryProvider")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IArgumentDictionaryProvider.IArgumentDictionaryProvider === "undefined" ? Object : _IArgumentDictionaryProvider.IArgumentDictionaryProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ArgumentHandlerDefault {
  helpHandler = async () => {};

  constructor(argumentDictionaryProvider) {
    this.argumentDictionaryProvider = argumentDictionaryProvider;
    const helpInfo = this.argumentDictionaryProvider.getArgInfoByReceivedArg({
      receivedArgKey: "help"
    });
    if (helpInfo) this.helpHandler = helpInfo.handler;
  }

  async execute({
    dir,
    file,
    args
  }) {
    const KEY = 0;
    const VALUE = 1;
    const keyValueArgument = args.slice(0, 2); // Obtendo comando a ser executado

    const argumentKey = keyValueArgument[KEY];
    const commandInfo = this.argumentDictionaryProvider.getArgInfoByReceivedArg({
      receivedArgKey: argumentKey || ""
    }); // Caso comwando não encontrado, executa helper

    if (!commandInfo) {
      this.helpHandler(keyValueArgument[VALUE] || "");
      return;
    } // Executando handler de comando conhecido


    await commandInfo?.handler(keyValueArgument[VALUE] || "");
  }

}) || _class) || _class) || _class) || _class);
var _default = ArgumentHandlerDefault;
exports.default = _default;