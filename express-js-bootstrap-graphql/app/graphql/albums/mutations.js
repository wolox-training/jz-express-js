const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { postResources } = require('../../services/trainingApi'),
  { albumType } = require('./types');

exports.buyAlbum = {
  description: 'Buy albums',
  type: albumType,
  args: {
    data: {
      id: 'idAlbum',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const albumPurchased = await postResources(`/albums/${data}`, '', context.headers);
    return albumPurchased.data;
  }
};
