const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');

const { NODE_ENV } = require('../config/constants');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireUser } = require('../middlewares/requireUser.middleware');

const apolloServer = new ApolloServer({
  schema,
  context: async context => {
    await authMiddleware(context);
    // await requireUser(context);
  },
  playground: true,
});

module.exports = apolloServer;
