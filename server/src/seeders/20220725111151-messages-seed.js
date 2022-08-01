"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "messages",
      [
        {
          content: "hi there",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "hello",
          author_id: 2,
          chatroom_id: 1,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "hello people",
          author_id: 3,
          chatroom_id: 2,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "how are you?",
          author_id: 1,
          chatroom_id: 4,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "are you here",
          author_id: 1,
          chatroom_id: 4,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "i am fine",
          author_id: 3,
          chatroom_id: 2,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "hello people",
          author_id: 3,
          chatroom_id: 2,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "nahh",
          author_id: 3,
          chatroom_id: 2,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "brahhh",
          author_id: 3,
          chatroom_id: 3,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "yeah",
          author_id: 4,
          chatroom_id: 3,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
        {
          content: "ok",
          author_id: 5,
          chatroom_id: 3,
          createdAt:  new Date().toISOString(),
          updatedAt:  new Date().toISOString()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
