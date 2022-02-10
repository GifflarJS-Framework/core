interface IAlias {
  [x: string]: string;
}

interface IAliasRegistryDTO {
  baseArg: string;
  aliases: string[];
}

export interface IAliasDictionary {
  [x: string]: string;
}

const registryAlias = ({ baseArg, aliases }: IAliasRegistryDTO) => {
  const object: IAlias = {};
  object[baseArg] = baseArg;
  aliases.map((alias: string) => {
    object[alias] = baseArg;
  });

  return object;
};

// DICTIONARY
const aliasesDictionary: IAliasDictionary = {
  ...registryAlias({
    baseArg: "help",
    aliases: ["-h", "--help"],
  }),
  ...registryAlias({
    baseArg: "make:contract",
    aliases: ["-m", "--make:contract"],
  }),
};

export default aliasesDictionary;
