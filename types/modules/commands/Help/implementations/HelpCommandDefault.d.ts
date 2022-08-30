import { IHelpCommand } from "../types/IHelpCommand";
declare class HelpCommandDefault implements IHelpCommand {
    execute(value: string): Promise<void>;
}
export default HelpCommandDefault;
