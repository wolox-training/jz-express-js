'use strict';

const axios = require('axios'),
  config = require('../../config'),
  errors = require('../errors'),
  logger = require('../logger'),
  url = config.common.albumsApi.url;

exports.getAll = async source => {
  const albumData = await axios.get(`${url}${source}`).catch(err => {
    logger.error(err);
    throw errors.albumsApiError('Connection failed');
  });
  return albumData.data;
};
