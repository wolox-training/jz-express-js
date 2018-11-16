const jwt = require('jsonwebtoken'),
  secret = require('../../config'),
  error = require('../errors'),
  User = require('../models').User;

const exist = usermail => User.getUserBy(usermail);

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.accestoken;

  try {
    const decoded = jwt.verify(token, secret.common.session.secret);
    const result = exist(decoded.mail);
    if (!result) {
      next(error.authorizationError('invalid token'));
    } else {
      next();
    }
  } catch (err) {
    next(error.authorizationError('Incorrect format token'));
  }
};
