import { ICompileContractsCommand } from "../types/ICompileContractsCommand";
declare class CompileContracts implements ICompileContractsCommand {
    execute(value: string): Promise<void>;
}
export default CompileContracts;
