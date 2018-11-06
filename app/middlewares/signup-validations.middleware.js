const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');

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
  (req, res) => {
    const name = req.body.name;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (/@wolox.co\s*$/.test(email)) {
      res.status(200).send('test');
    } else {
      res.status(422).send('Correo con dominio incorrecto');
    }

    // req.checkBody('name', 'Name is required').noEmpty();
    // req.checkBody('lastName', 'lastName is required').noEmpty();
    // req.checkBody('email', 'email is required').noEmpty();
    // req.checkBody('email', 'email is not valid').isEmail();
    // req.checkBody('password', 'password is required').noEmpty();

    // console.log(`preueba de que esta monda funciona aqui ${JSON.stringify(user)}`);
  }
);

module.exports = router;
