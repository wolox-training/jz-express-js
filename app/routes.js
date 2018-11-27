const auth = require('./middlewares/auth'),
  userController = require('./controllers/users'),
  albumController = require('./controllers/albums'),
  {
    validatorMiddleware,
    signUpCheckValidations,
    signInCheckValidations
  } = require('./middlewares/checkValidations');

exports.init = app => {
  app.post('/users', validatorMiddleware(signUpCheckValidations), userController.userCreate);
  app.post('/users/sessions', validatorMiddleware(signInCheckValidations), userController.signIn);
  app.get('/users', auth.verifyToken, userController.userList);
  app.post(
    '/admin/users',
    [auth.verifyToken, auth.verifyPermission, validatorMiddleware(signUpCheckValidations)],
    userController.signUpAdmin
  ),
    app.get('/albums', auth.verifyToken, albumController.albumList);
  app.post('/albums/:id', auth.verifyToken, albumController.buyAlbum);
};
