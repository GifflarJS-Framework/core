import { IInitCommand } from "../types/IInitCommand";
declare class InitCommandDefault implements IInitCommand {
    execute(_path: string | undefined): Promise<void>;
}
export default InitCommandDefault;
