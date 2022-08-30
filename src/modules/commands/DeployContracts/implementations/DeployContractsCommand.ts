import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import {
  fileExists,
  listFolderFiles,
  makeDirectory,
  readFile,
} from "@utils/files";
import { IGifflarContract } from "gifflar-library/bin/modules/managing/gifflarContract/types/IGifflarContract";
import { IContractJson } from "gifflar-library/bin/modules/models/toplevels/contract/types/IContractJson";
import path from "path";
import { IScriptFunctionInputs } from "../dtos/IScriptFunctionInputs";
import { IContractModelsDict } from "../types/IContractModelsDict";
import { IDeployContractsCommand } from "../types/IDeployContractsCommand";
import Web3 from "web3";

class DeployContractsCommand implements IDeployContractsCommand {
  async execute(value: string): Promise<void> {
    const configFile: IConfigFile = JSON.parse(
      readFile({
        path: path.resolve(process.cwd(), "gifflarconfig.json"),
      })
    );
    if (!configFile) {
      throw new Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );
    }

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
    const web3 = new Web3(
      new Web3.providers.HttpProvider(networkConfig.nodeLink)
    );

    // Recovering account from private key
    const account = web3.eth.accounts.privateKeyToAccount(
      configFile.mainAddressPrivateKey
    );
    // Saving account to memory
    web3.eth.accounts.wallet.add(account);

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

    files.map((file) => {
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
            `${gContract.getName()}_dump.json`
          ),
        })
      ) {
        // Getting the dump file stringified
        const dumpStringified: string = readFile({
          path: path.resolve(
            configFile.compileFolder,
            `${gContract.getName()}_dump.json`
          ),
        });

        // Parsing the json file
        const dumpJson: IContractJson = JSON.parse(dumpStringified);
        // Inserting the dump file info to the contract
        gContract.code = dumpJson.code;
        gContract.json = dumpJson.json;
        gContract.instance = dumpJson.instance;
        gContract.setWeb3(web3);
      }

      contracts[gContract.getName()] = gContract;
    });

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

      // Getting script function
      const scriptFunction: ({
        contracts,
      }: IScriptFunctionInputs) => Promise<void> = require(path.resolve(
        process.cwd(),
        configFile.scriptsFolder,
        file
      )).default;

      // Executing script
      await scriptFunction({ contracts });
    }, Promise.resolve());
  }
}

export default DeployContractsCommand;
