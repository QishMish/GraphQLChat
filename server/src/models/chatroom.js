"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: "creator_id",
        },
        as: "creator",
      });

      this.hasMany(models.Message, {
        foreignKey: {
          name: "chatroom_id",
        },
        as: "messages",
      });
      this.belongsToMany(models.User, {
        through: "user_chatrooms",
        foreignKey: "chatroom_id",
        otherKey: "user_id",
        as: "users",
      });
      this.belongsToMany(models.User, {
        through: "deleted_user_chatrooms",
        foreignKey: "chatroom_id",
        otherKey: "user_id",
        as: "users-removers",
      });
    }
  }
  Chatroom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      slug: {
        type: DataTypes.VIRTUAL,
      },
      type: {
        type: DataTypes.ENUM("ONE_TO_ONE", "MANY_TO_MANY"),
        defaultValue: "ONE_TO_ONE",
        allowNull: false,
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      messagesCount: {
        type: DataTypes.VIRTUAL,
      },
      hasMoreMessages: {
        type: DataTypes.VIRTUAL,
        defaultValue: true,
      },
      last_message: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Chatroom",
      tableName: "chatrooms",
    }
  );
  return Chatroom;
};
