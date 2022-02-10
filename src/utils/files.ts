const fs = require("fs");

interface IMakeDirectoryDTO {
  path: string;
}

interface ICopyFileDTO {
  sourcePath: string;
  destPath: string;
}

export const makeDirectory = ({ path }: IMakeDirectoryDTO): void => {
  fs.mkdirSync(path, { recursive: true });
};

export const copyFile = ({ sourcePath, destPath }: ICopyFileDTO): void => {
  fs.copyFile(sourcePath, destPath, (err: Error) => {
    if (err) throw err;
    console.log("source.txt was copied to destination.txt");
  });
};
