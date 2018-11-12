const { validateUser } = require('./validations'),
  error = require('../errors');

exports.signUpValidate = (req, res, next) => {
  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  const signErrors = validateUser(user);

  if (!signErrors.valid) {
    next(error.savingError(signErrors.messages));
  } else {
    next();
  }
};
