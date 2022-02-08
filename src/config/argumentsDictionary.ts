import help from "@modules/commands/help";
import { IArgumentsDictionary } from "./types/IArgumentsDictionary";

const argumentsDictionary: IArgumentsDictionary = {
  help: {
    alias: ["-h", "--help"],
    options: [],
    required: false,
    handler: help.execute,
  },
  create: {
    alias: ["-c", "--create"],
    options: ["contract"],
    required: false,
    handler: () => {},
  },
};

export default argumentsDictionary;
