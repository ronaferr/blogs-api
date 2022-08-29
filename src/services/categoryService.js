const { Category } = require('../database/models');

const categoryCreateService = async ({ name }) => {
  const result = await Category.create({ name });
  console.log(result);
  return result;
};

module.exports = { categoryCreateService };