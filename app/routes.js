const signUpMiddleware = require('./middlewares/signUpValidations'),
  auth = require('./middlewares/auth'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', signUpMiddleware.checkValidations, userController.userCreate);
  app.post('/users/sessions', userController.session);
  app.get('/users/', auth.verifyToken, userController.userList);
  app.post('/admin/users/');
};
