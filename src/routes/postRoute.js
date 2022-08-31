const express = require('express');

const post = require('../controllers/postController');
const validation = require('../middlewares/validations');

const postRoute = express.Router();

postRoute.post('/', validation.validationToken, validation.validationCategory,
validation.validationPost, post.postCreateController);

module.exports = postRoute;