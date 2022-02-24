export interface ICreateContractCommand {
  execute(value: string): Promise<void>;
}
