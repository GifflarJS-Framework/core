import { IConfigFile } from "@modules/commands/init/types/IConfigFile";
import { copyFile, makeDirectory, readFile } from "@utils/files";
import path from "path";
import { ICreateContractCommand } from "../types/ICreateContractCommand";

class CreateContractCommandDefault implements ICreateContractCommand {
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
    if (configFile.contractsFolder !== "./") {
      // Creating contracts directory
      makeDirectory({ path: `${process.cwd()}/${configFile.contractsFolder}` });
    }

    copyFile({
      sourcePath: path.resolve(
        `${__dirname}/../../../../templates/MakeContractTemplate.ts`
      ),
      destPath: path.resolve(
        process.cwd(),
        configFile.contractsFolder,
        `${value}Contract.ts`
      ),
    });
  }
}
export default CreateContractCommandDefault;
