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
export default class ArgumentDictionaryProvider implements IArgumentDictionaryProvider {
    private helpCommand;
    private initCommand;
    private createContractModelCommand;
    private createServiceCommand;
    private writeContractsCommand;
    private compileContractsCommand;
    private deployContractsCommand;
    private argumentsDictionary;
    private aliasesDictionary;
    constructor(helpCommand: IHelpCommand, initCommand: IInitCommand, createContractModelCommand: ICreateContractModelCommand, createServiceCommand: ICreateServiceCommand, writeContractsCommand: IWriteContractsCommand, compileContractsCommand: ICompileContractsCommand, deployContractsCommand: IDeployContractsCommand);
    private registryAlias;
    getArgInfoByReceivedArg({ receivedArgKey, }: IGetArgInfoByReceivedArgDTO): IDictionaryItemInfo | undefined;
}
