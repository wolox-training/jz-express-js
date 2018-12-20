'user strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  nock = require('nock'),
  server = require('./../app'),
  config = require('../config'),
  {
    createUser,
    login,
    mutationAlbumDelete,
    albumCreatedApi,
    mutationCreateAlbum,
    userOne
  } = require('./util/usersQueries'),
  { resCreateUser } = require('./util/mockedResponseApi'),
  url = config.common.trainingApi.url,
  expect = chai.expect;

describe('grahphQlService ', () => {
  describe('test endpoints api with graphQl ', () => {
    it('should created user with out problems', done => {
      const [mockedApi] = createUser;

      nock(`${url}/users`)
        .get('')
        .reply(201, mockedApi);
      createUser(userOne).then(res => {
        expect(res).have.status(201);
        expect(res.body.data).to.equal('');
        done();
      });
    });

    it('should deleted with graphql the album purchased without problems because user is logged and and he has the albums', done => {
      const [mockedAlbum] = createUser;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      login({
        email: 'dami@wolox.com',
        password: 'woloxwoloA152022'
      }).then(res => {
        chai
          .request(server)
          .post('/albums/1')
          .set(config.common.session.header_name, res.headers[config.common.session.header_name])
          .send()
          .then(() => {
            chai
              .request(server)
              .post('/graph-albums')
              .set(config.common.session.header_name, res.headers[config.common.session.header_name])
              .send(mutationAlbumDelete(1))
              .then(async result => {
                expect(result).have.status(200);
                expect(result.body.data.deleteAlbum).to.equal('Album  is deleted');

                done();
              });
          });
      });
    });

    it('should fail delete with graphql the album because user does not have this album', done => {
      const [mockedAlbum] = createUser;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      login({
        email: 'dami@wolox.com',
        password: 'woloxwoloA152022'
      }).then(res => {
        chai
          .request(server)
          .post('/albums/1')
          .set(config.common.session.header_name, res.headers[config.common.session.header_name])
          .send()
          .then(() => {
            chai
              .request(server)
              .post('/graph-albums')
              .set(config.common.session.header_name, res.headers[config.common.session.header_name])
              .send(mutationAlbumDelete(6))
              .then(result => {
                expect(result).have.status(200);
                expect(result.body.errors[0].message).to.equal('Album not found');
                expect(result.body.errors[0].statusCode).to.equal(404);
                done();
              });
          });
      });
    });
  });

  describe('create Album with graphql', () => {
    it('should create album with graphql without problems because user is logged ', done => {
      nock(`${url}`)
        .persist()
        .post('')
        .reply(200, albumCreatedApi);

      login({
        email: 'dami@wolox.com',
        password: 'woloxwoloA152022'
      }).then(res => {
        chai
          .request(server)
          .post('/graph-albums')
          .set(config.common.session.header_name, res.headers[config.common.session.header_name])
          .send(mutationCreateAlbum)
          .then(result => {
            expect(result).have.status(200);
            done();
          });
      });
    });
    it('should fail create album with graphql because user is not logged ', done => {
      nock(`${url}`)
        .persist()
        .post('')
        .reply(200, albumCreatedApi);

      chai
        .request(server)
        .post('/graph-albums')
        .send(mutationCreateAlbum)
        .catch(err => {
          expect(err).have.status(401);
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('authorization_error');
          done();
        });
    });
  });
});
