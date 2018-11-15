const signUpMiddleware = require('./middlewares/signUpValidations'),
  signInMiddleware = require('./middlewares/signInValidations'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', signUpMiddleware.checkValidations, userController.userCreate);
  app.post('/users/sessions/', signInMiddleware.checkValidations, userController.sesion);
};
