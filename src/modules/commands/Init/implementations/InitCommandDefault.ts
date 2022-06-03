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
