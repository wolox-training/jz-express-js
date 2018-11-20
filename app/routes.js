const {
    validatorMiddleware,
    signUpCheckValidations,
    signInCheckValidations
  } = require('./middlewares/signValidations'),
  auth = require('./middlewares/auth'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', validatorMiddleware(signUpCheckValidations), userController.userCreate);
  app.post('/users/sessions', validatorMiddleware(signInCheckValidations), userController.session);
  app.get('/users/', auth.verifyToken, userController.userList);
  app.post('/admin/users/', auth.verifyToken, auth.verifyPermission, userController.singUpAdmin);
};
