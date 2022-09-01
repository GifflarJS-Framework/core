"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = require("../../../../utils/files");
var path_1 = __importDefault(require("path"));
var web3_1 = __importDefault(require("web3"));
var DeployContractsCommand = /** @class */ (function () {
    function DeployContractsCommand() {
    }
    DeployContractsCommand.prototype.execute = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var content, configFile, networkConfig, web3, account, files, contracts, scriptFiles;
            var _this = this;
            return __generator(this, function (_a) {
                content = (0, files_1.readFile)({
                    path: path_1.default.resolve(process.cwd(), "gifflarconfig.json"),
                });
                if (!content) {
                    throw new Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");
                }
                configFile = JSON.parse(content);
                // Checking if default network is defined
                if (!configFile.defaultNetwork || !configFile.networks) {
                    throw new Error("No default network found");
                }
                networkConfig = configFile.networks.filter(function (config) {
                    return config.key === configFile.defaultNetwork;
                })[0];
                // Checking if default network was found by key
                if (!networkConfig) {
                    throw new Error("No default network found");
                }
                web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(networkConfig.nodeLink));
                account = web3.eth.accounts.privateKeyToAccount(configFile.mainAddressPrivateKey);
                // Saving account to memory
                web3.eth.accounts.wallet.add(account);
                if (configFile.scriptsFolder !== "./" &&
                    !(0, files_1.fileExists)({ path: configFile.scriptsFolder })) {
                    console.log("No scripts folder found. Creating new one...");
                    // Creating contracts directory
                    (0, files_1.makeDirectory)({
                        path: path_1.default.resolve(process.cwd(), configFile.scriptsFolder),
                    });
                    console.log("Scripts folder created in: ".concat(configFile.scriptsFolder));
                }
                if (!(0, files_1.fileExists)({ path: configFile.modelsFolder })) {
                    throw new Error("None contract model were found. If you have the contract models, please, your 'gifflarconfig.json' is correct.");
                }
                files = (0, files_1.listFolderFiles)({
                    path: configFile.modelsFolder,
                });
                contracts = {};
                files.map(function (file) {
                    var gContract = require(path_1.default.resolve(process.cwd(), configFile.modelsFolder, file)).default;
                    // Verifying if contract dump file exists
                    if ((0, files_1.fileExists)({
                        path: path_1.default.resolve(configFile.compileFolder, "".concat(gContract.getName(), "_dump.json")),
                    })) {
                        // Getting the dump file stringified
                        var dumpStringified = (0, files_1.readFile)({
                            path: path_1.default.resolve(configFile.compileFolder, "".concat(gContract.getName(), "_dump.json")),
                        });
                        if (!dumpStringified)
                            throw new Error("Dump file not found.");
                        // Parsing the json file
                        var dumpJson = JSON.parse(dumpStringified);
                        // Inserting the dump file info to the contract
                        gContract.code = dumpJson.code;
                        gContract.json = dumpJson.json;
                        gContract.instance = dumpJson.instance;
                        gContract.setWeb3(web3);
                    }
                    contracts[gContract.getName()] = gContract;
                });
                scriptFiles = (0, files_1.listFolderFiles)({
                    path: configFile.scriptsFolder,
                });
                if (!scriptFiles.length) {
                    throw new Error("No scripts created yet.");
                }
                // Iterating the scripts sequentially
                scriptFiles.reduce(function (accumulator, file) { return __awaiter(_this, void 0, void 0, function () {
                    var scriptFunction;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, accumulator];
                            case 1:
                                _a.sent();
                                scriptFunction = require(path_1.default.resolve(process.cwd(), configFile.scriptsFolder, file)).default;
                                // Executing script
                                return [4 /*yield*/, scriptFunction({ contracts: contracts })];
                            case 2:
                                // Executing script
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, Promise.resolve());
                return [2 /*return*/];
            });
        });
    };
    return DeployContractsCommand;
}());
exports.default = DeployContractsCommand;
