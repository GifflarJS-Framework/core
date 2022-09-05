import { container } from "tsyringe";
import DeployContractsCommand from "./implementations/DeployContractsCommand";
import { IDeployContractsCommand } from "./types/IDeployContractsCommand";

const implementations = {
  default: DeployContractsCommand,
};

container.registerSingleton<IDeployContractsCommand>(
  "DeployContractsCommand",
  implementations.default
);
