export interface IHelpCommand {
    execute(value: string): Promise<void>;
}
