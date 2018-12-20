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
      const [mockedApi] = resCreateUser;

      nock(`${url}/`)
        .get('')
        .reply(201, mockedApi);
      createUser(userOne).then(res => {
        expect(res).have.status(201);
        expect(res.body.data).to.equal('');
        done();
      });
    });
  });
});
