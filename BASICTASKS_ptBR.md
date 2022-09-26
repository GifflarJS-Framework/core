# Aprendendo o básico do Gifflar através de tasks

# Preparativos

## Requerimentos

- Utilize o VSCode
- Versão do node: 14.x.x

## Instalação

```bash
npm install -g git+https://github.com/GifflarJS-Framework/core.git#build
```

## Iniciando um projeto

Use o comando abaixo para iniciar um comando. Sendo que `[path]` é o caminho para a pasta do projeto a ser criada. Caso nenhuma `[path]` seja informada, um projeto Gifflar será criado na pasta atual.

```
$ gifflar init [path]
```

# Tasks

## Task 1: Criando Gifflar Model

Vamos aprender a criar um modelo do zero.

- Para isso, vá até a pasta `src/models` e crie um arquivo com o nome `MessageModel.ts`.
- Agora importe a fábrica para criação do GifflarContract:

```ts
import { createGifflarContract } from "gifflar-library";
```

- Utilize a fábrica para criar um novo Gifflar Contract e nomeie-o de `MessageContract`;

## Task 2: Desenvolvendo Contrato Inteligente com Gifflar Contract Model

- Utilize a API do Gifflar para criar uma variável chamada `message`. Veja um exemplo de como seria a criação desta variável no Solidity:

```solidity
string public message;
```

- Crie um evento chamado `MessageUpdated` que será emitido no momento em que a mensagem for alterada. Ele deve receber dois parâmetros: o valor antigo da mensagem e o seu novo valor. Exemplo no Solidity:

```solidity
event MessageUpdated(string oldMessage, string newMessage);
```

- Crie um construtor para este contrato recebendo como parâmetro um valor inicial para a variável `message`. Exemplo no Solidity:

```solidity
constructor(string memory _message) public{
  message = _message;
}
```

- Crie também uma função `set` para a variável `message`, para permitir alterar o valor desta variável. Depois da alteração, emita o evento `MessageUpdated`. Exemplo no Solidity:

```solidity
function setMessage(string memory _message) public{
  string memory oldMessage = message;
  message = _message;
  emit MessageUpdated(oldMessage, message);
}
```

## Task 3: Criando Gifflar Script para implantação do contrato na blockchain

Vamos agora criar um script para realizar o deploy do contrato na rede blockchain.

- Crie um arquivo chamado `0_message.ts` na pasta `src/scripts`.

- Copie este conteúdo para dentro do arquivo:

```ts
import { IScriptFunctionInputs } from "types-gifflar/modules/commands/DeployContracts/dtos/IScriptFunctionInputs";

export default async ({ contracts }: IScriptFunctionInputs) => {
  const MessageContract = contracts["MessageContract"];

  // EXECUTE AQUI O MÉTODO DE COMPILAÇÃO

  // EXECUTE AQUI O MÉTODO DE IMPLANTAÇÃO

  // EXECUTE AQUI O MÉTODO QUE RETORNA A INSTÂNCIA DO CONTRATO NA REDE
};
```

## Task 4: Compilando Gifflar Contract

- Uma vez que estamos evitando a linha de comandos do Gifflar, teremos que compilar o contrato dentro deste script (normalmente seria utilizado um comando específico da linha de comandos do Gifflar).

  - Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por compilar o seu modelo de contrato abaixo de `EXECUTE O MÉTODO DE COMPILAÇÃO AQUI`.

## Task 5: Implantando Gifflar Contract na rede blockchain testnet

- Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por implantar o contrato na rede.

  - Utilize o endereço `0xc49d80472ffa30a9a7b1c7b137dd05ff528f4e1d` como o endereço blockchain que fará a implantação do contrato.
  - Insira a chave privada deste endereço no `gifflarconfig.json` em `mainAddressPrivateKey`.
  - Defina o valor do `defaultNetwork` em `gifflarconfig.json` como `bsc_testnet`.

- Chame a função responsável por retornar a instância do contrato implantada na rede e salve dentro da variável

- Agora copie este código a fim de usar a instância de seu contrato do web3 para alterar a mensagem.

```ts
  // Imprimmindo endereço de contrato
  console.log(`Veja seu contrato em: https://testnet.bscscan.com/address/${contractInstance?.options.address}`);

  // Capturando mensagem inicial
  const message = await contractInstance?.methods.message().call();
  console.log(`Mensagem inicial: ${message}`);

  // Alterando mensagem
  const receita = await contractInstance?.methods.setMessage().send();
  console.log(`Veja sua transação em: https://testnet.bscscan.com/tx/${receita.transactionHash}`);

  // Capturando mensagem alterada
  const message = await contractInstance?.methods.message().call();
  console.log(`Mensagem alterada: ${message}`);
};
```
