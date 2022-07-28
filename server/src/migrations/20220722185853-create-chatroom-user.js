"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_chatrooms", {
      user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chatroom_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_chatrooms");
  },
};
