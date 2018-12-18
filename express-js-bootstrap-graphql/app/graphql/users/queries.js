const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getResources } = require('../../services/trainingApi'),
  { users } = require('./types');

exports.users = {
  description: 'return list of users',
  type: new GraphQLList(users),
  resolve: async (obj, name, context, info) => {
    const userlist = await getResources('/users', context.headers);
    return userlist.users;
  }
};
