const signUpMiddleware = require('./middlewares/signup-validations.middleware'),
  userController = require('./controllers/user.controller');

exports.init = app => {
  app.post('/users', signUpMiddleware.signUpValidations, userController.userCreate);
};
