import { container } from "tsyringe";
import WriteContractsCommand from "./implementations/WriteContractsCommand";
import { IWriteContractsCommand } from "./types/IWriteContractsCommand";

const implementations = {
  default: WriteContractsCommand,
};

container.registerSingleton<IWriteContractsCommand>(
  "WriteContractsCommand",
  implementations.default
);
