const { User } = require('../database/models');

const validationLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

const validationUser = async (req, res, next) => {
  const { displayName, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

const validationEmail = async (req, res, next) => {
  const { email } = req.body;
  const REGEX_EMAIL = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409)
      .json({ message: 'User already registered' });
  }
  if (!REGEX_EMAIL.test(email)) {
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

module.exports = {
  validationLogin,
  validationUser,
  validationEmail,
};