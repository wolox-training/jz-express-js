const { validateUser } = require('./validations'),
  error = require('../errors');

exports.signUpValidate = (req, res, next) => {
  const signErrors = validateUser(req.body);

  if (!signErrors.valid) {
    next(error.savingError(signErrors.messages));
  } else {
    next();
  }
};
