const auth = require('./middlewares/auth'),
  userController = require('./controllers/users'),
  {
    validatorMiddleware,
    signUpCheckValidations,
    signInCheckValidations
  } = require('./middlewares/checkValidations'),
  verifyPermission = [auth.verifyToken, auth.verifyPermission, validatorMiddleware(signUpCheckValidations)];

exports.init = app => {
  app.post('/users', validatorMiddleware(signUpCheckValidations), userController.userCreate);
  app.post('/users/sessions', validatorMiddleware(signInCheckValidations), userController.signIn);
  app.get('/users', auth.verifyToken, userController.userList);
  app.post('/admin/users', verifyPermission, userController.singUpAdmin);
};
