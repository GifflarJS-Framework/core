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
export declare const makeDirectory: ({ path }: IMakeDirectoryDTO) => void;
export declare const copyFile: ({ sourcePath, destPath }: ICopyFileDTO) => void;
export declare const writeFile: ({ destPath, content }: IWriteFileDTO) => void;
export declare const fileExists: ({ path }: IPathInput) => boolean;
export declare const readFile: ({ path }: IPathInput) => any | null;
export declare const listFolderFiles: ({ path }: IPathInput) => any | null;
export {};
