import { container } from "tsyringe";
import CompileContracts from "./implementations/CompileContracts";
import { ICompileContractsCommand } from "./types/ICompileContractsCommand";

const implementations = {
  default: CompileContracts,
};

container.registerSingleton<ICompileContractsCommand>(
  "CompileContractsCommand",
  implementations.default
);
