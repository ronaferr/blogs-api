const express = require('express');

const login = require('../controllers/loginController');
const validation = require('../middlewares/validations');

const loginRoute = express.Router();

loginRoute.post('/', validation.validationLogin, login.loginController);

module.exports = loginRoute;