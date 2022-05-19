import { IHelpCommand } from "../types/IHelpCommand";

class HelpCommandDefault implements IHelpCommand {
  async execute(value: string): Promise<void> {
    console.log("Usage:");
    console.log(" command [arguments] [options]");

    console.log("\nAvailable Commands");
    console.log(
      " help, --help, -h                           \t Show all the Gifflar available commands."
    );
    console.log(
      " init, --init                               \t Initializes the Gifflar configuration file."
    );
    console.log(" make");
    console.log(
      "  make:model, --make:model, -m:model        \t Make a new Gifflar Contract Model. Required a file name as argument."
    );
    console.log(
      "  make:service, --make:service, -m:service \t Make a new Gifflar Service. Required a file name as argument."
    );
    console.log(
      " write                                      \t Writes the code of the contracts in contracts folder. It subscribes old versions."
    );
  }
}
export default HelpCommandDefault;
