import { container } from "tsyringe";
import CreateServiceCommandDefault from "./implementations/CreateServiceCommandDefault";
import { ICreateServiceCommand } from "./types/ICreateServiceCommand";

const implementations = {
  default: CreateServiceCommandDefault,
};

container.registerSingleton<ICreateServiceCommand>(
  "CreateServiceCommand",
  implementations.default
);
