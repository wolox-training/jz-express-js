'use strict';

const bcrypt = require('bcryptjs'),
  { encoder, decoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User,
  logger = require('../logger'),
  { validateUser } = require('../middlewares/validations'),
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

exports.session = async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    const signErrors = validateUser(user, ['email', 'password']);

    if (!signErrors.valid) {
      throw error.signInError(signErrors.messages);
    }

    const result = await User.getUserBy({
      email: user.email
    });
    if (!result) throw error.signInError('user not registered');
    return bcrypt.compare(user.password, result.password, (err, validPassword) => {
      if (validPassword) {
        logger.info(`${result.name} logged in.`);
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
    res.json({ users: result.rows, count: result.count, pages });
  } catch (err) {
    next(err);
  }
};
