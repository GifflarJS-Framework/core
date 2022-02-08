import { getArgInfoByReceivedArg } from "@utils/getArgInfoByReceivedArg";
import { IArgumentHandler } from "../types/IArgumentHandler";
import { IArgumentHandlerDTO } from "../types/IArgumentHandlerDTO";

class ArgumentHandler implements IArgumentHandler {
  helpHandler: () => void = () => {};

  constructor() {
    const helpInfo = getArgInfoByReceivedArg({ receivedArgKey: "help" });
    if (helpInfo) this.helpHandler = helpInfo.handler;
  }

  async execute({ dir, file, args }: IArgumentHandlerDTO) {
    const KEY = 1;
    const VALUE = 2;
    const keyValueArgument: string[] = args.slice(0, 2);

    // Obtendo comando a ser executado
    const argumentKey = keyValueArgument[KEY];
    const commandInfo = getArgInfoByReceivedArg({
      receivedArgKey: argumentKey,
    });

    // Caso comwando não encontrado, executa helper
    if (!commandInfo) this.helpHandler();
  }
}

export default ArgumentHandler;
