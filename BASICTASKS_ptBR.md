# Aprendendo o básico do Gifflar através de tasks

## Contextualização e motivação

**Blockchain**

A blockchain é uma tecnologia que oferece uma rede distribuída de nós que seguem um consenso sobre os dados que estão sendo armazenados. É como um banco de dados distribuído que oferece imutabildade dos dados, rastreabilidade e segurança.

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

A partir de agora, pode acessar a pasta do projeto e abrir o VSCode neste diretório.

# Tasks

## Task 1: Criando Gifflar Model

Vamos aprender a criar um modelo do zero.

- Para isso, vá até a pasta `src/models` e crie um arquivo com o nome `MessageModel.ts`.
- Agora importe a fábrica para criação do GifflarContract:

```ts
import { createGifflarContract } from "@gifflar/solgen";
```

- Utilize a função importada para criar um novo Gifflar Contract e nomeie-o de `MessageContract`. Atribua o retorno para uma variável chamada `MessageContract`.

## Task 2: Desenvolvendo Contrato Inteligente com Gifflar Contract Model

- Utilize um método do `MessageContract` para criar uma variável chamada `message`. Veja um exemplo de como seria a criação desta variável no Solidity:

```solidity
// Escrito em solidity
string public message;
```

- Crie um evento chamado `MessageUpdated` que será emitido no momento em que a mensagem for alterada. Utilize o método do `MessageContract` responsável por criar eventos. Ele deve receber dois parâmetros: o valor antigo da mensagem e o seu novo valor. Exemplo no Solidity:

```solidity
// Escrito em solidity
event MessageUpdated(string oldMessage, string newMessage);
```

- Crie um construtor para este contrato recebendo como parâmetro um valor inicial para a variável `message`. E como conteúdo, atribua o valor do atributo para a variável `message`. Exemplo no Solidity:

```solidity
// Escrito em solidity
constructor(string memory _message) public{
  message = _message;
}
```

- Crie também uma função `setMessage` para a variável `message`, para permitir alterar o valor desta variável. Antes da alteração, crie uma variável local chamada `oldMessage` e atribua o valor de `message` para esta variável, lembre de definir a localização de dado `memory` na criação da variável `oldMessage`. Depois da alteração, emita o evento `MessageUpdated`. Exemplo no Solidity:

```solidity
// Escrito em solidity
function setMessage(string memory _message) public{
  string memory oldMessage = message;
  message = _message;
  emit MessageUpdated(oldMessage, message);
}
```

- Agora que o contrato já está modelado, vamos exportar o modelo para que o ambiente Gifflar o encontre. Adicione a exportação no arquivo `MessageModel.ts`:

```ts
export default MessageContract;
```

## Task 3: Criando Gifflar Script para implantação do contrato na blockchain

Vamos agora criar um script para realizar o deploy do contrato na rede blockchain.

- Crie um arquivo chamado `0_message.ts` na pasta `src/scripts`.

- Copie este conteúdo para dentro do arquivo:

```ts
import { IScriptFunctionInputs } from "types-gifflar/modules/commands/DeployContracts/dtos/IScriptFunctionInputs";

export default async ({ contracts }: IScriptFunctionInputs) => {
  const MessageContract = contracts["MessageContract"];

  // DEFINA AQUI O MÉTODO DE ESCRITA

  // DEFINA AQUI O MÉTODO DE COMPILAÇÃO

  // DEFINA AQUI O MÉTODO DE IMPLANTAÇÃO

  // DEFINA AQUI O MÉTODO QUE RETORNA A INSTÂNCIA DO CONTRATO NA REDE

  // COLE AQUI O RESTO DO CONTEÚDO DO SCRIPT
};
```

## Task 4: Configurando escrita e compilação do contrato

- Uma vez que estamos evitando a linha de comandos do Gifflar, teremos que escrever e compilar o código do contrato dentro deste script (normalmente seria utilizado um comando específico da linha de comandos do Gifflar).

  - Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por escrever o código do seu modelo de contrato abaixo de `DEFINA AQUI O MÉTODO DE ESCRITA`.
  - Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por compilar o seu modelo de contrato abaixo de `DEFINA AQUI O MÉTODO DE COMPILAÇÃO`.

## Task 5: Construindo script de implantação na rede blockchain testnet

- Utilize o Gifflar Contract `MessageContract` para chamar o método responsável por implantar o contrato na rede. `Veja que este é um método assíncrono`.

  - Utilize o endereço de carteira `"0xc49d80472ffa30a9a7b1c7b137dd05ff528f4e1d"` como o endereço blockchain que fará a implantação do contrato.
  - Utilize como argumento do construtor do contrato a frase: `"Hello World!"`.
  - Insira a chave privada da carteira no arquivo `gifflarconfig.json` em `mainAddressPrivateKey`, caso ainda não tenha.
  - Agora vamos alterar a rede blockchain utilizada para a implantação do contrato. Veja que em `gifflarconfig.json`, a rede padrão (`defaultNetwork`) está como a rede local `local_network`. Perceba que a chave `networks` contém também a rede de teste da BSC (Binance Smart Chain) configurada, vamos selecioná-la alterando o valor de `defaultNetwork` para `bsc_testnet`.

- Chame o método do `MessageContract` responsável por retornar a instância do contrato implantada na rede e salve dentro da variável chamada `contractInstance`.

- Agora copie e adicione este código abaixo ao conteúdo do script em `0_message.ts` a fim de usar a instância de seu contrato do web3 para alterar a mensagem.

```ts
if (contractInstance) {
  // Imprimindo endereço de contrato
  console.log(
    `Veja seu contrato em: https://testnet.bscscan.com/address/${contractInstance.options.address}`
  );

  // Capturando mensagem inicial
  const initialMessage = await contractInstance.methods.message().call();
  console.log(`Mensagem inicial: ${initialMessage}`);

  // Alterando mensagem
  const receita = await contractInstance.methods
    .setMessage("Hello! I'm using Gifflar!")
    .send({
      from: "0xc49d80472ffa30a9a7b1c7b137dd05ff528f4e1d",
      gas: 3000000,
    });
  console.log(
    `Veja sua transação em: https://testnet.bscscan.com/tx/${receita.transactionHash}`
  );

  // Capturando mensagem alterada
  const updatedMessage = await contractInstance.methods.message().call();
  console.log(`Mensagem alterada: ${updatedMessage}`);
}
```

- Agora execute o comando abaixo no terminal para executar seu script:

```bash
gifflar deploy
```
