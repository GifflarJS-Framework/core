export interface IDeployContractsCommand {
    execute(value: string): Promise<void>;
}
