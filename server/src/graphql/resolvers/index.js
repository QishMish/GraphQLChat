const { userMutation } = require("./user/mutations");
const { userQueries } = require("./user/queries");
const { chatQueries } = require("./chat/queries");
const { chatMutations } = require("./chat/mutations");
const { chatSubscriptions } = require("./chat/subscriptions");
const { adminQueries } = require("../admin/resolvers/queries");
const { adminMutations } = require("../admin/resolvers/mutations");

const resolvers = {
  Query: {
    //default user
    ...userQueries,
    ...chatQueries,
    //admin
    ...adminQueries,
  },
  Mutation: {
    //default user
    ...userMutation,
    ...chatMutations,
    //admin
    ...adminMutations,
  },
  Subscription: {
    ...chatSubscriptions,
  },
};

module.exports = resolvers;
