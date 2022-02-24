import { container } from "tsyringe";
import HelpCommandDefault from "./implementations/HelpCommandDefault";
import { IHelpCommand } from "./types/IHelpCommand";

const implementations = {
  default: HelpCommandDefault,
};

container.registerSingleton<IHelpCommand>(
  "HelpCommand",
  implementations.default
);
