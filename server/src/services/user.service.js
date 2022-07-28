const { User, sequelize } = require('../models');
const { ResourceNotFoundError } = require('../errors/ApiError');

const getAll = async () => {
  const users = await User.findAll();
  return {
    users: users,
  };
};
const getUserById = async userId => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  if (!user) throw new ResourceNotFoundError('User not found');

  return {
    user: user,
  };
};
const getUserByUserName = async username => {
  const user = await User.findOne({
    where: {
      username: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('username')),
        'LIKE',
        '%' + username.toLowerCase() + '%'
      ),
    },
  });

  if (!user) throw new ResourceNotFoundError('User not found');

  return {
    user: user,
  };
};

const updateUser = async (userId, fields) => {
  const { username, email, password } = fields;

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) throw new ResourceNotFoundError('User not found');

  user.set({
    ...(username && { username }),
    ...(email && { email }),
    ...(password && { password }),
  });

  await user.save();

  return {
    user: user,
  };
};
const deleteUser = async userId => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ResourceNotFoundError('User not found');

  await user.destroy();

  return {
    user: user,
  };
};

module.exports = {
  getAll,
  getUserById,
  getUserByUserName,
  updateUser,
  deleteUser,
};
