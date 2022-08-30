import { ICreateServiceCommand } from "../types/ICreateServiceCommand";
declare class CreateServiceCommandDefault implements ICreateServiceCommand {
    execute(value: string): Promise<void>;
}
export default CreateServiceCommandDefault;
