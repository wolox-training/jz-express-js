'use strict';

const jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  User = require('../models').User,
  error = require('../errors'),
  config = require('../../config');

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

const giveToken = req => {
  const token = jwt.sign(
    {
      mail: req.email
    },
    config.common.session.secret
  );
  return token;
};

exports.sesion = async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    const result = await User.getUserBy(user.email);
    if (!result) throw error.signInError('user not registered');
    return bcrypt.compare(user.password, result.password, (err, validPassword) => {
      if (validPassword) {
        const token = giveToken(user);
        const AUTHORIZATION = config.common.session.header_name;
        res
          .set(AUTHORIZATION, token)
          .send(`x-access-token ${token}`)
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
