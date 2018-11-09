'use strict';

const error = require('../errors'),
  { validateUser } = require('../middlewares/validations'),
  User = require('../models').User;

exports.userCreate = (req, res, next) => {
  const user = req.body;
  User.createUser(user)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      next(error.databaseError(err));
    });
};
