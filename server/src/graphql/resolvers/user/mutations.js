const authService = require("../../../services/auth.service");
const userService = require("../../../services/user.service");
const coockieConfig = require("./../../../utils/cookiesConfig");

const userMutation = {
  signUpUser: async (parent, args, { _, res }) => {
    const { email, username, password } = args.signUpUserInput;

    const { status, access_token, refresh_token } = await authService.signUp(
      email,
      username,
      password
    );
    const { accessTokenCookieOptions, refreshTokenCookieOptions } =
      coockieConfig;

    // Add refreshToken to cookie
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    return { status, access_token, refresh_token };
  },
  signInUser: async (parent, args, { _, res }) => {
    const { username, password } = args.signInUserInput;

    const { status, access_token, refresh_token } = await authService.signIn(
      username,
      password
    );
    const { accessTokenCookieOptions, refreshTokenCookieOptions } =
      coockieConfig;
    // Add refreshToken to cookie
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    return { status, access_token, refresh_token };
  },
  signOutUser: async (parent, args, { req, res }) => {
    const { id: userId } = ctx.user;
    const { refresh_token } = req.cookies;

    const signOutResponse = await authService.signOut(userId, refresh_token);

    // Logout user
    res.cookie("access_token", "", { maxAge: -1 });
    res.cookie("refresh_token", "", { maxAge: -1 });
    res.cookie("logged_in", "", { maxAge: -1 });

    return {
      status: "SUCCESS",
      message: `Successfully signed out`,
    };
  },
  refreshAccessToken: async (parent, args, { req, res }) => {
    const { refresh_token: token } = req.cookies;

    if (token) throw new AuthenticationError("No refresh token provided");

    const { status, access_token } = await authService.refreshAccessToken(
      token
    );
    const { accessTokenCookieOptions } = coockieConfig;
    // Add refreshToken to cookie
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
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
