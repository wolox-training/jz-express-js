const jwt = require('jsonwebtoken'),
  secret = require('../../config'),
  error = require('../errors'),
  { encoder, decoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User;

const getUser = auth => {
  const user = decoder(auth);
  return User.getUserBy({
    email: user.email
  }).then(userExists => {
    return userExists;
  });
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
