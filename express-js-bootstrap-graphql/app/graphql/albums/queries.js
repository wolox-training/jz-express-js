const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getResources } = require('../../services/trainingApi'),
  { albumPhotos, albumType } = require('./types'),
  { listUsers } = require('../users/types');

exports.albums = {
  description: 'return all list albums',
  type: listUsers,
  resolve: async (obj, { data }, context, info) => {
    const userList = await getResources(`/albums`, context.headers);
    return userList;
  }
};
