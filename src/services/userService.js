const { User } = require('../database/models');

const userCreateService = async ({ displayName, email, password, image }) => {
  const result = await User.create({ displayName, email, password, image });
  return result;
};

const userGetAll = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

module.exports = { userCreateService, userGetAll };