const graphql = require('graphql'),
  { buildSchema } = graphql,
  albumController = require('../controllers/albums');

exports.schema = buildSchema(`
  type album {
    id: String,
    title: String
  },
  type Query {
      albums: [album]
  }
`);

exports.root = {
  albums: (args, req) => albumController.albumList(req)
};
