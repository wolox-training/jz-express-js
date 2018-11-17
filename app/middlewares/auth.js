const jwt = require('jsonwebtoken'),
  secret = require('../../config'),
  error = require('../errors'),
  { decoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User;

const getUser = async auth => {
  const user = decoder(auth),
    result = await User.getUserBy({
      email: user.email
    });
  return result;
};

const roleUser = {
  ADMINISTRATOR: 'administrator',
  REGULAR: 'regular'
};

exports.verifyToken = async (req, res, next) => {
  const auth = req.headers[AUTHORIZATION];

  if (auth) {
    const user = await getUser(auth);
    if (user) {
      next();
    } else {
      next(error.authorizationError('Token is invalid!'));
    }
  } else {
    next(error.authorizationError('Token is required!'));
  }
};

exports.verifyPermission = async (req, res, next) => {
  const auth = req.headers[AUTHORIZATION];

  const user = await getUser(auth);

  user.roleUser === roleUser.REGULAR
    ? next(error.authorizationError('Is not  an Administrator user'))
    : next();
};
