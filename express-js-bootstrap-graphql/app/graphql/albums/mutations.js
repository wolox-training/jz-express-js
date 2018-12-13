const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getSelectionSet } = require('../utils'),
  { albumType } = require('./types');

exports.album = {
  description: 'delete albums from api',
  type: bookType,
  args: {
    deleteAlbum: {
      id: 'title',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, { name }, context, info) => {
    const attributes = getSelectionSet(info);
 
  }
};
