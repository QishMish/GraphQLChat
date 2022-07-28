const authService = require('../../../services/auth.service');
const userService = require('../../../services/user.service');

const userMutation = {
  signUpUser: async (parent, args, ctx) => {
    const { email, username, password } = args.signUpUserInput;

    const registerResponse = await authService.register(
      email,
      username,
      password
    );
    return registerResponse;
  },
  signInUser: async (parent, args, ctx) => {
    const { username, password } = args.signInUserInput;

    const loginResponse = await authService.login(username, password);
    return loginResponse;
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
