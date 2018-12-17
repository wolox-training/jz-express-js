const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { albumType } = require('./types');

exports.album = {
  description: 'delete albums from api',
  type: albumType,
  args: {
    deleteAlbum: {
      id: 'title',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, { name }, context, info) => {
    return true;
  }
};
