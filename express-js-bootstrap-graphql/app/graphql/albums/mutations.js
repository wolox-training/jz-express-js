const { GraphQLInt, GraphQLNonNull } = require('graphql'),
  { postResources } = require('../../services/trainingApi'),
  { albumType } = require('./types');

exports.buyAlbum = {
  description: 'buyAlbum',
  type: albumType,
  args: {
    data: {
      id: 'albumId',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const albumPurchased = await postResources(`/albums/${data}`, '', context.headers);
    return albumPurchased.data;
  }
};
