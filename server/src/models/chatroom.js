'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'creator_id',
        },
        as: 'creator',
      });

      this.hasMany(models.Message, {
        foreignKey: {
          name: 'chatroom_id',
        },
        as: 'messages',
      });
      this.belongsToMany(models.User, {
        through: 'user_chatrooms',
        foreignKey: 'chatroom_id',
        otherKey: 'user_id',
        as: 'users',
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
      type: {
        type: DataTypes.ENUM('ONE_TO_ONE', 'MANY_TO_MANY'),
        defaultValue: 'ONE_TO_ONE',
        allowNull: false,
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Chatroom',
      tableName: 'chatrooms',
    }
  );
  return Chatroom;
};
