const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const service = require('../services/postService');
const { PostCategory } = require('../database/models');
 
const { JWT_SECRET } = process.env;

const postCreateController = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_SECRET);

    const transactions = await sequelize.transaction(async (transaction) => {
    const result = await service.postCreateService({ 
      title, content, categoryIds, userId: decoded.data.id }, { transaction });

      console.log(`resultado result ${result}`);

    const createPostCategories = categoryIds.map((cat) => ({ postId: decoded.data.id,
      categoryId: cat }));

      const a = await PostCategory.bulkCreate(createPostCategories, { transaction });

      console.log(`resultado posts ${a}`);

      return result;
    });

    return res.status(201).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postCreateController };