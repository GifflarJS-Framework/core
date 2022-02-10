import HelpCommand from "@modules/commands/help";
import CreateContractCommand from "@modules/commands/create_contract";
import { IArgumentsDictionary } from "./types/IArgumentsDictionary";
const help = new HelpCommand();
const createContractCommand = new CreateContractCommand();

const argumentsDictionary: IArgumentsDictionary = {
  help: {
    alias: ["-h", "--help"],
    options: [],
    required: false,
    handler: help.execute,
  },
  "make:contract": {
    alias: ["-m:contract", "--make:contract"],
    options: [],
    required: false,
    handler: createContractCommand.execute,
  },
};

export default argumentsDictionary;
