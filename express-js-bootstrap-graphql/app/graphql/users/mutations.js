const { GraphQLNonNull, GraphQLBoolean } = require('graphql'),
  { getResources, postResources } = require('../../services/trainingApi'),
  { userInputType } = require('./types');

exports.createUser = {
  description: 'create a single user',
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const createUser = await postResources('/users', data);
    console.log(`Aquii esta la creacion del usuario ${JSON.stringify(createUser)}`);
    return true;
  }
};
