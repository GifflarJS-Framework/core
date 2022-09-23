import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import {
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
  writeFile,
} from "@utils/files";
import path from "path";
import { IGifflarContract } from "gifflar-library/bin/modules/managing/gifflarContract/types/IGifflarContract";
import { IContractJson } from "gifflar-library/bin/modules/models/toplevels/contract/types/IContractJson";
import { IWriteContractsCommand } from "../types/IWriteContractsCommand";

class WriteContractsCommand implements IWriteContractsCommand {
  execute = async (value: string): Promise<void> => {
    const content = readFile({
      path: path.resolve(process.cwd(), "gifflarconfig.json"),
    });
    if (!content) {
      throw Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );
    }
    const configFile: IConfigFile = JSON.parse(content);

    if (configFile.contractsFolder !== "./") {
      // Creating contracts directory
      makeDirectory({
        path: path.resolve(process.cwd(), configFile.contractsFolder),
      });
    }

    if (configFile.compileFolder !== "./") {
      // Creating contracts directory
      makeDirectory({
        path: `${process.cwd()}/${configFile.compileFolder}`,
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
    await Promise.all(
      files.map(async (file) => {
        const gContractModule = await import(
          path.resolve(process.cwd(), configFile.modelsFolder, file)
        );
        const gContract: IGifflarContract = gContractModule.default;

        const code = gContract.write();

        writeFile({
          destPath: path.resolve(
            configFile.contractsFolder,
            `${gContract.getName()}.sol`
          ),
          content: code,
        });

        // Verifying if contract dump file exists
        if (
          fileExists({
            path: path.resolve(
              configFile.compileFolder,
              `${gContract.getName()}_dump.json`
            ),
          })
        ) {
          // Getting the dump file stringified
          const dumpStringified = readFile({
            path: path.resolve(
              configFile.compileFolder,
              `${gContract.getName()}_dump.json`
            ),
          });
          if (!dumpStringified) throw new Error("Dump file not found.");

          // Parsing the json file
          const dumpJson: IContractJson = JSON.parse(dumpStringified);
          // Inserting the code to the dump
          dumpJson.code = gContract.code;

          // Updating dump file
          writeFile({
            destPath: path.resolve(
              configFile.compileFolder,
              `${gContract.getName()}_dump.json`
            ),
            content: JSON.stringify(dumpJson, null, 2),
          });
        }
      })
    );
  };
}

export default WriteContractsCommand;
