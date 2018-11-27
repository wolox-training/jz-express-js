'user strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  nock = require('nock'),
  server = require('./../app'),
  config = require('../config'),
  { createUser, login, userOne } = require('./util/users'),
  url = `${config.common.albumsApi.url}/albums`,
  { albums } = require('./util/albumsMocker'),
  expect = chai.expect;

describe('albums', () => {
  describe('/albums/ GET', () => {
    it('should list albums without problems because are loged', done => {
      nock(url)
        .get('')
        .reply(200, albums);
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .get('/albums')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .then(result => {
              expect(result).have.status(200);
              expect(result).be.json;
              expect(result).to.be.a('object');
              expect(result.body.length).to.equal(albums.length);
              expect(result.body[3]).have.property('userId');
              expect(result.body[3].userId).to.be.equal(1);
              expect(result.body[3].title).to.be.equal('non esse culpa molestiae omnis sed optio');
              dictum.chai(result, 'get albums');
              done();
            });
        });
      });
    });

    it('should fail list albums because the service fail', done => {
      nock(url)
        .get('')
        .reply(404);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .get('/albums')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .catch(err => {
              expect(err).have.status(404);
              done();
            });
        });
      });
    });

    it('should fail list albums because token is no sent or the  user is not logged', done => {
      chai
        .request(server)
        .get('/albums')
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
});
