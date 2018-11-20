const auth = require('./middlewares/auth'),
  userController = require('./controllers/users'),
  {
    validatorMiddleware,
    signUpCheckValidations,
    signInCheckValidations
  } = require('./middlewares/signValidations');

exports.init = app => {
  app.post('/users', validatorMiddleware(signUpCheckValidations), userController.userCreate);
  app.post('/users/sessions', validatorMiddleware(signInCheckValidations), userController.session);
  app.get('/users/', auth.verifyToken, userController.userList);
  app.post(
    '/admin/users/',
    auth.verifyToken,
    auth.verifyPermission,
    validatorMiddleware(signUpCheckValidations),
    userController.singUpAdmin
  );
};
