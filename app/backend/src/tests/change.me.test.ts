import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import Sinon = require('sinon');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import clubsDatabase from './clubsDatabase';
import { leaderboardHomeDefault, leaderboardHomeCustom } from './expectedResults/leaderboard_home';
import { leaderboardAwayDefault, leaderboardAwayCustom } from './expectedResults/leaderboard_away';
import { leaderboardDefault } from './expectedResults/leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

// # Exemplo de testes com Chai
//
// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
// https://medium.com/practical-software-testing/api-testing-with-mocha-and-chai-944c2f26c340

// # Exemplo de teste usando Headers com Chai
//
// https://stackoverflow.com/questions/36961197/add-custom-http-headers-to-chai-requests

describe('Desenvolva o endpoint /login no backend de maneira que ele permita o acesso com dados válidos no frontend', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  // let chaiHttpResponse: Response;
  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });
  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  it('Será validado que é possível fazer login com sucesso com as informações corretas', (done) => {
    const body = { email: 'email@email.com', password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user', 'token');
        done();
      });
  });
});

describe('Desenvolva o endpoint /login no backend de maneira que ele NÃO permita o acesso com dados inválidos no frontend', () => {
  it('Retornará erro se o email for inválido', (done) => {
    const body = { email: 'wrongemail', password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);

        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Incorrect email or password');
        done();
      });
  });

  it('Retornará erro se o email não for string', (done) => {
    const body = { email: 123456, password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Incorrect email or password');
        done();
      });
  });

  it('Retornará erro se o password for inválido', (done) => {
    const body = { email: 'email@email.com', password: '123' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Incorrect email or password');
        done();
      });
  });

  it('Retornará erro se o password não for string', (done) => {
    const body = { email: 'email@email.com', password: 123456 };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Incorrect email or password');
        done();
      });
  });
});

describe('Desenvolva o endpoint /login no backend de maneira que ele NÃO permita o acesso com dados faltantes no frontend', () => {
  it('Será validado que o campo "email" se encontra no corpo da requisição', (done) => {
    const body = { email: undefined, password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('All fields must be filled');
        done();
      });
  });

  it('Será validado que o campo "password" se encontra no corpo da requisição', (done) => {
    const body = { email: 'email@email.com', password: undefined };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('All fields must be filled');
        done();
      });
  });
});

describe('Desenvolva o endpoint /login/validate no back-end de maneira ele retorne os dados corretamente no front-end', () => {
  it('Será validado que é possível retornar a "role" do usuário com um token válido', (done) => {
    const body = { email: 'email@email.com', password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user', 'token');
        const { token } = res.body;
        chai.request(app)
          .get('/login/validate')
          .set('Authorization', token)
          .end((_err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.should.be.equal('admin');
          });
        done();
      });
  });
  it('Será validado que não é possível fazer a requisição com um token inválido', (done) => {
    chai.request(app)
      .get('/login/validate')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjQ3ODk5NDMzfQ')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('string');
        res.body.should.be.equal('Invalid Token');
        done();
      });
  });
  it('Será validado que não é possível fazer a requisição com um token inválido', (done) => {
    chai.request(app)
      .get('/login/validate')
      .set('Authorization', '123.456.789')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        res.body.should.be.equal('Invalid Token');
        done();
      });
  });
});

describe('Desenvolva o endpoint /clubs no back-end de forma que ele possa retornar todos os times corretamente', function () {
  it('Será validado se todos os times são listados corretamente', function (done) {
    chai.request(app)
      .get('/clubs')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.be.equal(clubsDatabase);
        done();
      });
    });
});

describe('Desenvolva o endpoint /clubs/:id no back-end de forma que ele possa retornar o time especificado corretamente', function () {
  const clubId14 = {
    id: 14,
    clubName: 'Santos',
  };

  it('Será validado se o time especificado será listado corretamente', function (done) {
    chai.request(app)
      .get('/clubs/14')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.equal(clubId14);
        done();
      });
  });
});

describe('Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados', function () {

  it('Será validado que os times serão listados corretamente', function (done) {
    chai.request(app)
      .get('/leaderboard/home')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar a classificações dos times quando visitantes na tela de classificação do frontend com os dados iniciais do banco de dados', function () {

  it('Será validado que os times serão listados corretamente', function (done) {
    chai.request(app)
      .get('/leaderboard/away')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificações dos times na tela de classificação do frontend com os dados iniciais do banco de dados', function () {

  it('Será validado que os times serão listados corretamente', function (done) {
    chai.request(app)
      .get('/leaderboard/')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('Desenvolva o endpoint GET /matchs para validar os dados iniciais do banco de dados', function () {

  it('Será validado que os times serão listados corretamente', function (done) {
    chai.request(app)
      .get('/matchs/')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('Desenvolva o endpoint POST /matchs para validar os dados da nova partida e inserir com sucesso', function () {

  it('Será validado que os times serão listados corretamente', function (done) {
    const body = {
      homeTeam: 3,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
      inProgress: true
    }

    chai.request(app)
      .post('/matchs/')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('homeTeam');
        res.body.should.have.property('awayTeam');
        res.body.should.have.property('homeTeamGoals');
        res.body.should.have.property('awayTeamGoals');
        res.body.should.have.property('inProgress');
        res.body.should.have.property('inProgress').equal(true)
        done();
      });
  });
});
