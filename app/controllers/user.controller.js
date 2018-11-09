'use strict';

const bcrypt = require('bcryptjs'),
  saltRounds = 10,
  salt = bcrypt.genSaltSync(saltRounds),
  error = require('../errors'),
  logger = require('../logger'),
  User = require('../models').User;

exports.userCreate = (req, res, next) => {
  const user = req.body;

  user.password = bcrypt.hashSync(user.password, salt);

  User.create(user)
    .then(createdUser => {
      logger.info(`User ${createdUser.dataValues.name} created correctly.`);
      res
        .status(201)
        .send('User created Correctly')
        .end();
    })
    .catch(err => {
      logger.info(`${user.name} user no created.`);
      logger.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') {
        next(error.databaseError('User already exist'));
      }
      next(error.databaseError(err));
    });
};
