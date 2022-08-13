const { withFilter } = require("graphql-subscriptions");

const chatSubscriptions = {
  onNewMessageCreated: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator(["NEW_MESSAGE"]);
    },
  },
  onMessageDeleted: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator(["MESSAGE_DELETED"]);
    },
  },
  activeUsers: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator(["ACTIVE_USERS"]);
    },
  },
};

module.exports = {
  chatSubscriptions,
};
