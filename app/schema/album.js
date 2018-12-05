const graphql = require('graphql'),
  { buildSchema } = graphql,
  Album = require('../models').AlbumUser,
  { getResources } = require('../services/album');

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
  delete: async (args, req) => {
    const deleteAlbumPurchased = await Album.deteleAlbumPurchased({ userId: req.user.id, albumId: args.id });
    return deleteAlbumPurchased === 1 ? 'AlbumPurchased is deleted' : 'you have not bought this album';
  }
};
