const { Category } = require('../database/models');

const categoryCreateService = async ({ name }) => {
  const result = await Category.create({ name });
  console.log(result);
  return result;
};

const categoryGetAll = async () => {
  const result = await Category.findAll(/* { attributes: { exclude: ['password'] } } */);
  return result;
};

module.exports = { categoryCreateService, categoryGetAll };