# Aprendendo o básico do Gifflar através de tasks

## Contextualização e motivação

**Blockchain**

A blockchain uma tecnologia que oferece uma rede distribuída de nós que seguem um consenso sobre os dados que estão sendo armazenados. É como um banco de dados distribuído que oferece imutabildade dos dados, rastreabilidade e segurança.

**Contratos Inteligentes**

A Ethereum trouxe a possibilidade de criar contratos inteligentes. Os contratos inteligentes são códigos que podem ser executados dentro da rede blockchain e acessados por sistemas tradicionais através de uma API. O Solidity foi a primeira linguagem de desenvolvimento de contratos inteligentes, hoje já existem várias outras, assim como outros tipos de rede blockchain também.

**Web3 e DApps**

A biblioteca mais utilizada para acessar dados da rede blockchain é a Web3. Dependendo do tipo de blockchain, existem outras formas de acesso aos dados. As aplicações que utilizam a blockchain como principal base de dados, são chamadas de DApps.

**Problema**

Desenvolver contratos inteligentes e DApps traz consigo uma complexidade por ser bem diferente dos sistemas tradicionais. Além disso, foi identificado em alguns projetos da literatura que uma ferramenta para gerar contratos de forma dinâmica seria uma boa contribuição que possibilitaria uma evolução mais rápida.

**Solução**

O Gifflar juntou as duas abordagens e criou uma camada de modelagem de contratos via linguagem de programação de sistemas tradicionais. Assim, além de simplificar o desenvolvimento de contratos, também possibilita um sistema gerar diferentes tipos de contratos de forma dinâmica, de acordo com as próprias condições.

## Sobre o Gifflar

O Gifflar é um framework para desenvolvimento de contratos inteligentes via código TypeScript. Ou seja, com ele é possível criar contratos em tempo de execução dinamicamente de acordo com as configurações definidas pelo sistema.

Além disso, também é possível utilizar o Gifflar para desenvolver contratos de forma estática utilizando a modelagem em TypeScript para criação de contratos e sua linha de comandos para criar os modelos e scripts e executar operações.

## Sobre o processo em questão

Aqui está definido um protocolo básico de tasks que direciona você a aprender como usar o Gifflar. Diferente dos outros procedimentos de ensino deste repositório que entregam os nomes das funções que você irá executar e quais os parâmetros, este em questão omite algumas informações para que você mesmo aprenda a encontrar os métodos disponíveis do Gifflar.

É também uma forma de testar como está a usabilidade do framework para que surjam críticas construtivas e, assim, ir evoluindo o Gifflar conforme as necessidades dos próprios usuários.

## Como prosseguir?

Siga as tasks deste protocolo até o final. Se este protocolo está sendo usado como avaliação de usabilidade do framework, recomenda-se:

- Você deve seguir somente este arquivo, sem o apoio a nenhum outro arquivo de documentação do Gifflar. Como suporte você deve usar somente a própria documentação que aparece no editor de texto ao selecionar o nome de um método.
- Utilizar o método de avaliação de usabilidade (UEM) Thinking-aloud para que o condutor consiga ouvir de você qualquer dificuldade ou recomendação que surge enquanto está seguindo o protocolo. Basicamente, qualquer pensamento que você tiver sobre a API do framework durante as tasks pode falar em voz alta.
- Você não precisa saber programar em Solidity para realizar as tasks, somente precisa saber JavaScript. O TypeScript também é opicional.
- O condutor deve interferir o mínimo possível, somente tirando dúvidas de algo que não comprometa a avaliação de usabilidade.
- É interessante gravar a avaliação ao iniciar as tasks.
- Não existe tempo de duração definido, você toma o tempo que necessitar.
- Ao final o condutor pode perguntar informações sobre você e sobre sua impressão em utilizar o framework.

(protocolo baseado em [Piccioni, Marco, Carlo A. Furia, and Bertrand Meyer. "An empirical study of API usability." 2013 ACM/IEEE International Symposium on Empirical Software Engineering and Measurement. IEEE, 2013.](https://ieeexplore.ieee.org/abstract/document/6681333))

# Preparativos

## Requerimentos

- Utilize o VSCode
- Versão do node: 14.x.x

## Instalação

```bash
$ npm install -g git+https://github.com/GifflarJS-Framework/core.git#build
```

## Iniciando um projeto

Use o comando abaixo para iniciar um comando. Sendo que `[path]` é o caminho para a pasta do projeto a ser criada. Caso nenhuma `[path]` seja informada, um projeto Gifflar será criado na pasta atual.

```bash
$ gifflar init [path]
```

Este comando irá iniciar a estrutura de pastas padrão do Gifflar e o arquivo de configuração `gifflarconfig.json` que contém toda a configuração e caminhos das pastas, configurações de rede blockchain e chave privada de endereço blockchain padrão.

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
// Escrito em solidity
string public message;
```

- Crie um evento chamado `MessageUpdated` que será emitido no momento em que a mensagem for alterada. Ele deve receber dois parâmetros: o valor antigo da mensagem e o seu novo valor. Exemplo no Solidity:

```solidity
// Escrito em solidity
event MessageUpdated(string oldMessage, string newMessage);
```

- Crie um construtor para este contrato recebendo como parâmetro um valor inicial para a variável `message`. Exemplo no Solidity:

```solidity
// Escrito em solidity
constructor(string memory _message) public{
  message = _message;
}
```

- Crie também uma função `set` para a variável `message`, para permitir alterar o valor desta variável. Depois da alteração, emita o evento `MessageUpdated`. Exemplo no Solidity:

```solidity
// Escrito em solidity
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

## Task 4: Configurando compilação do contrato

- Uma vez que estamos evitando a linha de comandos do Gifflar, teremos que compilar o contrato dentro deste script (normalmente seria utilizado um comando específico da linha de comandos do Gifflar).

  - Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por compilar o seu modelo de contrato abaixo de `EXECUTE O MÉTODO DE COMPILAÇÃO AQUI`.

## Task 5: Construindo script de implantação na rede blockchain testnet

- Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por implantar o contrato na rede.

  - Utilize o endereço `0xc49d80472ffa30a9a7b1c7b137dd05ff528f4e1d` como o endereço blockchain que fará a implantação do contrato.
  - Insira a chave privada deste endereço no `gifflarconfig.json` em `mainAddressPrivateKey`.
  - Defina o valor do `defaultNetwork` em `gifflarconfig.json` como `bsc_testnet`.

- Chame a função responsável por retornar a instância do contrato implantada na rede e salve dentro da variável chamada `contractInstance`.

- Agora copie e adicione este código ao conteúdo do script em `0_message.ts` a fim de usar a instância de seu contrato do web3 para alterar a mensagem.

```ts
if (contractInstance) {
  // Imprimmindo endereço de contrato
  console.log(
    `Veja seu contrato em: https://testnet.bscscan.com/address/${contractInstance.options.address}`
  );

  // Capturando mensagem inicial
  const message = await contractInstance.methods.message().call();
  console.log(`Mensagem inicial: ${message}`);

  // Alterando mensagem
  const receita = await contractInstance.methods.setMessage().send();
  console.log(
    `Veja sua transação em: https://testnet.bscscan.com/tx/${receita.transactionHash}`
  );

  // Capturando mensagem alterada
  const message = await contractInstance.methods.message().call();
  console.log(`Mensagem alterada: ${message}`);
}
```

- Agora execute o comando abaixo para executar seu script:

```bash
$ gifflar deploy
```
