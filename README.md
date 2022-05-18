# **Projeto Trybe Futebol Clube :soccer:**

## Projeto com foco de aprendizado em Back-end

## **_Resumo:_** 

###  Foi fornecido um site de uma tabela esportiva de campeonato de futebol construído em React que possui várias páginas, para cada página foi necessário construir uma rota para API para os diversos tipos de requisições necessárias.

## Detalhe das rotas: 

### **Rota de Login:**

#### POST - /login - Requisição que envia o corpo com as informações de login do usuário que possui um middleware de validação. Retorna `200` se as informações estiverem corretas e com status `401` se possuir alguma discordância das informações que o usuário forneceu ou algum dado de entrada mal formatado. O `erro` seguirá como mensagem junto com o status `401`.

#### GET - /login/validate - Rota que faz a verificação da presença do token de autorização no `headers`, na chave `Authorization` retornando status `201` se possuir e `401` caso contrário (não estar com token presente).

### **Rota de Clubs:**

#### GET - /clubs - Retorna status `200` com todos os clubes salvos no banco de dados 

#### GET - /clubs/:id - Retorna status `200` com o clube de id especificado

### **Rota de Matchs:**

#### GET - /matchs - Retorna status `200` com todos os jogos salvos no banco de dados 

#### POST - /matchs- Rota que cria um novo jogo no banco de dados, possui middleware de validação de token de usuário e validação de informações passadas do novo jogo. Se as informações estiverem corretas e o jogo for criado com sucesso, terá um status de retorno `201` com as informações do jogo na resposta, caso contrário um status e uma mensagem de erro constarão na resposta.

#### PATCH - /matchs/:id/finish - Rota que finaliza o jogo com o id especificado. Tem como retorno esperado status `200` e uma mensagem de Ok.

#### PATCH - /matchs/:id - Rota que atualiza o resultado de um jogo com id especificado. Tem como retorno esperado status `200` e uma mensagem de Ok.

### **Rota de Leaderboard:**

#### GET - /leaderboard/home - Retorna status `200` com a tabela de classificação dos times, considerando apenas jogos feitos em **casa** 

#### GET - /leaderboard/away - Retorna status `200` com a tabela de classificação dos times, considerando apenas jogos feitos **fora de casa** 

#### GET - /leaderboard - Retorna status `200` com a tabela de classificação dos times, considerando **todos os jogos**

## **Lista Pré-Requisitos:**

### _**Docker e Docker-compose**_

#### - [x]  Crie os arquivos dockerfile e docker-compose

### **Lista de Requisitos:**

### _**Sequelize**_

#### - [x] 1 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de clubs
#### - [x] 2 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matchs
#### - [x] 3 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de users

### _**Login**_

#### - [x] 4 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivo backend em /src com um mínimo de 7 linhas cobertas
#### - [x] 5 - Desenvolva o endpoint /login no backend de maneira ele permita o acesso com dados válidos no frontend
#### - [x] 6 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivo backend em /src com um mínimo de 19 linhas cobertas
#### - [x] 7 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com um email inválido no frontend
#### - [x] 8 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivo backend em /src com um mínimo de 25 linhas cobertas
#### - [x] 9 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com uma senha inválida no frontend
#### - [x] 10 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivo backend em /src com um mínimo de 35 linhas cobertas
#### - [x] 11 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar um email no frontend
#### - [x] 12 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivo backend em /src com um mínimo de 45 linhas cobertas
#### - [x] 13 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar uma senha no frontend
#### - [x] 14 - Desenvolva o endpoint /login/validate no backend de maneira ele retorne os dados corretamente no frontend
Jogos
#### - [x] 15 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivo backend em /src com um mínimo de 70 linhas cobertas
#### - [x] 16 - Desenvolva o endpoint /clubs no backend de forma que ele possa retornar todos os times corretamente
#### - [x] 17 - Desenvolva o endpoint /clubs/:id no backend de forma que ele possa retornar dados de um time específico
#### - [x] 18 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivo backend em /src com um mínimo de 80 linhas cobertas
#### - [x] 19 - Desenvolva o endpoint /matchs de forma que os dados apareçam corretamente na tela de partidas no frontend
#### - [x] 20 - Desenvolva o endpoint /matchs de forma que seja possível filtrar as partidas em andamento na tela de partidas do frontend
#### - [x] 21 - Desenvolva o endpoint /matchs de forma que seja possível filtrar as partidas finalizadas na tela de partidas do frontend

### **_Adicionar Partidas_**

#### - [x] 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivo backend em /src com um mínimo de 100 linhas cobertas
#### - [x] 23 - Desenvolva a rota /matchs de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
#### - [x] 24 - Desenvolva a rota /matchs/:id/finish de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados
#### - [x] 25 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com times iguais
#### - [x] 26 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com time que não existe na tabela clubs

### **_Editar Partidas_**

#### - [x] 27 - Desenvolva o endpoint /matchs/:id de forma que seja possível atualizar partidas em andamento
#### - [x] 28 - Desenvolva o endpoint /matchs/:id de forma que seja possível finalizar partidas em andamento

**Leaderboards**

### **_Leaderboard Home_**

#### - [x] 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados
#### - [x] 30 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada

### **_Leaderboard away_**

#### - [x] 31 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do frontend com os dados iniciais do banco de dados
#### - [x] 32 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar a classificações dos times quando visitantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada

### **_Leaderboard_**

#### - [x] 33 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend com os dados iniciais do banco de dados

#### - [x] 34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada

#### - [x] 35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada

## Como iniciar o projeto:

#### Primeiro passo: Faça o clone em sua máquina

#### Segundo passo: na pasta raíz, digite no terminal `npm run install:apps`. Esse comando instalará tanto o Front-end quanto o Back-end

#### Terceiro passo: Ir na pasta de Front-end e digitar no terminal `npm run start` para iniciar o servidor do React.

#### Quarto passo: Aqui é apenas um detalhe para configurar o servidor mysql no arquivo de configurações no Back-end na pasta `\backend\src\database\config` ou criar um arquivo .env como o exemplo demonstra

#### Quinto passo: Ir na pasta de Back-end e digitar no terminal `npm run dev` para iniciar a API

## Observações de aprendizado:

#### Nesse projeto, diferente dos outros de construção de APIs Restful, foi utilizado Docker. 

#### Também foi o primeiro projeto com um grau maior de complexidade no tratamento das informações do banco de dados utilizando a ORM Sequelize, principalmente na rota de Clubes e de Tabelas de Classificação.

#### Testes possuem uma estrutura diferente que vi em um tutorial na Digital Ocean, a qual não usa `expect` e sim `should` e preposições como `have`
