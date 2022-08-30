import { INetworkConfig } from "./INetworkConfig";
export interface IConfigFile {
    projectName: string;
    root: string;
    modelsFolder: string;
    contractsFolder: string;
    servicesFolder: string;
    compileFolder: string;
    scriptsFolder: string;
    appKey: string;
    defaultNetwork: string;
    mainAddressPrivateKey: string;
    networks: Array<INetworkConfig>;
}
