"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var ArgumentDictionaryProvider = /** @class */ (function () {
    function ArgumentDictionaryProvider(helpCommand, initCommand, createContractModelCommand, createServiceCommand, writeContractsCommand, compileContractsCommand, deployContractsCommand) {
        this.helpCommand = helpCommand;
        this.initCommand = initCommand;
        this.createContractModelCommand = createContractModelCommand;
        this.createServiceCommand = createServiceCommand;
        this.writeContractsCommand = writeContractsCommand;
        this.compileContractsCommand = compileContractsCommand;
        this.deployContractsCommand = deployContractsCommand;
        this.argumentsDictionary = {
            help: {
                alias: ["-h", "--help"],
                options: [],
                required: false,
                handler: this.helpCommand.execute,
            },
            init: {
                alias: ["--init"],
                options: [],
                required: false,
                handler: this.initCommand.execute,
            },
            "make:model": {
                alias: ["-m:model", "--make:model"],
                options: [],
                required: false,
                handler: this.createContractModelCommand.execute,
            },
            "make:service": {
                alias: ["-m:service", "--make:service"],
                options: [],
                required: false,
                handler: this.createServiceCommand.execute,
            },
            write: {
                alias: [],
                options: [],
                required: false,
                handler: this.writeContractsCommand.execute,
            },
            compile: {
                alias: [],
                options: [],
                required: false,
                handler: this.compileContractsCommand.execute,
            },
            deploy: {
                alias: [],
                options: [],
                required: false,
                handler: this.deployContractsCommand.execute,
            },
        };
        // DICTIONARY
        this.aliasesDictionary = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, this.registryAlias({
            baseArg: "help",
            aliases: ["-h", "--help"],
        })), this.registryAlias({
            baseArg: "init",
            aliases: ["--init"],
        })), this.registryAlias({
            baseArg: "make:model",
            aliases: ["-m:model", "--make:model"],
        })), this.registryAlias({
            baseArg: "make:service",
            aliases: ["-m:service", "--make:service"],
        })), this.registryAlias({
            baseArg: "write",
            aliases: [],
        })), this.registryAlias({
            baseArg: "compile",
            aliases: [],
        })), this.registryAlias({
            baseArg: "deploy",
            aliases: [],
        }));
    }
    ArgumentDictionaryProvider.prototype.registryAlias = function (_a) {
        var baseArg = _a.baseArg, aliases = _a.aliases;
        var object = {};
        object[baseArg] = baseArg;
        aliases.map(function (alias) {
            object[alias] = baseArg;
        });
        return object;
    };
    ArgumentDictionaryProvider.prototype.getArgInfoByReceivedArg = function (_a) {
        var receivedArgKey = _a.receivedArgKey;
        var command = this.aliasesDictionary[receivedArgKey] || "";
        if (!command)
            return undefined;
        var commandInfo = this.argumentsDictionary[command];
        if (!commandInfo)
            return undefined;
        return commandInfo;
    };
    ArgumentDictionaryProvider = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)("HelpCommand")),
        __param(1, (0, tsyringe_1.inject)("InitCommand")),
        __param(2, (0, tsyringe_1.inject)("CreateContractModelCommand")),
        __param(3, (0, tsyringe_1.inject)("CreateServiceCommand")),
        __param(4, (0, tsyringe_1.inject)("WriteContractsCommand")),
        __param(5, (0, tsyringe_1.inject)("CompileContractsCommand")),
        __param(6, (0, tsyringe_1.inject)("DeployContractsCommand")),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
    ], ArgumentDictionaryProvider);
    return ArgumentDictionaryProvider;
}());
exports.default = ArgumentDictionaryProvider;
