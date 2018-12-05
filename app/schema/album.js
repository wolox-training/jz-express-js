const graphql = require('graphql'),
  { buildSchema } = graphql,
  Album = require('../models').AlbumUser,
  { getResources } = require('../models');

exports.schema = buildSchema(`
  type album {
    id: String,
    title: String
  },
  type Query {
      albums: [album]
  },
  type Mutation{
    delete(id:Int): String
    }	  
`);

exports.root = {
  albums: () => getResources('/albums'),
  delete: (args, req) => {
    console.log(`AQUI ESTOY EN EL GRAPHQL ${JSON.stringify(req.params.userId)}`);
    Album.deteleAlbumPurchased();
  }
};
