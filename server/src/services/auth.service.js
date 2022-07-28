const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  withFilter,
  SyntaxError,
  ValidationError,
} = require('apollo-server');
const { signJwt, verifyJwt } = require('../utils/jwt');
const { User, Role } = require('../models');
const { JWT_ACCESS_TOKEN_KEY } = require('../config/constants');
const { getMethods } = require('../utils/helper');

const { ResourceNotFoundError } = require('../errors/ApiError');

const register = async (email, username, password) => {
  const user = await User.create({
    email: email,
    username: username,
    password: password,
  });

  const roleUser = await Role.findOne({
    where: {
      role: 'user',
    },
  });

  await user.addRole(roleUser);

  const token = await signJwt(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      roles: ['user'],
    },
    JWT_ACCESS_TOKEN_KEY
  );

  return {
    status: 'SUCCESS',
    token: token,
  };
};
const login = async (username, password) => {
  const user = await User.findOne({
    where: {
      username: username,
    },
    include: {
      model: Role,
      as: 'roles',
      attributes: ['role'],
    },
  });

  if (!user)
    throw new ResourceNotFoundError(
      'User with corresponding credentials not found'
    );

  const passwordIsMatch = await user.comparePassword(password);

  if (!passwordIsMatch) {
    throw new ValidationError('Username or Password did not match');
  }
  const token = await signJwt(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      roles: [...user.roles.map(role => role.role)],
    },
    JWT_ACCESS_TOKEN_KEY
  );

  const { password: pass, ...others } = user.dataValues;

  return {
    status: 'SUCCESS',
    token: token,
  };
};

module.exports = {
  login,
  register,
};
