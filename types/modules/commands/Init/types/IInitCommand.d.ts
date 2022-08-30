export interface IInitCommand {
    execute(_path: string | undefined): Promise<void>;
}
