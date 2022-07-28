('use strict');

const bcrypt = require('bcrypt');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Message, {
        foreignKey: {
          name: 'author_id',
        },
        as: 'author',
      });
      this.belongsToMany(models.Chatroom, {
        through: 'user_chatrooms',
        foreignKey: 'user_id',
        otherKey: 'chatroom_id',
        as: 'chatrooms',
      });
      this.belongsToMany(models.Role, {
        through: 'user_roles',
        as: 'roles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
      });
    }
    //instance methods
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeCreate: async user => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
          }
        },
        beforeUpdate: async user => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.upassword, salt);
            user.password = hashedPassword;
          }
        },
      },
    }
  );
  return User;
};
