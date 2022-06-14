export interface ICreateServiceCommand {
    execute(value: string): Promise<void>;
}
