import { IArgumentHandler } from "../types/IArgumentHandler";
import { IArgumentHandlerDTO } from "../types/IArgumentHandlerDTO";
import { IArgumentDictionaryProvider } from "@shared/container/providers/ArgumentDictionaryProvider/types/IArgumentDictionaryProvider";
declare class ArgumentHandlerDefault implements IArgumentHandler {
    private argumentDictionaryProvider;
    helpHandler: (value: string) => Promise<void>;
    constructor(argumentDictionaryProvider: IArgumentDictionaryProvider);
    execute({ dir, file, args }: IArgumentHandlerDTO): Promise<void>;
}
export default ArgumentHandlerDefault;
