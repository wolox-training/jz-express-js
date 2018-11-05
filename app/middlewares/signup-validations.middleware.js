const express = require('express');

const router = express.Router();

router.post('/users', (req, res) => {
  const user = req.body;

  // console.log(`preueba de que esta monda funciona aqui ${JSON.stringify(user)}`);
  res.send('test');
});

module.exports = router;
