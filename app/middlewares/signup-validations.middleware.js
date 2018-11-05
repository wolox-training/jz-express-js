const express = require('express');

const router = express.Router();

const expressValidator = require('express-validator');

router.use(expressValidator());

router.post('/users', (req, res) => {
  const name = req.body.name;
  const lastName = req.body.name;
  const email = req.body.name;
  const password = req.body.name;

  req.checkBody('name', 'Name is required').noEmpty();
  req.checkBody('lastName', 'lastName is required').noEmpty();
  req.checkBody('email', 'email is required').noEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').noEmpty();

  // console.log(`preueba de que esta monda funciona aqui ${JSON.stringify(user)}`);
  res.send('test');
});

module.exports = router;
