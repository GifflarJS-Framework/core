import { IArgumentHandler } from "../types/IArgumentHandler";
import { IArgumentHandlerDTO } from "../types/IArgumentHandlerDTO";
import { injectable, inject } from "tsyringe";
import { IArgumentDictionaryProvider } from "shared/container/providers/ArgumentDictionaryProvider/types/IArgumentDictionaryProvider";

@injectable()
class ArgumentHandlerDefault implements IArgumentHandler {
  helpHandler: (value: string) => Promise<void> = async () => {};

  constructor(
    @inject("ArgumentDictionaryProvider")
    private argumentDictionaryProvider: IArgumentDictionaryProvider
  ) {
    const helpInfo = this.argumentDictionaryProvider.getArgInfoByReceivedArg({
      receivedArgKey: "help",
    });
    if (helpInfo) this.helpHandler = helpInfo.handler;
  }

  async execute({ dir, file, args }: IArgumentHandlerDTO): Promise<void> {
    const KEY = 0;
    const VALUE = 1;
    const keyValueArgument: string[] = args.slice(0, 2);

    // Obtendo comando a ser executado
    const argumentKey = keyValueArgument[KEY];
    const commandInfo = this.argumentDictionaryProvider.getArgInfoByReceivedArg(
      {
        receivedArgKey: argumentKey,
      }
    );

    // Caso comwando não encontrado, executa helper
    if (!commandInfo) {
      this.helpHandler(keyValueArgument[VALUE]);
      return;
    }

    // Executando handler de comando conhecido
    await commandInfo?.handler(keyValueArgument[VALUE]);
  }
}

export default ArgumentHandlerDefault;
