"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "chatrooms",
      [
        {
          name: "chatroom1",
          type: "ONE_TO_ONE",
          creator_id: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          name: "chatroom2",
          type: "ONE_TO_ONE",
          creator_id: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          name: "chatroom3",
          type: "MANY_TO_MANY",
          creator_id: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          name: "chatroom4",
          type: "ONE_TO_ONE",
          creator_id: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          name: "chatroom5",
          type: "ONE_TO_ONE",
          creator_id: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("chatrooms", null, {});
  },
};
