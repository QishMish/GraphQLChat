"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeletedUserChatroom extends Model {
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
  DeletedUserChatroom.init(
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
      last_message_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "DeletedUserChatroom",
      tableName: "deleted_user_chatrooms",
    }
  );
  return DeletedUserChatroom;
};
