import { IWriteContractsCommand } from "../types/IWriteContractsCommand";
declare class WriteContractsCommand implements IWriteContractsCommand {
    execute(value: string): Promise<void>;
}
export default WriteContractsCommand;
