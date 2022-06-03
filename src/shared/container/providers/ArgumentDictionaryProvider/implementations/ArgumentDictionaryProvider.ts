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
import { ICreateServiceCommand } from "@modules/commands/CreateService/types/ICreateServiceCommand";
import { IWriteContractsCommand } from "@modules/commands/WriteContracts/types/IWriteContractsCommand";
import { ICreateContractModelCommand } from "@modules/commands/CreateContractModel/types/ICreateContractModelCommand";
import { ICompileContractsCommand } from "@modules/commands/CompileContracts/types/ICompileContractsCommand";
import { IDeployContractsCommand } from "@modules/commands/DeployContracts/types/IDeployContractsCommand";

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
    "make:model": {
      alias: ["-m:model", "--make:model"],
      options: [],
      required: false,
      handler: this.createContractModelCommand.execute,
    },
    "make:service": {
      alias: ["-m:service", "--make:service"],
      options: [],
      required: false,
      handler: this.createServiceCommand.execute,
    },
    write: {
      alias: [],
      options: [],
      required: false,
      handler: this.writeContractsCommand.execute,
    },
    compile: {
      alias: [],
      options: [],
      required: false,
      handler: this.compileContractsCommand.execute,
    },
    deploy: {
      alias: [],
      options: [],
      required: false,
      handler: this.deployContractsCommand.execute,
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
      baseArg: "make:model",
      aliases: ["-m:model", "--make:model"],
    }),
    ...this.registryAlias({
      baseArg: "make:service",
      aliases: ["-m:service", "--make:service"],
    }),
    ...this.registryAlias({
      baseArg: "write",
      aliases: [],
    }),
    ...this.registryAlias({
      baseArg: "compile",
      aliases: [],
    }),
    ...this.registryAlias({
      baseArg: "deploy",
      aliases: [],
    }),
  };

  constructor(
    @inject("HelpCommand")
    private helpCommand: IHelpCommand,
    @inject("InitCommand")
    private initCommand: IInitCommand,
    @inject("CreateContractModelCommand")
    private createContractModelCommand: ICreateContractModelCommand,
    @inject("CreateServiceCommand")
    private createServiceCommand: ICreateServiceCommand,
    @inject("WriteContractsCommand")
    private writeContractsCommand: IWriteContractsCommand,
    @inject("CompileContractsCommand")
    private compileContractsCommand: ICompileContractsCommand,
    @inject("DeployContractsCommand")
    private deployContractsCommand: IDeployContractsCommand
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
