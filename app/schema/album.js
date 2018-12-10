const graphql = require('graphql'),
  { buildSchema } = graphql,
  Album = require('../models').AlbumUser,
  { errorName } = require('../errors'),
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
    deleteAlbum(id:Int): String
    }	  
`);

exports.root = {
  albums: () => getResources('/albums'),
  deleteAlbum: async (args, req) => {
    const deleteAlbumPurchased = await Album.deleteAlbumPurchased({ userId: req.user.id, albumId: args.id });
    try {
      if (deleteAlbumPurchased === 1) {
        return 'Album  is deleted';
      } else {
        throw new Error(errorName.albumNotFound);
      }
    } catch (err) {
      throw err.message;
    }
  }
};
