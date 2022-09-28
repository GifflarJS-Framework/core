"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var tsImport = __importStar(require("ts-import"));
var files_1 = require("../../../../utils/files");
var path_1 = __importDefault(require("path"));
var WriteContractsCommand = /** @class */ (function () {
    function WriteContractsCommand() {
        var _this = this;
        this.execute = function (value) { return __awaiter(_this, void 0, void 0, function () {
            var content, configFile, files, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = (0, files_1.readFile)({
                            path: path_1.default.resolve(process.cwd(), "gifflarconfig.json"),
                        });
                        if (!content) {
                            throw Error("Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first.");
                        }
                        configFile = JSON.parse(content);
                        if (configFile.contractsFolder !== "./") {
                            // Creating contracts directory
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(process.cwd(), configFile.contractsFolder),
                            });
                        }
                        if (configFile.compileFolder !== "./") {
                            // Creating contracts directory
                            (0, files_1.makeDirectory)({
                                path: "".concat(process.cwd(), "/").concat(configFile.compileFolder),
                            });
                        }
                        if (!(0, files_1.fileExists)({ path: configFile.modelsFolder })) {
                            throw new Error("None contract model were found. If you have the contract models, please, your 'gifflarconfig.json' is correct.");
                        }
                        files = (0, files_1.listFolderFiles)({
                            path: configFile.modelsFolder,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Creating code for all contracts in contracts folder
                        return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var gContractModule, gContract, code, dumpStringified, dumpJson;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tsImport.load(path_1.default.resolve(process.cwd(), configFile.modelsFolder, file))];
                                        case 1:
                                            gContractModule = _a.sent();
                                            gContract = gContractModule.default;
                                            code = gContract.write();
                                            (0, files_1.writeFile)({
                                                destPath: path_1.default.resolve(process.cwd(), configFile.contractsFolder, "".concat(gContract.getName(), ".sol")),
                                                content: code,
                                            });
                                            if (!(0, files_1.fileExists)({
                                                path: path_1.default.resolve(process.cwd(), configFile.compileFolder, "".concat(gContract.getName(), "_dump.json")),
                                            })) return [3 /*break*/, 3];
                                            return [4 /*yield*/, (0, files_1.readFile)({
                                                    path: path_1.default.resolve(process.cwd(), configFile.compileFolder, "".concat(gContract.getName(), "_dump.json")),
                                                })];
                                        case 2:
                                            dumpStringified = _a.sent();
                                            if (!dumpStringified)
                                                throw new Error("Dump file not found.");
                                            dumpJson = JSON.parse(dumpStringified);
                                            // Inserting the code to the dump
                                            dumpJson.code = gContract.code;
                                            // Updating dump file
                                            (0, files_1.writeFile)({
                                                destPath: path_1.default.resolve(process.cwd(), configFile.compileFolder, "".concat(gContract.getName(), "_dump.json")),
                                                content: JSON.stringify(dumpJson, null, 2),
                                            });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        // Creating code for all contracts in contracts folder
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return WriteContractsCommand;
}());
exports.default = WriteContractsCommand;
