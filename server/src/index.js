const { app } = require("./app");
const { PORT } = require("./config/constants");
const { sequelize } = require("./models");
const { httpServer } = require("./graphql");
const { client } = require("./config/redisConfig");

const bootStrap = async () => {
  try {
    //server
    await httpServer.listen(PORT, () => {
      console.log(
        `🚀  GraphQL server running at port: ${PORT}`,
        `http://localhost:${PORT}/graphql`
      );
    });
    //postgres connection
    sequelize
      .authenticate()
      .then(() => console.log("Database connected!!"))
      .catch((err) => console.log(err));

    //redis connection
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    client.set("activeUsers", JSON.stringify([]));
  } catch (err) {
    console.log("Not able to run GraphQL server");
  }
};

bootStrap();
