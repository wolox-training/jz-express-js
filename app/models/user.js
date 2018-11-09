'use strict';

const bcrypt = require('bcryptjs'),
  saltRounds = 10,
  salt = bcrypt.genSaltSync(saltRounds),
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
    return new Promise((resolve, reject) => {
      user.password = bcrypt.hashSync(user.password, salt);
      User.create(user)
        .then(createdUser => {
          resolve(createdUser);
        })
        .catch(err => {
          logger.info(`${user.name} user no created.`);
          logger.error(err);
          if (err.name === 'SequelizeUniqueConstraintError') {
            reject('User already exist');
          }
          reject(err);
        });
    });
  };
  return User;
};
