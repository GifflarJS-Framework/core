import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import {
  copyFile,
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
} from "@utils/files";
import path from "path";
import { ICreateScriptCommand } from "../types/ICreateScriptCommand";

class CreateScriptCommand implements ICreateScriptCommand {
  async execute(value: string) {
    // Checking if value was set
    if (!value) {
      throw new Error("You must define the script name");
    }

    // Obtaining the configFile
    const content = readFile({
      path: path.resolve(process.cwd(), "gifflarconfig.json"),
    });
    if (!content) {
      throw new Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );
    }
    const configFile: IConfigFile = JSON.parse(content);

    // Checking if scripts folder
    if (!configFile.scriptsFolder) {
      throw new Error("No path to scripts folder found");
    }

    // Checking if project has types-gifflar instaled
    if (
      !fileExists({
        path: path.resolve(
          process.cwd(),
          "node_modules",
          "types-gifflar/modules/commands/DeployContracts/dtos/IScriptFunctionInputs.d.ts"
        ),
      })
    ) {
      const npmCommand = `npm install -dev git+https://github.com/GifflarJS-Framework/types-gifflar.git`;
      const yarnCommand = `yarn add -D git+https://github.com/GifflarJS-Framework/types-gifflar.git`;
      throw new Error(
        `You must install types-gifflar first. Please, run "${npmCommand}" or "${yarnCommand}"`
      );
    }

    // Creating root directory
    if (configFile.root !== "./") {
      makeDirectory({ path: `${process.cwd()}/${configFile.root}` });
    }
    // Creating scripts folder
    if (configFile.scriptsFolder !== "./") {
      makeDirectory({ path: `${process.cwd()}/${configFile.scriptsFolder}` });
    }

    // Obtaining the list of scripts files
    const scriptFiles: string[] = listFolderFiles({
      path: configFile.scriptsFolder,
    });

    // Defining next script index order
    let scriptOrder = 0;
    scriptFiles.map((file) => {
      if (file.includes(scriptOrder.toString())) {
        scriptOrder += 1;
      }
    });

    // Creating script
    copyFile({
      sourcePath: path.resolve(
        __dirname,
        `../templates/MakeScriptTemplate.template`
      ),
      destPath: path.resolve(
        process.cwd(),
        configFile.scriptsFolder,
        `${scriptOrder}_${value}.ts`
      ),
    });
  }
}

export default CreateScriptCommand;
