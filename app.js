const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const error = require('./middlewares/error');

const NotFoundError = require('./errors/notFoundError'); // 404

const { port = 3002 } = process.env;
const app = express();

app.use(bodyParser.json()); // для соборки JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
  },
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-z]{1,5}([/a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)/),
  }),
}), createUser);

// авторизация
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не существует');
});

app.use(errors());
app.use(error);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${port}`);
});
