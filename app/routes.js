const graphqlHTTP = require('express-graphql'),
  albumSchema = require('./schema/album'),
  auth = require('./middlewares/auth'),
  { getErrorCode } = require('./schema/errors'),
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
  app.get('/users/albums/:id/photos', auth.verifyToken, albumController.listPhotosAlbum);
  app.get(
    '/users/:userId/albums',
    [auth.verifyToken, auth.verifyAccess],
    albumController.listPurchasedAlbums
  );
  app.post(
    '/admin/users',
    [auth.verifyToken, auth.verifyPermission, validatorMiddleware(signUpCheckValidations)],
    userController.signUpAdmin
  );
  app.get('/albums', auth.verifyToken, albumController.albumList);
  app.post('/albums/:id', auth.verifyToken, albumController.buyAlbum);
  app.use('/graph-albums', auth.verifyToken, (req, res) => {
    graphqlHTTP({
      schema: albumSchema.schema,
      rootValue: albumSchema.root,
      formatError: err => {
        const error = getErrorCode(err.message);
        return {
          message: error.message,
          statusCode: error.statusCode
        };
      },
      graphiql: true
    })(req, res);
  });
};
