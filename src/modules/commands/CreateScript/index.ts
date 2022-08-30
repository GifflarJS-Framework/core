import { container } from "tsyringe";
import CreateScriptCommand from "./implementations/CreateScriptCommand";
import { ICreateScriptCommand } from "./types/ICreateScriptCommand";

const implementations = {
  default: CreateScriptCommand,
};

container.registerSingleton<ICreateScriptCommand>(
  "CreateScriptCommand",
  implementations.default
);
