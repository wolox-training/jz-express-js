// const controller = require('./controllers/controller');
const signUpMiddleware = require('./middlewares/signup-validations.middleware'),
  userController = require('./controllers/user.controller');

exports.init = app => {
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/users', [], controller.methodPOST);
  app.post('/users', signUpMiddleware.signUpValidations, userController.userCreate);
};
