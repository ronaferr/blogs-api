const { User } = require('../database/models');

const loginService = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

module.exports = { loginService };