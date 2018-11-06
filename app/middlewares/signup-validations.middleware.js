const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const error = require('../errors');

router.post(
  '/users',
  [
    check('name', 'El nombre es requerido')
      .not()
      .isEmpty(),

    check('lastname', 'El apellido es requerido')
      .not()
      .isEmpty(),

    check('email', 'El email es requerido')
      .not()
      .isEmpty()
      .isEmail(),

    check('password', 'Contraseña invalida')
      .not()
      .isEmpty()
      .isLength({ min: 8 })
  ],
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
);

module.exports = router;
