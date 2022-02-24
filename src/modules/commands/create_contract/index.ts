import { container } from "tsyringe";
import CreateContractCommandDefault from "./implementations/CreateContractCommandDefault";
import { ICreateContractCommand } from "./types/ICreateContractCommand";

const implementations = {
  default: CreateContractCommandDefault,
};

container.registerSingleton<ICreateContractCommand>(
  "CreateContractCommand",
  implementations.default
);
