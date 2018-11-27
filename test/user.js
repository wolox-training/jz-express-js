const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  User = require('../app/models').User,
  { createUser, login, userOne, userWithBadPassword, anotherUser } = require('./util/users'),
  config = require('../config'),
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
      createUser(userWithBadPassword).catch(err => {
        expect(err).have.status(400);
        expect(err.response).be.json;
        expect(err.response.body).have.property('message');
        expect(err.response.body).have.property('internal_code');
        expect(err.response.body.internal_code).to.equal('saving_error');
        done();
      });
    });
    it('should fail creation of user because password is no correct', done => {
      createUser(userWithBadPassword).catch(err => {
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

  describe('/users/sessions/ POST', () => {
    it('should login an user without problems', done => {
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          expect(res).have.status(200);
          dictum.chai(res, 'login an user');
          done();
        });
      });
    });

    it('should fail login a user because the email is not registered', done => {
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hgh@wolox.com',
          password: 'woloxwoloA1520'
        }).catch(err => {
          expect(err).have.status(400);
          expect(err.response).be.json;
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('signin_error');
          done();
        });
      });
    });

    it('should fail login an user because password is not valid', done => {
      login({
        email: 'sarahi12hg@wolox.com',
        password: 'woloxwoloA152022'
      }).catch(err => {
        expect(err).have.status(400);
        expect(err.response).be.json;
        expect(err.response.body).have.property('message');
        expect(err.response.body).have.property('internal_code');
        expect(err.response.body.internal_code).to.equal('signin_error');
        done();
      });
    });

    it('should fail login an user because email is not valid', done => {
      login({
        email: 'sarahi12hg@wolo.com',
        password: 'woloxwoloA1520'
      }).catch(err => {
        expect(err).have.status(400);
        expect(err.response).be.json;
        expect(err.response.body).have.property('message');
        expect(err.response.body).have.property('internal_code');
        expect(err.response.body.internal_code).to.equal('signin_error');
        done();
      });
    });
  });

  describe('/users GET', () => {
    it('should list all users by pagination without problems because are loged', done => {
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .get('/users?count=1&page=1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .then(result => {
              expect(result).have.status(200);
              expect(result.body.count).to.be.equal(1);
              expect(result.body.pages).to.be.equal(1);
              dictum.chai(result, 'get all user with pagination');
              done();
            });
        });
      });
    });

    it('should fail list all users by pagination because token is no sent sent', done => {
      chai
        .request(server)
        .get('/users?count=1&page=1')
        .catch(err => {
          expect(err).have.status(401);
          expect(err.response).be.json;
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('authorization_error');
          done();
        });
    });
  });

  describe('/admin/users/ POST', () => {
    it('should fail because is not an admin requester', done => {
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/admin/users')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send(anotherUser)
            .catch(err => {
              expect(err).have.status(401);
              done();
            });
        });
      });
    });

    it('should signup an admin user without problems because the requester is admin', done => {
      const admin = new User({
        name: 'damarisTorres',
        lastName: 'palacios',
        email: 'dami@wolox.com',
        password: '$2y$10$2gFqkr3E8D6EGOc06WlbBOqlvLaVsDkNDxN68XXxM2iuLD8HZwD7S',
        roleUser: 'administrator'
      });

      admin.save().then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .post('/admin/users')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send(anotherUser)
            .then(async result => {
              expect(result).have.status(201);

              const users = await User.find({
                where: {
                  name: 'sarahi',
                  lastName: 'torres',
                  email: 'sarahidamaris12hg@wolox.com'
                }
              });

              expect(users.password).to.not.equal('woloxwoloA1520');
              expect(users.name).to.be.equal('sarahi');
              expect(users.email).to.be.equal('sarahidamaris12hg@wolox.com');
              expect(users.roleUser).to.be.equal('administrator');
              dictum.chai(result, 'create a new admin user');
              done();
            });
        });
      });
    });

    it('should update an regular user without problems because the requester is admin', done => {
      const admin = new User({
        name: 'damarisTorres',
        lastName: 'palacios',
        email: 'dami@wolox.com',
        password: '$2y$10$2gFqkr3E8D6EGOc06WlbBOqlvLaVsDkNDxN68XXxM2iuLD8HZwD7S',
        roleUser: 'administrator'
      });

      createUser(anotherUser).then(() => {
        admin.save().then(() => {
          login({
            email: 'dami@wolox.com',
            password: 'woloxwoloA152022'
          }).then(async res => {
            chai
              .request(server)
              .post('/admin/users')
              .set(config.common.session.header_name, res.headers[config.common.session.header_name])
              .send(anotherUser)
              .then(async result => {
                expect(result).have.status(201);
                const users = await User.find({
                  where: {
                    name: 'sarahi',
                    lastName: 'torres',
                    email: 'sarahidamaris12hg@wolox.com'
                  }
                });
                expect(users.password).to.not.equal('woloxwoloA1520');
                expect(users.name).to.be.equal('sarahi');
                expect(users.email).to.be.equal('sarahidamaris12hg@wolox.com');
                expect(users.roleUser).to.be.equal('administrator');
                done();
              });
          });
        });
      });
    });
  });
});
