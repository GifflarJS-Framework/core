import { container } from "tsyringe";
import CreateContractModelCommandDefault from "./implementations/CreateContractModelCommandDefault";
import { ICreateContractModelCommand } from "./types/ICreateContractModelCommand";

const implementations = {
  default: CreateContractModelCommandDefault,
};

container.registerSingleton<ICreateContractModelCommand>(
  "CreateContractModelCommand",
  implementations.default
);
