const { userMutation } = require("./user/mutations");
const { userQueries } = require("./user/queries");
const { chatQueries } = require("./chat/queries");
const { chatMutation } = require("./chat/mutations");

const resolvers = {
  Query: {
    ...userQueries,
    ...chatQueries,
  },
  Mutation: {
    ...userMutation,
    ...chatMutation,
  },
};

module.exports = resolvers;
