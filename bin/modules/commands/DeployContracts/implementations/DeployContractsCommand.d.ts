import { IDeployContractsCommand } from "../types/IDeployContractsCommand";
declare class DeployContractsCommand implements IDeployContractsCommand {
    execute(value: string): Promise<void>;
}
export default DeployContractsCommand;
