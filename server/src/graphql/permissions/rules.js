const { rule, and, or, not } = require("graphql-shield");

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.roles.includes("ADMIN");
  }
);
const isModerator = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.roles.includes("MODERATOR");
  }
);

module.exports = {
  isAuthenticated,
  isAdmin,
  isModerator,
};
