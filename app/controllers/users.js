'use strict';

const error = require('../errors'),
  User = require('../models').User;

exports.userCreate = (req, res, next) => {
  User.createUser(req.body)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      next(error.databaseError(err));
    });
};
