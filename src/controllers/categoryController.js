const service = require('../services/categoryService');

const categoryCreateController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });

    const result = await service.categoryCreateService({ name });
  
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const categoryGetAll = async (_req, res) => {
  try {
    const result = await service.categoryGetAll();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { categoryCreateController, categoryGetAll };