"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
   
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: "owner_id",
        },
        as:"owner"
      });
    }
  }
  RefreshToken.init(
    {
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
    }
  );
  return RefreshToken;
};
