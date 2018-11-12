'use strict';

const User = require('../models').User;

exports.userCreate = (req, res, next) => {
  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  User.createUser(user)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      next(err);
    });
};
