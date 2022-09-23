import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import * as tsImport from "ts-import";
import {
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
  writeFile,
} from "@utils/files";
import { IGifflarContract } from "gifflar-library/bin/modules/managing/gifflarContract/types/IGifflarContract";
import path from "path";
import { ICompileContractsCommand } from "../types/ICompileContractsCommand";

class CompileContracts implements ICompileContractsCommand {
  async execute(value: string): Promise<void> {
    const content = readFile({
      path: path.resolve(process.cwd(), "gifflarconfig.json"),
    });
    if (!content) {
      throw Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );
    }

    const configFile: IConfigFile = JSON.parse(content);

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

    const compile = async ({
      file,
      configFile,
    }: {
      file: string;
      configFile: IConfigFile;
    }): Promise<void> => {
      const gContractModule = await tsImport.load(
        path.resolve(process.cwd(), configFile.modelsFolder, file)
      );
      const gContract: IGifflarContract = gContractModule.default;

      // Verifying if contract dump file exists
      if (
        fileExists({
          path: path.resolve(
            configFile.compileFolder,
            `${gContract.getName()}_dump.json`
          ),
        })
      ) {
        // If already exists, don't compile again
        return;
        // Getting the dump file stringified
        // const dumpStringified = readFile({
        //   path: path.resolve(
        //     configFile.compileFolder,
        //     `${gContract.getName()}_dump.json`
        //   ),
        // });
        // if (!dumpStringified) throw new Error("Dump file not found.");

        // Parsing the json file
        // const dumpJson: IContractJson = JSON.parse(dumpStringified);
        // Inserting the compilation json to the dump
        // dumpJson.json = gContract.json;

        // gContract.code = dumpJson.code;
      } else {
        gContract.write();
      }

      // Rewriting contract .sol
      writeFile({
        destPath: path.resolve(
          configFile.contractsFolder,
          `${gContract.getName()}.sol`
        ),
        content: gContract.code,
      });

      const json = gContract.compile((errors) => {
        if (errors) console.log(errors);
      });

      // Saving compiled JSON
      writeFile({
        destPath: path.resolve(
          configFile.compileFolder,
          `${gContract.getName()}.json`
        ),
        content: JSON.stringify(
          json.contracts.jsons[gContract.getName()],
          null,
          2
        ),
      });

      // Saving Metadata
      writeFile({
        destPath: path.resolve(
          configFile.compileFolder,
          `${gContract.getName()}_metadata.json`
        ),
        content: JSON.stringify(
          JSON.parse(json.contracts.jsons[gContract.getName()].metadata),
          null,
          2
        ),
      });

      // Saving dump file
      writeFile({
        destPath: path.resolve(
          configFile.compileFolder,
          `${gContract.getName()}_dump.json`
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
      await compile({ file: value, configFile });
    } else {
      // Creating code and ABIs for all contracts in contracts folder
      await Promise.all(
        files.map(async (file) => {
          await compile({ file, configFile });
        })
      );
    }
  }
}

export default CompileContracts;
