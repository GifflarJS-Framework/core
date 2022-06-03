import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import {
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
  writeFile,
} from "@utils/files";
import { IGifflarContract } from "gifflar-library/bin/modules/managing/contract/types/IGifflarContract";
import { IContractJson } from "gifflar-library/bin/modules/models/contract/types/IContractJson";
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

      // Verifying if contract dump file exists
      if (
        fileExists({
          path: path.resolve(
            configFile.compileFolder,
            `${gContract.name}_dump.json`
          ),
        })
      ) {
        // Getting the dump file stringified
        const dumpStringified: string = readFile({
          path: path.resolve(
            configFile.compileFolder,
            `${gContract.name}_dump.json`
          ),
        });

        // Parsing the json file
        const dumpJson: IContractJson = JSON.parse(dumpStringified);
        // Inserting the code to the dump
        dumpJson.code = gContract.code;

        // Updating dump file
        writeFile({
          destPath: path.resolve(
            configFile.compileFolder,
            `${gContract.name}_dump.json`
          ),
          content: JSON.stringify(dumpJson, null, 2),
        });
      } else {
        // Saving dump file
        writeFile({
          destPath: path.resolve(
            configFile.compileFolder,
            `${gContract.name}_dump.json`
          ),
          content: JSON.stringify(gContract, null, 2),
        });
      }
    });
  }
}

export default WriteContractsCommand;
