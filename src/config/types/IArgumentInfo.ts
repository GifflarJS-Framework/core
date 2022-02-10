export interface IArgumentInfo {
  alias: string[];
  options: string[];
  required: boolean;
  handler: (value: string) => Promise<void>;
}
