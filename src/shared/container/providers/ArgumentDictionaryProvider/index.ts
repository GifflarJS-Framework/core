import { container } from "tsyringe";
import ArgumentDictionaryProvider from "./implementations/ArgumentDictionaryProvider";
import { IArgumentDictionaryProvider } from "./types/IArgumentDictionaryProvider";

const providers = {
  default: ArgumentDictionaryProvider,
};

container.registerSingleton<IArgumentDictionaryProvider>(
  "ArgumentDictionaryProvider",
  providers.default
);
