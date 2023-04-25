"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFolderFiles = exports.readFile = exports.fileExists = exports.writeFile = exports.copyFile = exports.makeDirectory = void 0;
var fs_1 = __importDefault(require("fs"));
var makeDirectory = function (_a) {
    var path = _a.path;
    fs_1.default.mkdirSync(path, { recursive: true });
};
exports.makeDirectory = makeDirectory;
var copyFile = function (_a) {
    var sourcePath = _a.sourcePath, destPath = _a.destPath;
    fs_1.default.copyFile(sourcePath, destPath, fs_1.default.constants.COPYFILE_EXCL, function (err) {
        if (err)
            throw err;
        //console.log("source.txt was copied to destination.txt");
    });
};
exports.copyFile = copyFile;
var writeFile = function (_a) {
    var destPath = _a.destPath, content = _a.content;
    fs_1.default.writeFile(destPath, content, { flag: "w" }, function (err) {
        if (err)
            throw err;
        //console.log("source.txt was copied to destination.txt");
    });
};
exports.writeFile = writeFile;
var fileExists = function (_a) {
    var path = _a.path;
    return fs_1.default.existsSync(path);
};
exports.fileExists = fileExists;
var readFile = function (_a) {
    var path = _a.path;
    try {
        var content = fs_1.default.readFileSync(path, { encoding: "utf-8" });
        return content;
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
};
exports.readFile = readFile;
var listFolderFiles = function (_a) {
    var path = _a.path;
    try {
        var files = fs_1.default.readdirSync(path, { encoding: "utf-8" });
        return files;
    }
    catch (e) {
        return null;
    }
};
exports.listFolderFiles = listFolderFiles;
