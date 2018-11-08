'use strict';

const bcrypt = require('bcryptjs'),
  saltRounds = 10,
  salt = bcrypt.genSaltSync(saltRounds),
  error = require('../errors'),
  User = require('../models').User;

exports.userCreate = (req, res, next) => {
  const user = req.body;

  try {
    user.password = bcrypt.hashSync(user.password, salt);
    User.registerUser(user).then(
      userCreated => {
        return res.status(201).json(userCreated);
      },
      err => {
        return res.json(err).status(500);
      }
    );
  } catch (err) {
    next(error.databaseError(err));
  }
};
