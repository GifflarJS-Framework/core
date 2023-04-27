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
var crypto_1 = __importDefault(require("crypto"));
var child_process_1 = require("child_process");
var files_1 = require("../../../../utils/files");
var path_1 = __importDefault(require("path"));
var prompt = require("prompt-sync")();
var InitCommandDefault = /** @class */ (function () {
    function InitCommandDefault() {
        var _this = this;
        this.INITIAL_CONFIG = {
            projectName: "Gifflar Project",
            root: "./src",
            modelsFolder: "./src/models",
            contractsFolder: "./src/contracts",
            servicesFolder: "./src/services",
            compileFolder: "./src/arctifacts",
            scriptsFolder: "./src/scripts",
            appKey: crypto_1.default
                .createHash("sha256")
                .update(new Date().getTime().toString())
                .digest("hex"),
            defaultNetwork: "local_network",
            mainAddressPrivateKey: "",
            networks: [
                {
                    key: "local_network",
                    networkId: 0,
                    gas: 3000000,
                    gasPrice: "10000000000",
                    nodeLink: "http://localhost:8545",
                },
                {
                    key: "bsc_testnet",
                    networkId: 97,
                    gas: 3000000,
                    nodeLink: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                },
            ],
        };
        this.runCommand = function (command, args, options, callback) { return __awaiter(_this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    var child = (0, child_process_1.spawn)(command, args, options);
                    child.stdout.setEncoding("utf8");
                    child.stderr.setEncoding("utf8");
                    child.stdout.on("data", function (chunk) {
                        // data from standard output is here as buffers
                        // console.log(chunk);
                        callback ? callback(chunk) : null;
                    });
                    child.stderr.on("data", function (data) {
                        callback ? callback("", data) : null;
                    });
                    child.on("close", function (code) {
                        // console.log(`child process exited with code ${code}`);
                        resolve(code);
                    });
                });
                return [2 /*return*/, promise];
            });
        }); };
        this.execute = function (_path) { return __awaiter(_this, void 0, void 0, function () {
            var shouldContinue, useYarn, installDict, installOption, installCommand, projectPath, commandOptions, filesList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Verifying if there is already a project in the folder
                        if ((0, files_1.fileExists)({
                            path: path_1.default.resolve(process.cwd(), _path || "", "package.json"),
                        })) {
                            shouldContinue = prompt("There is already a project in this folder, should I continue? (y/n): ");
                            if (shouldContinue !== "y") {
                                console.log("Aborting operation...");
                                return [2 /*return*/];
                            }
                        }
                        useYarn = prompt("Should I use yarn to install packages? (y/n): ");
                        installDict = {
                            yarn: {
                                command: "yarn",
                                args: ["add"],
                            },
                            npm: {
                                command: "npm",
                                args: ["install"],
                            },
                        };
                        installOption = useYarn !== "y" ? "npm" : "yarn";
                        installCommand = installDict[installOption];
                        projectPath = path_1.default.resolve(process.cwd(), _path || "./");
                        commandOptions = { cwd: projectPath };
                        // Creating the project folder if not created
                        if (!(0, files_1.fileExists)({ path: projectPath })) {
                            (0, files_1.makeDirectory)({ path: projectPath });
                        }
                        filesList = "";
                        return [4 /*yield*/, this.runCommand("ls", ["./"], commandOptions, function (data, err) {
                                if (err)
                                    throw new Error(err);
                                filesList = data;
                            })];
                    case 1:
                        _a.sent();
                        if (!!filesList.includes("package.json")) return [3 /*break*/, 3];
                        // Creating package.json
                        return [4 /*yield*/, this.runCommand("npm", ["init", "-y"], commandOptions, function (data, err) {
                                if (err)
                                    throw new Error(err);
                            })];
                    case 2:
                        // Creating package.json
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        // Installing solgen
                        console.log("Installing @gifflar/solgen...");
                        return [4 /*yield*/, this.runCommand(installCommand.command, installCommand.args.concat([
                                "@gifflar/solgen",
                            ]), commandOptions, function (data, err) {
                                if (err && !err.includes("warning"))
                                    throw new Error(err);
                                // console.log(data);
                            })];
                    case 4:
                        _a.sent();
                        // Installing types solgen
                        // console.log("Installing solgen types...");
                        // await this.runCommand(
                        //   installCommand.command,
                        //   installCommand.args.concat([
                        //     "-D",
                        //     "git+https://github.com/GifflarJS-Framework/types-solgen.git",
                        //   ]),
                        //   commandOptions,
                        //   (data, err) => {
                        //     if (err && !err.includes("warning")) throw new Error(err);
                        //     // console.log(data);
                        //   }
                        // );
                        // Installing types gifflar
                        console.log("Installing @gifflar/types...");
                        return [4 /*yield*/, this.runCommand(installCommand.command, installCommand.args.concat([
                                "-D",
                                "@gifflar/types",
                            ]), commandOptions, function (data, err) {
                                if (err && !err.includes("warning"))
                                    throw new Error(err);
                                // console.log(data);
                            })];
                    case 5:
                        _a.sent();
                        // console.log("Configuring solgen types...");
                        // Movendo pacote para a pasta node_modules/@types
                        // await this.runCommand(
                        //   "mv",
                        //   ["node_modules/types-solgen/", "node_modules/@types/"],
                        //   commandOptions,
                        //   (data, err) => {
                        //     if (err) throw new Error(err);
                        //   }
                        // );
                        // console.log("Configuring gifflar types...");
                        // Movendo pacote para a pasta node_modules/@types
                        // await this.runCommand(
                        //   "mv",
                        //   ["node_modules/types-gifflar/", "node_modules/@types/"],
                        //   commandOptions,
                        //   (data, err) => {
                        //     if (err) throw new Error(err);
                        //   }
                        // );
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, "gifflarconfig.json"),
                        })) {
                            console.log("Creating gifflarconfig.json...");
                            // Writing config file
                            (0, files_1.writeFile)({
                                destPath: path_1.default.resolve(projectPath, "gifflarconfig.json"),
                                content: JSON.stringify(this.INITIAL_CONFIG, null, 1),
                            });
                        }
                        else {
                            console.log("gifflarconfig.json found 👍");
                        }
                        console.log("Configuring gitignore...");
                        // Creating gitignore
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, ".gitignore"),
                        })) {
                            (0, files_1.writeFile)({
                                destPath: path_1.default.resolve(projectPath, ".gitignore"),
                                content: "node_modules/\ngifflarconfig.json\nyarn.lock\nyarn-error.log\npackage-lock.json",
                            });
                        }
                        console.log("Creating folders structure...");
                        // src
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.root),
                        })) {
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.root),
                            });
                        }
                        // src/models
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.modelsFolder),
                        })) {
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.modelsFolder),
                            });
                        }
                        // src/contracts
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.contractsFolder),
                        })) {
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.contractsFolder),
                            });
                        }
                        // src/scripts
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.scriptsFolder),
                        })) {
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.scriptsFolder),
                            });
                        }
                        // src/services
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.servicesFolder),
                        })) {
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.servicesFolder),
                            });
                        }
                        // src/arctifacts
                        if (!(0, files_1.fileExists)({
                            path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.compileFolder),
                        })) {
                            (0, files_1.makeDirectory)({
                                path: path_1.default.resolve(projectPath, this.INITIAL_CONFIG.compileFolder),
                            });
                        }
                        console.log("🚀 All done!");
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return InitCommandDefault;
}());
exports.default = InitCommandDefault;
