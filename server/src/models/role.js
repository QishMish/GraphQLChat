'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'user_roles',
        as: 'users',
        foreignKey: 'role_id',
        otherKey: 'user_id',
      });
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.ENUM('admin', 'moderator', 'user'),
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    }
  );
  return Role;
};
