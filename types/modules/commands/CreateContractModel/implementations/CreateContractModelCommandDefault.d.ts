import { ICreateContractModelCommand } from "../types/ICreateContractModelCommand";
declare class CreateContractModelCommandDefault implements ICreateContractModelCommand {
    execute(value: string): Promise<void>;
}
export default CreateContractModelCommandDefault;
