const { app, apolloServer } = require("./graphql");

(async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
  });
})();

module.exports = { app };
