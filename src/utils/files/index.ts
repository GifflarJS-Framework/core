import fs from "fs";

interface IMakeDirectoryDTO {
  path: string;
}

interface ICopyFileDTO {
  sourcePath: string;
  destPath: string;
}

interface IWriteFileDTO {
  destPath: string;
  content: any;
}

interface IPathInput {
  path: string;
}

export const makeDirectory = ({ path }: IMakeDirectoryDTO): void => {
  fs.mkdirSync(path, { recursive: true });
};

export const copyFile = ({ sourcePath, destPath }: ICopyFileDTO): void => {
  fs.copyFile(
    sourcePath,
    destPath,
    fs.constants.COPYFILE_EXCL,
    (err: Error | null) => {
      if (err) throw err;
      //console.log("source.txt was copied to destination.txt");
    }
  );
};

export const writeFile = ({ destPath, content }: IWriteFileDTO): void => {
  fs.writeFile(destPath, content, { flag: "w" }, (err: Error | null) => {
    if (err) throw err;
    //console.log("source.txt was copied to destination.txt");
  });
};

export const fileExists = ({ path }: IPathInput) => {
  return fs.existsSync(path);
};

export const readFile = ({ path }: IPathInput): any | null => {
  try {
    const content: any = fs.readFileSync(path, { encoding: "utf-8" });
    return content;
  } catch (e) {
    return null;
  }
};

export const listFolderFiles = ({ path }: IPathInput): any | null => {
  try {
    const files: string[] = fs.readdirSync(path, { encoding: "utf-8" });
    return files;
  } catch (e) {
    return null;
  }
};
