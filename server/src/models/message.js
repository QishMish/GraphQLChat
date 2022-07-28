"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: "author_id",
        },
        as:"author"
      });
      this.belongsTo(models.Chatroom, {
        foreignKey: {
          name: "chatroom_id",
        },
        as:"chatroom"
      });
    }
  }
  Message.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      chatroom_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
    }
  );
  return Message;
};
