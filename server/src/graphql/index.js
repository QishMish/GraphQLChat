const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema");
const { NODE_ENV } = require("../config/constants");
const { authMiddleware } = require("../middlewares/auth.middleware");

const apolloServer = new ApolloServer({
  schema,
  context: authMiddleware,
  playground: true,
});

module.exports = apolloServer;
