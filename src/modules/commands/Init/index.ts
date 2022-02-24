import { container } from "tsyringe";

import InitCommandDefault from "./implementations/InitCommandDefault";
import { IInitCommand } from "./types/IInitCommand";

const implementations = {
  default: InitCommandDefault,
};

container.registerSingleton<IInitCommand>(
  "InitCommand",
  implementations.default
);
