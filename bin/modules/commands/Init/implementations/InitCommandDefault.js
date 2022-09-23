"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _child_process = require("child_process");

var _files = require("../../../../utils/files");

var _path2 = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prompt = require("prompt-sync")();

class InitCommandDefault {
  INITIAL_CONFIG = {
    projectName: "Gifflar Project",
    root: "./src",
    modelsFolder: "./src/models",
    contractsFolder: "./src/contracts",
    servicesFolder: "./src/services",
    compileFolder: "./src/arctifacts",
    scriptsFolder: "./src/scripts",
    appKey: _crypto.default.createHash("sha256").update(new Date().getTime().toString()).digest("hex"),
    defaultNetwork: "local_network",
    mainAddressPrivateKey: "",
    networks: [{
      key: "local_network",
      networkId: 0,
      gas: 3000000,
      gasPrice: "10000000000",
      nodeLink: "http://localhost:8545"
    }, {
      key: "bsc_testnet",
      networkId: 97,
      gas: 3000000,
      nodeLink: "https://data-seed-prebsc-1-s1.binance.org:8545/"
    }]
  };
  runCommand = async (command, args, options, callback) => {
    const promise = new Promise((resolve, reject) => {
      const child = (0, _child_process.spawn)(command, args, options);
      child.stdout.setEncoding("utf8");
      child.stderr.setEncoding("utf8");
      child.stdout.on("data", chunk => {
        // data from standard output is here as buffers
        // console.log(chunk);
        callback ? callback(chunk) : null;
      });
      child.stderr.on("data", data => {
        callback ? callback("", data) : null;
      });
      child.on("close", code => {
        // console.log(`child process exited with code ${code}`);
        resolve(code);
      });
    });
    return promise;
  };
  execute = async _path => {
    // Verifying if there is already a project in the folder
    if ((0, _files.fileExists)({
      path: _path2.default.resolve(process.cwd(), _path || "", `package.json`)
    })) {
      // Asking if should continue
      const shouldContinue = prompt("There is already a project in this folder, should I continue? (y/n): ");

      if (shouldContinue !== "y") {
        console.log("Aborting operation...");
        return;
      }
    } // Asking if use yarn or npm


    const useYarn = prompt("Should I use yarn to install packages? (y/n): "); // Preparing install command

    const installDict = {
      yarn: {
        command: "yarn",
        args: ["add"]
      },
      npm: {
        command: "npm",
        args: ["install"]
      }
    };
    const installOption = useYarn !== "y" ? "npm" : "yarn";
    const installCommand = installDict[installOption]; // Defining the path where the commands will execute

    const projectPath = _path2.default.resolve(process.cwd(), _path || "./");

    const commandOptions = {
      cwd: projectPath
    }; // Creating the project folder if not created

    if (!(0, _files.fileExists)({
      path: projectPath
    })) {
      (0, _files.makeDirectory)({
        path: projectPath
      });
    } // Listing files inside project folder


    let filesList = "";
    await this.runCommand("ls", ["./"], commandOptions, (data, err) => {
      if (err) throw new Error(err);
      filesList = data;
    }); // Verifying if package.json exists

    if (!filesList.includes("package.json")) {
      // Creating package.json
      await this.runCommand("npm", ["init", "-y"], commandOptions, (data, err) => {
        if (err) throw new Error(err);
      });
    } // Installing gifflar-library


    console.log("Installing gifflar library...");
    await this.runCommand(installCommand.command, installCommand.args.concat(["git+https://github.com/GifflarJS-Framework/gifflar-library.git#build"]), commandOptions, (data, err) => {
      if (err && !err.includes("warning")) throw new Error(err); // console.log(data);
    }); // Installing types gifflar library
    // console.log("Installing gifflar library types...");
    // await this.runCommand(
    //   installCommand.command,
    //   installCommand.args.concat([
    //     "-D",
    //     "git+https://github.com/GifflarJS-Framework/types-gifflar-library.git",
    //   ]),
    //   commandOptions,
    //   (data, err) => {
    //     if (err && !err.includes("warning")) throw new Error(err);
    //     // console.log(data);
    //   }
    // );
    // Installing types gifflar

    console.log("Installing gifflar types...");
    await this.runCommand(installCommand.command, installCommand.args.concat(["-D", "git+https://github.com/GifflarJS-Framework/types-gifflar.git"]), commandOptions, (data, err) => {
      if (err && !err.includes("warning")) throw new Error(err); // console.log(data);
    }); // console.log("Configuring gifflar library types...");
    // Movendo pacote para a pasta node_modules/@types
    // await this.runCommand(
    //   "mv",
    //   ["node_modules/types-gifflar-library/", "node_modules/@types/"],
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

    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, "gifflarconfig.json")
    })) {
      console.log("Creating gifflarconfig.json..."); // Writing config file

      (0, _files.writeFile)({
        destPath: _path2.default.resolve(projectPath, "gifflarconfig.json"),
        content: JSON.stringify(this.INITIAL_CONFIG, null, 1)
      });
    } else {
      console.log("gifflarconfig.json found 👍");
    }

    console.log("Configuring gitignore..."); // Creating gitignore

    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, ".gitignore")
    })) {
      (0, _files.writeFile)({
        destPath: _path2.default.resolve(projectPath, ".gitignore"),
        content: `node_modules/\ngifflarconfig.json\nyarn.lock\nyarn-error.log\npackage-lock.json`
      });
    }

    console.log("Creating folders structure..."); // src

    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.root)
    })) {
      (0, _files.makeDirectory)({
        path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.root)
      });
    } // src/models


    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.modelsFolder)
    })) {
      (0, _files.makeDirectory)({
        path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.modelsFolder)
      });
    } // src/contracts


    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.contractsFolder)
    })) {
      (0, _files.makeDirectory)({
        path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.contractsFolder)
      });
    } // src/scripts


    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.scriptsFolder)
    })) {
      (0, _files.makeDirectory)({
        path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.scriptsFolder)
      });
    } // src/services


    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.servicesFolder)
    })) {
      (0, _files.makeDirectory)({
        path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.servicesFolder)
      });
    } // src/arctifacts


    if (!(0, _files.fileExists)({
      path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.compileFolder)
    })) {
      (0, _files.makeDirectory)({
        path: _path2.default.resolve(projectPath, this.INITIAL_CONFIG.compileFolder)
      });
    }

    console.log("🚀 All done!");
  };
}

var _default = InitCommandDefault;
exports.default = _default;