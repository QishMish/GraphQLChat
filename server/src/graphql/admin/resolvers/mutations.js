const userService = require("./../../../services/user.service");
const chatService = require("./../../../services/chat.service");

const adminMutations = {
  //user
  deactivateUser: async (parent, args, ctx) => {
    const { userId } = args;
    const deactivateUserResult = await userService.deactivateUser(userId);
    return {
      status: "SUCCESS",
      message: "User has been deactivated",
    };
  },
  activateUser: async (parent, args, ctx) => {
    const { userId } = args;
    const activateUserResult = await userService.activateUser(userId);
    return {
      status: "SUCCESS",
      message: "User has been deactivated",
    };
  },
  //chat
  sendChatMessageFromAdministration: async (parent, args, ctx) => {
    const { chatroomId, newMessageInput } = args;
    const { id: userId } = ctx.user;
    const newAdminMessageResponse =
      await chatService.sendChatMessageFromAdministration(
        userId,
        chatroomId,
        newMessageInput
      );
    return newAdminMessageResponse;
  },
  removeMessage: async (parent, args, ctx) => {
    const { messageId } = args;
    const deleteMessageResponse = await chatService.removeMessage(messageId);
    return {
      status: "SUCCESS",
      message: "Message has been removed",
    };
  },
  deleteConversation: async (parent, args, { user }) => {
    const { id: userId } = user;
    const { chatroomId } = args;

    const deleteConversationResponse = await chatService.deleteConversation(
      userId,
      chatroomId
    );

    return {
      status: "SUCCESS",
      message: "Conversation has been deleted",
    };
  },
};

module.exports = { adminMutations };
