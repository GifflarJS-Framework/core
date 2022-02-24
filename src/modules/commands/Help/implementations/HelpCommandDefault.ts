import { IHelpCommand } from "../types/IHelpCommand";

class HelpCommandDefault implements IHelpCommand {
  async execute(value: string): Promise<void> {
    console.log("Help");
  }
}
export default HelpCommandDefault;
