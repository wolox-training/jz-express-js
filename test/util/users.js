'use strict';

const chai = require('chai'),
  server = require('../../app');

exports.userOne = {
  name: 'sarahi',
  lastName: 'torres',
  email: 'sarahi12hg@wolox.com',
  password: 'woloxwoloA1520'
};

exports.userWithBadPassword = {
  name: 'sarahi',
  lastName: 'torres',
  email: 'sarahidamaris12hg@woloxi.com',
  password: 'facilfacil'
};

exports.anotherUser = {
  name: 'sarahi',
  lastName: 'torres',
  email: 'sarahidamaris12hg@wolox.com',
  password: 'woloxwoloA1520'
};

exports.adminUser = {
  name: 'damarisTorres',
  lastName: 'palacios',
  email: 'dami@wolox.com',
  password: '$2y$10$2gFqkr3E8D6EGOc06WlbBOqlvLaVsDkNDxN68XXxM2iuLD8HZwD7S',
  roleUser: 'administrator'
};

exports.createUser = user =>
  chai
    .request(server)
    .post('/users')
    .send(user);

exports.login = credentials =>
  chai
    .request(server)
    .post('/users/sessions')
    .send(credentials);
