"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.readFile = exports.makeDirectory = exports.listFolderFiles = exports.fileExists = exports.copyFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeDirectory = ({
  path
}) => {
  _fs.default.mkdirSync(path, {
    recursive: true
  });
};

exports.makeDirectory = makeDirectory;

const copyFile = ({
  sourcePath,
  destPath
}) => {
  _fs.default.copyFile(sourcePath, destPath, _fs.default.constants.COPYFILE_EXCL, err => {
    if (err) throw err; //console.log("source.txt was copied to destination.txt");
  });
};

exports.copyFile = copyFile;

const writeFile = ({
  destPath,
  content
}) => {
  _fs.default.writeFile(destPath, content, {
    flag: "w"
  }, err => {
    if (err) throw err; //console.log("source.txt was copied to destination.txt");
  });
};

exports.writeFile = writeFile;

const fileExists = ({
  path
}) => {
  return _fs.default.existsSync(path);
};

exports.fileExists = fileExists;

const readFile = ({
  path
}) => {
  try {
    const content = _fs.default.readFileSync(path, {
      encoding: "utf-8"
    });

    return content;
  } catch (e) {
    return null;
  }
};

exports.readFile = readFile;

const listFolderFiles = ({
  path
}) => {
  try {
    const files = _fs.default.readdirSync(path, {
      encoding: "utf-8"
    });

    return files;
  } catch (e) {
    return null;
  }
};

exports.listFolderFiles = listFolderFiles;