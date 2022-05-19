import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import {
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
  writeFile,
} from "@utils/files";
import { IGifflarContract } from "gifflar/bin/modules/managing/contract/types/IGifflarContract";
import path from "path";
import { IWriteContractsCommand } from "../types/IWriteContractsCommand";

class WriteContractsCommand implements IWriteContractsCommand {
  async execute(value: string): Promise<void> {
    const configFile: IConfigFile = JSON.parse(
      readFile({
        path: path.resolve(process.cwd(), "gifflarconfig.json"),
      })
    );
    if (!configFile)
      throw Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );

    if (configFile.servicesFolder !== "./") {
      // Creating contracts directory
      makeDirectory({
        path: path.resolve(process.cwd(), configFile.contractsFolder),
      });
    }

    if (!fileExists({ path: configFile.modelsFolder })) {
      throw new Error(
        "None contract model were found. If you have the contract models, please, your 'gifflarconfig.json' is correct."
      );
    }

    // listing all files in contracts folder
    const files: string[] = listFolderFiles({
      path: configFile.modelsFolder,
    });

    // Creating code for all contracts in contracts folder
    files.map((file) => {
      const gContract: IGifflarContract = require(path.resolve(
        process.cwd(),
        configFile.modelsFolder,
        file
      )).default;

      const code = gContract.write();

      writeFile({
        destPath: path.resolve(
          configFile.contractsFolder,
          `${gContract.name}.sol`
        ),
        content: code,
      });
    });
  }
}

export default WriteContractsCommand;
