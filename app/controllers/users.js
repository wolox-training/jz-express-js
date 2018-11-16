'use strict';

const bcrypt = require('bcryptjs'),
  { encoder, decoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User,
  error = require('../errors'),
  secret = require('../../config');

exports.userCreate = (req, res, next) => {
  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  return User.createUser(user)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      next(err);
    });
};

exports.session = async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    const result = await User.getUserBy(user.email);
    if (!result) throw error.signInError('user not registered');
    return bcrypt.compare(user.password, result.password, (err, validPassword) => {
      if (validPassword) {
        const token = encoder({ email: result.email });
        res
          .set(AUTHORIZATION, token)
          .status(200)
          .end();
      } else {
        next(error.signInError('Password invalid!'));
      }
    });
  } catch (err) {
    next(err);
  }
};
