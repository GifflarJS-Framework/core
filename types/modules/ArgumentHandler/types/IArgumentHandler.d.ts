import { IArgumentHandlerDTO } from "./IArgumentHandlerDTO";
export interface IArgumentHandler {
    helpHandler: (value: string) => Promise<void>;
    execute({ dir, file, args }: IArgumentHandlerDTO): Promise<void>;
}
