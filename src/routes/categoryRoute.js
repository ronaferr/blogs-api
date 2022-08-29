const express = require('express');

const category = require('../controllers/categoryController');
const validation = require('../middlewares/validations');

const categoryRoute = express.Router();

categoryRoute.post('/', validation.validationToken, category.categoryCreateController);

module.exports = categoryRoute;