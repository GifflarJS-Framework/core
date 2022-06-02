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
import { ICompileContractsCommand } from "../types/ICompileContractsCommand";

class CompileContracts implements ICompileContractsCommand {
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

    if (configFile.root !== "./") {
      // Creating root directory
      makeDirectory({ path: `${process.cwd()}/${configFile.root}` });
    }
    if (configFile.compileFolder !== "./") {
      // Creating compilations directory
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

      const json = gContract.compile((errors) => {
        if (errors) console.log(errors);
      });

      // Saving ABI
      writeFile({
        destPath: path.resolve(
          configFile.compileFolder,
          `${gContract.name}.json`
        ),
        content: JSON.stringify(
          json.contracts.jsons[gContract.name].abi,
          null,
          2
        ),
      });

      // Saving Metadata
      writeFile({
        destPath: path.resolve(
          configFile.compileFolder,
          `${gContract.name}_metadata.json`
        ),
        content: JSON.stringify(
          JSON.parse(json.contracts.jsons[gContract.name].metadata),
          null,
          2
        ),
      });
    });
  }
}

export default CompileContracts;
