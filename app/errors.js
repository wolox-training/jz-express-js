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
