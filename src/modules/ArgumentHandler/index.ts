import { container } from "tsyringe";
import ArgumentHandlerDefault from "./implementations/ArgumentHandlerDefault";
import { IArgumentHandler } from "./types/IArgumentHandler";

const implementations = {
  default: ArgumentHandlerDefault,
};

container.registerSingleton<IArgumentHandler>(
  "ArgumentHandler",
  implementations.default
);
