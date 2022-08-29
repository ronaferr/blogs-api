const tokenGenerator = require('../middlewares/tokenGenerator');

const loginController = async (req, res) => {
  try {
    const { email } = req.body;

    const token = await tokenGenerator(email);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { loginController };