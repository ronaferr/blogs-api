// const jwt = require('jsonwebtoken');

const service = require('../services/loginService');

// const { JWT_SECRET } = process.env;

const loginController = async (req, res) => {
  try {
    const { email } = req.body;

    /* const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    }; */
    const user = await service.loginService(email);
  
    // const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { loginController };