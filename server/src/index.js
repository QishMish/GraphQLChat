const { app } = require("./app");
const { PORT } = require("./config/constants");
const { sequelize } = require("./models");

const bootStrap = async () => {
  try {
    await app.listen(PORT);
    console.log(
      `🚀  GraphQL server running at port: ${PORT}`,
      `http://localhost:3000/graphql`
    );
    sequelize
      .authenticate()
      .then(() => console.log("Database connected!!"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Not able to run GraphQL server");
  }
};

bootStrap();
