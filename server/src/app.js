const express = require("express");
const graphqlServer = require("./graphql");
const { authMiddleware } = require("./middlewares/auth.middleware");

const app = express();

(async () => {
  await graphqlServer.start();
  graphqlServer.applyMiddleware({
    app,
    authMiddleware,
  });
})();

module.exports = { app };
