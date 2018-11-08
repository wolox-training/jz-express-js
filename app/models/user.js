'use strict';

const logger = require('../logger');
const error = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      underscore: true,
      freezeTableName: true
    }
  );
  User.registerUser = user => {
    return new Promise((resolve, reject) => {
      User.create(user)
        .then(success => {
          resolve(success);
          logger.info(`User ${success.dataValues.name} created correctly.`);
        }, reject)
        .catch(err => {
          reject(err);
          logger.info(`${user.name} user no created.`);
          logger.error(err);
          if (err.name === 'SequelizeUniqueConstraintError') {
            throw error.defaultError(['User already exist']);
          }
          throw error.databaseError(err);
        });
    });
  };
  return User;
};
