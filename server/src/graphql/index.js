const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema");
const { NODE_ENV } = require("../config/constants");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { createServer } = require("http");
const express = require("express");
const { PubSub } = require("graphql-subscriptions");

const app = express();
const httpServer = createServer(app);

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  schema,
  context: async(ctx) => {
    context =  await authMiddleware(ctx);
    context.pubsub = pubsub;
    return context;
  },
  csrfPrevention: true,
  playground: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer(
  { schema, context: (ctx, msg, args) => ({ pubsub }) },
  wsServer
);

module.exports = {
  app,
  httpServer,
  apolloServer,
};
