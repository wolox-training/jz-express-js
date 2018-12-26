const { GraphQLList } = require('graphql'),
  { getResources } = require('../../services/trainingApi'),
  { albumType } = require('./types');

exports.albums = {
  description: 'return all list albums',
  type: new GraphQLList(albumType),
  resolve: async (obj, { data }, context, info) => {
    const albumsList = await getResources(`/albums`, context.headers);
    return albumsList;
  }
};
