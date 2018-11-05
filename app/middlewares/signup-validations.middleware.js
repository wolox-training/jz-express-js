const express = require('express');

const router = express.Router();

router.post('/users', (req, res) => {
  const name = req.body.name;
  const lastName = req.body.name;
  const email = req.body.name;
  const password = req.body.name;

  req.checkBody('name', 'Name is required').noEmpty();
  req.checkBody('lastName', 'lastName is required').noEmpty();
  req.checkBody('email', 'email is required').noEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req
    .checkBody('password', 'password is required')
    .noEmpty()
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long')
    .matches(/\d/)
    .withMessage('must contain a number');

  // console.log(`preueba de que esta monda funciona aqui ${JSON.stringify(user)}`);
  res.send('test');
});

module.exports = router;
