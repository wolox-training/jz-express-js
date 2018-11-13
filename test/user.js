const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  User = require('../app/models').User,
  expect = chai.expect,
  should = chai.should();

describe('users', () => {
  describe('/users/ POST', () => {
    it('should create a new user without problems', done => {
      chai
        .request(server)
        .post('/users/')
        .send({
          name: 'sarahi',
          lastName: 'torres',
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        })
        .then(async res => {
          res.should.have.status(201);
          const users = await User.find({
            where: {
              name: 'sarahi',
              lastName: 'torres',
              email: 'sarahi12hg@wolox.com'
            }
          });

          expect(users).to.be.a('object');
          expect(users.password).to.not.equal('woloxwolox1520');
          expect(users.name).to.be.equal('sarahi');
          expect(users.lastName).to.be.equal('torres');
          expect(users.email).to.be.equal('sarahi12hg@wolox.com');
          dictum.chai(res, 'create a new user');
          done();
        });
    });
    it('should fail creation of user because email domain is not valid', done => {
      chai
        .request(server)
        .post('/users/')
        .send({
          name: 'sarahi',
          lastName: 'torres',
          email: 'sarahi12hg@woloxi.com',
          password: 'woloxwoloA1520'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('saving_error');
          done();
        });
    });

    it('should fail creation of   user because password is no correct', done => {
      chai
        .request(server)
        .post('/users/')
        .send({
          name: 'sarahi',
          lastName: 'torres',
          email: 'sarahi12hg@wolox.com',
          password: 'facilfacil'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('saving_error');
          done();
        });
    });

    it('should fail creation of   user because some field is empty', done => {
      chai
        .request(server)
        .post('/users/')
        .send({
          name: '',
          lastName: 'torres',
          email: '',
          password: ''
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('saving_error');
          done();
        });
    });
    it('should fail, email already in use for another user', done => {
      chai
        .request(server)
        .post('/users/')
        .send({
          name: 'sarahi',
          lastName: 'torres',
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        })
        .then(() => {
          return chai
            .request(server)
            .post('/users/')
            .send({
              name: 'sarahi',
              lastName: 'torres',
              email: 'sarahi12hg@wolox.com',
              password: 'woloxwoloA1520'
            });
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('saving_error');
          done();
        });
    });
  });
});
