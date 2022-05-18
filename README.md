# **Projeto Trybe Futebol Clube :soccer:**

  ## Projeto com foco de aprendizado em Back-end

## **_Resumo:_** 

###  Foi fornecido um site de uma tabela esportiva de campeonato de futebol, construído em React e com várias páginas. Para cada página foi necessário construir uma rota para API para os diversos tipos de requisições necessárias.

Segue abaixo a lista de requisitos e detalhes das rotas da API:

**Lista Pré-Requisitos:**

_**Docker e Docker-compose**_

- [x]  Crie os arquivos dockerfile e docker-compose

**Lista de Requisitos:**

_**Sequelize**_

- [x] 1 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de clubs
- [x] 2 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matchs
- [x] 3 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de users

_**Login**_

- [x] 4 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivo backend em /src com um mínimo de 7 linhas cobertas
- [x] 5 - Desenvolva o endpoint /login no backend de maneira ele permita o acesso com dados válidos no frontend
- [x] 6 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivo backend em /src com um mínimo de 19 linhas cobertas
- [x] 7 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com um email inválido no frontend
- [x] 8 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivo backend em /src com um mínimo de 25 linhas cobertas
- [x] 9 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com uma senha inválida no frontend
- [x] 10 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivo backend em /src com um mínimo de 35 linhas cobertas
- [x] 11 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar um email no frontend
- [x] 12 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivo backend em /src com um mínimo de 45 linhas cobertas
- [x] 13 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar uma senha no frontend
- [x] 14 - Desenvolva o endpoint /login/validate no backend de maneira ele retorne os dados corretamente no frontend
Jogos
- [x] 15 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivo backend em /src com um mínimo de 70 linhas cobertas
- [x] 16 - Desenvolva o endpoint /clubs no backend de forma que ele possa retornar todos os times corretamente
- [x] 17 - Desenvolva o endpoint /clubs/:id no backend de forma que ele possa retornar dados de um time específico
- [x] 18 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivo backend em /src com um mínimo de 80 linhas cobertas
- [x] 19 - Desenvolva o endpoint /matchs de forma que os dados apareçam corretamente na tela de partidas no frontend
- [x] 20 - Desenvolva o endpoint /matchs de forma que seja possível filtrar as partidas em andamento na tela de partidas do frontend
- [x] 21 - Desenvolva o endpoint /matchs de forma que seja possível filtrar as partidas finalizadas na tela de partidas do frontend

**_Adicionar Partidas_**

- [x] 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivo backend em /src com um mínimo de 100 linhas cobertas
- [x] 23 - Desenvolva a rota /matchs de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
- [x] 24 - Desenvolva a rota /matchs/:id/finish de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados
- [x] 25 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com times iguais
- [x] 26 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com time que não existe na tabela clubs

**_Editar Partidas_**

- [x] 27 - Desenvolva o endpoint /matchs/:id de forma que seja possível atualizar partidas em andamento
- [x] 28 - Desenvolva o endpoint /matchs/:id de forma que seja possível finalizar partidas em andamento

**Leaderboards**

**_Leaderboard Home_**

- [x] 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados
- [x] 30 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada

**_Leaderboard away_**

- [x] 31 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do frontend com os dados iniciais do banco de dados
- [x] 32 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar a classificações dos times quando visitantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada

**_Leaderboard_**

- [x] 33 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend com os dados iniciais do banco de dados

- [x] 34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada

- [x] 35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada




## Detalhe das rotas: 


