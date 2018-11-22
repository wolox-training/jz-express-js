'use strict';

const { getAll } = require('../services/album');

exports.albumList = (req, res, next) => {
  return getAll('/albums')
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(next);
};
