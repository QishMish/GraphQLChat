const express = require("express");
const { app, apolloServer } = require("./graphql");
const { authMiddleware } = require("./middlewares/auth.middleware");

// const app = express();



(async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    // authMiddleware,
  });
})();

module.exports = { app };
