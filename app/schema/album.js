const graphql = require('graphql'),
  { buildSchema } = graphql,
  Album = require('../models').AlbumUser,
  { getResources, postResources } = require('../services/album');

exports.schema = buildSchema(`
  type album {
    id: String,
    title: String
  },
  type Query {
      albums: [album]
  },
  type Mutation{
    deleteAlbum(id:Int): String,
    createAlbum(title:String): album
    }	  
`);

exports.root = {
  albums: () => getResources('/albums'),
  deleteAlbum: async (args, req) => {
    const deleteAlbumPurchased = await Album.deteleAlbumPurchased({ userId: req.user.id, albumId: args.id });
    return deleteAlbumPurchased === 1 ? 'Album  is deleted' : 'Album not found';
  },
  createAlbum: async (args, req) => {
    const album = {
      title: args.title,
      userId: req.user.id
    };
    const createAlbum = await postResources('/albums', album);
    console.log(`AQUI ESTA LO QUE TRAE createAlbum ${JSON.stringify(createAlbum)}`);
    return createAlbum;
  }
};
