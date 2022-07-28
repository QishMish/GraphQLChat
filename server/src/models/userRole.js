'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
        onDelete: 'cascade',
      });
      this.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'roles',
      });
    }
  }
  UserRole.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserRole',
      modelName: 'userRoles',
    }
  );
  return UserRole;
};
