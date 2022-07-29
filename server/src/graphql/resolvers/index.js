const { userMutation } = require("./user/mutations");
const { userQueries } = require("./user/queries");
const { chatQueries } = require("./chat/queries");
const { chatMutation } = require("./chat/mutations");
const { adminQueries } = require("../admin/resolvers/queries");
const { adminMutations } = require("../admin/resolvers/mutations");

const resolvers = {
  Query: {
    //default user
    ...userQueries,
    ...chatQueries,
    //admin
    ...adminQueries
  },
  Mutation: {
    //default user
    ...userMutation,
    ...chatMutation,
    //admin
    ...adminMutations

  },
};

module.exports = resolvers;
