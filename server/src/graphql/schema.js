const { makeExecutableSchema } = require("@graphql-tools/schema");
const { join } = require("path");
const { readdirSync, readFileSync } = require("fs");
const { applyMiddleware } = require("graphql-middleware");

const resolvers = require("./resolvers");
const { permissions } = require("./permissions");

const gqlFiles = readdirSync(join(__dirname, "./typedefs"));

let typeDefs = "";

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typedefs", file), {
    encoding: "utf8",
  });
});

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

module.exports = schema;
