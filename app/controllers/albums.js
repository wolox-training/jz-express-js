'use strict';

const { getAll } = require('../services/album');

exports.albumList = (req, res, next) =>
  getAll('/albums')
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(next);
