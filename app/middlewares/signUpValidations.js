const { validateUser } = require('./validations'),
  error = require('../errors');

exports.signUpValidate = (req, res, next) => {
  const user = req.body;

  const signErrors = validateUser(user);

  if (!signErrors.valid) {
    next(error.savingError(signErrors.messages));
  } else {
    next();
  }
};
