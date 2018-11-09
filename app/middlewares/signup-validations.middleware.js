const { check, validationResult } = require('express-validator/check'),
  error = require('../errors');

exports.signUpValidations = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

  check('lastName')
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
    const errors = validationResult(req);
    const msg = !errors.isEmpty()
      ? errors.array()
      : !/@wolox+(\.\w{2,3})+$/.test(req.body.email) ? 'email domain incorrect' : 'OK';

    if (msg === 'OK') {
      next();
    } else {
      next(error.defaultError(msg));
    }
  }
];
