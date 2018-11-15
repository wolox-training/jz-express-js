const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  User = require('../app/models').User,
  { createUser, userOne, anotherUser } = require('./util/users'),
  expect = chai.expect;

describe('users', () => {
  describe('/users/ POST', () => {
    it('should create a new user without problems', done => {
      createUser(userOne).then(async res => {
        expect(res).have.status(201);
        const users = await User.find({
          where: {
            name: 'sarahi',
            lastName: 'torres',
            email: 'sarahi12hg@wolox.com'
          }
        });
        expect(users.password).to.not.equal('woloxwoloA1520');
        expect(users.name).to.be.equal('sarahi');
        expect(users.lastName).to.be.equal('torres');
        expect(users.email).to.be.equal('sarahi12hg@wolox.com');
        dictum.chai(res, 'create a new user');
        done();
      });
    });
    it('should fail creation of user because email domain is not valid', done => {
      createUser(anotherUser).catch(err => {
        expect(err).have.status(400);
        expect(err.response).be.json;
        expect(err.response.body).have.property('message');
        expect(err.response.body).have.property('internal_code');
        expect(err.response.body.internal_code).to.equal('saving_error');
        done();
      });
    });
    it('should fail creation of user because password is no correct', done => {
      createUser(anotherUser).catch(err => {
        expect(err).have.status(400);
        expect(err.response).be.json;
        expect(err.response.body).have.property('message');
        expect(err.response.body).have.property('internal_code');
        expect(err.response.body.internal_code).to.equal('saving_error');
        done();
      });
    });
    it('should fail creation of user because some field is empty', done => {
      chai
        .request(server)
        .post('/users')
        .send({
          name: '',
          lastName: 'torres',
          email: '',
          password: ''
        })
        .catch(err => {
          expect(err).have.status(400);
          expect(err.response).be.json;
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('saving_error');
          done();
        });
    });
    it('should fail, email already in use for another user', done => {
      createUser(userOne)
        .then(() => createUser(userOne))
        .catch(err => {
          expect(err).have.status(400);
          expect(err.response).be.json;
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('saving_error');
          done();
        });
    });
  });
});
