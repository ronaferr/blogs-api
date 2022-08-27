require('dotenv').config();
const app = require('./api');

// const loginController = require('./controllers/loginController');
// const validation = require('./middlewares/validations');

// const routes = require('./routes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// app.get('/login', /* validation.validationLogin, */ loginController.loginController);

app.listen(port, () => console.log('ouvindo porta', port));
