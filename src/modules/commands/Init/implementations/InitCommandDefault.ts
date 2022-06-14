import { writeFile } from "@utils/files";
import path from "path";
import { IConfigFile } from "../types/IConfigFile";
import { IInitCommand } from "../types/IInitCommand";
import crypto from "crypto";

class InitCommandDefault implements IInitCommand {
  async execute(_path: string | undefined): Promise<void> {
    const INITIAL_CONFIG: IConfigFile = {
      projectName: "Gifflar Project",
      root: "./gifflar",
      modelsFolder: "./gifflar/models",
      contractsFolder: "./gifflar/contracts",
      servicesFolder: "./gifflar/services",
      compileFolder: "./gifflar/arctifacts",
      scriptsFolder: "./gifflar/scripts",
      appKey: crypto
        .createHash("sha256")
        .update(new Date().getTime().toString())
        .digest("hex"),
      defaultNetwork: "local_network",
      mainAddressPrivateKey: "",
      networks: [
        {
          key: "local_network",
          networkId: 0,
          gas: "3000000",
          gasPrice: "10000000000",
          nodeLink: "http://localhost:8545",
        },
        {
          key: "bsc_testnet",
          networkId: 97,
          gas: "3000000",
          nodeLink: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
      ],
    };

    // Writing config file
    writeFile({
      destPath: path.resolve(
        process.cwd(),
        _path || "./",
        "gifflarconfig.json"
      ),
      content: JSON.stringify(INITIAL_CONFIG, null, 1),
    });
  }
}

export default InitCommandDefault;
