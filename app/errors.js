const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.SAVING_ERROR = 'saving_error';
exports.savingError = message => internalError(message, exports.SAVING_ERROR);

exports.SIGNIN_ERROR = 'signin_error';
exports.signInError = message => internalError(message, exports.SIGNIN_ERROR);

exports.AUTHORIZATE_ERROR = 'authorization_error';
exports.authorizationError = message => internalError(message, exports.AUTHORIZATE_ERROR);

exports.ALBUMS_API_ERROR = 'albums_api_error';
exports.albumsApiError = message => internalError(message, exports.ALBUMS_API_ERROR);

exports.ALBUMS_NOT_FOUND = 'albums_not_found';
exports.albumsNotFound = message => internalError(message, exports.ALBUMS_NOT_FOUND);

exports.ALBUMS_API_REDIRECTION = 'albums_api_redirection';
exports.albumsApiRedirection = message => internalError(message, exports.ALBUMS_API_REDIRECTION);

exports.ALBUM_ORDER_ERROR = 'album_order_error';
exports.albumOrderError = message => internalError(message, exports.ALBUM_ORDER_ERROR);

exports.ALBUM_NOT_FOUND = { message: 'Album not found', statusCode: 404 };
