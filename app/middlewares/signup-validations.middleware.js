const { check, validationResult } = require('express-validator/check'),
  bcrypt = require('bcryptjs'),
  error = require('../errors');

exports.signUpValidations = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

  check('lastname')
    .not()
    .isEmpty()
    .withMessage('Lastname is required'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('the email format is not correct'),

  check('password')
    .not()
    .isEmpty()
    .isAlphanumeric()
    .withMessage('invalid character')
    .isLength({ min: 8 })
    .withMessage('minimum 8 characters'),

  (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty() || !/@wolox.co\s*$/.test(email)) {
      const msg = !errors.isEmpty() ? errors.array() : 'email domain incorrect';
      next(error.defaultError(msg));
    } else {
      next();
    }
  }
];
