'use strict';

const bcrypt = require('bcryptjs'),
  saltRounds = 10,
  salt = bcrypt.genSaltSync(saltRounds),
  error = require('../errors'),
  User = require('../models').User;

exports.userCreate = (req, res) => {
  const user = req.body;

  user.password = bcrypt.hashSync(user.password, salt);

  User.registerUser(user).then(
    userCreated => {
      return res.json(userCreated);
    },
    err => {
      return res.json(err).status(500);
    }
  );
};
