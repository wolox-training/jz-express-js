const signUpMiddleware = require('./middlewares/signUpValidations'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', signUpMiddleware.checkValidations, userController.userCreate);
  app.post('/users/sessions/', userController.sesion);
};
