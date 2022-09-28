import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import * as tsImport from "ts-import";
import {
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
  writeFile,
} from "@utils/files";

import path from "path";
import { IScriptFunctionInputs } from "../dtos/IScriptFunctionInputs";
import { IContractModelsDict } from "../types/IContractModelsDict";
import { IDeployContractsCommand } from "../types/IDeployContractsCommand";
import Web3 from "web3";
import { IContractJson } from "gifflar-library/bin/modules/models/toplevels/contract/types/IContractJson";
import { IGifflarContract } from "gifflar-library/bin/modules/managing/gifflarContract/types/IGifflarContract";

class DeployContractsCommand implements IDeployContractsCommand {
  async execute(value: string): Promise<void> {
    const content = readFile({
      path: path.resolve(process.cwd(), "gifflarconfig.json"),
    });
    if (!content) {
      throw new Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );
    }
    const configFile: IConfigFile = JSON.parse(content);

    // Checking if default network is defined
    if (!configFile.defaultNetwork || !configFile.networks) {
      throw new Error("No default network found");
    }

    // Filtering the network config choosen
    const networkConfig = configFile.networks.filter((config) => {
      return config.key === configFile.defaultNetwork;
    })[0];

    // Checking if default network was found by key
    if (!networkConfig) {
      throw new Error("No default network found");
    }

    // Creating web3 through network config
    const web3 = new Web3();

    if (
      configFile.scriptsFolder !== "./" &&
      !fileExists({ path: configFile.scriptsFolder })
    ) {
      console.log("No scripts folder found. Creating new one...");
      // Creating contracts directory
      makeDirectory({
        path: path.resolve(process.cwd(), configFile.scriptsFolder),
      });
      console.log(`Scripts folder created in: ${configFile.scriptsFolder}`);
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
    const contracts: IContractModelsDict = {};

    try {
      await Promise.all(
        files.map(async (file) => {
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
            // Inserting the dump file info to the contract
            gContract.code = dumpJson.code;
            gContract.json = dumpJson.json;
          } else {
            // COMPILING
            gContract.write();

            gContract.compile((errors) => {
              if (errors) {
                errors.map((e: any) => console.log(e));
                throw new Error("Error while compiling contracts");
              }
            });

            // Saving compiled JSON
            writeFile({
              destPath: path.resolve(
                configFile.compileFolder,
                `${gContract.getName()}.json`
              ),
              content: JSON.stringify(
                gContract.json.contracts.jsons[gContract.getName()],
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
                JSON.parse(
                  gContract.json.contracts.jsons[gContract.getName()].metadata
                ),
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
          }

          gContract.setWeb3(web3);
          gContract.setDeployConfig(networkConfig);
          gContract.addSigner(configFile.mainAddressPrivateKey);

          contracts[gContract.getName()] = gContract;
        })
      );

      // listing all files in scripts folder
      const scriptFiles: string[] = listFolderFiles({
        path: configFile.scriptsFolder,
      });

      if (!scriptFiles.length) {
        throw new Error("No scripts created yet.");
      }

      // Iterating the scripts sequentially
      scriptFiles.reduce(async (accumulator, file) => {
        await accumulator;

        const fileModule = await tsImport.load(
          path.resolve(process.cwd(), configFile.scriptsFolder, file)
        );

        // Getting script function
        const scriptFunction: ({
          contracts,
        }: IScriptFunctionInputs) => Promise<void> = fileModule.default;

        // Executing script
        try {
          await scriptFunction({ contracts });
        } catch (e) {
          Promise.reject(e);
        }

        Object.keys(contracts).map((contractName) => {
          const gContract = contracts[contractName];

          // Updating compiled JSON
          writeFile({
            destPath: path.resolve(
              configFile.compileFolder,
              `${gContract.getName()}.json`
            ),
            content: JSON.stringify(
              gContract.json.contracts.jsons[gContract.getName()],
              null,
              2
            ),
          });

          gContract.instance = undefined;
          // Updating dump file
          writeFile({
            destPath: path.resolve(
              configFile.compileFolder,
              `${gContract.getName()}_dump.json`
            ),
            content: JSON.stringify(gContract, null, 2),
          });
        });
      }, Promise.resolve());
    } catch (e: any) {
      console.log(e.message);
      return;
    }
  }
}

export default DeployContractsCommand;
