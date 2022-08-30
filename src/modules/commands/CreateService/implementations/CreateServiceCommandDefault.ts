import { IConfigFile } from "@modules/commands/Init/types/IConfigFile";
import { copyFile, makeDirectory, readFile, writeFile } from "@utils/files";
import path from "path";
import { ICreateServiceCommand } from "../types/ICreateServiceCommand";

class CreateServiceCommandDefault implements ICreateServiceCommand {
  async execute(value: string): Promise<void> {
    // Checking if value was set
    if (!value) {
      throw new Error("You must define the service name");
    }

    // Obtaining the configFile
    const content = readFile({
      path: path.resolve(process.cwd(), "gifflarconfig.json"),
    });
    if (!content) {
      throw new Error(
        "Configuration file 'gifflarconfig.json' not found. Run 'gifflar init' first."
      );
    }
    const configFile: IConfigFile = JSON.parse(content);

    if (configFile.root !== "./") {
      // Creating root directory
      makeDirectory({ path: `${process.cwd()}/${configFile.root}` });
    }
    if (configFile.servicesFolder !== "./") {
      // Creating services directory
      makeDirectory({ path: `${process.cwd()}/${configFile.servicesFolder}` });
    }

    const filePath = path.resolve(process.cwd(), configFile.servicesFolder);
    await copyFile({
      sourcePath: path.resolve(
        __dirname,
        `../templates/MakeServiceTemplate.template`
      ),
      destPath: path.resolve(filePath, `${value}Service.ts`),
    });

    // Creating gifflarConfig import
    const fileDepth = filePath.split("/").length - 2;
    const rootDepth = process.cwd().split("/").length - 2;
    const backDepth = fileDepth - rootDepth;

    let importGifflarConfig = `import { networks, defaultNetwork } from "`;
    for (let i = 0; i < backDepth; i++) {
      importGifflarConfig += `../`;
    }
    importGifflarConfig += `gifflarconfig.json";\n`;

    let fileContent = readFile({
      path: path.resolve(filePath, `${value}Service.ts`),
    });
    console.log(fileContent);
    fileContent = importGifflarConfig + fileContent;
    console.log(fileContent);
    writeFile({
      destPath: path.resolve(filePath, `${value}Service.ts`),
      content: fileContent,
    });
  }
}
export default CreateServiceCommandDefault;
