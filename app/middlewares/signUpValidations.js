const { check, validationResult } = require('express-validator/check'),
  { validateUser } = require('../middlewares/validations'),
  error = require('../errors');

exports.signUpValidate = (req, res, next) => {
  const user = req.body
    ? {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      }
    : {};

  const signErrors = validateUser(user);

  if (!signErrors.valid) {
    next(error.saving_error(signErrors.messages));
  } else {
    next();
  }
};
