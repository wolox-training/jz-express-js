const {
    validatorMiddleware,
    signUpCheckValidations,
    signInCheckValidations
  } = require('./middlewares/checkValidations'),
  userController = require('./controllers/users');

exports.init = app => {
  app.post('/users', validatorMiddleware(signUpCheckValidations), userController.userCreate);
  app.post('/users/sessions', validatorMiddleware(signInCheckValidations), userController.signIn);
};
