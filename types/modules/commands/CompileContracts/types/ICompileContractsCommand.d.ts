export interface ICompileContractsCommand {
    execute(value: string): Promise<void>;
}
