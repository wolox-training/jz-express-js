'use strict';

const bcrypt = require('bcryptjs'),
  saltRounds = 10,
  salt = bcrypt.genSaltSync(saltRounds),
  errors = require('../errors'),
  logger = require('../logger');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  User.createUser = user => {
    user.password = bcrypt.hashSync(user.password, salt);
    return User.create(user)
      .then(createdUser => {
        logger.info(`User ${createdUser.dataValues.name} created correctly.`);
      })
      .catch(err => {
        logger.info(`${user.name} user no created.`);
        logger.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          throw errors.savingError('User already exist');
        }
        throw errors.databaseError(err);
      });
  };

  User.getUserBy = param =>
    User.findOne({
      where: param
    }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.getAllUserBy = (limit, offset) =>
    User.findAndCountAll({
      attributes: ['name', 'lastName', 'email'],
      offset,
      limit
    }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  return User;
};
