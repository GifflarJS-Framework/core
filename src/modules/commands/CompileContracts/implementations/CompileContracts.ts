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

    const compile = ({
      file,
      configFile,
    }: {
      file: string;
      configFile: IConfigFile;
    }): void => {
      const gContract: IGifflarContract = require(path.resolve(
        process.cwd(),
        configFile.modelsFolder,
        file
      )).default;

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
        // Inserting the compilation json to the dump
        dumpJson.json = gContract.json;

        gContract.code = dumpJson.code;
      } else {
        gContract.write();
      }

      // Creating contract .sol if not found
      if (
        !fileExists({
          path: path.resolve(configFile.contractsFolder, `${value}.sol`),
        })
      ) {
        writeFile({
          destPath: path.resolve(
            configFile.contractsFolder,
            `${gContract.name}.sol`
          ),
          content: gContract.code,
        });
      }

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

      // Saving dump file
      writeFile({
        destPath: path.resolve(
          configFile.compileFolder,
          `${gContract.name}_dump.json`
        ),
        content: JSON.stringify(gContract, null, 2),
      });
    };

    if (value) {
      // Verifying if single contract file exists
      if (
        !fileExists({
          path: path.resolve(configFile.modelsFolder, `${value}.ts`),
        })
      ) {
        throw new Error("Requested contract model were not found.");
      }

      // Compiling single contract
      compile({ file: value, configFile });
    } else {
      // Creating code and ABIs for all contracts in contracts folder
      files.map((file) => {
        compile({ file, configFile });
      });
    }
  }
}

export default CompileContracts;
