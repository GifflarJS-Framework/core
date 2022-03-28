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
      "  make:contract, --make:contract, -m:contract \t Make a new Gifflar Contract. Required a file name as argument."
    );
  }
}
export default HelpCommandDefault;
