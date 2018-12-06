const graphql = require('graphql'),
  { buildSchema } = graphql,
  { getResources } = require('../services/album');

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
  albums: () => getResources('/albums')
};
