"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("deleted_user_chatrooms", {
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
      last_message_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("deleted_user_chatrooms");
  },
};
