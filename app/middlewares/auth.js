const jwt = require('jsonwebtoken'),
  secret = require('../../config'),
  error = require('../errors'),
  { decoder, AUTHORIZATION } = require('../services/session'),
  { roleUser } = require('../controllers/constants'),
  User = require('../models').User;

const getUser = auth => {
  const user = decoder(auth);
  return User.getUserBy({
    email: user.email
  });
};

exports.verifyToken = async (req, res, next) => {
  const auth = req.headers[AUTHORIZATION];

  if (auth) {
    const user = await getUser(auth);
    req.user = user;
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

exports.verifyAccess = async (req, res, next) => {
  parseInt(req.user.id) !== parseInt(req.params.userId) && req.user.roleUser === roleUser.REGULAR
    ? next(error.authorizationError('Only can access to your albums'))
    : next();
};
