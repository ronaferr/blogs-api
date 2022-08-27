const { User } = require('../database/models');

const loginService = async (email) => {
  console.log(email);
  const result = await User.findOne({ where: { email } });
  // console.log(result);
  return result;
};

module.exports = { loginService };