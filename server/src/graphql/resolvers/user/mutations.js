const { client } = require("../../../config/redisConfig");
const authService = require("../../../services/auth.service");
const userService = require("../../../services/user.service");
const coockieConfig = require("./../../../utils/cookiesConfig");

const userMutation = {
  signUpUser: async (parent, args, { pubsub, user }) => {
    const { email, username, firstname, lastname, password } =
      args.signUpUserInput;

    const { status, access_token, refresh_token, userProps } =
      await authService.signUp(email, username, firstname, lastname, password);
    pubsub.publish("ACTIVE_USERS", {
      onNewUserJoined: JSON.parse(await client.get("activeUsers")),
    });
    return { status, access_token, refresh_token };
  },
  signInUser: async (parent, args, { pubsub, user }) => {
    const { username, password } = args.signInUserInput;

    const { status, access_token, refresh_token, userProps } =
      await authService.signIn(username, password);
      
    pubsub.publish("ACTIVE_USERS", {
      onNewUserJoined: JSON.parse(await client.get("activeUsers")),
    });
    return { status, access_token, refresh_token };
  },
  signOutUser: async (parent, args, { req, res }) => {
    const { id: userId } = ctx.user;
    let token;
    if (req && req.headers.refresh_token) {
      token = req.headers.refresh_token.split("Bearer ")[1];
    }
    const signOutResponse = await authService.signOut(userId, token);

    return {
      status: "SUCCESS",
      message: `Successfully signed out`,
    };
  },
  refreshAccessToken: async (parent, args, { req, res }) => {
    let token;
    if (req && req.headers.refresh_token) {
      token = req.headers.refresh_token.split("Bearer ")[1];
    }
    const { status, access_token } = await authService.refreshAccessToken(
      token
    );

    return { status, access_token };
  },
  updateUser: async (parent, args, ctx) => {
    const { userId, updateUserInput } = args;

    const updateResponse = await userService.updateUser(
      userId,
      updateUserInput
    );
    return updateResponse.user;
  },
  deleteUser: async (parent, args, ctx) => {
    const { userId } = args;
    const deleteResponse = await userService.deleteUser(userId);
    return deleteResponse.user;
  },
};

module.exports = { userMutation };
