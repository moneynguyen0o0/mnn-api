import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { baseUrl } from '../src/config/app';

chai.use(chaiHttp);

describe('Auth', () => {
  describe('POST /v1/auth/login', () => {
    it('should return an token and user object when email and password matches', (done) => {
      const credential = {
        email: 'money@gmail.com',
        password: 'mnn000'
      };

      chai.request(baseUrl)
        .post('/v1/auth/login')
        .send(credential)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('expires');

          done();
        });
    });

    it('should report error when the email and pasword provided is not valid', (done) => {
      const credential = {
        email: 'wrong_email',
        password: 'wrong'
      };

      chai.request(baseUrl)
        .post('/v1/auth/login')
        .send(credential)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');

          done();
        });
    });

    it('should report error when the email provided is not valid', (done) => {
      const credential = {
        email: 'wrong_email@gmail.com',
        password: 'mnn000'
      };

      chai.request(baseUrl)
        .post('/v1/auth/login')
        .send(credential)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');

          done();
        });
    });

    it('should report error when the password provided is not valid', (done) => {
      const credential = {
        email: 'money@gmail.com',
        password: 'wrong_pass'
      };

      chai.request(baseUrl)
        .post('/v1/auth/login')
        .send(credential)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');

          done();
        });
    });
  });
});
