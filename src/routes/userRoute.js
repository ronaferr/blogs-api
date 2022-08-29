const express = require('express');

const user = require('../controllers/userController');
const validation = require('../middlewares/validations');

const userRoute = express.Router();

userRoute.post('/', validation.validationUser,
  validation.validationEmail, user.userCreateController);

userRoute.get('/', validation.validationToken, user.userGetAll);

userRoute.get('/:id', validation.validationToken, user.userGetById);

module.exports = userRoute;