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
const { disconnectUser, setUserActive } = require("../services/user.service");
const { findUser } = require("../utils/jwt");
const { client } = require("../config/redisConfig");

const app = express();
const httpServer = createServer(app);

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  schema,
  context: async (ctx) => {
    context = await authMiddleware(ctx);
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
  {
    schema,
    context: async (ctx, msg, args) => {
      return {
        pubsub,
        user: await getDynamicContext(ctx, msg, args),
      };
    },
    onConnect: async (ctx) => {
      if (!ctx.connectionParams.access_token) {
        throw new Error("Authorization required!");
      }
      const user = await findUser(
        ctx.connectionParams.access_token.split("Bearer ")[1]
      );
      if (!user) throw new Error("Auth token missing!");
      await setUserActive({
        id: user.id,
        username: user.username,
      });
      const activeUsers = JSON.parse(await client.get("activeUsers"));
      pubsub.publish("ACTIVE_USERS", {
        activeUsers: activeUsers,
      });
      console.log("Connected");
    },
    onDisconnect: async (ctx, code, reason) => {
      if (!ctx.connectionParams.access_token) {
        throw new Error("Authorization required!");
      }
      const user = await findUser(
        ctx.connectionParams.access_token.split("Bearer ")[1]
      );
      if (!user) throw new Error("Auth token missing!");
      await disconnectUser({
        id: user.id,
        username: user.username,
      });
      
      const activeUsers = JSON.parse(await client.get("activeUsers"));

      pubsub.publish("ACTIVE_USERS", {
        activeUsers: activeUsers,
      });
      console.log("Disconnected!");
    },
  },
  wsServer
);
const getDynamicContext = async (ctx, msg, args) => {
  if (ctx.connectionParams.access_token) {
    let token = ctx.connectionParams.access_token.split(" ")[1];
    const user = await findUser(token);
    return { user };
  }
  return { user: null };
};
module.exports = {
  app,
  httpServer,
  apolloServer,
};
