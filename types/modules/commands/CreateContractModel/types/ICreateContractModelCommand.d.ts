export interface ICreateContractModelCommand {
    execute(value: string): Promise<void>;
}
