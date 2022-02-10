import { getArgInfoByReceivedArg } from "@utils/getArgInfoByReceivedArg";
import { IArgumentHandler } from "../types/IArgumentHandler";
import { IArgumentHandlerDTO } from "../types/IArgumentHandlerDTO";

class ArgumentHandlerDefault implements IArgumentHandler {
  helpHandler: (value: string) => Promise<void> = async () => {};

  constructor() {
    const helpInfo = getArgInfoByReceivedArg({ receivedArgKey: "help" });
    if (helpInfo) this.helpHandler = helpInfo.handler;
  }

  async execute({ dir, file, args }: IArgumentHandlerDTO) {
    const KEY = 0;
    const VALUE = 1;
    const keyValueArgument: string[] = args.slice(0, 2);

    // Obtendo comando a ser executado
    const argumentKey = keyValueArgument[KEY];
    const commandInfo = getArgInfoByReceivedArg({
      receivedArgKey: argumentKey,
    });

    // Caso comwando não encontrado, executa helper
    if (!commandInfo || !keyValueArgument[VALUE]) {
      this.helpHandler(keyValueArgument[VALUE]);
      return;
    }

    // Executando handler de comando conhecido
    await commandInfo?.handler(keyValueArgument[VALUE]);
  }
}

export default ArgumentHandlerDefault;
