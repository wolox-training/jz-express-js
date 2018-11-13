const { validateUser } = require('./validations'),
  error = require('../errors');

exports.checkValidations = (req, res, next) => {
  const signErrors = validateUser(req.body, ['name', 'lastName', 'email', 'password']);

  if (!signErrors.valid) {
    next(error.savingError(signErrors.messages));
  } else {
    next();
  }
};
