// const controller = require('./controllers/controller');
const usersRouter = require('./middlewares/signup-validations.middleware');

exports.init = app => {
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/users', [], controller.methodPOST);
  app.post('/users', usersRouter);
};
