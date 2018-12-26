'user strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  nock = require('nock'),
  config = require('../config'),
  { graphqlRequest, createUserMutation } = require('./util/usersQueries'),
  { resCreateUser } = require('./util/mockedResponseApi'),
  url = config.common.trainingApi.url,
  expect = chai.expect;

describe('grahphQlService ', () => {
  describe('test endpoints api with graphQl ', () => {
    it('should created user with out problems', done => {
      const mockedApi = resCreateUser;
      nock(`${url}/users`)
        .post('')
        .reply(201, mockedApi);
      graphqlRequest(createUserMutation).then(response => {
        expect(response).have.status(200);
        expect(response.text).to.be.a('string');
        done();
      });
    });
  });
});
