const signUpMiddleware = require('./middlewares/signUpValidations'),
  signInMiddleware = require('./middlewares/signInValidations'),
  auth = require('./middlewares/auth'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', signUpMiddleware.checkValidations, userController.userCreate);
  app.post('/users/sessions/', signInMiddleware.checkValidations, userController.sesion);
  app.get('/users/', auth.isAuthenticated, userController.userList);
};
