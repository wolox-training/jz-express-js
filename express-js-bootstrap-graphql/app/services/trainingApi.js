'use strict';

const axios = require('axios'),
  config = require('../../config'),
  errors = require('../errors'),
  logger = require('../logger'),
  url = config.common.albumsApi.url;

exports.getResources = (source, headers) =>
  axios
    .get(`${url}${source}`, {
      headers: {
        authorization: headers.authorization || ''
      }
    })
    .then(res => res.data)
    .catch(err => {
      logger.error(err);
      if (err.response.status === 300)
        throw errors.albumsApiRedirection('client must take additional action to complete the request');
      if (err.response.status === 404) throw errors.albumsNotFound('Error 404 No found');

      throw errors.albumsApiError('service not available');
    });

exports.postResources = (source, param) =>
  axios
    .post(`${url}${source}`, param)
    .then(res => res)
    .catch(err => {
      logger.error(err);
      if (err.response.status === 300)
        throw errors.albumsApiRedirection('client must take additional action to complete the request');
      if (err.response.status === 404) throw errors.albumsNotFound('Error 404 No found');

      throw errors.albumsApiError('service not available');
    });
