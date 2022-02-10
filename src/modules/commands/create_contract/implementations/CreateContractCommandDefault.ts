import { copyFile, makeDirectory } from "@utils/files";

class CreateContractCommandDefault {
  private baseDirectory: string;

  constructor() {
    this.baseDirectory = "gifflar/contracts";
  }

  execute = async (value: string) => {
    makeDirectory({ path: `${process.cwd()}/${this.baseDirectory}` });

    copyFile({
      sourcePath: `${__dirname}/../../../../templates/MakeContractTemplate.ts`,
      destPath: `${process.cwd()}/${this.baseDirectory}/${value}Contract.ts`,
    });
  };
}
export default CreateContractCommandDefault;
