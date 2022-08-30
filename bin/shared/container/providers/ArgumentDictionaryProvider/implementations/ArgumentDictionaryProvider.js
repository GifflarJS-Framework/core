"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IHelpCommand = require("../../../../../modules/commands/Help/types/IHelpCommand");

var _IInitCommand = require("../../../../../modules/commands/Init/types/IInitCommand");

var _ICreateServiceCommand = require("../../../../../modules/commands/CreateService/types/ICreateServiceCommand");

var _IWriteContractsCommand = require("../../../../../modules/commands/WriteContracts/types/IWriteContractsCommand");

var _ICreateContractModelCommand = require("../../../../../modules/commands/CreateContractModel/types/ICreateContractModelCommand");

var _ICompileContractsCommand = require("../../../../../modules/commands/CompileContracts/types/ICompileContractsCommand");

var _IDeployContractsCommand = require("../../../../../modules/commands/DeployContracts/types/IDeployContractsCommand");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class;

let ArgumentDictionaryProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("HelpCommand")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("InitCommand")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CreateContractModelCommand")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("CreateServiceCommand")(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)("WriteContractsCommand")(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)("CompileContractsCommand")(target, undefined, 5);
}, _dec8 = function (target, key) {
  return (0, _tsyringe.inject)("DeployContractsCommand")(target, undefined, 6);
}, _dec9 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof _IHelpCommand.IHelpCommand === "undefined" ? Object : _IHelpCommand.IHelpCommand, typeof _IInitCommand.IInitCommand === "undefined" ? Object : _IInitCommand.IInitCommand, typeof _ICreateContractModelCommand.ICreateContractModelCommand === "undefined" ? Object : _ICreateContractModelCommand.ICreateContractModelCommand, typeof _ICreateServiceCommand.ICreateServiceCommand === "undefined" ? Object : _ICreateServiceCommand.ICreateServiceCommand, typeof _IWriteContractsCommand.IWriteContractsCommand === "undefined" ? Object : _IWriteContractsCommand.IWriteContractsCommand, typeof _ICompileContractsCommand.ICompileContractsCommand === "undefined" ? Object : _ICompileContractsCommand.ICompileContractsCommand, typeof _IDeployContractsCommand.IDeployContractsCommand === "undefined" ? Object : _IDeployContractsCommand.IDeployContractsCommand]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec10(_class = class ArgumentDictionaryProvider {
  argumentsDictionary = {
    help: {
      alias: ["-h", "--help"],
      options: [],
      required: false,
      handler: this.helpCommand.execute
    },
    init: {
      alias: ["--init"],
      options: [],
      required: false,
      handler: this.initCommand.execute
    },
    "make:model": {
      alias: ["-m:model", "--make:model"],
      options: [],
      required: false,
      handler: this.createContractModelCommand.execute
    },
    "make:service": {
      alias: ["-m:service", "--make:service"],
      options: [],
      required: false,
      handler: this.createServiceCommand.execute
    },
    write: {
      alias: [],
      options: [],
      required: false,
      handler: this.writeContractsCommand.execute
    },
    compile: {
      alias: [],
      options: [],
      required: false,
      handler: this.compileContractsCommand.execute
    },
    deploy: {
      alias: [],
      options: [],
      required: false,
      handler: this.deployContractsCommand.execute
    }
  }; // DICTIONARY

  aliasesDictionary = { ...this.registryAlias({
      baseArg: "help",
      aliases: ["-h", "--help"]
    }),
    ...this.registryAlias({
      baseArg: "init",
      aliases: ["--init"]
    }),
    ...this.registryAlias({
      baseArg: "make:model",
      aliases: ["-m:model", "--make:model"]
    }),
    ...this.registryAlias({
      baseArg: "make:service",
      aliases: ["-m:service", "--make:service"]
    }),
    ...this.registryAlias({
      baseArg: "write",
      aliases: []
    }),
    ...this.registryAlias({
      baseArg: "compile",
      aliases: []
    }),
    ...this.registryAlias({
      baseArg: "deploy",
      aliases: []
    })
  };

  constructor(helpCommand, initCommand, createContractModelCommand, createServiceCommand, writeContractsCommand, compileContractsCommand, deployContractsCommand) {
    this.helpCommand = helpCommand;
    this.initCommand = initCommand;
    this.createContractModelCommand = createContractModelCommand;
    this.createServiceCommand = createServiceCommand;
    this.writeContractsCommand = writeContractsCommand;
    this.compileContractsCommand = compileContractsCommand;
    this.deployContractsCommand = deployContractsCommand;
  }

  registryAlias({
    baseArg,
    aliases
  }) {
    const object = {};
    object[baseArg] = baseArg;
    aliases.map(alias => {
      object[alias] = baseArg;
    });
    return object;
  }

  getArgInfoByReceivedArg({
    receivedArgKey
  }) {
    const command = this.aliasesDictionary[receivedArgKey] || "";
    if (!command) return undefined;
    const commandInfo = this.argumentsDictionary[command];
    if (!commandInfo) return undefined;
    return commandInfo;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ArgumentDictionaryProvider;