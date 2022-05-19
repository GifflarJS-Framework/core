import { writeFile } from "@utils/files";
import path from "path";
import { IConfigFile } from "../types/IConfigFile";
import { IInitCommand } from "../types/IInitCommand";

class InitCommandDefault implements IInitCommand {
  async execute(_path: string | undefined): Promise<void> {
    const INITIAL_CONFIG: IConfigFile = {
      projectName: "Gifflar Project",
      root: "./gifflar",
      contractsFolder: "./gifflar/contracts",
      servicesFolder: "./gifflar/services",
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
