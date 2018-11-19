const signMiddleware = require('./middlewares/signValidations'),
  auth = require('./middlewares/auth'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', signMiddleware.checkValidations, userController.userCreate);
  app.post('/users/sessions', userController.session);
  app.get('/users/', auth.verifyToken, userController.userList);
  app.post('/admin/users/', auth.verifyToken, auth.verifyPermission, userController.singUpAdmin);
};
