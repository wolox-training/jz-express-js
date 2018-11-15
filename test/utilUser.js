'use strict';

const chai = require('chai'),
  server = require('../app');

exports.userOne = {
  name: 'sarahi',
  lastName: 'torres',
  email: 'sarahi12hg@wolox.com',
  password: 'woloxwoloA1520'
};

exports.anotherUser = {
  name: 'sarahi',
  lastName: 'torres',
  email: 'sarahidamaris12hg@woloxi.com',
  password: 'woloxwoloA1520'
};

exports.createUser = user =>
  chai
    .request(server)
    .post('/users/')
    .send(user);