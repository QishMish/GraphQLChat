const getMethods = (object) => {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(
    (m) => "function" === typeof object[m]
  );
};
const getOffSet = (skip = 1, limit = 10) => {
  const offset = Number(skip) <= 1 ? 0 : Number(skip * limit - limit);
  console.log(offset, "nll");
  return { offset, limit };
};

module.exports = {
  getMethods,
  getOffSet,
};
