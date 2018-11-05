const express = require('express');

const router = express.Router();

router.post('/users', (req, res) => {
  const name = req.body.name;
  const lastName = req.body.name;
  const email = req.body.name;
  const password = req.body.name;

  req.checkBody('name');

  // console.log(`preueba de que esta monda funciona aqui ${JSON.stringify(user)}`);
  res.send('test');
});

module.exports = router;
