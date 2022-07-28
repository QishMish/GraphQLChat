"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatroomUser extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "cascade",
      });
      this.belongsTo(models.Chatroom, {
        foreignKey: "chatroom_id",
        as: "chatroom",
      });
    }
  }
  ChatroomUser.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      chatroom_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserChatroom",
      tableName: "user_chatrooms",
    }
  );
  return ChatroomUser;
};
