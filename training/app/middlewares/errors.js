const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.INVALID_USER]: 400,
  [errors.BOOK_NOT_FOUND]: 404,
  [errors.SAVING_ERROR]: 400,
  [errors.SIGNIN_ERROR]: 400,
  [errors.ALBUMS_API_REDIRECTION]: 300,
  [errors.ALBUM_ORDER_ERROR]: 400,
  [errors.ALBUMS_NOT_FOUND]: 404,
  [errors.ALBUMS_API_ERROR]: 503,
  [errors.AUTHORIZATE_ERROR]: 401,
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};