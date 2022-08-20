const chatService = require("../../../services/chat.service");
const { getOffSet } = require("../../../utils/helper");

const chatQueries = {
  fetchChatrooms: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const usersResponse = await chatService.fetchChatrooms(userId);
    return usersResponse.response;
  },
  fetchChatroomMessages: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const { chatroomId, offSet, limit } = args;
    const { offset: properOffSet, limit: properOffSetLimit } = getOffSet(
      offSet,
      limit
    );

    const usersResponse = await chatService.fetchChatroomMessages(
      userId,
      chatroomId,
      properOffSet,
      properOffSetLimit
    );
    return usersResponse.response;
  },
};

module.exports = { chatQueries };
