const { User, Chatroom, UserChatroom, Message } = require("../models");
const { Op } = require("sequelize");
const { getMethods } = require("../utils/helper");
const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  withFilter,
  SyntaxError,
  ValidationError,
} = require("apollo-server");
const { ResourceNotFoundError } = require("../errors/ApiError");

const fetchChatrooms = async (userId) => {
  const chatrooms = await Chatroom.findAll({
    include: [
      {
        model: User,
        as: "creator",
      },
      {
        model: Message,
        as: "messages",
        include: {
          model: User,
          as: "author",
        },
      },
      {
        model: User,
        as: "users",
        // chatroom_id: 1,
      },
    ],
  });

  return {
    status: "SUCCESS",
    response: chatrooms,
  };
};
const fetchChatroomMessages = async (chatroomId) => {
  const chatRoom = await Chatroom.findOne({
    where: {
      id: chatroomId,
    },
    include: [
      {
        model: Message,
        as: "messages",
        include: [
          {
            model: User,
            as: "author",
          },
        ],
      },
    ],
  });
  return {
    status: "SUCCESS",
    response: chatRoom,
  };
};
const fetchChatRoomUsers = async (chatroomId) => {
  const chatroom = await Chatroom.findOne({
    where: {
      id: chatroomId,
    },
    include: [
      {
        model: User,
        as: "users",
      },
    ],
  });
  return {
    users: chatroom.users,
  };
};
const sendNewMessage = async (userId, chatroomId, newMessageInput) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ResourceNotFoundError("User not found");

  const message = await Message.create({
    content: newMessageInput.content,
    author_id: user.id,
    chatroom_id: chatroomId,
  });
  return message;
};
const deleteMessage = async (userId, messageId) => {
  const message = await Message.findOne({
    id: messageId,
    author_id: userId,
  });

  if (!message)
    throw new UserInputError(
      "Incorrect message id or user not allowed for delete action"
    );

  message.content = "Message removed";

  await message.save();

  return message;
};
const createChatroomGroup = async (userId, createChatroomGroupInput) => {
  const { name, type = "MANY_TO_MANY" } = createChatroomGroupInput;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  const chatroomGroup = await Chatroom.create({
    name: name,
    type: type,
    creator_id: userId,
  });

  await user.addChatrooms(chatroomGroup);

  return chatroomGroup;
};
const addChatRoomGroupMembers = async (userId, chatroomId, members) => {
  const chatRoom = await Chatroom.findOne({
    where: {
      id: chatroomId,
      creator_id: userId,
    },
  });

  if (!chatRoom) throw new UserInputError("Invalid creator id or chatroomId");

  await Promise.all(
    members.map(async ({ id, username }) => {
      const param = id
        ? {
            id,
            username,
          }
        : {
            username: username,
          };
      const user = await User.findOne({
        where: param,
      });
      await chatRoom.addUser(user);
    })
  );
  return chatRoom;
};
const removeChatRoomGroupMembers = async (userId, chatroomId, members) => {
  const chatRoom = await Chatroom.findOne({
    where: {
      id: chatroomId,
      creator_id: userId,
    },
  });

  if (!chatRoom) throw new UserInputError("Invalid creator id or chatroomId");

  await Promise.all(
    members.map(async ({ id, username }) => {
      const param = id
        ? {
            id,
            username,
          }
        : {
            username: username,
          };
      const user = await User.findOne({
        where: param,
      });
      await chatRoom.removeUser(user);
    })
  );
  return chatRoom;
};
const deleteChatroomGroup = async (userId, chatroomId) => {
  await Chatroom.destroy({
    where: { id: chatroomId, creator_id: userId },
  });
};
const sendChatMessageFromAdministration = async (
  userId,
  chatroomId,
  newMessageInput
) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ResourceNotFoundError("User not found");

  const message = await Message.create({
    content: newMessageInput.content,
    author_id: user.id,
    chatroom_id: chatroomId,
  });
  return message;
};
const removeMessage = async (messageId) => {
  const message = await Message.findOne({
    id: messageId,
  });

  if (!message) throw new UserInputError("Incorrect message id");

  message.content =
    "message removed because it violates our Community Standards";

  await message.save();

  return message;
};

module.exports = {
  fetchChatrooms,
  fetchChatroomMessages,
  sendNewMessage,
  deleteMessage,
  createChatroomGroup,
  addChatRoomGroupMembers,
  removeChatRoomGroupMembers,
  deleteChatroomGroup,
  sendChatMessageFromAdministration,
  removeMessage,
  fetchChatRoomUsers,
};
