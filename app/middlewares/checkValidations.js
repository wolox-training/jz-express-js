const { validateUser } = require('./validations'),
  error = require('../errors');

exports.signUpCheckValidations = user => {
  const result = validateUser(user, ['name', 'lastName', 'email', 'password']);
  return {
    result,
    errors: error.savingError
  };
};

exports.signInCheckValidations = user => {
  const result = validateUser(user, ['email', 'password']);
  return {
    result,
    errors: error.signInError
  };
};

exports.validatorMiddleware = validatorFunction => (req, res, next) => {
  const validation = validatorFunction(req.body);

  if (!validation.result.valid) {
    next(validation.errors(validation.result.messages));
  } else {
    next();
  }
};
