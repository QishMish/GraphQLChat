const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  withFilter,
  SyntaxError,
  ValidationError,
} = require("apollo-server");
const { signJwt, verifyJwt } = require("../utils/jwt");
const { User, Role, RefreshToken } = require("../models");
const {
  JWT_ACCESS_TOKEN_KEY,
  JWT_REFRESH_TOKEN_KEY,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/constants");
const { getMethods } = require("../utils/helper");

const { ResourceNotFoundError } = require("../errors/ApiError");

const signUp = async (email, username, firstname, lastname, password) => {
  const user = await User.create({
    email: email,
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: password,
  });

  const roleUser = await Role.findOne({
    where: {
      role: "USER",
    },
  });

  await user.addRole(roleUser);

  const { access_token, refresh_token } = await signTokens(user);

  const refreshToken = await RefreshToken.create({
    refresh_token: refresh_token,
    owner_id: Number(user.id),
  });

  await user.addRefreshToken(refreshToken);

  return {
    status: "SUCCESS",
    access_token,
    refresh_token,
  };
};
const signIn = async (username, password) => {
  const user = await User.findOne({
    where: {
      username: username,
    },
    include: {
      model: Role,
      as: "roles",
      attributes: ["role"],
    },
  });

  if (!user)
    throw new ResourceNotFoundError(
      "User with corresponding credentials not found"
    );

  const passwordIsMatch = await user.comparePassword(password);

  if (!passwordIsMatch) {
    throw new ValidationError("Username or Password did not match");
  }
  const { access_token, refresh_token } = await signTokens(user);

  const refreshToken = await RefreshToken.create({
    refresh_token: refresh_token,
    owner_id: user.id,
  });

  await user.addRefreshToken(refreshToken);

  return {
    status: "SUCCESS",
    access_token,
    refresh_token,
  };
};
const signOut = async (userId, token) => {
  const refreshToken = await RefreshToken.findOne({
    where: {
      refresh_token: token,
      owner_id: userId,
    },
  });
  await refreshToken.destroy();

  return {
    refresh_token: refreshToken,
  };
};
const refreshAccessToken = async (refreshToken) => {
  const decoded = await verifyJwt(
    refreshToken,
    JWT_REFRESH_TOKEN_KEY
  );
  if (!decoded) throw new ForbiddenError("Could not refresh access token");

  const token = await RefreshToken.findOne({
    refresh_token: refreshToken,
  });

  if (!token) throw new ForbiddenError("Refresh token not found");

  const user = await User.findOne({
    where: {
      id: decoded.id,
    },
    include: [
      {
        model: RefreshToken,
        as: "refreshTokens",
      },
      {
        model: Role,
        as: "roles",
      },
    ],
  });

  const found = user?.refreshTokens.some(
    (rfToken) => {
      return rfToken.refresh_token === refreshToken
    }
  );

  if (!found) throw new ForbiddenError("Invalid refresh token");

  const access_token = await signJwt(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      isActive: user.isActive,
      roles: [...user.roles.map((role) => role.role)],
    },
    JWT_ACCESS_TOKEN_KEY,
    {
      expiresIn: "1m",
    }
  );

  return {
    status: "SUCCESS",
    access_token,
  };
};
const signTokens = async (user) => {
  const roles = user.roles ? user.roles.map((role) => role.role) : ["USER"];
  // Create access token
  console.log(JWT_ACCESS_TOKEN_EXPIRES_IN * 60 * 1000);
  console.log(JWT_REFRESH_TOKEN_EXPIRES_IN * 60 * 1000);
  const access_token = await signJwt(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      isActive: user.isActive,
      roles,
    },
    JWT_ACCESS_TOKEN_KEY,
    {
      // expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN * 60 * 1000,
      expiresIn: "30m",
    }
  );

  // Create refresh token
  const refresh_token = await signJwt(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified,
      isActive: user.isActive,
      roles,
    },
    JWT_REFRESH_TOKEN_KEY,
    {
      // expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN * 60 * 1000,
      expiresIn: "7d",
    }
  );

  return { access_token, refresh_token };
};

module.exports = {
  signUp,
  signIn,
  signOut,
  refreshAccessToken,
};
