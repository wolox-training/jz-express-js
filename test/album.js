'user strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  nock = require('nock'),
  server = require('./../app'),
  config = require('../config'),
  { createUser, login, userOne } = require('./util/users'),
  url = `${config.common.albumsApi.url}/albums`,
  { albums } = require('./util/albumsMocker'),
  Album = require('../app/models').Album,
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
  describe('/albums/:id POST', () => {
    it('should order an albums without problems because are loged', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send({
              id: res.body.id
            })
            .then(async result => {
              const album = await Album.find({
                where: {
                  albumId: 1,
                  userId: 1
                }
              });
              expect(album).to.be.a('object');
              expect(album.albumId).to.be.equal(1);
              expect(album.userId).to.be.equal(1);
              dictum.chai(result, 'buy an album');
              done();
            });
        });
      });
    });

    it('should fail because try to buy multiples times same album', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              nock(`${url}/1`)
                .get('')
                .reply(200, mockedAlbum);

              chai
                .request(server)
                .post('/albums/1')
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .send()
                .catch(err => {
                  expect(err).have.status(400);
                  expect(err.response).be.json;
                  expect(err.response.body).have.property('message');
                  expect(err.response.body).have.property('internal_code');
                  expect(err.response.body.internal_code).to.equal('album_order_error');
                  done();
                });
            });
        });
      });
    });

    it('should fail because the album is not found', done => {
      nock(`${url}/41`)
        .get('')
        .reply(404, 'missing album');

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/41')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .catch(err => {
              expect(err.response.body.message).to.be.equal('connection failed');
              expect(err).have.status(503);
              done();
            });
        });
      });
    });

    it('should fail order an albums because the service fail', done => {
      nock(`${url}/1`)
        .get('')
        .reply(503);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .catch(err => {
              expect(err).have.status(503);
              done();
            });
        });
      });
    });

    it('should fail order an album because token is no sent or user is no loged', done => {
      chai
        .request(server)
        .post('/albums/1')
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
