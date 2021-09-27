const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/users');

const { port = 3002 } = process.env;
const app = express();

app.use(bodyParser.json()); // для соборки JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '614e07ad94310d92362da699'
//   };
//   next();
// });

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
})