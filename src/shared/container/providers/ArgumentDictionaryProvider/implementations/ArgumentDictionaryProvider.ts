import { ICreateContractCommand } from "@modules/commands/CreateContract/types/ICreateContractCommand";
import { injectable, inject } from "tsyringe";
import { IAliasDictionary } from "../types/IAliasDictionary";
import { IDictionary } from "../types/IDictionary";
import { IAlias } from "../types/IAlias";
import { IAliasRegistryDTO } from "../dtos/IAliasRegistryDTO";
import { IHelpCommand } from "@modules/commands/Help/types/IHelpCommand";
import { IInitCommand } from "@modules/commands/Init/types/IInitCommand";
import { IGetArgInfoByReceivedArgDTO } from "../dtos/IGetArgInfoByReceivedArgDTO";
import { IDictionaryItemInfo } from "../types/IDictionaryItemInfo";
import { IArgumentDictionaryProvider } from "../types/IArgumentDictionaryProvider";

@injectable()
export default class ArgumentDictionaryProvider
  implements IArgumentDictionaryProvider
{
  private argumentsDictionary: IDictionary = {
    help: {
      alias: ["-h", "--help"],
      options: [],
      required: false,
      handler: this.helpCommand.execute,
    },
    init: {
      alias: ["--init"],
      options: [],
      required: false,
      handler: this.initCommand.execute,
    },
    "make:contract": {
      alias: ["-m:contract", "--make:contract"],
      options: [],
      required: false,
      handler: this.createContractCommand.execute,
    },
  };
  // DICTIONARY
  private aliasesDictionary: IAliasDictionary = {
    ...this.registryAlias({
      baseArg: "help",
      aliases: ["-h", "--help"],
    }),
    ...this.registryAlias({
      baseArg: "init",
      aliases: ["--init"],
    }),
    ...this.registryAlias({
      baseArg: "make:contract",
      aliases: ["-m", "--make:contract"],
    }),
  };

  constructor(
    @inject("HelpCommand")
    private helpCommand: IHelpCommand,
    @inject("InitCommand")
    private initCommand: IInitCommand,
    @inject("CreateContractCommand")
    private createContractCommand: ICreateContractCommand
  ) {}

  private registryAlias({ baseArg, aliases }: IAliasRegistryDTO) {
    const object: IAlias = {};
    object[baseArg] = baseArg;
    aliases.map((alias: string) => {
      object[alias] = baseArg;
    });

    return object;
  }

  public getArgInfoByReceivedArg({
    receivedArgKey,
  }: IGetArgInfoByReceivedArgDTO): IDictionaryItemInfo | undefined {
    const command = this.aliasesDictionary[receivedArgKey] || "";
    if (!command) return undefined;
    const commandInfo = this.argumentsDictionary[command];
    if (!commandInfo) return undefined;
    return commandInfo;
  }
}
