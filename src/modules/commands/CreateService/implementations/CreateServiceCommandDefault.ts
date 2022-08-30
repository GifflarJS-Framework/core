import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import { copyFile, makeDirectory, readFile } from "@utils/files";
import path from "path";
import { ICreateServiceCommand } from "../types/ICreateServiceCommand";

class CreateServiceCommandDefault implements ICreateServiceCommand {
  async execute(value: string): Promise<void> {
    // Checking if value was set
    if (!value) {
      throw new Error("You must define the service name");
    }

    // Obtaining the configFile
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

    if (configFile.root !== "./") {
      // Creating root directory
      makeDirectory({ path: `${process.cwd()}/${configFile.root}` });
    }
    if (configFile.servicesFolder !== "./") {
      // Creating services directory
      makeDirectory({ path: `${process.cwd()}/${configFile.servicesFolder}` });
    }

    copyFile({
      sourcePath: path.resolve(
        __dirname,
        `../templates/MakeServiceTemplate.template`
      ),
      destPath: path.resolve(
        process.cwd(),
        configFile.servicesFolder,
        `${value}Service.ts`
      ),
    });
  }
}
export default CreateServiceCommandDefault;
