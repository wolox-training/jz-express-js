const { errorType } = require('./constErrorGraphql');

exports.getErrorCode = errorName => errorType[errorName];
