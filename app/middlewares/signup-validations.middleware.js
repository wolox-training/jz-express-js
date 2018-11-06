const { check, validationResult } = require('express-validator/check'),
  bcrypt = require('bcryptjs'),
  error = require('../errors');

exports.signupValidations = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('El nombre es requerido'),

  check('lastname')
    .not()
    .isEmpty()
    .withMessage('El apellido es requerido'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('El correo es requerido')
    .isEmail()
    .withMessage('El formato de correo no es valido'),

  check('password')
    .not()
    .isEmpty()
    .isAlphanumeric()
    .withMessage('Debe ser alphanumerica')
    .isLength({ min: 8 })
    .withMessage('Minimo 8 caracteres'),
  (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty() || !/@wolox.co\s*$/.test(email)) {
      const msg = !errors.isEmpty() ? errors.array() : 'dominio de correo incorrecto';
      next(error.defaultError(msg));
    } else {
      res.status(200).send('test');
    }
  }
];
