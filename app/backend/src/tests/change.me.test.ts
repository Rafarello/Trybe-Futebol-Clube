import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Sinon = require('sinon');

chai.use(chaiHttp);

const { expect } = chai;

// Exemplo de testes com Chai
// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
// https://medium.com/practical-software-testing/api-testing-with-mocha-and-chai-944c2f26c340

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
  it('Será validado que é possível fazer login com sucesso com as informações corretas', async () => {
    const body = { email: 'email@email.com', password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user', 'token');
      });
  });

  describe('Será validado que não é possível fazer login com um email inválido', async () => {
    it('Retornará erro se o email for inválido', async () => {
      const body = { email: 'wrongemail', password: '123456' };
      chai.request(app)
        .post('/login')
        .send(body)
        .end((_err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').equal('Incorrect email or password');
        });
    });

    it('Retornará erro se o email não for string', async () => {
      const body = { email: 123456, password: '123456' };
      chai.request(app)
        .post('/login')
        .send(body)
        .end((_err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').equal('Incorrect email or password');
        });
    });
  });

  describe('Será validado que não é possível fazer login com um password inválido', async () => {
    it('Retornará erro se o password for inválido', async () => {
      const body = { email: 'email@email.com', password: '123' };
      chai.request(app)
        .post('/login')
        .send(body)
        .end((_err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').equal('Incorrect email or password');
        });

    });

    it('Retornará erro se o password não for string', async () => {
      const body = { email: 'email@email.com', password: 123456 };
      chai.request(app)
        .post('/login')
        .send(body)
        .end((_err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').equal('Incorrect email or password');
        });
    });
  });

  it('Será validado que o campo "email" se encontra no corpo da requisição', async () => {
    const body = { email: undefined, password: '123456' };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('All fields must be filled');
      });
  });

  it('Será validado que o campo "password" se encontra no corpo da requisição', async () => {
    const body = { email: 'email@email.com', password: undefined };
    chai.request(app)
      .post('/login')
      .send(body)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('All fields must be filled');
      });
  });
});
