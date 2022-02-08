export interface IArgumentInfo {
  alias: string[];
  options: string[];
  required: boolean;
  handler: () => void;
}
