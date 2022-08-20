"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "messages",
      [
        {
          content: "1",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:21:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:21:46.370000 +00:00").toISOString()
        },
        {
          content: "2",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:22:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:22:46.370000 +00:00").toISOString()
        },
        {
          content: "3",
          author_id:2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:23:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:23:46.370000 +00:00").toISOString()
        },
        {
          content: "4",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:24:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:24:46.370000 +00:00").toISOString()
        },
        {
          content: "5",
          author_id:2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:25:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:25:46.370000 +00:00").toISOString()
        },
        {
          content: "6",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:26:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:26:46.370000 +00:00").toISOString()
        },
        {
          content: "7",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:27:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:27:46.370000 +00:00").toISOString()
        },
        {
          content: "8",
          author_id:2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:28:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:28:46.370000 +00:00").toISOString()
        },
        {
          content: "9",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:29:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:29:46.370000 +00:00").toISOString()
        },
        {
          content: "10",
          author_id:2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:30:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:30:46.370000 +00:00").toISOString()
        },
        {
          content: "11",
          author_id:2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:31:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:31:46.370000 +00:00").toISOString()
        },
        {
          content: "12",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:32:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:32:46.370000 +00:00").toISOString()
        },
        {
          content: "13",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:33:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:33:46.370000 +00:00").toISOString()
        },
        {
          content: "14",
          author_id:1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:34:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:34:46.370000 +00:00").toISOString()
        },
        {
          content: "15",
          author_id:2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:35:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:35:46.370000 +00:00").toISOString()
        },
        {
          content: "16",
          author_id: 2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:36:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:36:46.370000 +00:00").toISOString()
        },
        {
          content: "17",
          author_id: 2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:37:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:37:46.370000 +00:00").toISOString()
        },
        {
          content: "18",
          author_id: 2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:38:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:38:46.370000 +00:00").toISOString()
        },
        {
          content: "19",
          author_id: 2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:39:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:39:46.370000 +00:00").toISOString()
        },
        {
          content: "20",
          author_id: 1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:40:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:40:46.370000 +00:00").toISOString()
        },
        {
          content: "21",
          author_id: 2,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:41:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:41:46.370000 +00:00").toISOString()
        },
        {
          content: "22",
          author_id: 1,
          chatroom_id: 1,
          createdAt:  new Date("2022-08-18 05:42:46.370000 +00:00").toISOString(),
          updatedAt:  new Date("2022-08-18 05:42:46.370000 +00:00").toISOString()
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
