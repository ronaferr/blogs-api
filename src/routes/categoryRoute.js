const express = require('express');

const category = require('../controllers/categoryController');
const validation = require('../middlewares/validations');

const categoryRoute = express.Router();

categoryRoute.post('/', validation.validationToken, category.categoryCreateController);
categoryRoute.get('/', validation.validationToken, category.categoryGetAll);

module.exports = categoryRoute;