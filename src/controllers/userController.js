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

module.exports = { userCreateController };