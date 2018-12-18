const { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getResources } = require('../../services/trainingApi'),
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
      name: 'number page',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, data, context, info) => {
    const userlist = await getResources(`/users?count=${data.count}&page=${data.page}`, context.headers);
    return userlist;
  }
};
