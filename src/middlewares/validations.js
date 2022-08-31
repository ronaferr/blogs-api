const jwt = require('jsonwebtoken');

const { User } = require('../database/models');
const { Category } = require('../database/models');

const { JWT_SECRET } = process.env;

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

const validationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
    const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({ where: { email: decoded.data.email } });
  if (!user) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

const validationPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (categoryIds.length < 1) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

/* const findCategory = async (id) => {
  try {
    const valid = await Category.findBypk(id);
  if (!valid) {
    const err = new Error();
    err.status = 400;
    throw err;
  }
  return valid;
} catch (error) {
    return error;
}
}; */

const validationCategory = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
    if (rows.length !== categoryIds.length) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
  } catch (error) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  
  next();
};

module.exports = {
  validationLogin,
  validationUser,
  validationEmail,
  validationToken,
  validationPost,
  validationCategory,
};