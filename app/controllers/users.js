'use strict';

const bcrypt = require('bcryptjs'),
  { encoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User,
  logger = require('../logger'),
  error = require('../errors');

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

exports.signIn = async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    const userExist = await User.getUserBy({
      email: user.email
    });
    if (!userExist) throw error.signInError('user not registered');
    return bcrypt.compare(user.password, userExist.password, (err, validPassword) => {
      if (validPassword) {
        logger.info(`${userExist.name} logged in.`);
        const token = encoder({ email: userExist.email });
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

exports.userList = async (req, res, next) => {
  const query = req.query
    ? {
        page: req.query.page || 1,
        count: req.query.count || 10
      }
    : {};

  try {
    query.offset = parseInt(query.count * (query.page - 1));

    const result = await User.getAllUserBy(query.count, query.offset),
      pages = Math.ceil(result.count / query.count);
    res.send({ users: result.rows, count: result.count, pages });
  } catch (err) {
    next(err);
  }
};
