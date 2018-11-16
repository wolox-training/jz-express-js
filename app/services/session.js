const jwt = require('jsonwebtoken'),
  config = require('../../config'),
  secret = config.common.session.secret;

const giveToken = req => {
  const token = jwt.sign(
    {
      mail: req.email
    },
    secret.common.session.secret
  );
  return token;
};

exports.AUTHORIZATION = config.common.session.header_name;
