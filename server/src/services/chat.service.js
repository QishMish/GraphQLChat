const { QueryTypes } = require("sequelize");
const { UserInputError } = require("apollo-server");
const {
  User,
  Chatroom,
  DeletedUserChatroom,
  Message,
  Sequelize,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

const { ResourceNotFoundError } = require("../errors/ApiError");

const fetchChatrooms = async (userId) => {
  const deletedChatroom = await DeletedUserChatroom.findAll({
    user_id: userId,
  });

  const user = await User.findByPk(userId);

  const userChatrooms = await user.getChatrooms();

  const userChatroomIds = userChatrooms.map((c) => c.id);

  const exludeChatroomIds = deletedChatroom.map((c) => c.chatroom_id);

  const chatrooms = await Chatroom.findAll({
    where: {
      id: {
        [Op.not]: exludeChatroomIds,
        [Op.in]: userChatroomIds,
      },
    },
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
      },
    ],
  });

  const chatroomsWithSlug = chatrooms.map((c) => {
    const conversationSlug =
      c.type === "MANY_TO_MANY"
        ? `Chatroom:${c.name}`
        : c.users?.find((u) => Number(u.id) !== user.id)?.username;
    const lastMessageDate = c.messages[c.messages.length - 1]?.createdAt;

    c.setDataValue("slug", conversationSlug);
    c.setDataValue("last_message_sent", lastMessageDate);

    c.save();

    return c;
  });
  return {
    status: "SUCCESS",
    response: chatroomsWithSlug,
  };
};
const fetchChatroomMessages = async (userId, chatroomId, offSet, limit) => {
  console.log("offset", offSet, "limit", limit);

  const deletedChatroom = await DeletedUserChatroom.findOne({
    user_id: userId,
    chatroom_id: chatroomId,
  });

  const chatRoom = await Chatroom.findOne({
    where: {
      id: chatroomId,
    },
    attributes: {
      include: [
        [
          Sequelize.literal(`(SELECT COUNT(*) FROM messages AS msg
          WHERE
          msg.chatroom_id = ${chatroomId}
        )`),
          "messagesCount",
        ],
      ],
    },
    include: [
      {
        model: Message,
        as: "messages",
        offset: offSet,
        limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "author",
          },
        ],
      },
      {
        model: User,
        as: "users",
      },
    ],
  });

  offSet + limit > chatRoom.messagesCount
    ? (chatRoom.hasMoreMessages = false)
    : (chatRoom.hasMoreMessages = true);

  const conversationSlug =
    chatRoom.type === "MANY_TO_MANY"
      ? `Chatroom:${chatRoom.name}`
      : chatRoom.users?.find((u) => Number(u.id) !== userId)?.username;

  chatRoom.setDataValue("slug", conversationSlug);

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
  const user = await User.findByPk(userId);

  if (!user) throw new ResourceNotFoundError("User not found");

  const chatroom = await Chatroom.findByPk(chatroomId);

  if (!chatroom) throw new UserInputError("Chatroom not found");

  const message = await Message.create({
    content: newMessageInput.content,
    author_id: user.id,
    chatroom_id: chatroomId,
  });
  chatroom.last_message = message.content;

  await chatroom.save();

  const messageWithAuthor = await Message.findOne({
    where: {
      id: message.id,
    },
    include: [
      {
        model: User,
        as: "author",
      }
    ]
  });

  return messageWithAuthor;
};
const deleteMessage = async (userId, messageId) => {
  const message = await Message.findOne({
    where: {
      id: messageId,
      author_id: userId,
    },
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
  const { name, type = "MANY_TO_MANY", members } = createChatroomGroupInput;

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

  if (members) {
    await Promise.all(
      members.map(async (m) => {
        const user = await User.findByPk(m.id);
        await chatroomGroup.addUser(user);
      })
    );
  }

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
  const user = await User.findByPk(userId);

  if (!user) throw new ResourceNotFoundError("User not found");

  const message = await Message.create({
    content: newMessageInput.content,
    author_id: user.id,
    chatroom_id: chatroomId,
  });
  return message;
};
const removeMessage = async (messageId) => {
  const message = await Message.findByPk(messageId);

  if (!message) throw new UserInputError("Incorrect message id");

  message.content =
    "message removed because it violates our Community Standards";

  await message.save();

  return message;
};
const deleteConversation = async (userId, chatroomId) => {
  const user = await User.findByPk(userId);
  const conversation = await Chatroom.findOne({
    where: {
      id: chatroomId,
    },
    include: [
      {
        model: Message,
        as: "messages",
        separate: true,
        order: [["id", "DESC"]],
        limit: 1,
      },
    ],
  });

  const userIn = await conversation.hasUser(user);

  if (!userIn)
    throw new UserInputError("Incorrect chatroom id or action not allowed");

  const alreadyDeleted = await user.hasDeleted_chatrooms(conversation);

  if (alreadyDeleted)
    throw new new UserInputError("conversation already deleted")();

  const lastMessageId =
    conversation.messages.length > 0 ? conversation.messages[0]?.id : null;

  await DeletedUserChatroom.create({
    user_id: user.id,
    chatroom_id: conversation.id,
    last_message_id: lastMessageId,
  });
};
const createChatroom = async (userId, memberId, type = "ONE_TO_ONE") => {
  const users = await Promise.all(
    [userId, memberId].map(async (id) => {
      const user = await User.findByPk(id);
      if (!user) throw new ResourceNotFoundError("User not found");
      return user;
    })
  );
  const chatroom = await Chatroom.create({
    name: new Date().toISOString(),
    type: type,
    creator_id: userId,
  });

  await Promise.all(
    users.map(async (u) => {
      await chatroom.addUser(u);
    })
  );

  return chatroom;
};

const getConversationByUserIdsOrCreate = async (userId, memberId) => {
  const [chatroomExist, metadata] = await sequelize.query(
    `
    SELECT c.id, c.name FROM chatrooms AS c
    INNER JOIN user_chatrooms u1 ON u1.chatroom_id = c.id AND u1.user_id = :userId
    INNER JOIN user_chatrooms u2 ON u2.chatroom_id = c.id AND u2.user_id = :memberId
    WHERE c.type = 'ONE_TO_ONE'
    `,
    {
      replacements: { userId: Number(userId), memberId: Number(memberId) },
      type: QueryTypes.SELECT,
    }
  );

  if (chatroomExist) {
    const chatroom = await fetchChatroomMessages(userId, chatroomExist.id);
    return chatroom;
  }

  const chatroom = await createChatroom(userId, memberId);

  const chatroomWithMessages = await fetchChatroomMessages(userId, chatroom.id);

  return chatroomWithMessages;
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
  deleteConversation,
  getConversationByUserIdsOrCreate,
};
