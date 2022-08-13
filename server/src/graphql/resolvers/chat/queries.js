const chatService = require("../../../services/chat.service");

const chatQueries = {
  fetchChatrooms: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const usersResponse = await chatService.fetchChatrooms(userId);
    return usersResponse.response;
  },
  fetchChatroomMessages: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const { chatroomId, offSet, limit } = args;
    console.log(
      offSet,
      limit,
      "+++++++++++++++++++++++++++++++++++++++++++++="
    );
    const usersResponse = await chatService.fetchChatroomMessages(
      userId,
      chatroomId,
      offSet,
      limit
    );
    return usersResponse.response;
  },
};

module.exports = { chatQueries };
