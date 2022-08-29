const service = require('../services/userService');

const tokenGenerator = require('../middlewares/tokenGenerator');

const userCreateController = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await service.userCreateService({ displayName, email, password, image });

    const token = await tokenGenerator(email);
  
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userGetAll = async (_req, res) => {
  try {
    const result = await service.userGetAll();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const userGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.userGetById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { userCreateController, userGetAll, userGetById };