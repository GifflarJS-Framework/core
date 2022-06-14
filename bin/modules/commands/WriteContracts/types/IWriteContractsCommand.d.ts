export interface IWriteContractsCommand {
    execute(value: string): Promise<void>;
}
