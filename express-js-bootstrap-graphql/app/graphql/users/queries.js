const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getResources } = require('../../services/trainingApi'),
  { albumPhoto, albumType } = require('../albums/types'),
  { userList } = require('./types');

exports.users = {
  description: 'return list of users',
  type: userList,
  args: {
    page: {
      name: 'numberPage',
      type: GraphQLNonNull(GraphQLInt)
    },
    count: {
      name: 'numberCount',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, data, context, info) => {
    const usersList = await getResources(`/users?count=${data.count}&page=${data.page}`, context.headers);
    return usersList;
  }
};

exports.usersPhotosAlbums = {
  description: 'return list Albums photos',
  type: new GraphQLList(albumPhoto),
  args: {
    id: {
      name: 'albumId',
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const listAlbumsPhotos = await getResources(`/users/albums/${data}/photos`, context.headers);
    return listAlbumsPhotos;
  }
};

exports.usersAlbums = {
  description: 'return list albums',
  type: new GraphQLList(albumType),
  args: {
    id: {
      name: 'userId',
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const listAlbums = await getResources(`/users/${data}/albums`, context.headers);
    return listAlbums;
  }
};
