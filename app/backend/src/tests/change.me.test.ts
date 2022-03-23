/* eslint-disable */
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import Sinon = require('sinon');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import clubsDatabase from './clubsDatabase';

chai.use(chaiHttp);

const { expect } = chai;

// # Exemplo de testes com Chai
//
// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
// https://medium.com/practical-software-testing/api-testing-with-mocha-and-chai-944c2f26c340

// # Exemplo de teste usando Headers com Chai
//
// https://stackoverflow.com/questions/36961197/add-custom-http-headers-to-chai-requests

describe('Desenvolva o endpoint /login no backend de maneira que ele permita o acesso com dados válidos no frontend', function() {
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
  it('Será validado que é possível fazer login com sucesso com as informações corretas', function(done) {
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

describe('Desenvolva o endpoint /login no backend de maneira que ele NÃO permita o acesso com dados inválidos no frontend', function() {
  it('Retornará erro se o email for inválido', function(done) {
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

  it('Retornará erro se o email não for string', function(done) {
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

  it('Retornará erro se o password for inválido', function(done) {
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

  it('Retornará erro se o password não for string', function(done) {
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

describe('Desenvolva o endpoint /login no backend de maneira que ele NÃO permita o acesso com dados faltantes no frontend', function() {
  it('Será validado que o campo "email" se encontra no corpo da requisição', function(done) {
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

  it('Será validado que o campo "password" se encontra no corpo da requisição', function(done) {
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

describe('Desenvolva o endpoint /login/validate no back-end de maneira ele retorne os dados corretamente no front-end', function() {
  it('Será validado que é possível retornar a "role" do usuário com um token válido', function(done) {
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
  it('Será validado que não é possível fazer a requisição com um token inválido', function(done) {
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
  it('Será validado que não é possível fazer a requisição com um token inválido', function(done) {
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

describe('Desenvolva o endpoint /clubs no back-end de forma que ele possa retornar todos os times corretamente', () => {
  it('Será validado se todos os times são listados corretamente', (done) => {
    chai.request(app)
      .get('/clubs')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.be.equal(clubsDatabase);
      });  
      done()
  });
});