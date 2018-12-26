'use strict';

const chai = require('chai'),
  server = require('../../app');

const userOne = {
  name: 'sarahi',
  lastName: 'torres',
  email: 'sarahi12hg@wolox.com',
  password: 'woloxwoloA1520'
};

const createUserMutation = {
  query:
    '\nmutation{\ncreateUser(data:{name:"sarahi",lastName:"Torres", email:"sarahitorres@wolox.jp",password:"AquiEAst156xcZ"})\n}'
};

const graphqlRequest = query =>
  chai
    .request(server)
    .post('/')
    .send(query);

module.exports = {
  userOne,
  createUserMutation,
  graphqlRequest
};
