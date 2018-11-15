const { validateUser } = require('./validations'),
  error = require('../errors');

exports.checkValidations = (req, res, next) => {
  const signErrors = validateUser(req.body, ['email', 'password']);

  if (!signErrors.valid) {
    next(error.signInError(signErrors.messages));
  } else {
    next();
  }
};
