const jwt = require('jsonwebtoken'),
  config = require('../../config'),
  secret = config.common.session.secret;

exports.encoder = payload =>
  jwt.sign(
    {
      email: payload.email
    },
    secret,
    { expiresIn: '1h' }
  );

exports.AUTHORIZATION = config.common.session.header_name;

exports.decoder = token => jwt.verify(token, secret);
