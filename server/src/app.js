const express = require("express");
const cookieParser = require("cookie-parser");
const graphqlServer = require("./graphql");
const { authMiddleware } = require("./middlewares/auth.middleware");

const app = express();

app.use(cookieParser());

(async () => {
  await graphqlServer.start();
  graphqlServer.applyMiddleware({
    app,
    authMiddleware,
  });
})();

module.exports = { app };
