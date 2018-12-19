const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getResources } = require('../../services/trainingApi'),
  { albumPhotos } = require('../albums/types'),
  { listUsers } = require('./types');

exports.users = {
  description: 'return list of users',
  type: listUsers,
  args: {
    page: {
      name: 'number page',
      type: GraphQLNonNull(GraphQLInt)
    },
    count: {
      name: 'number count',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, data, context, info) => {
    const userList = await getResources(`/users?count=${data.count}&page=${data.page}`, context.headers);
    return userList;
  }
};

exports.usersPhotosAlbums = {
  description: 'return list Albums photos',
  type: new GraphQLList(albumPhotos),
  args: {
    id: {
      name: 'id album',
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (obj, data, context, info) => {
    const listAlbumsPhotos = await getResources(`/users/albums/${data.id}/photos`, context.headers);
    return listAlbumsPhotos;
  }
};
