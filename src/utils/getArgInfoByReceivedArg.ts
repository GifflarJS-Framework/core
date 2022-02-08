import aliasesDictionary from "@config/aliasesDictionary";
import argumentsDictionary from "@config/argumentsDictionary";
import { IArgumentInfo } from "@config/types/IArgumentInfo";

interface IGetArgInfoByReceivedArgDTO {
  receivedArgKey: string;
}

const getArgInfoByReceivedArg = ({
  receivedArgKey,
}: IGetArgInfoByReceivedArgDTO): IArgumentInfo | undefined => {
  const command = aliasesDictionary[receivedArgKey];
  if (!command) return undefined;
  const commandInfo = argumentsDictionary[command];
  if (!commandInfo) return undefined;
  return commandInfo;
};

export { getArgInfoByReceivedArg };
