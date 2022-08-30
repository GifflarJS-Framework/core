import { IGetArgInfoByReceivedArgDTO } from "../dtos/IGetArgInfoByReceivedArgDTO";
import { IDictionaryItemInfo } from "./IDictionaryItemInfo";
export interface IArgumentDictionaryProvider {
    getArgInfoByReceivedArg({ receivedArgKey, }: IGetArgInfoByReceivedArgDTO): IDictionaryItemInfo | undefined;
}
