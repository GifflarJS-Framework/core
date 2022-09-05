export interface ICreateScriptCommand {
  execute(value: string): Promise<void>;
}
