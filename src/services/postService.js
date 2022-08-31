const { BlogPost } = require('../database/models');

const postCreateService = async ({ title, content, userId }) => {
  const result = await BlogPost.create({ title, content, userId });
  return result;
};

module.exports = { postCreateService };