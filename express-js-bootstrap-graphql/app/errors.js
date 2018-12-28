const internalError = (message, internalCode, statusCode) => {
  message, internalCode, statusCode;
};

exports.errorName = {
  albumNotFound: 'ALBUM_NOT_FOUND'
};

const errorType = {
  ALBUM_NOT_FOUND: {
    message: 'Album not found',
    statusCode: 404
  }
};

exports.getErrorCode = errorName => errorType[errorName];

exports.ALBUM_ORDER_ERROR = 'album_order_error';
exports.albumOrderError = message => internalError(message, exports.ALBUM_ORDER_ERROR);

exports.SAVING_ERROR = 'saving_error';
exports.savingError = message => internalError(message, exports.SAVING_ERROR, 400);

exports.ALBUMS_API_ERROR = 'albums_api_error';
exports.albumsApiError = message => internalError(message, exports.ALBUMS_API_ERROR, 503);
