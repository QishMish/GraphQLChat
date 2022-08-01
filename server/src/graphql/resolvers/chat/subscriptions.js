const { withFilter } = require("graphql-subscriptions");

const chatSubscriptions = {
  onNewMessageCreated: {
    subscribe: (parent, args, { pubsub }, info) =>{
      // console.log(parent, args, { pubsub }, info)
      return pubsub.asyncIterator(["NEW_MESSAGE"])
    }
  },
};

module.exports = {
  chatSubscriptions,
};
