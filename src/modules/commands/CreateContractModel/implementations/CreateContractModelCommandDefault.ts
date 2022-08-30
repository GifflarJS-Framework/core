import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import { copyFile, makeDirectory, readFile } from "@utils/files";
import path from "path";
import { ICreateContractModelCommand } from "../types/ICreateContractModelCommand";

class CreateContractModelCommandDefault implements ICreateContractModelCommand {
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
    if (configFile.modelsFolder !== "./") {
      // Creating contracts directory
      makeDirectory({ path: `${process.cwd()}/${configFile.modelsFolder}` });
    }

    copyFile({
      sourcePath: path.resolve(
        __dirname,
        `../templates/MakeContractTemplate.template`
      ),
      destPath: path.resolve(
        process.cwd(),
        configFile.modelsFolder,
        `${value}Contract.ts`
      ),
    });
  }
}
export default CreateContractModelCommandDefault;
